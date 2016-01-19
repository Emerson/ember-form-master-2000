import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-checkbox';

const {inject, computed, isEmpty} = Ember;
const {reads} = computed;

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['checkboxWrapperClass', 'errorClass'],
  fmConfig: inject.service('fm-config'),
  checkboxWrapperClass: reads('fmConfig.checkboxWrapperClass'),
  errorClass: computed('showErrors', 'fmConfig.errorClass', function() {
    if(this.get('showErrors')) {
      return this.get('fmConfig.errorClass');
    }
  }),

  shouldShowErrors: false,
  showErrors: computed('shouldShowErrors', 'errors', function() {
    return this.get('shouldShowErrors') && !isEmpty(this.get('errors'));
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
