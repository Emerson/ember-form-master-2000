import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: 'radioClass',
  radioClass: function() {
    return this.fmconfig.radioClass;
  }.property(),
  checked: false,
  updateChecked: function() {
    this.set('checked', this.get('parentView.value') === this.get('value'));
  }.observes('parentView.value'),
  labelText: function() {
    return this.get(this.get('parentView.optionLabelPath'));
  }.property('parentView.optionLabelPath', 'content'),
  value: function() {
    return this.get(this.get('parentView.optionValuePath'));
  }.property('parentView.optionValuePath', 'content'),
  change: function() {
    this.set('parentView.value', this.get('value'));
    console.log('change');
  }
});