import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-errortext';

const {computed, isArray} = Ember;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNameBindings: 'errortextClass',
  error: computed('errors', function() {
    const errors = this.get('errors');
    var error = null;
    if(isArray(errors) && errors.length > 0) {
      error = errors[0];
    }
    if(errors && typeof errors === 'object' && errors.message) {
      error = errors.message;
    }
    if(typeof errors === 'string') {
      error = errors;
    }
    return error;
  }),
  errortextClass: 'help-block'
});
