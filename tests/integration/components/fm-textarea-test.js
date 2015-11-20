import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fm-textarea', 'Integration | Component | fm-textarea', {
  integration: true
});

test('action onUserAction is send on focus out event', function(assert) {
  assert.expect(1);
  this.set('externalAction', () => {
    assert.ok(true);
  });
  this.render(hbs`{{fm-textarea onUserInteraction=(action externalAction)}}`);
  this.$('textarea').trigger('focusout');
});
