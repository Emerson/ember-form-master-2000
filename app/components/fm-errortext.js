import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNameBindings: 'errortextClass',
  error: function() {
    return this.get('errors.firstObject');
  }.property('errors'),
  errortextClass: 'help-block'
});