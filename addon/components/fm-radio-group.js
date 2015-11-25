import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-radio-group';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['radioGroupWrapperClass', 'errorClass'],
  fmConfig: Ember.inject.service('fm-config'),
  errorClass: Ember.computed('showErrors', 'fmConfig.errorClass', function() {
    if(this.get('showErrors')) {
      return this.get('fmConfig.errorClass');
    }
  }),
  radioGroupWrapperClass: Ember.computed.reads('fmConfig.radioGroupWrapperClass'),
  labelClass: Ember.computed.reads('fmConfig.labelClass'),

  shouldShowErrors: false,
  showErrors: Ember.computed('errors', 'shouldShowErrors', function() {
    return this.get('shouldShowErrors') && !Ember.isEmpty(this.get('errors'));
  }),

  actions: {
    userInteraction() {
      this.set('shouldShowErrors', true);
    }
  }
});
