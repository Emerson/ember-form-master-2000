import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-submit';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['wrapperClass'],
  init: function() {
    this._super(this);
    this.set('wrapperClass', this.fmconfig.wrapperClass);
    this.set('submitButtonClasses', this.fmconfig.submitButtonClasses.join(' '));
  },
  tagName: 'div'
});