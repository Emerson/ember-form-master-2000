import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

module('Integration | Component | fm-widgets:input', function(hooks) {
  setupRenderingTest(hooks);

  test('action onUserAction is send on focus out event', async function(assert) {
    assert.expect(1);
    this.set('externalAction', () => {
      assert.ok(true);
    });
    await render(hbs`{{fm-widgets/input onUserInteraction=(action this.externalAction)}}`);
    $('input').trigger('focusout');
    //TODO: why dont focusout events work?
    // await triggerEvent('input', 'focusout');
  });

  test('action onKeyUp is sent on key key', async function(assert) {
    assert.expect(1);
    this.set('externalAction', ()=> {
      assert.ok(true);
    });
    await render(hbs`{{fm-widgets/input onKeyUp=(action this.externalAction)}}`);
    await triggerEvent('input', 'keyup');
  });
});
