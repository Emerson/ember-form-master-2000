import Ember from 'ember';
import layout from '../../templates/components/fm-widgets/checkbox';

export default Ember.Component.extend({
  layout,

  change() {
    this.sendAction('onUserInteraction');
  },

  focusOut() {
    this.sendAction('onUserInteraction');
  },
});
