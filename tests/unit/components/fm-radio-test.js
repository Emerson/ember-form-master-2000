import {
  test,
  moduleForComponent
} from 'ember-qunit';
import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-radio', {
  needs: [
    'component:fm-radio-group',
    'template:components/ember-form-master-2000/fm-radio-group',
    'template:components/ember-form-master-2000/fm-radio'
  ],
  setup: function() {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('renders properly', function(assert) {
  var radioGroup = new this.factory('component:fm-radio-group').create();
  var component = this.subject();
  this.render();
  Ember.run(function() {
    component.set('parentView', radioGroup);
  });

  assert.equal(component.$('input').length, 1, 'fm-radio rendered properly');
});

test('it updates the parentView value on change', function(assert) {
  var radioGroup = new this.factory('component:fm-radio-group').create();
  var component = this.subject();
  this.render();
  Ember.run(function() {
    component.set('parentView', radioGroup);
    component.set('value', 'test value');
    component.$().change();
    assert.equal(radioGroup.get('value'), 'test value', 'fm-radio sets the parentView.value properly');
  });
});
