/* eslint-disable ember/closure-actions */

import layout from '../../templates/components/fm-widgets/checkbox';
import Component from '@ember/component';

export default Component.extend({
  layout,

  change(e) {
    if (this.onUserInteraction) {
      this.onUserInteraction(e, this);
    }
  },

  focusOut(e) {
    if (this.onUserInteraction) {
      this.onUserInteraction(e, this);
    }
    if (this.onBlur) {
      this.onBlur(e, this);
    }
  },

  focusIn(e) {
    if (this.onFocus) {
      this.onFocus(e, this);
    }
  }
});
