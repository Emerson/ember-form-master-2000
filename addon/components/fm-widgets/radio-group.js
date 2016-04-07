import Ember from 'ember';
import layout from '../../templates/components/fm-widgets/radio-group';

export default Ember.Component.extend({
  layout,
  actions: {
    radioButtonInteraction(){
      this.sendAction('onUserInteraction');
    }
  }
});
