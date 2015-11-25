import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-select';

export default Ember.Component.extend({
  layout: layout,
  content: null,
  prompt: null,
  tagName: 'select',
  optionValuePath: 'value',
  optionLabelPath: 'label',
  action: Ember.K,
  fmConfig: Ember.inject.service('fm-config'),
  classNameBindings: ['selectClass'],
  selectClass: Ember.computed.reads('fmConfig.selectClass'),

  // shadow the passed-in `selection` to avoid
  // leaking changes to it via a 2-way binding
  _selection: Ember.computed.reads('selection'),

  init: function() {
    this._super(arguments);

    if(this.get('parentView.forAttribute')) {
      this.set('elementId', this.get('parentView.forAttribute'));
      // this.set('')
      // console.log('setting id', this.get('elementId'));
    }
    if(!this.get('content')) {
      this.set('content', []);
    }
    if(this.get('value')) {
      this.set('selection', this.get('value'));
    }
  },

  change: function() {
    this.send('change');
    this.sendAction('onUserInteraction');
    // console.log('changing');
  },

  didInsertElement: function() {
    if(this.get('parentView.forAttribute')) {
    }
  },

  actions: {
    change(){
      const selectEl = this.$()[0];
      const selectedIndex = selectEl.selectedIndex;
      const content = this.get('content');

      // decrement index by 1 if we have a prompt
      const hasPrompt = !!this.get('prompt');
      const contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;

      const selection = content.objectAt(contentIndex);

      // set the local, shadowed selection to avoid leaking
      // changes to `selection` out via 2-way binding
      this.set('_selection', selection);

      const path = this.get('optionValuePath');
      const value = (path.length > 0)? Ember.get(selection, path) : selection;
      this.attrs.action(value);
    }
  },

  focusOut() {
    this.sendAction('onUserInteraction');
  }
});
