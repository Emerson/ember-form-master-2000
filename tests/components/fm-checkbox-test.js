import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';
import {test, moduleForComponent} from 'ember-qunit';

moduleForComponent('fm-checkbox', {}, {
  needs: ['component:fm-errortext',
          'template:components/ember-form-master-2000/fm-errortext',
          'template:components/ember-form-master-2000/fm-checkbox'],
  setup: function(container) {
    container.inject = container.injection;
    initialize(null, container);
  }
});

test('fm-checkbox renders properly', function() {
  var component = this.subject();
  this.$();
  ok(component.$().hasClass('form-group'), 'fm-checkbox the form-group class');
  equal(component.$('.checkbox').length, 1, 'fm-checkbox has a .checkbox wrapper');
});

test('fm-checkbox renders a label', function() {
  var component = this.subject();
  component.set('label', 'This is the label');
  this.$();
  equal(component.$().text().trim(), 'This is the label', 'the fm-checkbox label matches');
});