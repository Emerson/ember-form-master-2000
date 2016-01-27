import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
// import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';
//
moduleForComponent('fm-widgets/radio-group', 'Integration | Component | fm-widgets radio-group', {
  integration: true,
});

function mockWidgetAttrs(options=[['one', 1], ['two', 2]]){
  return Ember.Object.create({
    content: Ember.A(options.map(o => {return {label: o[0], value: o[1]}; })),
    optionLabelPath: 'label',
    optionValuePath: 'value'
  });
}

test('renders radio buttons for each content item provided', function(assert) {
  this.set('widgetAttrs', mockWidgetAttrs());
  this.render(hbs `{{fm-widgets/radio-group widgetAttrs=widgetAttrs}}`);
  assert.equal(this.$('input').length, 2, 'It rendered two radio buttons');
  assert.equal(this.$('label').length, 2, 'It rendered two labels');
  assert.equal(this.$('label:first').text().trim(), 'one', 'Label text is set properly');
  assert.equal(this.$('input').attr('value'), '1', 'Value is set propery');
});

test('checks the radio button which value property in content array matches value', function(assert) {
  this.set('value', 2);
  this.set('widgetAttrs', mockWidgetAttrs());
  this.render(hbs `{{fm-widgets/radio-group value=value widgetAttrs=widgetAttrs}}`);
  assert.notOk(this.$('input')[0].checked);
  assert.ok(this.$('input')[1].checked);
});

test('updates value if one radio button is clicked', function(assert) {
  this.set('value', null);
  this.set('widgetAttrs', mockWidgetAttrs());
  this.render(hbs `{{fm-widgets/radio-group value=value widgetAttrs=widgetAttrs}}`);
  this.$('input')[0].click();
  assert.equal(this.get('value'), 1);
});

test('Observes changes of content arrays label and value', function(assert) {
  this.set('widgetAttrs', mockWidgetAttrs(['foo', 'foo']));
  this.render(hbs `{{fm-widgets/radio-group widgetAttrs=widgetAttrs}}`);
  this.set('widgetAttrs.content.0.label', 'bar');
  assert.equal(this.$('label:first').text().trim(), 'bar');
  this.set('widgetAttrs.content.0.value', 'bar');
  assert.equal(this.$('input:first').attr('value'), 'bar');
});

test('Adds another option if an element is added to content array', function(assert) {
  assert.expect(3);
  this.set('widgetAttrs', mockWidgetAttrs([]));
  this.render(hbs `{{fm-widgets/radio-group widgetAttrs=widgetAttrs}}`);

  Ember.run.begin();
  Ember.run.schedule('sync', () => {
    this.get('widgetAttrs.content').pushObject({label: 'foo', value: 'foo'});
  });
  Ember.run.schedule('afterRender', () => {
    assert.equal(this.$('input').length, 1, 'Option is added');
    assert.equal(this.$('input').attr('value'), 'foo', 'Value of new option is correct');
    assert.equal(this.$('label').text().trim(), 'foo', 'Label of new option is correct');
  });
  Ember.run.end();
});

test('Option is removed if element is removed from content array', function(assert) {
  assert.expect(2);
  this.set('widgetAttrs', mockWidgetAttrs());
  this.render(hbs `{{fm-widgets/radio-group widgetAttrs=widgetAttrs}}`);

  Ember.run.begin();
  Ember.run.schedule('sync', () => {
    this.get('widgetAttrs.content').removeAt(0);
  });
  Ember.run.schedule('afterRender', () => {
    assert.equal(this.$('input').length, 1, 'Option is removed');
    assert.equal(this.$('input').attr('value'), '2', 'Correct option is removed');
  });
  Ember.run.end();
});

