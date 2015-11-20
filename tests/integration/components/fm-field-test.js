import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
// import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-field', 'Integration | Component | fm-field', {
  integration: true,
  setup: function() {
    this.container.inject = this.container.injection;
    // initialize(null, this.container);
  }
});

test('renders properly', function(assert) {
  this.render(hbs `{{fm-field}}`);
  assert.ok(this.$('.form-group').length > 0, 'The field element did not render');
  assert.ok(this.$('input').length > 0, 'A form element was not rendered');
});
//
// test('it allows classNames to be passed in', function(assert) {
//   this.render(hbs `{{fm-field classNames="example"}}`);
//   assert.ok(this.$('.example').length > 0, 'The class name was not set properly');
// });
//
// test('it renders a label if a label is passed in', function(assert) {
//   this.render(hbs `{{fm-field label="Howdy"}}`);
//   assert.ok(this.$('label').length === 1, 'A label tag was not rendered');
//   assert.ok(this.$('label').text() === 'Howdy', 'The label text was incorrect');
// });
//
// test('it does not render a label by default', function(assert) {
//   this.render(hbs `{{fm-field}}`);
//   assert.ok(this.$('label').length === 0, 'A label was rendered when it should not have been');
// });
//

test('type="select" renders a select', function(assert) {
  this.render(hbs `{{fm-field type="select"}}`);
  assert.ok(this.$('select').length === 1, 'A select was not rendered when it should have been');
});

test('action is passed down to select component', function(assert) {
  //assert.expect(1);
  this.set('assertCalled', () => assert.ok(true));
  this.set('content', Ember.A(['something',]));
  this.render(hbs `{{fm-field type="select" content=content action=(action assertCalled)}}`);
  this.$('select').change();
});

//
// test('type="textarea" renders a textarea', function(assert) {
//   this.render(hbs `{{fm-field type="textarea"}}`);
//   assert.ok(this.$('textarea').length === 1, 'A textarea was not rendered when it should have been');
// });
//
// test('it allows data attributes to be passed in', function(assert) {
//   this.render(hbs `{{fm-field another="hi" data-test="master-2000"}}`);
//   assert.ok(this.$("input[data-test='master-2000']").length === 1, 'The data attribute was not rendered as expected');
// });
//
// test('allows HTML bound attributes for labels', function(assert) {
//   this.set('htmlLabel', "<span class='html-label'>TEST</span>");
//   this.render(hbs `{{fm-field label=htmlLabel}}`);
//   assert.ok(this.$('span.html-label').length === 1, 'The fm-field did not properly render HTML within a label');
// });
//
// test('uses the label to generate a default for and id attribute for textfields', function(assert) {
//   this.render(hbs `{{fm-field label="Examples Here"}}`);
//   assert.equal(this.$('label').attr('for'), 'Examples-Here');
//   assert.equal(this.$('input').attr('id'), 'Examples-Here');
// });
//
// test('uses the label to generate a default for and id attribute for select elements', function(assert) {
//   this.set('label', "<b>Select's are awesome!</b>");
//   this.render(hbs `{{fm-field type="select" label=label}}`);
//   assert.equal(this.$('label').attr('for'), 'Selects-are-awesome');
//   assert.equal(this.$('select').attr('id'), 'Selects-are-awesome');
// });
//
// test('uses the label to generate a default for and id attribute for textarea elements', function(assert) {
//   this.render(hbs `{{fm-field type="textarea" label="<b>Téxtarea's :-)</b>"}}`);
//   assert.equal(this.$('label').attr('for'), 'Téxtareas--');
//   assert.equal(this.$('textarea').attr('id'), 'Téxtareas--');
// });
//
// test('allows users to override the for/id attributes by passing a specific id', function(assert) {
//   this.render(hbs `{{fm-field inputId="example-id" label="My Label!"}}`);
//   assert.equal(this.$('label').attr('for'), 'example-id');
//   assert.equal(this.$('input').attr('id'), 'example-id');
// });

test('selection option label is updated when property changes', function(assert) {
  this.set('content', [{label: 'foo', value: 'foo'}]);
  this.render(hbs `{{fm-field type='select' content=content optionLabelPath='label'}}`);
  assert.equal(this.$('option').text().trim(), 'foo');
  this.set('content.0.label', 'bar');
  assert.equal(this.$('option').text().trim(), 'bar');
});

test('errors are not shown after user interaction but not before', function(assert) {
  this.set('errors', ['error message']);
  this.render(hbs `{{fm-field errors=errors}}`);
  assert.ok(
    this.$('.help-block').length === 0,
    'error message is not shown before user interaction'
  );
  assert.notOk(
    this.$('div').hasClass('has-error'),
    'errorClass is not there before user interaction'
  );
  this.$('input').trigger('focusout');
  assert.ok(
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
    'errorClass is removed when errors empty got empty'
  );
});

test('errors are not shown after user interaction but not before (textarea)', function(assert) {
  this.set('errors', ['error message']);
  this.render(hbs `{{fm-field type='textarea' errors=errors}}`);
  assert.ok(
    this.$('.help-block').length === 0,
    'error message is not shown before user interaction'
  );
  assert.notOk(
    this.$('div').hasClass('has-error'),
    'errorClass is not there before user interaction'
  );
  this.$('textarea').trigger('focusout');
  assert.ok(
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
    'errorClass is removed when errors empty got empty'
  );
});

test('errors are not shown after user interaction but not before (select)', function(assert) {
  this.set('errors', ['error message']);
  this.render(hbs `{{fm-field type='select' errors=errors}}`);
  assert.ok(
    this.$('.help-block').length === 0,
    'error message is not shown before user interaction'
  );
  assert.notOk(
    this.$('div').hasClass('has-error'),
    'errorClass is not there before user interaction'
  );
  this.$('select').trigger('focusout');
  assert.ok(
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
    'errorClass is removed when errors empty got empty'
  );
});
