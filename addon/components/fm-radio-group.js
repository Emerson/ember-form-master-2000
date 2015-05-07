import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/ember-form-master-2000/fm-radio-group',
  classNameBindings: ['radioGroupWrapperClass', 'errorClass'],
  errorClass: function() {
    if(this.get('errors') && this.get('showErrors')) {
      return this.fmconfig.errorClass;
    }
  }.property('errors', 'showErrors'),
  radioGroupWrapperClass: function() {
    return this.fmconfig.radioGroupWrapperClass;
  }.property(),
  labelClass: function() {
    return this.fmconfig.labelClass;
  }
});