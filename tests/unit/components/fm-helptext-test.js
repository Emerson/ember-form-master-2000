import {
  test,
  moduleForComponent
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('fm-helptext', {
  needs: ['template:components/ember-form-master-2000/fm-helptext']
});

test('renders properly', function(assert) {
  var component = this.subject();
  this.render();
  assert.ok(component.$().hasClass('help-block'), 'Has the help-block class');
});

test('renders helptext', function(assert) {
  var component = this.subject();
  this.render();
  Ember.run(function() {
    component.set('helptext', 'Fill in this field');
  });
  assert.equal(component.$().text(), 'Fill in this field', 'It renders the passed in helptext');
});