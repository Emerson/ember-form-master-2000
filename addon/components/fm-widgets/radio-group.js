/* eslint-disable ember/closure-actions */

import Component from '@ember/component';
import layout from '../../templates/components/fm-widgets/radio-group';

export default Component.extend({
  layout,
  actions: {
    radioButtonInteraction() {
      if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
        this.onUserInteraction();
      }
    }
  }
});
