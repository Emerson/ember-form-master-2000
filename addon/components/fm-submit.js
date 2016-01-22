import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-submit';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['wrapperClass'],
  fmConfig: Ember.inject.service('fm-config'),
  init: function() {
    this._super(this);
  },
  inputWrapperClass: Ember.computed.reads('fmConfig.inputWrapperClass'),
  submitButtonClass: Ember.computed.reads('fmConfig.submitButtonClass'),
  wrapperClass: Ember.computed.reads('fmConfig.wrapperClass'),
  tagName: 'div'
});
