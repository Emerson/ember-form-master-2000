import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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
    assert.equal(this.$('input').length, 2, 'It rendered two radio buttons');
    assert.equal(this.$('label').length, 2, 'It rendered two labels');
    assert.equal(this.$('label:first').text().trim(), 'one', 'Label text is set properly');
    assert.equal(this.$('input').attr('value'), '1', 'Value is set propery');
  });

  test('checks the radio button which value property in content array matches value', async function (assert) {
    this.set('value', 2);
    this.set('widgetAttrs', mockWidgetAttrs());
    await render(hbs`{{fm-widgets/radio-group value=this.value widgetAttrs=this.widgetAttrs}}`);
    assert.notOk(this.$('input')[0].checked);
    assert.ok(this.$('input')[1].checked);
  });

  test('updates value if one radio button is clicked', async function (assert) {
    this.set('value', null);
    this.set('widgetAttrs', mockWidgetAttrs());
    await render(hbs`{{fm-widgets/radio-group value=this.value widgetAttrs=this.widgetAttrs}}`);
    this.$('input')[0].click();
    assert.equal(this.get('value'), 1);
  });

  test('Observes changes of content arrays label and value', async function (assert) {
    this.set('widgetAttrs', mockWidgetAttrs(['foo', 'foo']));
    await render(hbs`{{fm-widgets/radio-group widgetAttrs=this.widgetAttrs}}`);
    this.set('widgetAttrs.content.0.label', 'bar');
    assert.equal(this.$('label:first').text().trim(), 'bar');
    this.set('widgetAttrs.content.0.value', 'bar');
    assert.equal(this.$('input:first').attr('value'), 'bar');
  });

  test('Adds another option if an element is added to content array', async function (assert) {
    assert.expect(3);
    this.set('widgetAttrs', mockWidgetAttrs([]));
    await render(hbs`{{fm-widgets/radio-group widgetAttrs=this.widgetAttrs}}`);

    this.get('widgetAttrs.content').pushObject({ label: 'foo', value: 'foo' });
    later(() => {
      assert.equal(this.$('input').length, 1, 'Option is added');
      assert.equal(this.$('input').attr('value'), 'foo', 'Value of new option is correct');
      assert.equal(this.$('label').text().trim(), 'foo', 'Label of new option is correct');
    }, 100);
  });

  test('Option is removed if element is removed from content array', async function (assert) {
    assert.expect(2);
    this.set('widgetAttrs', mockWidgetAttrs());
    await render(hbs`{{fm-widgets/radio-group widgetAttrs=this.widgetAttrs}}`);

    this.get('widgetAttrs.content').removeAt(0);
    later(() => {
      assert.equal(this.$('input').length, 1, 'Option is removed');
      assert.equal(this.$('input').attr('value'), '2', 'Correct option is removed');
    }, 100);
  });
});
