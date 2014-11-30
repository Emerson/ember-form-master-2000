import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['type', 'value', 'disabled'],
  classNames: ['btn', 'btn-primary'],
  type: 'submit'
})