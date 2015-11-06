import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-checkbox';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['checkboxWrapperClass', 'errorClass'],
  fmConfig: Ember.inject.service('fm-config'),
  checkboxWrapperClass: Ember.computed(function() {
    return this.get('fmConfig.checkboxWrapperClass');
  }),
  errorClass: Ember.computed('errors', function() {
    if(!Ember.isEmpty(this.get('errors'))) {
      return this.get('fmConfig.errorClass');
    }
  })
});
