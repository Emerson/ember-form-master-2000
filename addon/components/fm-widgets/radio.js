import Ember from 'ember';
import layout from '../../templates/components/fm-widgets/radio';

const {computed} = Ember;

export default Ember.Component.extend({
  layout: layout,

  checked: computed('value', 'widgetAttrs.targetValue', function() {
    return !!this.get('value') && this.get('value') === this.get('widgetAttrs.targetValue');
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
