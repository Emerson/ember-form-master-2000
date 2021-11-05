import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, blur, find, findAll, triggerEvent } from '@ember/test-helpers';
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
    assert.ok(findAll('.form-group').length > 0, 'The field element did not render');
    assert.ok(findAll('input').length > 0, 'A form element was not rendered');
  });

  test('allows users to pass in custom per field formControlClass', async function(assert) {
    await render(hbs `{{fm-field formControlClass='custom-control-class'}}`);
    assert.ok(findAll('.form-control').length === 0);
    assert.ok(findAll('.custom-control-class').length === 1);
  });

  test('widget="select" renders a select', async function(assert) {
    await render(hbs `{{fm-field widget="select"}}`);
    assert.ok(findAll('select').length === 1, 'A select was not rendered when it should have been');
  });

  test('action is passed down to select component', async function(assert) {
    assert.expect(1);
    this.set('assertCalled', () => assert.ok(true));
    this.set('content', A(['something',]));
    await render(hbs`{{fm-field widget='select' content=this.content action=(action this.assertCalled)}}`);
    await triggerEvent('select', 'change');
  });

  test('selection option label is updated when property changes', async function(assert) {
    this.set('content', [{label: 'foo', value: 'foo'}]);
    await render(hbs `{{fm-field widget='select' content=this.content optionLabelPath='label'}}`);
    assert.dom('option').hasText('foo');
    this.set('content.0.label', 'bar');
    assert.dom('option').hasText('bar');
  });

  test('errors are shown after user interaction but not before', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('showErrorsByDefault', false);

    this.set('errors', A(['error message']));
    await render(hbs `{{fm-field errors=this.errors}}`);
    assert.ok(
      findAll('.help-block').length === 0,
      'error message is not shown before user interaction'
    );
    assert.dom('.form-group').hasNoClass('has-error', 'errorClass is not there before user interaction');

    // For some reason we need both the blur helper AND the jQuery trigger...
    await triggerEvent('input', 'focusout');
    await blur(findAll('input')[0]);

    assert.ok(
      find('.help-block').textContent.trim(), 'error message',
      'error message is shown after user interaction'
    );
    assert.dom('.form-group').hasClass('has-error', 'errorClass is added after user interaction');
    this.set('errors', []);
    assert.dom('.form-group').hasNoClass('has-error', 'errorClass is removed when errors empty got empty');
  });

  test('has-error class should only be applied when errors are present', async function(assert) {
    this.set('errors', A([]));
    await render(hbs `{{fm-field widget='textarea' errors=this.errors}}`);
    assert.ok(
      findAll('.has-error').length === 0,
      'error class is not applied unless errors are present'
    );
  });

  test('errors are shown after user interaction but not before (textarea)', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('showErrorsByDefault', false);
    this.set('errors', A(['error message']));
    await render(hbs `{{fm-field widget='textarea' errors=this.errors}}`);
    assert.ok(
      findAll('.help-block').length === 0,
      'error message is not shown before user interaction'
    );
    assert.dom('.form-group').hasNoClass('has-error', 'errorClass is not there before user interaction');

    // For some reason we need both the blur helper AND the jQuery trigger...
    await triggerEvent('textarea', 'focusout');
    await blur(findAll('textarea')[0]);

    assert.ok(
      find('.help-block').textContent.trim(), 'error message',
      'error message is shown after user interaction'
    );
    assert.dom('.form-group').hasClass('has-error', 'errorClass is added after user interaction');
    this.set('errors', []);
    assert.dom('.form-group').hasNoClass('has-error', 'errorClass is removed when errors empty got empty');
  });

  test('errors are shown after user interaction but not before (select)', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('showErrorsByDefault', false);
    this.set('errors', A(['error message']));
    await render(hbs `{{fm-field widget='select' errors=this.errors}}`);
    assert.ok(
      findAll('.help-block').length === 0,
      'error message is not shown before user interaction'
    );
    assert.dom('.form-group').hasNoClass('has-error', 'errorClass is not there before user interaction');

    // For some reason we need both the blur helper AND the jQuery trigger...
    await triggerEvent('select', 'focusout');
    await blur(findAll('select')[0]);

    assert.ok(
      find('.help-block').textContent.trim(), 'error message',
      'error message is shown after user interaction'
    );
    assert.dom('.form-group').hasClass('has-error', 'errorClass is added after user interaction');
    this.set('errors', []);
    assert.dom('.form-group').hasNoClass('has-error', 'errorClass is removed when errors empty got empty');
  });

  test('errors are shown after user interaction but not before (checkbox)', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('showErrorsByDefault', false);
    this.set('errors', A(['error message']));
    await render(hbs `{{fm-field widget='checkbox' errors=this.errors}}`);
    assert.ok(
      findAll('.help-block').length === 0,
      'error message is not shown before user interaction'
    );
    assert.dom('.form-group').hasNoClass('has-error', 'there is no errorClass before user interaction');

    // For some reason we need both the blur helper AND the jQuery trigger...
    await triggerEvent('input', 'focusout');
    await blur(findAll('input')[0]);

    assert.dom('.help-block').hasText('error message', 'error message is shown after user interaction');
    assert.dom('.form-group').hasClass('has-error', 'errorClass is added after user interaction');
    this.set('errors', []);
    assert.dom('.form-group').hasNoClass('has-error', 'errorClass is removed when errors array got empty');
  });

  test('errors are shown after user interaction but not before (radio-group)', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('showErrorsByDefault', false);
    this.set('errors', A(['error message']));
    this.set('content', [{value: 'foo', label: 'foo'}]);
    await render(hbs `{{fm-field widget='radio-group' errors=this.errors content=this.content}}`);
    assert.ok(
      findAll('.help-block').length === 0,
      'error message is not shown before user interaction'
    );
    assert.dom('.form-group').hasNoClass('has-error', 'errorClass is not present before user interaction');

    // For some reason we need both the blur helper AND the jQuery trigger...
    await triggerEvent('input', 'focusout');
    await blur(findAll('input')[0]);

    assert.dom('.help-block').hasText('error message', 'error message is shown after user interaction');
    assert.dom('.form-group').hasClass('has-error', 'errorClass is present after user interaction');
  });
});
