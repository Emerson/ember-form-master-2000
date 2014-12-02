import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super();
    this.set('formClass', this.fmconfig.formClass);
  },
  classNameBindings: ['formClass'],
  tagName: 'form',
  for: null,
  submit: function(e) {
    e.preventDefault();
    this.sendAction('action', this.get('for'));
  }
});