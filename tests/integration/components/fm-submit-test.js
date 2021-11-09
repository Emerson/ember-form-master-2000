import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | fm-submit', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    await render(hbs `{{fm-submit value="submit"}}`);
    assert.dom('button').hasValue('submit');
    assert.ok(findAll('.form-group').length, 'Has the class of form-control')
  });

  test('fm-submit allows custom class on the input element', async function(assert) {
    let config = this.owner.lookup('service:fm-config');
    config.set('submitButtonClass', 'button');

    await render(hbs `{{fm-submit value="submit"}}`);
    assert.dom('button').hasClass('button', 'It has the .button class');
  });

  test('fm-submit can be disabled', async function(assert) {
    await render(hbs `{{fm-submit disabled=true}}`);
    assert.ok(findAll('button:disabled').length, 'It rendered a disabled submit');

    await render(hbs `{{fm-submit disabled=false}}`);
    assert.ok(!findAll('button:disabled').length, 'It rendered a submit that is not disabled');
  });
});
