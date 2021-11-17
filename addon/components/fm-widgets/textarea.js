/* eslint-disable ember/closure-actions, ember/no-attrs-in-components */

import { TextArea } from '@ember/legacy-built-in-components';
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
    if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
      this.onUserInteraction(e, this);
    }
    if (this.onBlur && typeof this.onBlur === 'function') {
      this.onBlur(e, this);
    }
  },

  keyUp(e) {
    if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
      this.onUserInteraction(e, this);
    }
    if (this.onKeyUp && typeof this.onKeyUp === 'function') {
      this.onKeyUp(e, this);
    }
  },

  focusIn(e) {
    if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
      this.onUserInteraction(e, this);
    }
    if (this.onFocus && typeof this.onFocus === 'function') {
      this.onFocus(e, this);
    }
  }

});
