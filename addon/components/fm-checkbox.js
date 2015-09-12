import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-checkbox';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['checkboxWrapperClass', 'errorClass'],
  checkboxWrapperClass: Ember.computed(function() {
    return this.fmconfig.checkboxWrapperClass;
  }),
  errorClass: Ember.computed('errors', function() {
    if(this.get('errors')) {
      return this.fmconfig.errorClass;
    }
  })
});