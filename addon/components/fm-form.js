import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super();
  },
  classNameBindings: ['formClass'],
  formClass: Ember.computed.reads('fmConfig.formClass'),
  fmConfig: Ember.inject.service('fm-config'),
  tagName: 'form',
  'for': null,
  submit: function(e) {
    e.preventDefault();
    this.get('childViews').forEach((chieldView) => {
        if (chieldView.get('shouldShowErrors') === false) {
        chieldView.set('shouldShowErrors', true);
      }
    });
    this.sendAction('action', this.get('for'));
  }
});
