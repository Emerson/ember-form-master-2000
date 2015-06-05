import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/ember-form-master-2000/fm-errortext',
  tagName: 'span',
  classNameBindings: 'errortextClass',
  error: Ember.computed('errors', function() {
    if(Ember.isArray(this.get('errors')) && this.get('errors.length') > 0) {
      return this.get('errors')[0];
    } else if(this.get('errors.message')) {
      return this.get('errors.message');
    } else {
      return this.get('errors');
    }
  }),
  errortextClass: 'help-block'
});