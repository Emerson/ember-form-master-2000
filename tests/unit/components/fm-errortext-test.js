import {
  test,
  moduleForComponent
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('fm-errortext', {
  needs:['template:components/ember-form-master-2000/fm-errortext']
});

test('renders properly', function(assert) {
  var component = this.subject();
  this.render();
  assert.ok(component.$().hasClass('help-block'), 'Has the help-block class');
});

test('renders the first error', function(assert) {
  var component = this.subject();
  this.render();
  Ember.run(function() {
    component.set('errors', ['This is an error', 'This is a second error']);
  });
  assert.equal(component.$().text(), 'This is an error', 'It renders the first error');
});

//-- https://github.com/Emerson/ember-form-master-2000/issues/8 -----------
test('renders errors that are simple strings', function(assert) {
  var component = this.subject();
  this.render();
  Ember.run(function() {
    component.set('errors', 'a simple string');
  });
  assert.equal(component.$().text(), 'a simple string', 'It did not render the simple string error');
});

test('renders objects that have a message property', function(assert) {
  var component = this.subject();
  this.render();
  Ember.run(function() {
    component.set('errors', Ember.Object.create({attribute: 'email', message: 'invalid email'}));
  });
  assert.equal(component.$().text(), 'invalid email', 'It did not render the error object');
});