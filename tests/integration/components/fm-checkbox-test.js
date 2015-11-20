import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
// import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-checkbox', 'Integration | Component | fm-checkbox', {
  integration: true,
  setup: function() {
    this.container.inject = this.container.injection;
    // initialize(null, this.container);
  }
});

// test('fm-checkbox renders properly', function(assert) {
//   assert.expect(2);
//   this.render(hbs `{{fm-checkbox}}`);
//
//   assert.ok(this.$('.ember-view').hasClass('form-group'), 'fm-checkbox the form-group class');
//   assert.equal(this.$('.checkbox').length, 1, 'fm-checkbox has a .checkbox wrapper');
// });
//
// test('fm-checkbox renders a label', function(assert) {
//   assert.expect(1);
//   this.render(hbs `{{fm-checkbox label="This is the label"}}`);
//
//   assert.equal(this.$('label').text().trim(), 'This is the label', 'the fm-checkbox label matches');
// });

test('errors are shown after user interaction but not before', function(assert) {
  this.set('errors', ['error message']);
  this.render(hbs `{{fm-checkbox errors=errors}}`);
  assert.ok(
    this.$('.help-block').length === 0,
    'error message is not shown before user interaction'
  );
  assert.notOk(
    this.$('div').hasClass('has-error'),
    'there is no errorClass before user interaction'
  );
  this.$('input').trigger('focusout');
  assert.equal(
    this.$('.help-block').text().trim(), 'error message',
    'error message is shown after user interaction'
  );
  assert.ok(
    this.$('div').hasClass('has-error'),
    'errorClass is added after user interaction'
  );
  this.set('errors', []);
  assert.notOk(
    this.$('div').hasClass('has-error'),
    'errorClass is removed when errors array got empty'
  );
});

test('change event is treated as userInteraction', function(assert) {
  this.set('errors', ['error message']);
  this.render(hbs `{{fm-checkbox errors=errors}}`);
  this.$('input').change();
  assert.ok(
    this.$('div').hasClass('has-error'),
    'errorClass is added after change event'
  );
});
