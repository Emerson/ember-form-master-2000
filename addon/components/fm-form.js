import Ember from 'ember';

const {inject, computed} = Ember;
const {reads} = computed;

export default Ember.Component.extend({
  init() {
    this._super();
  },
  classNameBindings: ['formClass'],
  formClass: reads('fmConfig.formClass'),
  fmConfig: inject.service('fm-config'),
  tagName: 'form',
  'for': null,

  submit(e) {
    e.preventDefault();
    this.get('childViews').forEach(childView => {
      if (childView.get('shouldShowErrors') === false) {
        childView.set('shouldShowErrors', true);
      }
    });
    this.sendAction('action', this.get('for'));
  }
});
