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
    this.sendAction('onUserInteraction', e, this);
    this.sendAction('onBlur', e, this);
  },

  keyUp(e) {
    this.sendAction('onKeyUp', e, this);
  },

  focusIn(e) {
    this.sendAction('onFocus', e, this);
  },

  afterRender(){
    this.attrs.registerWidgetId(this.elementId);
  }
});
