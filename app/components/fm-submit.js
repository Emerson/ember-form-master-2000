import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super(this);
    this.set('classNames', this.fmconfig.submitButtonClasses);
  },
  tagName: 'input',
  attributeBindings: ['type', 'value', 'disabled'],
  type: 'submit'
})