import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-field', {
  needs: ['component:fm-input',
          'component:fm-select',
          'component:fm-textarea',
          'template:components/ember-form-master-2000/fm-field'],
  setup: function(container) {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('renders properly', function(assert) {
  var component = this.subject();
  this.render();
  assert.ok(component.$().hasClass('form-group'), 'Has a wrapper element with the form-group class');
  assert.equal(component.$('input.form-control').length, 1, 'Has a wrapper element with the form-group class');
});

test('it uses allows classNames to be passed in', function(assert) {
  var component = this.subject();
  // This emulates the user passing in a className {{#em-form classNames='form-vertical'}}
  component.set('classNames', Ember.A(['ember-view', 'form-vertical']));
  this.render();
  assert.ok(component.$().hasClass('form-vertical'), 'Has the form-vertical class');
  assert.ok(!component.$().hasClass('form-horizontal'), 'Does not have the default form-horizontal class');
});

test('it renders a label if a label is passed in', function(assert) {
  var component = this.subject();
  component.set('label', 'Form-Master-2000');
  this.render();
  assert.equal(component.$('label').length, 1, 'Renders a label when passed in');
  assert.equal(component.$('label').text(), 'Form-Master-2000', 'Renders correct label text when passed in');
});

test('it does not render a label unless it\'s passed in', function(assert) {
  var component = this.subject();
  assert.ok(!component.get('label'));
  this.render();
  assert.equal(component.$('label').length, 0, 'Does not renders a label unless it\'s passed in');
});

test('isSelect returns true when the field has type="select"', function(assert) {
  var component = this.subject();
  component.set('type', 'select');
  this.render();
  assert.ok(component.get('isSelect'));
});

test('it has a default optionLabelPath and optionValuePath', function(assert) {
  var component = this.subject();
  this.render();
  assert.equal(component.get('optionValuePath'), 'content.value', 'The default value path is content.value');
  assert.equal(component.get('optionLabelPath'), 'content.label', 'The default label path is content.label');
});

test('it passes select options correctly', function(assert) {
  var component = this.subject();
  var mockOptions = Ember.A([
    {randomValueAttribute: 1, randomLabelAttribute: 'one'},
    {randomValueAttribute: 2, randomLabelAttribute: 'two'},
    {randomValueAttribute: 3, randomLabelAttribute: 'three'}
  ]);
  component.set('type', 'select');
  component.set('content', mockOptions);
  component.set('optionValuePath', 'content.randomValueAttribute');
  component.set('optionLabelPath', 'content.randomLabelAttribute');
  this.render();
  assert.equal(component.$('option').length, 3, 'It rendered three options');
  assert.equal($(component.$('option')[0]).val(), '1', 'The first value is correct');
  assert.equal($(component.$('option')[1]).val(), '2', 'The second value is correct');
  assert.equal($(component.$('option')[2]).val(), '3', 'The third value is correct');
  assert.equal($(component.$('option')[0]).text(), 'one', 'The first label is correct');
  assert.equal($(component.$('option')[1]).text(), 'two', 'The second label is correct');
  assert.equal($(component.$('option')[2]).text(), 'three', 'The third label is correct');
});

test('it passes select prompt options', function(assert) {
  var component = this.subject();
  var mockOptions = Ember.A([{value: 1, label: 'one'}]);
  component.set('type', 'select');
  component.set('content', mockOptions);
  component.set('prompt', 'Select something...');
  this.render();
  assert.equal(component.$('option').length, 2, 'It rendered the prompt options');
  assert.equal($(component.$('option')[0]).text(), 'Select something...', 'It rendered the correct prompt text');
});

test('it allows the user to manually select an option', function(assert) {
  var component = this.subject();
  var mockOptions = Ember.A([{value: 1, label: 'one'}]);
  component.set('type', 'select');
  component.set('content', mockOptions);
  component.set('prompt', 'Select something...');
  this.render();
  assert.equal(component.$('option:selected').text(), 'Select something...', 'The select option is set properly by default');
  Ember.run(function() {
    component.set('value', 1);
  });
  assert.equal(component.$('option:selected').text(), 'one', 'Updating the value of model propigated the change to the select');
});

test('it renders a textarea', function(assert) {
  var component = this.subject();
  component.set('type', 'textarea');
  this.render();
  assert.equal(component.$('textarea').length, 1, 'fm-field renders a textarea');
});

test('allows data attributes to be attached to textinputs', function(assert) {
  var component = this.subject();
  component.get('dataAttributes').push('data-test');
  component.set('data-test', 'master-2000');
  this.render();
  assert.equal(component.$('input').data('test'), 'master-2000', 'The fm-field data attribute was not set properly on the textinput');
  Ember.run(function() {
    component.set('data-test', 'master-3000');
  });
  // TODO: Add dynamic observers so that data-attributes update correctly
  // equal(component.$('input').data('test'), 'master-3000', 'The fm-field data attribute was not updated properly');
});

test('allows data attributes to be attached to textfields', function(assert) {
  var component = this.subject();
  component.set('type', 'textarea');
  component.get('dataAttributes').push('data-test');
  component.set('data-test', 'master-2000');
  this.render();
  assert.equal(component.$('textarea').data('test'), 'master-2000', 'The fm-field data attribute was not set properly on the textfield');
});

test('allows HTML bound attributes for labels', function(assert) {
  var component = this.subject();
  component.set('label', "<span class='html-label'>Test</span>");
  this.render();
  assert.equal(1, component.$('span.html-label').length, 'The fm-field did not properly render HTML within a label');
});

test('uses the label to generate a default for and id attribute for textfields', function(assert) {
  var component = this.subject();
  component.set('label', "Example's Here!");
  this.render();
  assert.equal(component.$('label').attr('for'), 'Examples-Here');
  assert.equal(component.$('input').attr('id'), 'Examples-Here');
});

test('uses the label to generate a default for and id attribute for select elements', function(assert) {
  var component = this.subject();
  component.set('type', 'select');
  component.set('label', "<b>Select's are awesome!</b>");
  this.render();
  assert.equal(component.$('label').attr('for'), 'Selects-are-awesome');
  assert.equal(component.$('select').attr('id'), 'Selects-are-awesome');
});

test('uses the label to generate a default for and id attribute for textarea elements', function(assert) {
  var component = this.subject();
  component.set('type', 'textarea');
  component.set('label', "<b>Téxtarea's :-)</b>");
  this.render();
  assert.equal(component.$('label').attr('for'), 'Téxtareas--');
  assert.equal(component.$('textarea').attr('id'), 'Téxtareas--');
});

test('allows users to override the for/id attributes by passing a specific id', function(assert) {
  var component = this.subject();
  component.set('id', 'example-id');
  component.set('label', 'My Label!');
  this.render();
  assert.equal(component.$('label').attr('for'), 'example-id');
  assert.equal(component.$('input').attr('id'), 'example-id');
});
