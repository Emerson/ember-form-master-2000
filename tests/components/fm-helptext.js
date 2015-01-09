import Ember from 'ember';
import {test, moduleForComponent} from 'ember-qunit';

moduleForComponent('fm-helptext');

test('renders properly', function() {
  var component = this.subject();
  this.$();
  ok(component.$().hasClass('help-block'), 'Has the help-block class');
});

test('renders helptext', function() {
  var component = this.subject();
  this.$();
  Ember.run(function() {
    component.set('errors', ['This is an error', 'This is a second error']);
  });
  equal(component.$().text(), 'This is an error', 'It renders the first error');
});