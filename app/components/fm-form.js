import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  for: null,
  submit: function(e) {
    e.preventDefault();
    this.sendAction('submit');
  }
});