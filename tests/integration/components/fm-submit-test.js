import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-submit', 'Integration | Component | fm-submit', {
  integration: true,
  setup: function() {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs `{{fm-submit value="submit"}}`);

  assert.equal(this.$('button:submit').length, 1, 'Renders submit element');
  assert.ok(this.$('.ember-view').hasClass('form-group'), 'Has the class of form-control');
});

test('fm-submit allows custom class names on the input element', function(assert) {
  this.container.lookup('fmconfig:main').submitButtonClasses = ['button', 'another-class'];
  this.render(hbs `{{fm-submit value="submit"}}`);

  assert.ok(this.$('button').hasClass('button'), 'It has the .button class');
  assert.ok(this.$('button').hasClass('button'), 'It has the .another-class class');
});

test('fm-submit can be disabled', function(assert) {
  this.render(hbs `{{fm-submit disabled=true}}`);
  assert.ok(this.$('button:disabled').length, 'It rendered a disabled submit');

  this.render(hbs `{{fm-submit disabled=false}}`);
  assert.ok(!this.$('button:disabled').length, 'It rendered a submit that is not disabled');
});
