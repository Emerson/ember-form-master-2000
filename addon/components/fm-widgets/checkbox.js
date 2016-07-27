import Ember from 'ember';
import layout from '../../templates/components/fm-widgets/checkbox';

export default Ember.Component.extend({
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
