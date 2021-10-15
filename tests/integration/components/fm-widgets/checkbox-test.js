import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | fm-widgets:checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('change event is treated as userInteraction', async function(assert) {
    assert.expect(1);
    this.set('assertCalled', () => assert.ok(true));
    await render(hbs `{{fm-widgets/checkbox onUserInteraction=assertCalled}}`);
    await triggerEvent('input', 'change');
  });
});
