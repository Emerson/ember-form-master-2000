/* eslint-disable ember/closure-actions, ember/no-attrs-in-components */

import layout from '../../templates/components/fm-widgets/select';

import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import { inject } from '@ember/service';
const { reads, oneWay } = computed;

export default Component.extend({
  layout: layout,
  fmConfig: inject('fm-config'),

  tagName: 'select',

  classNameBindings: ['selectClass'],
  attributeBindings: ['isDisabled:disabled'],

  selectClass: reads('fmConfig.selectClass'),

  isDisabled: oneWay('widgetAttrs.disabled'),

  init() {
    this._super(arguments);
    const wAttrs = this.get('widgetAttrs');
    //if(!!this.attrs.forAttribute) {
      //this.set('elementId', this.attrs.forAttribute);
    //}

    if(!wAttrs.content) {
      set(wAttrs, 'content', []);
    }
  },

  change() {
    const selectEl = this.$()[0];
    const wAttrs = this.getAttr('widgetAttrs');
    const selectedIndex = selectEl.selectedIndex;
    const content = get(wAttrs, 'content');

    // decrement index by 1 if we have a prompt
    const hasPrompt = !!get(wAttrs, 'prompt');
    const contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;

    const selection = content.objectAt(contentIndex);

    let path = get(wAttrs, 'optionValuePath')
    if (path === undefined) {
      path = ''
    }
    const value = (path.length > 0)? get(selection, path) : selection;
    // support using two way binding or data down/actions up
    if (typeof this.attrs.action === 'function'){
      this.attrs.action(value);
    } else {
      this.attrs.value.update(value);
    }
    this.sendAction('onUserInteraction');
  },

  focusOut(e) {
    this.sendAction('onUserInteraction', e, this);
    this.sendAction('onBlur', e, this);
  },

  focusIn(e) {
    this.sendAction('onFocus', e, this);
  }
});
