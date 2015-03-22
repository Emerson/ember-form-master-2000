import {
  test,
  moduleForComponent
} from 'ember-qunit';
import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-submit', {
  needs: [
    'template:components/ember-form-master-2000/fm-submit'
  ],
  setup: function() {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('fm-submit renders properly', function(assert) {
  var component = this.subject();
  this.render();
  assert.equal(component.$('input:submit').length, 1, 'Renders submit element');
  assert.ok(component.$().hasClass('form-group'), 'Has the class of form-control');
});

test('fm-submit allows custom class names on the input element', function(assert) {
  this.container.lookup('fmconfig:main').submitButtonClasses = ['button', 'another-class'];
  var component = this.subject();
  this.render();
  assert.ok(component.$('input').hasClass('button'), 'It has the .button class');
  assert.ok(component.$('input').hasClass('button'), 'It has the .another-class class');
});

test('fm-submit can be disabled', function(assert) {
  var component = this.subject();
  component.set('disabled', true);
  this.render();
  assert.ok(component.$('input:disabled').length, 'It rendered a disabled submit');
  Ember.run(function() {
    component.set('disabled', false);
  });
  assert.ok(!component.$('input:disabled').length, 'It rendered a submit that is not disabled');
});