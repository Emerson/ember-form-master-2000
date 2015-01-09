import Ember from 'ember';

export default Ember.Select.extend({
  classNames: [],
  init: function() {
    this.get('classNames').push(this.fmconfig.selectClass);
    this._super(this);
  }
});