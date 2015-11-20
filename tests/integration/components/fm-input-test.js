import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fm-input', 'Integration | Component | fm-input', {
  integration: true
});

test('action onUserAction is send on focus out event', function(assert) {
  assert.expect(1);
  this.set('externalAction', () => {
    assert.ok(true);
  });
  this.render(hbs`{{fm-input onUserInteraction=(action externalAction)}}`);
  this.$('input').trigger('focusout');
});
