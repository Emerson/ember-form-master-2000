import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';
import {test, moduleForComponent} from 'ember-qunit';

moduleForComponent('fm-radio', {}, {
  setup: function(container) {
    container.inject = container.injection;
    initialize(null, container);
  }
});

test('renders properly', function() {
  // TODO - fix this
  // var component = this.subject();
  // component.set('option', {label: 'label', value: 'value'});
  // this.$();
  // equal(component.$('input').length, 1, 'fm-radio rendered properly');
});