import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-radio-group';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['radioGroupWrapperClass', 'errorClass'],
  fmConfig: Ember.inject.service('fm-config'),
  errorClass: Ember.computed('errors', 'fmConfig.errorClass', function() {
    if(!Ember.isEmpty(this.get('errors'))) {
      return this.get('fmConfig.errorClass');
    }
  }),
  radioGroupWrapperClass: Ember.computed.reads('fmConfig.radioGroupWrapperClass'),
  labelClass: Ember.computed.reads('fmConfig.labelClass')
});
