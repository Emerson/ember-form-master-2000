/* eslint-disable ember/closure-actions, ember/no-attrs-in-components */

import TextArea from '@ember/component/text-area';
import { oneWay } from '@ember/object/computed'

export default TextArea.extend({
  placeholder: oneWay('widgetAttrs.placeholder'),
  rows: oneWay('widgetAttrs.rows'),
  cols: oneWay('widgetAttrs.cols'),
  disabled: oneWay('widgetAttrs.disabled'),

  afterRender(){
    this.attrs.registerWidgetId(this.elementId);
  },

  focusOut(e) {
    if (this.onUserInteraction) {
      this.onUserInteraction(e, this);
    }
    if (this.onBlur) {
      this.onBlur(e, this);
    }
  },

  keyUp(e) {
    if (this.onKeyUp) {
      this.onKeyUp(e, this);
    }
  },

  focusIn(e) {
    if (this.onFocus) {
      this.onFocus(e, this);
    }
  }
});
