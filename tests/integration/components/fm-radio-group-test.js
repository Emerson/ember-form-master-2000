import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-radio-group', 'Integration | Component | fm-radio-group', {
  integration: true,
  setup: function() {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('renders properly', function(assert) {
  this.render(hbs `{{fm-radio-group}}`);
  assert.ok(this.$('.form-group').length = 1, 'fm-radio-group has the form-group class');
});

test('renders radio buttons for each content item provided', function(assert) {
  this.set('optionLabelPath', 'content.label');
  this.set('optionValuePath', 'content.value');
  this.set('content', Ember.A([{label: 'label', value: 'value'}, {label: 'two', value: 'two'}]));
  this.render(hbs `{{fm-radio-group content=content optionLabelPath=optionLabelPath optionValuePath=optionValuePath}}`);
  assert.equal(this.$('input').length, 2, 'It rendered two radio buttons');
  assert.equal(this.$('label').length, 2, 'It rendered two labels');
  assert.equal(this.$('label:first').text().trim(), 'label', 'Label text is set properly');
});