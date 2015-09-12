import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-radio-group';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['radioGroupWrapperClass', 'errorClass'],
  errorClass: Ember.computed('errors', function() {
    if(this.get('errors')) {
      return this.fmconfig.errorClass;
    }
  }),
  radioGroupWrapperClass: Ember.computed(function() {
    return this.fmconfig.radioGroupWrapperClass;
  }),
  labelClass: function() {
    return this.fmconfig.labelClass;
  }
});
