import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';
import {test, moduleForComponent} from 'ember-qunit';

moduleForComponent('fm-submit', {}, {
  needs: [
    'template:components/ember-form-master-2000/fm-submit'
  ],
  setup: function(container) {
    container.inject = container.injection;
    initialize(null, container);
  }
});

test('fm-submit renders properly', function() {
  var component = this.subject();
  this.$();
  equal(component.$('input:submit').length, 1, 'Renders submit element');
  ok(component.$().hasClass('form-group'), 'Has the class of form-control');
});

test('fm-submit allows custom class names on the input element', function() {
  this.container.lookup('fmconfig:main').submitButtonClasses = ['button', 'another-class'];
  var component = this.subject();
  this.$();
  ok(component.$('input').hasClass('button'), 'It has the .button class');
  ok(component.$('input').hasClass('button'), 'It has the .another-class class');
});

test('fm-submit can be disabled', function() {
  var component = this.subject();
  component.set('disabled', true);
  this.$();
  ok(component.$('input:disabled').length, 'It rendered a disabled submit');
  Ember.run(function() {
    component.set('disabled', false);
  });
  ok(!component.$('input:disabled').length, 'It rendered a submit that is not disabled');
});