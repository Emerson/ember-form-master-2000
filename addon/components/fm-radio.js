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
  labelText: Ember.computed('parentView.optionLabelPath', 'content', function() {
    if(this.get('parentView.optionLabelPath')) {
      return this.get(this.get('parentView.optionLabelPath'));
    }else{
      return null;
    }
  }),
  value: Ember.computed('parentView.optionValuePath', 'content', function() {
    if(this.get('parentView.optionValuePath')) {
      return this.get(this.get('parentView.optionValuePath'));
    }else{
      return null;
    }
  }),
  change: function() {
    this.set('parentView.value', this.get('value'));
  }
});
