import Ember from 'ember';
export default Ember.Component.extend({
  classNameBindings: 'checkboxWrapperClass',
  checkboxWrapperClass: function() {
    return this.fmconfig.checkboxWrapperClass;
  }.property()
});