/* eslint-disable ember/closure-actions, ember/no-attrs-in-components */

import TextArea from '@ember/component/text-area';
import { computed } from '@ember/object';
const { oneWay } = computed;

export default TextArea.extend({
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
  }

});
