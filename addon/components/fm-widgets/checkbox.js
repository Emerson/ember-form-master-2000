/* eslint-disable ember/closure-actions */

import layout from '../../templates/components/fm-widgets/checkbox';
import Component from '@ember/component';

export default Component.extend({
  layout,

  change(e) {
    this.sendAction('onUserInteraction', e, this);
  },

  focusOut(e) {
    this.sendAction('onUserInteraction', e, this);
    this.sendAction('onBlur', e, this);
  },

  focusIn(e) {
    this.sendAction('onFocus', e, this);
  }
});
