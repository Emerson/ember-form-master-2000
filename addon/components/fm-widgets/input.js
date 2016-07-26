import Ember from 'ember';
import DataAttributesSupport from '../../mixins/data-attribute-support';

const {oneWay} = Ember.computed;

export default Ember.TextField.extend(DataAttributesSupport, {
  placeholder: oneWay('widgetAttrs.placeholder'),
  name: oneWay('widgetAttrs.name'),
  disabled: Ember.computed.oneWay('widgetAttrs.disabled'),

  type: Ember.computed('widgetAttrs.type', function(){
    return this.get('widgetAttrs.type') || 'text';
  }),

  focusOut() {
    this.sendAction('onUserInteraction');
  },

  keyUp(e) {
    this.sendAction('onKeyUp', e, this);
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
