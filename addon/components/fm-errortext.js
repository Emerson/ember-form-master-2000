import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/ember-form-master-2000/fm-errortext',
  tagName: 'span',
  classNameBindings: 'errortextClass',
  error: function() {
    return this.get('errors.firstObject');
  }.property('errors'),
  errortextClass: 'help-block'
});