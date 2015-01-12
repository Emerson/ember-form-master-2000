import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['wrapperClass'],
  init: function() {
    this._super(this);
    this.set('wrapperClass', this.fmconfig.wrapperClass);
  },
  tagName: 'div'
});