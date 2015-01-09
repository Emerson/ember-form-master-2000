import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this.set('wrapperClass', this.fmconfig.wrapperClass);
    this.set('labelClass', this.fmconfig.labelClass);
    this.set('inputClass', this.fmconfig.inputClass);
    this._super();
  },
  placeholder: null,
  label: null,
  errorClass: function() {
    if(this.get('errors')) {
      return this.fmconfig.errorClass;
    }
  }.property('errors')
});