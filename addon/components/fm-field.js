import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-field';

const {computed, inject} = Ember;
const {reads} = computed;

export default Ember.Component.extend({
  layout,
  value: null,

  fmConfig: inject.service('fm-config'),

  inputClass: reads('fmConfig.inputClass'),
  labelClass: reads('fmConfig.labelClass'),
  textareaClass: reads('fmConfig.textareaClass'),
  wrapperClass: reads('fmConfig.wrapperClass'),

  init() {
    if(!this.get('optionValuePath')) {
      this.set('optionValuePath', 'content.value');
    }
    if(!this.get('optionLabelPath')) {
      this.set('optionLabelPath', 'content.label');
    }
    const dataAttributes = Object.keys(this.get('attrs'))
      .filter(attr => /data-/.test(attr));

    this.set('dataAttributes', dataAttributes);

    this._super(arguments);
  },

  placeholder: null,
  label: null,
  classNameBindings: ['wrapperClass', 'errorClass'],

  errorClass: computed('showErrors', 'fmConfig.errorClass', function() {
    if (this.get('showErrors')) {
      return this.get('fmConfig.errorClass');
    }
  }),

  isSelect: computed('type', function() {
    return this.get('type') === 'select';
  }),

  isTextarea: computed('type', function() {
    return this.get('type') === 'textarea';
  }),

  isBasicInput: computed('type', function() {
    return (!this.get('isSelect') && !this.get('isTextarea'));
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

  actions: {
    selectAction(value){
      if (this.attrs.action && typeof this.attrs.action === 'function'){
        this.attrs.action(value);
      } else {
        this.set('value', value);
      }
    },

    userInteraction() {
      this.set('shouldShowErrors', true);
    }
  },
  shouldShowErrors: computed('fmConfig.showErrorsByDefault', function() {
    return this.get('fmConfig.showErrorsByDefault');
  }),
  showErrors: computed('shouldShowErrors', 'errors', function() {
    return this.get('shouldShowErrors') && !isEmpty(this.get('errors'));
  })
});
