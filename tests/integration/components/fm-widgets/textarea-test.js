import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

module('Integration | Component | fm-widget:textarea', function(hooks) {
  setupRenderingTest(hooks);

  test('action onUserAction is send on focus out event', async function(assert) {
    assert.expect(1);
    this.set('externalAction', () => {
      assert.ok(true);
    });
    await render(hbs`{{fm-widgets/textarea onUserInteraction=(action this.externalAction)}}`);
    $('textarea').trigger('focusout')
  });
});
