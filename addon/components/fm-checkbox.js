import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-checkbox';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['checkboxWrapperClass', 'errorClass'],
  fmConfig: Ember.inject.service('fm-config'),
  checkboxWrapperClass: Ember.computed.reads('fmConfig.checkboxWrapperClass'),
  errorClass: Ember.computed('showErrors', 'fmConfig.errorClass', function() {
    if(this.get('showErrors')) {
      return this.get('fmConfig.errorClass');
    }
  }),

  shouldShowErrors: false,
  showErrors: Ember.computed('shouldShowErrors', 'errors', function() {
    return this.get('shouldShowErrors') && !Ember.isEmpty(this.get('errors'));
  }),

  change() {
    this.send('userInteraction');
  },

  focusOut() {
    this.send('userInteraction');
  },

  actions: {
    userInteraction() {
      this.set('shouldShowErrors', true);
    }
  }
});
