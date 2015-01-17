import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/ember-form-master-2000/fm-helptext',
  tagName: 'span',
  classNameBindings: ['helptextClass'],
  helptextClass: 'help-block',
});