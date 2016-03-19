import Ember from 'ember';
import layout from '../../templates/components/fm-widgets/select';

const {get, getWithDefault, computed, inject} = Ember;
const {reads} = computed;

export default Ember.Component.extend({
  layout: layout,
  fmConfig: inject.service('fm-config'),

  tagName: 'select',

  classNameBindings: ['selectClass'],
  selectClass: reads('fmConfig.selectClass'),

  init() {
    this._super(arguments);
    const wAttrs = this.get('widgetAttrs');

    if(this.get('parentView.forAttribute')) {
      this.set('elementId', this.get('parentView.forAttribute'));
    }

    if(!wAttrs.content) {
      wAttrs.set('content', []);
    }
  },

  change() {
    this.send('change');
    this.sendAction('onUserInteraction');
  },

  focusOut() {
    this.sendAction('onUserInteraction');
  },

  actions: {
    change(){
      const selectEl = this.$()[0];
      const wAttrs = this.getAttr('widgetAttrs');
      const selectedIndex = selectEl.selectedIndex;
      const content = get(wAttrs, 'content');

      // decrement index by 1 if we have a prompt
      const hasPrompt = !!get(wAttrs, 'prompt');
      const contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;

      const selection = content.objectAt(contentIndex);

      const path = getWithDefault(wAttrs, 'optionValuePath', '');
      const value = (path.length > 0)? get(selection, path) : selection;
      // support using two way binding or data down/actions up
      if (typeof this.attrs.action === 'function'){
        console.log('calling action');
        this.attrs.action(value);
      } else {
        this.attrs.value.update(value);
      }
    }
  },
});
