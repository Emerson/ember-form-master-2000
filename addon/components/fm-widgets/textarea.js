import Ember from 'ember';
import DataAttributesSupport from '../../mixins/data-attribute-support';

const {oneWay} = Ember.computed;

export default Ember.TextArea.extend(DataAttributesSupport, {
  placeholder: oneWay('widgetAttrs.placeholder'),
  rows: oneWay('widgetAttrs.rows'),
  cols: oneWay('widgetAttrs.cols'),
  disabled: oneWay('widgetAttrs.disabled'),

  afterRender(){
    this.attrs.registerWidgetId(this.elementId);
  },

  focusOut(e) {
    this.sendAction('onUserInteraction', e, this);
    this.sendAction('onBlur', e, this);
  },

  keyUp(e) {
    this.sendAction('onKeyUp', e, this);
  },

  focusIn(e) {
    this.sendAction('onFocus', e, this);
  },

});
