import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-field';

export default Ember.Component.extend({
  layout: layout,
  value: null,
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
    this.set('wrapperClass', this.fmconfig.wrapperClass);
    this.set('labelClass', this.fmconfig.labelClass);
    this.set('inputClass', this.fmconfig.inputClass);
    this.set('textareaClass', this.fmconfig.textareaClass);
    this._super(arguments);
  },
  placeholder: null,
  label: null,
  classNameBindings: ['wrapperClass', 'errorClass'],
  errorClass: Ember.computed('errors', function() {
    if(this.get('errors')) {
      return this.fmconfig.errorClass;
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
  }
});
