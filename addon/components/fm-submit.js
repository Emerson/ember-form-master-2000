import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/ember-form-master-2000/fm-submit',
  classNameBindings: ['wrapperClass'],
  init: function() {
    this._super(this);
    this.set('wrapperClass', this.fmconfig.wrapperClass);
    this.set('submitButtonClasses', this.fmconfig.submitButtonClasses.join(' '));
  },
  tagName: 'div'
});