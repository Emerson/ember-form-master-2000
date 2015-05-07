import Ember from 'ember';
export default Ember.Checkbox.extend({
  focusOut: function() {
    this.set('parentView.showErrors', true);
  }
});