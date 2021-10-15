/* eslint-disable ember/closure-actions */
import layout from '../../templates/components/fm-widgets/radio';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  layout: layout,

  checked: computed('value', 'widgetAttrs.targetValue', function() {
    return !!this.value && this.value === this.get('widgetAttrs.targetValue');
  }),

  didReceiveAttrs(){
    // override default behaviour form BaseWidgetMixin
  },

  change() {
    this.set('value', this.get('widgetAttrs.targetValue'));
    this.sendAction('onUserInteraction');
  },

  focusOut() {
    this.sendAction('onUserInteraction');
  },
});
