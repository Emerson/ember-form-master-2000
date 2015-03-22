import {
  test,
  moduleForComponent
} from 'ember-qunit';
import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-checkbox', {
  needs: ['component:fm-errortext',
          'template:components/ember-form-master-2000/fm-errortext',
          'template:components/ember-form-master-2000/fm-checkbox'],
  setup: function() {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('fm-checkbox renders properly', function(assert) {
  var component = this.subject();
  this.render();
  assert.ok(component.$().hasClass('form-group'), 'fm-checkbox the form-group class');
  assert.equal(component.$('.checkbox').length, 1, 'fm-checkbox has a .checkbox wrapper');
});

test('fm-checkbox renders a label', function(assert) {
  var component = this.subject();
  component.set('label', 'This is the label');
  this.render();
  assert.equal(component.$().text().trim(), 'This is the label', 'the fm-checkbox label matches');
});