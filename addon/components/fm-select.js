import Ember from 'ember';

export default Ember.Select.extend({
  classNames: [],
  init: function() {
    if(this.get('parentView.forAttribute')) {
      this.set('elementId', this.get('parentView.forAttribute'));
    }
    this.get('classNames').push(this.fmconfig.selectClass);
    this._super(this);
  },
  focusOut: function() {
    this.set('parentView.showErrors', true);
  }
});