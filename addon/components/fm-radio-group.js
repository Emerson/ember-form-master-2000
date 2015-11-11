import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-radio-group';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['radioGroupWrapperClass', 'errorClass'],
  fmConfig: Ember.inject.service('fm-config'),
  errorClass: Ember.computed('errors', function() {
    if(!Ember.isEmpty(this.get('errors'))) {
      return this.get('fmConfig.errorClass');
    }
  }),
  radioGroupWrapperClass: Ember.computed(function() {
    return this.get('fmConfig.radioGroupWrapperClass');
  }),
  labelClass: function() {
    return this.get('fmConfig.labelClass');
  }
});
