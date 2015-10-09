import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super();
  },
  classNameBindings: ['formClass'],
  formClass: Ember.computed.alias('fmConfig.formClass'),
  fmConfig: Ember.inject.service('fm-config'),
  tagName: 'form',
  'for': null,
  submit: function(e) {
    e.preventDefault();
    this.sendAction('action', this.get('for'));
  }
});
