import Ember from 'ember';
import DataAttributesSupport from '../../mixins/data-attribute-support';

const {oneWay} = Ember.computed;

export default Ember.TextArea.extend(DataAttributesSupport, {
  placeholder: oneWay('widgetAttrs.placeholder'),
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
