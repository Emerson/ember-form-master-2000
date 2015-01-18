import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/ember-form-master-2000/fm-radio',
  classNameBindings: 'radioClass',
  radioClass: function() {
    return this.fmconfig.radioClass;
  }.property(),
  checked: false,
  updateChecked: function() {
    this.set('checked', this.get('parentView.value') === this.get('value'));
  }.observes('parentView.value'),
  labelText: function() {
    if(this.get('parentView.optionLabelPath')) {
      return this.get(this.get('parentView.optionLabelPath'));
    }else{
      return null;
    }
  }.property('parentView.optionLabelPath', 'content'),
  value: function() {
    if(this.get('parentView.optionValuePath')) {
      return this.get(this.get('parentView.optionValuePath'));
    }else{
      return null;
    }
  }.property('parentView.optionValuePath', 'content'),
  change: function() {
    this.set('parentView.value', this.get('value'));
  }
});