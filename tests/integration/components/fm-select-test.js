 import Ember from 'ember';
 import { moduleForComponent, test } from 'ember-qunit';
 import hbs from 'htmlbars-inline-precompile';
 import {initialize} from 'ember-form-master-2000/initializers/ember-form-master-2000';

 moduleForComponent('fm-select', 'Integration | Component | fm-select', {
   integration: true,
   setup: function() {
     this.container.inject = this.container.injection;
     initialize(null, this.container);
   }
 });

 test('fm-select renders properly', function(assert) {
   this.render(hbs `{{fm-select}}`);
   assert.ok(this.$('select').length, 'Renders a select');
   assert.ok(this.$('.form-control').length === 1, 'Has the class of form-control');
 });

 test('fm-select renders an array of content options', function(assert) {
   this.set('content', Ember.A([
     {label: 'one', value: 1},
     {label: 'two', value: 2}
   ]));
   this.render(hbs `{{fm-select content=content}}`);
   assert.ok(this.$('option').length === 2, 'It renders two options');
   assert.equal(this.$('option:first').text().trim(), 'one');
   assert.equal(this.$('option:last').text().trim(), 'two');
   assert.equal(this.$('option:first').attr('value'), 1);
   assert.equal(this.$('option:last').attr('value'), 2);
 });

 test('fm-select respects different optionValuePaths and optionLabelPaths', function(assert) {
   this.set('content', Ember.A([
     {text: 'hi', itemValue: 'hello'},
     {text: 'bye', itemValue: 'goodbye'}
   ]));
   this.set('optionLabelPath', 'text');
   this.set('optionValuePath', 'itemValue');
   this.render(hbs `{{fm-select content=content optionLabelPath=optionLabelPath optionValuePath=optionValuePath}}`);
   assert.equal(this.$('option:first').text().trim(), 'hi');
   assert.equal(this.$('option:last').text().trim(), 'bye');
   assert.equal(this.$('option:first').attr('value'), 'hello');
   assert.equal(this.$('option:last').attr('value'), 'goodbye');
 });

 test('fm-select calls `action` with newly chosen value', function(assert) {
   this.set('content', Ember.A([
     {label: 'one', value: 1},
     {label: 'two', value: 2}
   ]));
   this.render(hbs `{{fm-select content=content value=value action=(action (mut value))}}`);
   this.$('select').change();
   assert.equal(this.$('option:selected').val(), this.get('value'));
 });

test('fm-select updates the value of the fm-field by default', function(assert) {
  this.set('value', null);
  this.set('content', Ember.A([
    {label: 'one', value: 1},
    {label: 'two', value: 2}
  ]));
  this.render(hbs `{{fm-field type='select' optionValuePath='value'
              optionValuePath='label' content=content value=value}}`);
  this.$('select').change();
  assert.equal(this.$('option:selected').val(), this.get('value'));
});

 test('fm-select changes the selected option when the passed in value changes', function(assert) {
   this.set('modelValue', 2);
   this.set('content', Ember.A([
     {label: 'one', value: 1},
     {label: 'two', value: 2}
   ]));
   this.render(hbs `{{fm-select value=modelValue content=content}}`);
   assert.equal(this.$('option:selected').val(), '2', 'The initial value is set correctly');
   Ember.run(()=> {
     this.set('modelValue', 1);
     assert.equal(this.$('option:selected').val(), '1', 'The selected option updated properly');
   });
 });

 test('it allows a prompt to be passed in', function(assert) {
   this.render(hbs `{{fm-select prompt="Testing"}}`);
   assert.ok(this.$('option:disabled').length === 1, 'A prompt option was not rendered as expected');
 });
