/* eslint-disable ember/closure-actions, ember/no-attrs-in-components */

import { computed } from '@ember/object';
import { TextField } from '@ember/legacy-built-in-components';
import { oneWay } from '@ember/object/computed';

export default TextField.extend({
  placeholder: oneWay('widgetAttrs.placeholder'),
  name: oneWay('widgetAttrs.name'),
  disabled: oneWay('widgetAttrs.disabled'),

  type: computed('widgetAttrs.type', function(){
    return this.get('widgetAttrs.type') || 'text';
  }),

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
  },

  afterRender(){
    this.attrs.registerWidgetId(this.elementId);
  }
});
