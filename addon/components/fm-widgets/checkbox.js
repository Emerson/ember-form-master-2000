/* eslint-disable ember/closure-actions */

import layout from '../../templates/components/fm-widgets/checkbox';
import Component from '@ember/component';

export default Component.extend({
  layout,

  change(e) {
    if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
      this.onUserInteraction(e, this);
    }
  },

  focusOut(e) {
    if (this.onBlur && typeof this.onBlur === 'function') {
      this.onBlur(e, this);
    }
    if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
      this.onUserInteraction(e, this);
    }
  },

  focusIn(e) {
    if (this.onFocus && typeof this.onFocus === 'function') {
      this.onFocus(e, this);
    }
    if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
      this.onUserInteraction();
    }
  }
});
