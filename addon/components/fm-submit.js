import layout from '../templates/components/fm-submit';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
const { reads } = computed;

export default Component.extend({
  layout: layout,
  classNameBindings: ['wrapperClass'],
  fmConfig: inject('fm-config'),
  init() {
    this._super(this);
  },
  submitButtonClass: reads('fmConfig.submitButtonClass'),
  wrapperClass: reads('fmConfig.wrapperClass'),
  tagName: 'div',

  dataTest: computed(function() {
    return this.get('data-test');
  })
});
