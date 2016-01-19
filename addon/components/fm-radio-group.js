import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-radio-group';

const {inject, computed, isEmpty} = Ember;
const {reads} = computed;

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['radioGroupWrapperClass', 'errorClass'],
  fmConfig: inject.service('fm-config'),
  errorClass: computed('showErrors', 'fmConfig.errorClass', function() {
    if(this.get('showErrors')) {
      return this.get('fmConfig.errorClass');
    }
  }),
  radioGroupWrapperClass: reads('fmConfig.radioGroupWrapperClass'),
  labelClass: reads('fmConfig.labelClass'),

  shouldShowErrors: false,
  showErrors: Ember.computed('errors', 'shouldShowErrors', function() {
    return this.get('shouldShowErrors') && !isEmpty(this.get('errors'));
  }),

  actions: {
    userInteraction() {
      this.set('shouldShowErrors', true);
    }
  }
});
