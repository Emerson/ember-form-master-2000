import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | fm-submit', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs `{{fm-submit value="submit"}}`);

    assert.equal(this.$('button:submit').length, 1, 'Renders submit element');
    assert.ok(this.$('.ember-view').hasClass('form-group'), 'Has the class of form-control');
  });

  test('fm-submit allows custom class on the input element', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('submitButtonClass', 'button');

    await render(hbs `{{fm-submit value="submit"}}`);
    assert.ok(this.$('button').hasClass('button'), 'It has the .button class');
  });

  test('fm-submit can be disabled', async function(assert) {
    await render(hbs `{{fm-submit disabled=true}}`);
    assert.ok(this.$('button:disabled').length, 'It rendered a disabled submit');

    await render(hbs `{{fm-submit disabled=false}}`);
    assert.ok(!this.$('button:disabled').length, 'It rendered a submit that is not disabled');
  });
});
