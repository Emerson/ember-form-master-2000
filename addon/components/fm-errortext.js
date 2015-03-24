import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/ember-form-master-2000/fm-errortext',
  tagName: 'span',
  classNameBindings: 'errortextClass',
  error: function() {
    if(Ember.isArray(this.get('errors'))) {
      return this.get('errors.firstObject');
    } else if(this.get('errors.message')) {
      return this.get('errors.message');
    } else {
      return this.get('errors');
    }
  }.property('errors'),
  errortextClass: 'help-block'
});