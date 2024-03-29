import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

module('Integration | Component | fm-widget:radio', function(hooks) {
  setupRenderingTest(hooks);

  test('action onUserAction is sent on focus out event', async function(assert) {
    assert.expect(1);
    this.set('externalAction', () => assert.ok(true));
    await render(hbs`{{fm-widgets/radio onUserInteraction=(action this.externalAction)}}`);
    $('input').trigger('focusout');
  });

  test('action onUserAction is sent on change event', async function(assert) {
    assert.expect(1);
    this.set('externalAction', () => assert.ok(true));
    await render(hbs`{{fm-widgets/radio onUserInteraction=(action this.externalAction)}}`);
    await triggerEvent('input', 'change');
  });
});
