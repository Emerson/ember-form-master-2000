import Ember from 'ember';
import DataAttributesSupport from 'ember-form-master-2000/mixins/data-attribute-support';

export default Ember.TextField.extend(DataAttributesSupport, {
  attributeBindings: ['validate'],
  init: function() {
    if(this.get('parentView.forAttribute')) {
      this.set('elementId', this.get('parentView.forAttribute'));
    }
    this._super(arguments);
    this.setDataAttributes();
  },
  focusOut: function() {
    this.set('parentView.showErrors', true);
  }
});