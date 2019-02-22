import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, blur } from '@ember/test-helpers';
import { A } from '@ember/array';
import hbs from 'htmlbars-inline-precompile';
import fmConfig from 'ember-form-master-2000/services/fm-config';

module('Integration | Component | fm-field', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:fm-config', fmConfig);
  });

  test('renders properly', async function(assert) {
    await render(hbs `{{fm-field}}`);
    assert.ok(this.$('.form-group').length > 0, 'The field element did not render');
    assert.ok(this.$('input').length > 0, 'A form element was not rendered');
  });

  test('widget="select" renders a select', async function(assert) {
    await render(hbs `{{fm-field widget="select"}}`);
    assert.ok(this.$('select').length === 1, 'A select was not rendered when it should have been');
  });

  test('action is passed down to select component', async function(assert) {
    assert.expect(1);
    this.set('assertCalled', () => assert.ok(true));
    this.set('content', A(['something',]));
    await render(hbs`{{fm-field widget='select' content=content action=(action assertCalled)}}`);
    this.$('select').change();
  });

  test('selection option label is updated when property changes', async function(assert) {
    this.set('content', [{label: 'foo', value: 'foo'}]);
    await render(hbs `{{fm-field widget='select' content=content optionLabelPath='label'}}`);
    assert.equal(this.$('option').text().trim(), 'foo');
    this.set('content.0.label', 'bar');
    assert.equal(this.$('option').text().trim(), 'bar');
  });

  test('errors are shown after user interaction but not before', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('showErrorsByDefault', false);

    this.set('errors', A(['error message']));
    await render(hbs `{{fm-field errors=errors}}`);
    assert.ok(
      this.$('.help-block').length === 0,
      'error message is not shown before user interaction'
    );
    assert.notOk(
      this.$('div').hasClass('has-error'),
      'errorClass is not there before user interaction'
    );

    // For some reason we need both the blur helper AND the jQuery trigger...
    this.$('input').trigger('focusout');
    await blur(this.$('input')[0]);

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

  test('has-error class should only be applied when errors are present', async function(assert) {
    this.set('errors', A([]));
    await render(hbs `{{fm-field widget='textarea' errors=errors}}`);
    assert.ok(
      this.$('.has-error').length === 0,
      'error class is not applied unless errors are present'
    );
  });

  test('errors are shown after user interaction but not before (textarea)', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('showErrorsByDefault', false);
    this.set('errors', A(['error message']));
    await render(hbs `{{fm-field widget='textarea' errors=errors}}`);
    assert.ok(
      this.$('.help-block').length === 0,
      'error message is not shown before user interaction'
    );
    assert.notOk(
      this.$('div').hasClass('has-error'),
      'errorClass is not there before user interaction'
    );

    // For some reason we need both the blur helper AND the jQuery trigger...
    this.$('textarea').trigger('focusout');
    await blur(this.$('textarea')[0]);

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

  test('errors are shown after user interaction but not before (select)', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('showErrorsByDefault', false);
    this.set('errors', A(['error message']));
    await render(hbs `{{fm-field widget='select' errors=errors}}`);
    assert.ok(
      this.$('.help-block').length === 0,
      'error message is not shown before user interaction'
    );
    assert.notOk(
      this.$('div').hasClass('has-error'),
      'errorClass is not there before user interaction'
    );

    // For some reason we need both the blur helper AND the jQuery trigger...
    this.$('select').trigger('focusout');
    await blur(this.$('select')[0]);

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

  test('errors are shown after user interaction but not before (checkbox)', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('showErrorsByDefault', false);
    this.set('errors', A(['error message']));
    await render(hbs `{{fm-field widget='checkbox' errors=errors}}`);
    assert.ok(
      this.$('.help-block').length === 0,
      'error message is not shown before user interaction'
    );
    assert.notOk(
      this.$('div').hasClass('has-error'),
      'there is no errorClass before user interaction'
    );

    // For some reason we need both the blur helper AND the jQuery trigger...
    this.$('input').trigger('focusout');
    await blur(this.$('input')[0]);

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

  test('errors are shown after user interaction but not before (radio-group)', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('showErrorsByDefault', false);
    this.set('errors', A(['error message']));
    this.set('content', [{value: 'foo', label: 'foo'}]);
    await render(hbs `{{fm-field widget='radio-group' errors=errors content=content}}`);
    assert.ok(
      this.$('.help-block').length === 0,
      'error message is not shown before user interaction'
    );
    assert.notOk(
      this.$('div').hasClass('has-error'),
      'errorClass is not present before user interaction'
    );

    // For some reason we need both the blur helper AND the jQuery trigger...
    this.$('input').trigger('focusout');
    await blur(this.$('input')[0]);

    assert.equal(
      this.$('.help-block').text().trim(), 'error message',
      'error message is shown after user interaction'
    );
    assert.ok(
      this.$('div').hasClass('has-error'),
      'errorClass is present after user interaction'
    );
  });
});
