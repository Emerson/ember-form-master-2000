import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-submit';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['wrapperClass'],
  fmConfig: Ember.inject.service('fm-config'),
  init: function() {
    this._super(this);
  },
  submitButtonClasses: Ember.computed('fmConfig.submitButtonClasses', function() {
    return this.get('fmConfig.submitButtonClasses').join(' ');
  }),
  wrapperClass: Ember.computed.reads('fmConfig.wrapperClass'),
  tagName: 'div'
});
