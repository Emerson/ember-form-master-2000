/* eslint-disable ember/closure-actions, ember/no-attrs-in-components */

import { computed } from '@ember/object';
import TextField from '@ember/component/text-field';
import { oneWay } from '@ember/object/computed';

export default TextField.extend({
  placeholder: oneWay('widgetAttrs.placeholder'),
  name: oneWay('widgetAttrs.name'),
  disabled: oneWay('widgetAttrs.disabled'),

  type: computed('widgetAttrs.type', function(){
    return this.get('widgetAttrs.type') || 'text';
  }),

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
  },

  afterRender(){
    this.attrs.registerWidgetId(this.elementId);
  }
});
