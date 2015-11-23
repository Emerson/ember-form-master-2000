import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-radio';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['radioClass'],
  fmConfig: Ember.inject.service('fm-config'),
  radioClass: Ember.computed.reads('fmConfig.radioClass'),
  checked: false,
  updateChecked: Ember.observer('parentView.value', function() {
    this.set('checked', this.get('parentView.value') === this.get('value'));
  }),
  change: function() {
    this.set('parentView.value', this.get('value'));
  },
  optionLabelPath: Ember.computed.readOnly('parentView.optionLabelPath'),
  optionValuePath: Ember.computed.readOnly('parentView.optionValuePath')
});
