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

test('fm-select observes changes of label and value in content array', function(assert) {
  this.set('content', Ember.A([{value: 'foo', label: 'foo'}]));
  this.render(hbs `{{fm-select content=content}}`);
  assert.equal(this.$('option').text().trim(), 'foo', 'The initial label is correct');
  assert.equal(this.$('option').attr('value'), 'foo', 'The initial value is correct');
  this.set('content.0.label', 'bar');
  assert.equal(this.$('option').text().trim(), 'bar', 'Label is updated after change of content array');
  this.set('content.0.value', 'bar');
  assert.equal(this.$('option').attr('value'), 'bar', 'Value is updated after change of content array');
});

test('fm-select updates options if an element is added to content array', function(assert) {
  assert.expect(3);
  this.set('content', Ember.A());
  this.render(hbs `{{fm-select content=content}}`);

  Ember.run.begin();
  Ember.run.schedule('sync', () => {
    this.get('content').pushObject({value: 'qux', label: 'qux'});
  });
  Ember.run.schedule('afterRender', () => {
    assert.equal(this.$('option').length, 1, 'Option is added after content array changes');
    assert.equal(this.$('option').text().trim(), 'qux', 'Label of new content array element is added');
    assert.equal(this.$('option').attr('value'), 'qux', 'Value of new content array element is added');
  });
  Ember.run.end();
});

test('fm-select updates options if an element is removed from content array', function(assert) {
  this.set('content', Ember.A([{label: 'foo', value: 'foo'}, {label: 'bar', value: 'bar'}]));
  this.render(hbs `{{fm-select content=content}}`);

  Ember.run.begin();
  Ember.run.schedule('sync', () => {
    this.get('content').removeAt(0);
  });
  Ember.run.schedule('afterRender', () => {
    assert.equal(this.$('option').length, 1, 'Option is removed after element of content array is removed');
    assert.equal(this.$('option').text().trim(), 'bar', 'Correct element is removed');
  });
  Ember.run.end();
});

test('sends action onUserAction on focus out event', function(assert) {
  assert.expect(1);
  this.set('externalAction', () => {
    assert.ok(true);
  });
  this.render(hbs`{{fm-select onUserInteraction=(action externalAction)}}`);
  this.$('select').trigger('focusout');
});

test('sends action onUserAction on change event', function(assert) {
  assert.expect(1);
  this.set('externalAction', () => {
    assert.ok(true);
  });
  this.set('content', Ember.A([
    {label: 'one', value: 1},
    {label: 'two', value: 2}
  ]));
  this.render(hbs`{{fm-select onUserInteraction=(action externalAction) content=content action=(action (mut value))}}`);
  this.$('select').change();
});
