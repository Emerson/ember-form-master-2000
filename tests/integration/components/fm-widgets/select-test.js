import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';
import { run, later } from '@ember/runloop';
import EmberObject from '@ember/object';

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
    await render(hbs`{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
    assert.ok(this.$('select').length, 'Renders a select');
    assert.ok(this.$('.form-control').length === 1, 'Has the class of form-control');
  });

  test('fm-widgets/select renders an array of content options', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs());
    await render(hbs`{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
    assert.ok(this.$('option').length === 2, 'It renders two options');
    assert.equal(this.$('option:first').text().trim(), 'one');
    assert.equal(this.$('option:last').text().trim(), 'two');
    assert.equal(this.$('option:first').attr('value'), 1);
    assert.equal(this.$('option:last').attr('value'), 2);
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
    await render(hbs`{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
    assert.equal(this.$('option:first').text().trim(), 'hi');
    assert.equal(this.$('option:last').text().trim(), 'bye');
    assert.equal(this.$('option:first').attr('value'), 'hello');
    assert.equal(this.$('option:last').attr('value'), 'goodbye');
  });

  test('entire object is set as value when optionValuePath is empty string', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs());
    this.set('widgetAttrs.optionValuePath', '');
    await render(hbs`{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
    assert.equal(this.$('option:first').text().trim(), 'one');
    assert.equal(this.$('option:last').text().trim(), 'two');
    assert.equal(this.$('option:first').attr('value'), this.get('widgetAttrs.content').objectAt(0).toString());
    assert.equal(this.$('option:last').attr('value'), this.get('widgetAttrs.content').objectAt(1).toString());
  });

  test('fm-widgets/select updates the value of the fm-field by default', async function (assert) {
    this.set('value', null);
    this.set('widgetAttrs', EmberObject.create({
      content: A([{ label: 'one', value: 1 }, { label: 'two', value: 2 }]),
      optionValuePath: 'value',
      optionLabelPath: 'label'
    }));
    await render(hbs`{{fm-field type='select' widgetAttrs=widgetAttrs value=value}}`);
    this.$('select').change();
    assert.equal(this.$('option:selected').val(), this.get('value'));
  });

  test('fm-widgets/select changes the selected option when the passed in value changes', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs());
    this.set('modelValue', 2);
    await render(hbs`{{fm-widgets/select value=modelValue widgetAttrs=widgetAttrs}}`);
    run(() => {
      assert.equal(this.$('option:selected').val(), '2', 'The initial value is set correctly');
      this.set('modelValue', 1);
      assert.equal(this.$('option:selected').val(), '1', 'The selected option updated properly');
    });
  });

  test('it allows a prompt to be passed in', async function (assert) {
    const attrs = mockWidgetAttrs();
    attrs.set('prompt', 'Testing');
    this.set('widgetAttrs', attrs);
    await render(hbs`{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
    assert.ok(this.$('option:disabled').length === 1, 'A prompt option was not rendered as expected');
  });

  test('fm-widgets/select observes changes of label and value in content array', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs([['foo', 'foo']]));
    await render(hbs`{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
    assert.equal(this.$('option').text().trim(), 'foo', 'The initial label is correct');
    assert.equal(this.$('option').attr('value'), 'foo', 'The initial value is correct');
    this.set('widgetAttrs.content.0.label', 'bar');
    assert.equal(this.$('option').text().trim(), 'bar', 'Label is updated after change of content array');
    this.set('widgetAttrs.content.0.value', 'bar');
    assert.equal(this.$('option').attr('value'), 'bar', 'Value is updated after change of content array');
  });

  test('fm-widgets/select updates options if an element is added to content array', async function (assert) {
    assert.expect(3);
    this.set('widgetAttrs', mockWidgetAttrs([]));
    await render(hbs`{{fm-widgets/select widgetAttrs=widgetAttrs}}`);

    this.get('widgetAttrs.content').pushObject({ value: 'qux', label: 'qux' });

    later(() => {
      assert.equal(this.$('option').length, 1, 'Option is added after content array changes');
      assert.equal(this.$('option').text().trim(), 'qux', 'Label of new content array element is added');
      assert.equal(this.$('option').attr('value'), 'qux', 'Value of new content array element is added');
    }, 100);
  });

  test('fm-widgets/select updates options if an element is removed from content array', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs([['foo', 'foo'], ['bar', 'bar']]));
    await render(hbs`{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
    this.get('widgetAttrs.content').removeAt(0);

    later(() => {
      assert.equal(this.$('option').length, 1, 'Option is removed after element of content array is removed');
      assert.equal(this.$('option').text().trim(), 'bar', 'Correct element is removed');
    }, 100);
  });

  test('sends action onUserAction on focus out event', async function (assert) {
    assert.expect(1);
    this.set('widgetAttrs', mockWidgetAttrs());
    this.set('externalAction', () => {
      assert.ok(true);
    });
    await render(hbs`{{fm-widgets/select widgetAttrs=widgetAttrs onUserInteraction=(action externalAction)}}`);
    this.$('select').trigger('focusout');
  });

  test('sends action onUserAction on change event', async function (assert) {
    assert.expect(1);
    this.set('widgetAttrs', mockWidgetAttrs([['one', 1]]));
    this.set('externalAction', () => {
      assert.ok(true);
    });
    this.set('widgetAttrs', mockWidgetAttrs([['one', 1]]));
    this.set('value', null);

    await render(hbs`{{fm-widgets/select value=value widgetAttrs=widgetAttrs onUserInteraction=(action externalAction)}}`);
    this.$('select').change();
  });

  test('supports undefined content in widgetAttrs', async function (assert) {
    await render(hbs`{{fm-widgets/select value=value widgetAttrs=(hash content=content optionValueLabel='label' optionValuePath='value')}}`);
    assert.equal(this.$('option').length, 0);
    this.set('content', [{ label: 'one', value: 1 }]);
    assert.equal(this.$('option').length, 1);
  });
});
