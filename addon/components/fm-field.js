import Ember from 'ember';

export default Ember.Component.extend({
  layoutName: 'components/ember-form-master-2000/fm-field',
  init: function() {
    if(!this.get('optionValuePath')) {
      this.set('optionValuePath', 'content.value');
    }
    if(!this.get('optionLabelPath')) {
      this.set('optionLabelPath', 'content.label');
    }
    var dataAttributes = Ember.keys(this).filter(function(attr) {
      return /data-/.test(attr);
    });
    this.set('dataAttributes', dataAttributes);
    this.set('wrapperClass', this.fmconfig.wrapperClass);
    this.set('labelClass', this.fmconfig.labelClass);
    this.set('inputClass', this.fmconfig.inputClass);
    this.set('textareaClass', this.fmconfig.textareaClass);
    this._super();
  },
  placeholder: null,
  label: null,
  classNameBindings: ['wrapperClass', 'errorClass'],
  errorClass: function() {
    if(this.get('errors')) {
      return this.fmconfig.errorClass;
    }
  }.property('errors'),
  isSelect: function() {
    return this.get('type') === 'select';
  }.property('type'),
  isTextarea: function() {
    return this.get('type') === 'textarea';
  }.property('type'),
  isBasicInput: function() {
    return (!this.get('isSelect') && !this.get('isTextarea'));
  }.property('type'),
  forAttribute: function() {
    if(this.get('id')) {
      return this.generateSafeId(this.get('id'));
    }
    if(this.get('label')) {
      return this.generateSafeId(this.get('label'));
    }
  }.property('label', 'id'),
  generateSafeId: function(id) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = id;
    id = tmp.textContent || tmp.innerText || "";
    id = id.replace(/[\.,\/#!$%\^&\*;:{}=\`'"~()]/g,"");
    id = id.replace(/\s/g, "-");
    return id;
  }
});
