import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-radio';

const {inject, computed} = Ember;
const {reads} = computed;

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['radioClass'],
  fmConfig: inject.service('fm-config'),
  radioClass: reads('fmConfig.radioClass'),

  checked: computed('parentView.value', function() {
    if (Ember.isEmpty(this.get('content')) || Ember.isEmpty(this.get('optionValuePath'))) {
      return false;
    }

    return this.get('parentView.value') === Ember.get(this.get('content'), this.get('optionValuePath'));
  }),

  change() {
    this.set('parentView.value', Ember.get(this.get('content'), this.get('optionValuePath')));
    this.sendAction('onUserInteraction');
  },

  focusOut() {
    this.sendAction('onUserInteraction');
  },

  optionLabelPath: 'label',
  optionValuePath: 'value'
});
