/* eslint-disable no-useless-escape, ember/closure-actions, ember/no-attrs-in-components */
import layout from '../templates/components/fm-field';
import EmberObject from '@ember/object';
import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed, defineProperty } from '@ember/object';
const { alias } = computed;

const WIDGET_ATTR_ALIASES = [
  'placeholder', 'maxlength', 'content', 'optionValuePath', 'name', 'tabindex',
  'optionLabelPath', 'prompt', 'rows', 'cols', 'spellcheck', 'disabled', 'targetValue'
];

const WidgetAttrs = EmberObject.extend({
  field: null,

  /*
    Aliases properties on the `fm-field` component which should be
    passed into the field's widget as `widgetAttrs`.

    With Ember 2.3 adoption this should be phased out so that users
    pass `widgetAttrs` in directly using the `hash` helper.

    @method init
    @return {void}
  */
  init(){
    this._super();
    WIDGET_ATTR_ALIASES.forEach(field => {
      defineProperty(this, field, alias('field.' + field));
    });
  },
});

/**
 * @class FmField
 *
 * `fm-field` controls the functionality of the form field.  It should not
 * do anything relating to the style or appearance of the field.  That is the
 * responsibility of the `display` component.
 **/
export default Component.extend({
  layout,
  tagName: '',
  isFocused: false,
  isValid: false,

  display: computed('widget', {
    get() {
      const widget = this.get('widget');
      if (widget === 'checkbox'){
        return 'checkbox';
      } else if (widget === 'radio'){
        return 'radio';
      } else if (widget === 'radio-group'){
        return 'radio-group';
      } else {
        return 'default';
      }
    },
    set(key, value) {
      return this._display = value
    }
  }),

  displayName: computed(function() {
    return this.get('fmConfig.displayBasePath') + this.get('display');
  }),

  placeholder: null,
  label: null,
  helptext: null,
  value: null,

  fmConfig: inject('fm-config'),

  dataTest: computed(function() {
    return this.get('data-test');
  }),

  widgetAttrs: computed(function(){
    // hack to support legacy apis
    return WidgetAttrs.create({ field: this });
  }),

  widget: 'input',

  widgetName: computed('widget', function(){
    return this.get('fmConfig.widgetBasePath') + this.get('widget');
  }),

  generateSafeId(id) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = id;
    id = tmp.textContent || tmp.innerText || "";
    id = id.replace(/[\.,\/#!$%\^&\*;:{}=\`'"~()]/g,"");
    id = id.replace(/\s/g, "-");
    return id;
  },

  shouldShowErrors: computed('fmConfig.showErrorsByDefault', {
    get() {
      return this.get('fmConfig.showErrorsByDefault');
    },
    set(key,value) {
      return this._shouldShowErrors = value;
    }
  }),

  visibleErrors: computed('shouldShowErrors', 'errors.[]', function() {
    return this.get('shouldShowErrors') ? this.get('errors') : [];
  }),

  actions: {

    onKeyUp(e, instance) {
      this.sendAction('onKeyUp', e, instance);
    },

    onBlur(e, instance) {
      this.set('isFocused', false);
      this.sendAction('onBlur', e, instance);
    },

    onFocus(e, instance) {
      this.set('isFocused', true);
      this.sendAction('onFocus', e, instance);
    },

    userInteraction() {
      this.set('shouldShowErrors', true);
      if (this.attrs.onUserInteraction && typeof this.attrs.onUserInteraction === 'function'){
        this.attrs.onUserInteraction();
      }
    },

    registerWidgetId(id){
      this.set('forAttribute', id);
    }

  }
});
