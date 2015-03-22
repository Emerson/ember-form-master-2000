import {
  test,
  moduleForComponent
} from 'ember-qunit';
import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-select', {
  setup: function() {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('fm-select renders properly', function(assert) {
  var component = this.subject();
  this.$();
  assert.ok(component.$().is('select'), 'Renders a select');
  assert.ok(component.$().hasClass('form-control'), 'Has the class of form-control');
});