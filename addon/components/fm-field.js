import Ember from 'ember';
import layout from '../templates/components/fm-field';

const {computed, inject} = Ember;
const {alias} = computed;

const WIDGET_ATTR_ALIASES = [
  'placeholder', 'maxlength', 'content', 'optionValuePath', 'name', 'tabindex',
  'optionLabelPath', 'prompt', 'rows', 'cols', 'spellcheck', 'disabled', 'targetValue'
];

const WidgetAttrs = Ember.Object.extend({
  field: null,

  /**
   * Aliases properties on the `fm-field` component which should be
   * passed into the field's widget as `widgetAttrs`.
   *
   * With Ember 2.3 adoption this should be phased out so that users
   * pass `widgetAttrs` in directly using the `hash` helper.
   *
   * @method init
   * @return {void}
   **/
  init(){
    this._super();
    WIDGET_ATTR_ALIASES.forEach(field => {
      Ember.defineProperty(this, field, alias('field.' + field));
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
export default Ember.Component.extend({
  layout,
  tagName: '',

  display: computed('widget', function(){
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
  }),

  displayName: computed(function() {
    return this.get('fmConfig.displayBasePath') + this.get('display');
  }),

  placeholder: null,
  label: null,
  helptext: null,
  value: null,

  fmConfig: inject.service('fm-config'),

  init() {
    const dataAttributes = Object.keys(this.get('attrs'))
      .filter(attr => /data-/.test(attr));

    this.set('dataAttributes', dataAttributes);

    this._super(arguments);
  },

  widgetAttrs: computed(function(){
    // hack to support legacy apis
    return WidgetAttrs.create({ field: this });
  }),

  widget: 'input',

  widgetName: computed('widget', function(){
    return this.get('fmConfig.widgetBasePath') + this.get('widget');
  }),

  forAttribute: computed('label', 'inputId', function() {
    if(this.get('inputId')) {
      return this.generateSafeId(this.get('inputId'));
    }
    if(this.get('label')) {
      return this.generateSafeId(this.get('label'));
    }
  }),

  generateSafeId(id) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = id;
    id = tmp.textContent || tmp.innerText || "";
    id = id.replace(/[\.,\/#!$%\^&\*;:{}=\`'"~()]/g,"");
    id = id.replace(/\s/g, "-");
    return id;
  },

  shouldShowErrors: computed('fmConfig.showErrorsByDefault', function() {
    return this.get('fmConfig.showErrorsByDefault');
  }),

  visibleErrors: computed('shouldShowErrors', 'errors.[]', function(){
    return !!this.get('shouldShowErrors') ? this.get('errors') : [];
  }),

  actions: {

    onKeyUp() {
      this.sendAction('onKeyUp');
    },

    userInteraction() {
      this.set('shouldShowErrors', true);
      this.sendAction('onUserInteraction');
    }

  }
});
