import {
  test,
  moduleForComponent
} from 'ember-qunit';
import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-radio-group', {
  needs: ['component:fm-radio',
          'component:fm-errortext',
          'template:components/ember-form-master-2000/fm-radio',
          'template:components/ember-form-master-2000/fm-errortext',
          'template:components/ember-form-master-2000/fm-radio-group'],
  setup: function() {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('renders properly', function(assert) {
  var component = this.subject();
  this.render();
  assert.ok(component.$().hasClass('form-group'), 'fm-radio-group has the form-group class');
});

test('renders radio buttons for each content item provided', function(assert) {
  var component = this.subject();
  component.set('optionLabelPath', 'content.label');
  component.set('optionValuePath', 'content.value');
  component.set('content', Ember.A([{label: 'label', value: 'value'}, {label: 'two', value: 'two'}]));
  this.render();
  assert.equal(component.$('.radio').length, 2, 'fm-radio-group rendered two radio buttons');
});
