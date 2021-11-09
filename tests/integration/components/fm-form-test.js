import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import fmConfig from 'ember-form-master-2000/services/fm-config';

module('Integration | Component | fm-form', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:fm-config', fmConfig);
  });

  test('renders properly', async function(assert) {
    await render(hbs `{{#fm-form}}inside{{/fm-form}}`);
    assert.ok(findAll('form').length > 0, 'The form element did not render');
    assert.dom('form').hasText('inside', 'The block did not yield the form content');
  });

  test('it uses allows classNames to be passed in', async function(assert) {
    this.set('classNames', ['ember-view', 'form-horizontal']);
    await render(hbs `{{#fm-form classNames=this.classNames}}{{/fm-form}}`);
    assert.dom('form').hasClass('form-horizontal', 'Has the form-horizontal class');
  });

  test('form shows errors on submit', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('showErrorsByDefault', false);
    this.set('errors', ['error message']);
    await render(hbs `
      {{#fm-form}}
        {{fm-field errors=this.errors}}
      {{/fm-form}}
    `);
    assert.dom('.form-group').hasNoClass('has-error');
    await triggerEvent('form', 'submit');
    assert.dom('.form-group').hasClass('has-error');
  });
});
