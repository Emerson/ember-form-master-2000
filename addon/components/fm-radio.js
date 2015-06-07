import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/ember-form-master-2000/fm-radio',
  classNameBindings: 'radioClass',
  radioClass: Ember.computed(function() {
    return this.fmconfig.radioClass;
  }),
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