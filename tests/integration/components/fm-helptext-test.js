import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-helptext', 'Integration | Component | fm-helptext', {
  integration: true,
  setup: function() {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('renders properly', function(assert) {
  this.render(hbs `{{fm-helptext}}`);
  assert.ok(this.$('.ember-view').hasClass('help-block'), 'Has the help-block class');
});

test('renders helptext', function(assert) {
  this.set('text', '');
  this.render(hbs `{{fm-helptext helptext=text}}`);
  Ember.run(()=> {
    this.set('text', 'Fill in this field');
  });
  assert.equal(this.$('.ember-view').text(), 'Fill in this field', 'It renders the passed in helptext');
});