import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';
import { later } from '@ember/runloop';
import EmberObject from '@ember/object';

function mockWidgetAttrs(options = [['one', 1], ['two', 2]]) {
  return EmberObject.create({
    content: A(options.map(o => { return { label: o[0], value: o[1] }; })),
    optionLabelPath: 'label',
    optionValuePath: 'value'
  });
}

module('Integration | Component | fm-widget:radio-group', function (hooks) {
  setupRenderingTest(hooks);

  test('renders radio buttons for each content item provided', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs());
    await render(hbs`{{fm-widgets/radio-group widgetAttrs=this.widgetAttrs}}`);
    assert.dom('input').exists({ count: 2 }, 'It rendered two radio buttons');
    assert.dom('label').exists({ count: 2 }, 'It rendered two labels');
    assert.dom('label').includesText('one')
    assert.dom('input').hasAttribute('value', '1', 'Value is set propery');
  });

  test('checks the radio button which value property in content array matches value', async function (assert) {
    this.set('value', 2);
    this.set('widgetAttrs', mockWidgetAttrs());
    await render(hbs`{{fm-widgets/radio-group value=this.value widgetAttrs=this.widgetAttrs}}`);
    assert.notOk(findAll('input')[0].checked);
    assert.ok(findAll('input')[1].checked);
  });

  test('updates value if one radio button is clicked', async function (assert) {
    this.set('value', null);
    this.set('widgetAttrs', mockWidgetAttrs());
    await render(hbs`{{fm-widgets/radio-group value=this.value widgetAttrs=this.widgetAttrs}}`);
    findAll('input')[0].click();
    assert.equal(this.get('value'), 1);
  });

  test('Observes changes of content arrays label and value', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs(['foo', 'foo']));
    await render(hbs`{{fm-widgets/radio-group widgetAttrs=this.widgetAttrs}}`);
    this.set('widgetAttrs.content.0.label', 'bar');
    assert.equal(findAll('label')[0].textContent.trim(), 'bar')
    this.set('widgetAttrs.content.0.value', 'bar');
    assert.equal(findAll('input')[0].getAttribute('value'), 'bar')
  });

  test('Adds another option if an element is added to content array', async function (assert) {
    assert.expect(3);
    this.set('widgetAttrs', mockWidgetAttrs([]));
    await render(hbs`{{fm-widgets/radio-group widgetAttrs=this.widgetAttrs}}`);

    this.get('widgetAttrs.content').pushObject({ label: 'foo', value: 'foo' });
    later(() => {
      assert.dom('input').exists({ count: 1 }, 'Option is added');
      assert.dom('input').hasAttribute('value', 'foo', 'Value of new option is correct');
      assert.dom('label').hasText('foo', 'Label of new option is correct');
    }, 100);
    await settled();
  });

  test('Option is removed if element is removed from content array', async function (assert) {
    assert.expect(2);
    this.set('widgetAttrs', mockWidgetAttrs());
    await render(hbs`{{fm-widgets/radio-group widgetAttrs=this.widgetAttrs}}`);

    this.get('widgetAttrs.content').removeAt(0);
    later(() => {
      assert.dom('input').exists({ count: 1 }, 'Option is removed');
      assert.dom('input').hasAttribute('value', '2', 'Correct option is removed');
    }, 100);
    await settled();
  });
});
