import Ember from 'ember';
import DataAttributesSupport from 'ember-form-master-2000/mixins/data-attribute-support';

export default Ember.TextArea.extend(DataAttributesSupport, {
  focusOut() {
    this.sendAction('onUserInteraction');
  },

  init: function() {
    if(this.get('parentView.forAttribute')) {
      this.set('elementId', this.get('parentView.forAttribute'));
    }
    this._super(arguments);
    this.setDataAttributes();
  }

});
