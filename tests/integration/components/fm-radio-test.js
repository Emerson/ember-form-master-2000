import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-radio', 'Integration | Component | fm-radio', {
  integration: true,
  setup: function() {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('renders properly', function(assert) {
  this.set('parentView', Ember.View.create({
    name: 'example',
    optionLabelPath: 'content.label'
  }));
  this.set('content', Ember.Object.create({
    label: 'label text', value: false}
  ));
  this.render(hbs `{{fm-radio parentView=parentView content=content}}`);
  assert.ok(this.$('input').length > 0, 'The radio was not rendered properly');
  assert.equal(this.$('label').text().trim(), 'label text', 'Label text is set properly');
});

test('it updates the parentView value on change', function(assert) {
  this.set('parentView', Ember.View.create({
    value: null
  }));
  this.set('value', 'something');
  this.render(hbs `{{fm-radio parentView=parentView value=value}}`);
  Ember.run(()=> {
    this.set('value', 'something else');
    this.$('input').change();
    assert.equal(this.get('parentView.value'), 'something else', 'The parentView value was updated');
  });
});
