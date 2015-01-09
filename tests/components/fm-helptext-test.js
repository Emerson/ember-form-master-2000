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
    component.set('helptext', 'Fill in this field');
  });
  equal(component.$().text(), 'Fill in this field', 'It renders the passed in helptext');
});