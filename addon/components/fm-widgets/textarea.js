import Ember from 'ember';
import DataAttributesSupport from '../../mixins/data-attribute-support';

const {oneWay} = Ember.computed;

export default Ember.TextArea.extend(DataAttributesSupport, {
  placeholder: oneWay('widgetAttrs.placeholder'),
  focusOut() {
    this.sendAction('onUserInteraction');
  },
  rows: oneWay('widgetAttrs.rows'),
  cols: oneWay('widgetAttrs.cols'),
  disabled: oneWay('widgetAttrs.disabled'),

  init() {
    const forAttr = this.get('parentView.forAttribute');
    if(!!forAttr) {
      this.set('elementId', forAttr);
    }
    this._super(arguments);
    this.setDataAttributes();
  }

});
