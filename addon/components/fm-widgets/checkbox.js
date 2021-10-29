/* eslint-disable ember/closure-actions */

import layout from '../../templates/components/fm-widgets/checkbox';
import Component from '@ember/component';

export default Component.extend({
  layout,

  change(e) {
    this.onUserInteraction(e, this);
  },

  focusOut(e) {
    this.onUserInteraction(e, this);
    this.onBlur(e, this);
  },

  focusIn(e) {
    this.onFocus(e, this);
  }
});
