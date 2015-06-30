import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/ember-form-master-2000/fm-radio-group',
  classNameBindings: ['radioGroupWrapperClass', 'errorClass'],
  errorClass: Ember.computed('errors', function() {
    if(this.get('errors')) {
      return this.fmconfig.errorClass;
    }
  }),
  radioGroupWrapperClass: Ember.computed(function() {
    return this.fmconfig.radioGroupWrapperClass;
  }),
  labelClass: Ember.computed(function() {
    return this.fmconfig.labelClass;
  })
});
