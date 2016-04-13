 import Ember from 'ember';
 import { moduleForComponent, test } from 'ember-qunit';
 import hbs from 'htmlbars-inline-precompile';
 import {initialize} from 'ember-form-master-2000/initializers/ember-form-master-2000';

 moduleForComponent('fm-widgets/select', 'Integration | Component | fm-widgets select', {
   integration: true,
   setup: function() {
     this.container.inject = this.container.injection;
     initialize(null, this.container);
   }
 });

 function mockWidgetAttrs(options=[['one', 1], ['two', 2]]){
   return Ember.Object.create({
     content: Ember.A(options.map(o => {return {label: o[0], value: o[1]}; })),
     optionLabelPath: 'label',
     optionValuePath: 'value'
   });
 }

 test('fm-widgets/select renders properly', function(assert) {
   this.set('widgetAttrs', mockWidgetAttrs());
   this.render(hbs `{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
   assert.ok(this.$('select').length, 'Renders a select');
   assert.ok(this.$('.form-control').length === 1, 'Has the class of form-control');
 });

 test('fm-widgets/select renders an array of content options', function(assert) {
   this.set('widgetAttrs', mockWidgetAttrs());
   this.render(hbs `{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
   assert.ok(this.$('option').length === 2, 'It renders two options');
   assert.equal(this.$('option:first').text().trim(), 'one');
   assert.equal(this.$('option:last').text().trim(), 'two');
   assert.equal(this.$('option:first').attr('value'), 1);
   assert.equal(this.$('option:last').attr('value'), 2);
 });

 test('fm-widgets/select respects different optionValuePaths and optionLabelPaths', function(assert) {
   this.set('widgetAttrs', Ember.Object.create({
     content: Ember.A([
       {text: 'hi', itemValue: 'hello'},
       {text: 'bye', itemValue: 'goodbye'}
     ]),
     optionLabelPath: 'text',
     optionValuePath: 'itemValue'
   }));
   this.render(hbs `{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
   assert.equal(this.$('option:first').text().trim(), 'hi');
   assert.equal(this.$('option:last').text().trim(), 'bye');
   assert.equal(this.$('option:first').attr('value'), 'hello');
   assert.equal(this.$('option:last').attr('value'), 'goodbye');
 });

 test('entire object is set as value when optionValuePath is empty string', function(assert) {
   this.set('widgetAttrs', mockWidgetAttrs());
   this.set('widgetAttrs.optionValuePath', '');
   this.render(hbs `{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
   assert.equal(this.$('option:first').text().trim(), 'one');
   assert.equal(this.$('option:last').text().trim(), 'two');
   assert.equal(this.$('option:first').attr('value'), this.get('widgetAttrs.content').objectAt(0).toString());
   assert.equal(this.$('option:last').attr('value'), this.get('widgetAttrs.content').objectAt(1).toString());
 });

test('fm-widgets/select updates the value of the fm-field by default', function(assert) {
  this.set('value', null);
  this.set('widgetAttrs', Ember.Object.create({
    content: Ember.A([ {label: 'one', value: 1}, {label: 'two', value: 2} ]),
    optionValuePath: 'value',
    optionLabelPath: 'label'
  }));
  this.render(hbs `{{fm-field type='select' widgetAttrs=widgetAttrs value=value}}`);
  this.$('select').change();
  assert.equal(this.$('option:selected').val(), this.get('value'));
});

 test('fm-widgets/select changes the selected option when the passed in value changes', function(assert) {
   this.set('widgetAttrs', mockWidgetAttrs());
   this.set('modelValue', 2);
   this.render(hbs `{{fm-widgets/select value=modelValue widgetAttrs=widgetAttrs}}`);
   Ember.run(()=> {
     assert.equal(this.$('option:selected').val(), '2', 'The initial value is set correctly');
     this.set('modelValue', 1);
     assert.equal(this.$('option:selected').val(), '1', 'The selected option updated properly');
   });
 });

 test('it allows a prompt to be passed in', function(assert) {
   const attrs = mockWidgetAttrs();
   attrs.set('prompt', 'Testing');
   this.set('widgetAttrs', attrs);
   this.render(hbs `{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
   assert.ok(this.$('option:disabled').length === 1, 'A prompt option was not rendered as expected');
 });

test('fm-widgets/select observes changes of label and value in content array', function(assert) {
  this.set('widgetAttrs', mockWidgetAttrs([['foo', 'foo']]));
  this.render(hbs `{{fm-widgets/select widgetAttrs=widgetAttrs}}`);
  assert.equal(this.$('option').text().trim(), 'foo', 'The initial label is correct');
  assert.equal(this.$('option').attr('value'), 'foo', 'The initial value is correct');
  this.set('widgetAttrs.content.0.label', 'bar');
  assert.equal(this.$('option').text().trim(), 'bar', 'Label is updated after change of content array');
  this.set('widgetAttrs.content.0.value', 'bar');
  assert.equal(this.$('option').attr('value'), 'bar', 'Value is updated after change of content array');
});

test('fm-widgets/select updates options if an element is added to content array', function(assert) {
  assert.expect(3);
  this.set('widgetAttrs', mockWidgetAttrs([]));
  this.render(hbs `{{fm-widgets/select widgetAttrs=widgetAttrs}}`);

  Ember.run.begin();
  Ember.run.schedule('sync', () => {
    this.get('widgetAttrs.content').pushObject({value: 'qux', label: 'qux'});
  });
  Ember.run.schedule('afterRender', () => {
    assert.equal(this.$('option').length, 1, 'Option is added after content array changes');
    assert.equal(this.$('option').text().trim(), 'qux', 'Label of new content array element is added');
    assert.equal(this.$('option').attr('value'), 'qux', 'Value of new content array element is added');
  });
  Ember.run.end();
});

test('fm-widgets/select updates options if an element is removed from content array', function(assert) {
  this.set('widgetAttrs', mockWidgetAttrs([['foo', 'foo'], ['bar', 'bar']]));
  this.render(hbs `{{fm-widgets/select widgetAttrs=widgetAttrs}}`);

  Ember.run.begin();
  Ember.run.schedule('sync', () => {
    this.get('widgetAttrs.content').removeAt(0);
  });
  Ember.run.schedule('afterRender', () => {
    assert.equal(this.$('option').length, 1, 'Option is removed after element of content array is removed');
    assert.equal(this.$('option').text().trim(), 'bar', 'Correct element is removed');
  });
  Ember.run.end();
});

test('sends action onUserAction on focus out event', function(assert) {
  assert.expect(1);
  this.set('widgetAttrs', mockWidgetAttrs());
  this.set('externalAction', () => {
    assert.ok(true);
  });
  this.render(hbs`{{fm-widgets/select widgetAttrs=widgetAttrs onUserInteraction=(action externalAction)}}`);
  this.$('select').trigger('focusout');
});

test('sends action onUserAction on change event', function(assert) {
  assert.expect(1);
  this.set('widgetAttrs', mockWidgetAttrs([['one', 1]]));
  this.set('externalAction', () => {
    assert.ok(true);
  });
  this.set('widgetAttrs', mockWidgetAttrs([['one', 1]]));
  this.set('value', null);

  this.render(hbs`{{fm-widgets/select value=value widgetAttrs=widgetAttrs onUserInteraction=(action externalAction)}}`);
  this.$('select').change();
});

test('supports undefined content in widgetAttrs', function(assert){
  this.render(hbs`{{fm-widgets/select value=value widgetAttrs=(hash content=content optionValueLabel='label' optionValuePath='value')}}`);
  assert.equal(this.$('option').length, 0);
  this.set('content', [{label: 'one', value: 1}]);
  assert.equal(this.$('option').length, 1);
});
