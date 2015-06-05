import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [],
  init: function() {
    if(this.get('parentView.forAttribute')) {
      this.set('elementId', this.get('parentView.forAttribute'));
    }
    this.get('classNames').push(this.fmconfig.selectClass);
    this._super(this);
  }
});