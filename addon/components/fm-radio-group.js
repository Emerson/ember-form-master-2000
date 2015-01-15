import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: 'radioGroupWrapperClass',
  radioGroupWrapperClass: function() {
    return this.fmconfig.radioGroupWrapperClass;
  }.property()
});