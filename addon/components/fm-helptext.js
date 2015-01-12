import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNameBindings: ['helptextClass'],
  helptextClass: 'help-block'
});