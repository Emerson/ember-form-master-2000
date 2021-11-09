/* eslint-disable ember/closure-actions */
import Component from '@ember/component';
import { reads } from '@ember/object/computed'
import { inject } from '@ember/service';

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
    this.get('childViews').forEach(childView => {
      if (childView.get('shouldShowErrors') === false) {
        childView.set('shouldShowErrors', true);
      }
    });
    if (this.action) {
      this.action(this.get('for'));
    }
  }
});
