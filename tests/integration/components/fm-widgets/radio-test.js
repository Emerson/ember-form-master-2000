import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fm-radio', 'Integration | Component | fm-radio', {
  integration: true,
});

test('action onUserAction is sent on focus out event', function(assert) {
  assert.expect(1);
  this.set('externalAction', () => assert.ok(true));
  this.render(hbs`{{fm-widgets/radio onUserInteraction=(action externalAction)}}`);
  this.$('input').trigger('focusout');
});

test('action onUserAction is sent on change event', function(assert) {
  assert.expect(1);
  this.set('externalAction', () => assert.ok(true));
  this.render(hbs`{{fm-widgets/radio onUserInteraction=(action externalAction)}}`);
  this.$('input').change();
});

