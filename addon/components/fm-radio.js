import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-radio';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['radioClass'],
  fmConfig: Ember.inject.service('fm-config'),
  radioClass: Ember.computed.reads('fmConfig.radioClass'),
  checked: Ember.computed('parentView.value', function() {
    if (Ember.isEmpty(this.get('content')) || Ember.isEmpty(this.get('optionValuePath'))) {
      return false;
    }

    return this.get('parentView.value') === Ember.get(this.get('content'), this.get('optionValuePath'));
  }),
  change: function() {
    this.set('parentView.value', Ember.get(this.get('content'), this.get('optionValuePath')));
    this.sendAction('onUserInteraction');
  },
  focusOut() {
    this.sendAction('onUserInteraction');
  },
  optionLabelPath: 'label',
  optionValuePath: 'value'
});
