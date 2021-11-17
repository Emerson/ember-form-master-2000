/* eslint-disable ember/closure-actions */
import layout from '../../templates/components/fm-widgets/radio';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  layout: layout,

  checked: computed('value', 'widgetAttrs.targetValue', function() {
    return !!this.get('value') && this.get('value') === this.get('widgetAttrs.targetValue');
  }),

  didReceiveAttrs(){
    // override default behaviour form BaseWidgetMixin
  },

  change() {
    this.set('value', this.get('widgetAttrs.targetValue'));
    if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
      this.onUserInteraction();
    }
  },

  focusOut(e) {
    if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
      this.onUserInteraction();
    }
    if (this.onBlur && typeof this.onBlur === 'function') {
      this.onBlur(e, this);
    }
  },
});
