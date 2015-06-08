import Ember from 'ember';
export default Ember.Component.extend({
  layoutName: 'components/ember-form-master-2000/fm-checkbox',
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