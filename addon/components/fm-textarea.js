import Ember from 'ember';
import DataAttributesSupport from 'ember-form-master-2000/mixins/data-attribute-support';

export default Ember.TextArea.extend(DataAttributesSupport, {
  focusOut() {
    this.sendAction('onUserInteraction');
  },

  init() {
    const forAttr = this.get('parentView.forAttribute');
    if(!!forAttr) {
      this.set('elementId', forAttr);
    }
    this._super(arguments);
    this.setDataAttributes();
  }

});
