import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fm-widgets/input', 'Integration | Component | fm-widgets input', {
  integration: true
});

test('action onUserAction is send on focus out event', function(assert) {
  assert.expect(1);
  this.set('externalAction', () => {
    assert.ok(true);
  });
  this.render(hbs`{{fm-widgets/input onUserInteraction=(action externalAction)}}`);
  this.$('input').trigger('focusout');
});
