import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-field';

export default Ember.Component.extend({
  layout: layout,
  value: null,

  fmConfig: Ember.inject.service('fm-config'),

  textareaClass: null,
  inputClass: null,
  labelClass: null,
  wrapperClass: null,

  init: function() {
    if(!this.get('optionValuePath')) {
      this.set('optionValuePath', 'content.value');
    }
    if(!this.get('optionLabelPath')) {
      this.set('optionLabelPath', 'content.label');
    }
    var dataAttributes = Object.keys(this.get('attrs')).filter(function(attr) {
      return /data-/.test(attr);
    });
    this.set('dataAttributes', dataAttributes);

    var classes = this.get('fmConfig').getProperties('wrapperClass', 'labelClass', 'inputClass', 'textareaClass');
    this.set('wrapperClass', classes.wrapperClass);
    this.set('labelClass', classes.labelClass);
    this.set('inputClass', classes.inputClass);
    this.set('textareaClass', classes.textareaClass);
    this._super(arguments);
  },
  placeholder: null,
  label: null,
  classNameBindings: ['wrapperClass', 'errorClass'],
  errorClass: Ember.computed('errors', function() {
    if(!Ember.isEmpty(this.get('errors'))) {
      return this.get('fmConfig.errorClass');
    }
  }),
  isSelect: Ember.computed('type', function() {
    return this.get('type') === 'select';
  }),
  isTextarea: Ember.computed('type', function() {
    return this.get('type') === 'textarea';
  }),
  isBasicInput: Ember.computed('type', function() {
    return (!this.get('isSelect') && !this.get('isTextarea'));
  }),
  forAttribute: Ember.computed('label', 'inputId', function() {
    if(this.get('inputId')) {
      return this.generateSafeId(this.get('inputId'));
    }
    if(this.get('label')) {
      return this.generateSafeId(this.get('label'));
    }
  }),
  generateSafeId: function(id) {
    var tmp = document.createElement("DIV");
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
    }
  }
});
