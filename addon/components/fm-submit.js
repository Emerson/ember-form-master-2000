import Ember from 'ember';
import layout from '../templates/components/fm-submit';

const {inject, computed} = Ember;
const {reads} = computed;

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['wrapperClass'],
  fmConfig: inject.service('fm-config'),
  init() {
    this._super(this);
  },
  submitButtonClass: reads('fmConfig.submitButtonClass'),
  wrapperClass: reads('fmConfig.wrapperClass'),
  tagName: 'div'
});
