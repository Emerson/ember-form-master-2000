/* eslint-disable ember/closure-actions */
import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
const { reads } = computed;

export default Component.extend({
  init() {
    this._super();
  },
  classNameBindings: ['formClass'],
  formClass: reads('fmConfig.formClass'),
  fmConfig: inject('fm-config'),
  tagName: 'form',
  'for': null,

  submit(e) {
    e.preventDefault();
    this.childViews.forEach(childView => {
      if (childView.get('shouldShowErrors') === false) {
        childView.set('shouldShowErrors', true);
      }
    });
    this.sendAction('action', this['for']);
  }
});
