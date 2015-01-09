import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this.set('classNames', this.fmconfig.submitButtonClasses);
    this._super(this);
  },
  tagName: 'input',
  attributeBindings: ['type', 'value', 'disabled'],
  type: 'submit'
})