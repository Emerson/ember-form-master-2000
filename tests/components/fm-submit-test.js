import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';
import {test, moduleForComponent} from 'ember-qunit';

moduleForComponent('fm-submit', {}, {
  setup: function(container) {
    container.inject = container.injection;
    initialize(null, container);
  }
});

test('renders properly', function() {
  var component = this.subject();
  this.$();
  equal(component.$('input:submit').length, 1, 'Renders submit element');
  ok(component.$().hasClass('form-group'), 'Has the class of form-control');
});