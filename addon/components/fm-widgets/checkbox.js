import Ember from 'ember';
import layout from '../../templates/components/fm-widgets/checkbox';

const {inject, computed, isEmpty} = Ember;
const {reads} = computed;

export default Ember.Component.extend({
  layout,

  change() {
    this.sendAction('onUserInteraction');
  },

  focusOut() {
    this.sendAction('onUserInteraction');
  },
});
