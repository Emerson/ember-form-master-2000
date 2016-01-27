import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
// import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-widgets/checkbox', 'Integration | Component | fm-widgets checkbox', {
  integration: true,
  setup: function() {
    this.container.inject = this.container.injection;
    // initialize(null, this.container);
  }
});

test('change event is treated as userInteraction', function(assert) {
  assert.expect(1);
  this.set('assertCalled', () => assert.ok(true));
  this.render(hbs `{{fm-widgets/checkbox onUserInteraction=assertCalled}}`);
  this.$('input').change();
});
