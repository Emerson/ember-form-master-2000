/* eslint-disable ember/closure-actions, ember/no-attrs-in-components */

import layout from '../../templates/components/fm-widgets/select';

import Component from '@ember/component';
import { get } from '@ember/object';
import { inject } from '@ember/service';
import { isArray } from '@ember/array';
import { reads, oneWay } from '@ember/object/computed';

export default Component.extend({
  layout: layout,
  fmConfig: inject('fm-config'),

  tagName: 'select',

  classNameBindings: ['selectClass'],
  attributeBindings: ['isDisabled:disabled'],

  selectClass: reads('fmConfig.selectClass'),

  isDisabled: oneWay('widgetAttrs.disabled'),
  optionContent: null,

  didReceiveAttrs() {
    this._super(...arguments);
    if (!isArray(this.widgetAttrs.content)) {
      this.set('optionContent', []);
    } else {
      this.set('optionContent', this.widgetAttrs.content);
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
    if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
      this.onUserInteraction();
    }
  },

  focusOut(e) {
    if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
      this.onUserInteraction(e, this);
    }
    if (this.onBlur && typeof this.onBlur === 'function') {
      this.onBlur(e, this);
    }
  },

  focusIn(e) {
    if (this.onUserInteraction && typeof this.onUserInteraction === 'function'){
      this.onUserInteraction(e, this);
    }
    if (this.onFocus && typeof this.onFocus === 'function') {
      this.onFocus(e, this);
    }
  }
});
