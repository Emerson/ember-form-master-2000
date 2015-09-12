import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-errortext', 'Integration | Component | fm-errortext', {
  integration: true,
  setup: function() {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('renders properly', function(assert) {
  this.render(hbs `{{fm-errortext errors="An error"}}`);

  assert.ok(this.$('.ember-view').hasClass('help-block'), 'Has the help-block class');
});

test('renders the first error', function(assert) {
  assert.expect(1);
  this.set('errors', Ember.A(['This is an error', 'This is a second error']));
  this.render(hbs `{{fm-errortext errors=errors}}`);
  assert.equal(this.$('.help-block').text(), 'This is an error', 'It renders the first error');
});

//-- https://github.com/Emerson/ember-form-master-2000/issues/8 -----------
test('renders errors that are simple strings', function(assert) {
  assert.expect(1);
  this.render(hbs `{{fm-errortext errors='A simple string'}}`);
  assert.equal(this.$('.help-block').text(), 'A simple string', 'It did not render the simple string error');
});

test('renders objects that have a message property', function(assert) {
  assert.expect(1);
  this.set('errors', Ember.Object.create({message: 'Error object'}));
  this.render(hbs `{{fm-errortext errors=errors}}`);
  assert.equal(this.$('.help-block').text(), 'Error object', 'It did not render the error object properly');
});