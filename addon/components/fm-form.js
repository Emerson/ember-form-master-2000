import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super();
  },
  willInsertElement: function() {
    var classNames = this.get('classNames');
    // If there are no custom classes passed into the component, then we
    // should apply the default fmconfig classes
    if(classNames.length === 1) {
      this.set('formClass', this.fmconfig.formClass);
    }
  },
  classNameBindings: ['formClass'],
  attributeBindings: ['validate'],
  tagName: 'form',
  'for': null,
  submit: function(e) {
    e.preventDefault();
    this.sendAction('action', this.get('for'));
  }
});