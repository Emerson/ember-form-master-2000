import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | fm-widgets:input', function(hooks) {
  setupRenderingTest(hooks);

  test('action onUserAction is send on focus out event', async function(assert) {
    assert.expect(1);
    this.set('externalAction', () => {
      assert.ok(true);
    });
     await render(hbs`{{fm-widgets/input onUserInteraction=(action externalAction)}}`);
    this.$('input').trigger('focusout');
  });

  test('action onKeyUp is sent on key key', async function(assert) {
    assert.expect(1);
    this.set('externalAction', ()=> {
      assert.ok(true);
    });
    await render(hbs`{{fm-widgets/input onKeyUp=(action externalAction)}}`);
    this.$('input').trigger('keyup');
  });
});
