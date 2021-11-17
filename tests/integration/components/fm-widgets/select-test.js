import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';
import { run, later } from '@ember/runloop';
import EmberObject from '@ember/object';
import $ from 'jquery'

function mockWidgetAttrs(options = [['one', 1], ['two', 2]]) {
  return EmberObject.create({
    content: A(options.map(o => { return { label: o[0], value: o[1] }; })),
    optionLabelPath: 'label',
    optionValuePath: 'value'
  });
}

module('Integration | Component | fm-widget:select', function (hooks) {
  setupRenderingTest(hooks);

  test('fm-widgets/select renders properly', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs());
    await render(hbs`{{fm-widgets/select widgetAttrs=this.widgetAttrs}}`);
    assert.ok(findAll('select').length, 'Renders a select');
    assert.ok(findAll('.form-control').length === 1, 'Has the class of form-control');
  });

  test('fm-widgets/select renders an array of content options', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs());
    await render(hbs`{{fm-widgets/select widgetAttrs=this.widgetAttrs}}`);
    assert.ok(findAll('option').length === 2, 'It renders two options');
    assert.equal(findAll('option')[0].textContent.trim(), 'one');
    assert.equal(findAll('option')[1].textContent.trim(), 'two');
    assert.equal(findAll('option')[0].getAttribute("value"), 1);
    assert.equal(findAll('option')[1].getAttribute("value"), 2);
  });

  test('fm-widgets/select respects different optionValuePaths and optionLabelPaths', async function (assert) {
    this.set('widgetAttrs', EmberObject.create({
      content: A([
        { text: 'hi', itemValue: 'hello' },
        { text: 'bye', itemValue: 'goodbye' }
      ]),
      optionLabelPath: 'text',
      optionValuePath: 'itemValue'
    }));
    await render(hbs`{{fm-widgets/select widgetAttrs=this.widgetAttrs}}`);
    assert.equal(findAll('option')[0].textContent.trim(), 'hi');
    assert.equal(findAll('option')[1].textContent.trim(), 'bye');
    assert.equal(findAll('option')[0].getAttribute("value"), 'hello');
    assert.equal(findAll('option')[1].getAttribute("value"), 'goodbye');
  });

  test('entire object is set as value when optionValuePath is empty string', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs());
    this.set('widgetAttrs.optionValuePath', '');
    await render(hbs`{{fm-widgets/select widgetAttrs=this.widgetAttrs}}`);
    assert.equal(findAll('option')[0].textContent.trim(), 'one');
    assert.equal(findAll('option')[1].textContent.trim(), 'two');
    assert.equal(findAll('option')[0].getAttribute("value"), this.get('widgetAttrs.content').objectAt(0).toString());
    assert.equal(findAll('option')[1].getAttribute("value"), this.get('widgetAttrs.content').objectAt(1).toString());
  });

  test('fm-widgets/select changes the selected option when the passed in value changes', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs());
    this.set('modelValue', 2);
    await render(hbs`{{fm-widgets/select value=this.modelValue widgetAttrs=this.widgetAttrs}}`);
    run(() => {
      assert.dom('option:checked').hasValue('2', 'The initial value is set correctly');
      this.set('modelValue', 1);
      assert.dom('option:checked').hasValue('1', 'The selected option updated properly');
    });
  });

  test('it allows a prompt to be passed in', async function (assert) {
    const attrs = mockWidgetAttrs();
    attrs.set('prompt', 'Testing');
    this.set('widgetAttrs', attrs);
    await render(hbs`{{fm-widgets/select widgetAttrs=this.widgetAttrs}}`);
    assert.ok(findAll('option:disabled').length === 1, 'A prompt option was not rendered as expected');
  });

  test('fm-widgets/select observes changes of label and value in content array', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs([['foo', 'foo']]));
    await render(hbs`{{fm-widgets/select widgetAttrs=this.widgetAttrs}}`);
    assert.dom('option').hasText('foo', 'The initial label is correct');
    assert.dom('option').hasAttribute('value', 'foo', 'The initial value is correct');
    this.set('widgetAttrs.content.0.label', 'bar');
    assert.dom('option').hasText('bar', 'Label is updated after change of content array');
    this.set('widgetAttrs.content.0.value', 'bar');
    assert.dom('option').hasAttribute('value', 'bar', 'Value is updated after change of content array');
  });

  test('fm-widgets/select updates options if an element is added to content array', async function (assert) {
    assert.expect(3);
    this.set('widgetAttrs', mockWidgetAttrs([]));
    await render(hbs`{{fm-widgets/select widgetAttrs=this.widgetAttrs}}`);

    this.get('widgetAttrs.content').pushObject({ value: 'qux', label: 'qux' });

    later(() => {
      assert.dom('option').exists({ count: 1 }, 'Option is added after content array changes');
      assert.dom('option').hasText('qux', 'Label of new content array element is added');
      assert.dom('option').hasAttribute('value', 'qux', 'Value of new content array element is added');
    }, 100);
    await settled();
  });

  test('fm-widgets/select updates options if an element is removed from content array', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs([['foo', 'foo'], ['bar', 'bar']]));
    await render(hbs`{{fm-widgets/select widgetAttrs=this.widgetAttrs}}`);
    this.get('widgetAttrs.content').removeAt(0);

    later(() => {
      assert.dom('option').exists(
        { count: 1 },
        'Option is removed after element of content array is removed'
      );
      assert.dom('option').hasText('bar', 'Correct element is removed');
    }, 100);
    await settled();
  });

  test('sends action onUserAction on focus out event', async function (assert) {
    assert.expect(1);
    this.set('widgetAttrs', mockWidgetAttrs());
    this.set('externalAction', () => {
      assert.ok(true);
    });
    await render(hbs`{{fm-widgets/select widgetAttrs=this.widgetAttrs onUserInteraction=(action this.externalAction)}}`);
    $('select').trigger('focusout')
  });

  test('sends action onUserAction on change event', async function (assert) {
    assert.expect(1);
    this.set('widgetAttrs', mockWidgetAttrs([['one', 1]]));
    this.set('externalAction', () => {
      assert.ok(true);
    });
    this.set('widgetAttrs', mockWidgetAttrs([['one', 1]]));
    this.set('value', null);

    await render(hbs`{{fm-widgets/select value=this.value widgetAttrs=this.widgetAttrs onUserInteraction=(action this.externalAction)}}`);
    await triggerEvent('select', 'change');
  });

  test('supports undefined content in widgetAttrs', async function (assert) {
    await render(hbs`{{fm-widgets/select value=this.value widgetAttrs=(hash content=this.content optionValueLabel='label' optionValuePath='value')}}`);
    assert.dom('option').doesNotExist();
    this.set('content', [{ label: 'one', value: 1 }]);
    assert.dom('option').exists({ count: 1 });
  });
});
