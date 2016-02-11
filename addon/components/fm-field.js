import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-field';

export default Ember.Component.extend({
  layout: layout,
  value: null,

  fmConfig: Ember.inject.service('fm-config'),

  inputClass: Ember.computed.reads('fmConfig.inputClass'),
  labelClass: Ember.computed.reads('fmConfig.labelClass'),
  textareaClass: Ember.computed.reads('fmConfig.textareaClass'),
  wrapperClass: Ember.computed.reads('fmConfig.wrapperClass'),

  init: function() {
    if(!this.get('optionValuePath')) {
      this.set('optionValuePath', 'content.value');
    }
    if(!this.get('optionLabelPath')) {
      this.set('optionLabelPath', 'content.label');
    }
    if(!Ember.isEmpty(this.get('attrs'))) {
      var dataAttributes = Object.keys(this.get('attrs')).filter(function(attr) {
        return /data-/.test(attr);
      });
      this.set('dataAttributes', dataAttributes);
    }

    this._super(arguments);
  },
  placeholder: null,
  label: null,
  classNameBindings: ['wrapperClass', 'errorClass'],
  errorClass: Ember.computed('showErrors', 'fmConfig.errorClass', function() {
    if (this.get('showErrors')) {
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
    // only allow ASCII letters and digits, '_', '-', '.'
    // as recommended in MDN
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
    return id.replace(/\s/g, '-').replace(/[^\w-.]/g, '');
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
  shouldShowErrors: Ember.computed('fmConfig.showErrorsByDefault', function() {
    return this.get('fmConfig.showErrorsByDefault');
  }),
  showErrors: Ember.computed('shouldShowErrors', 'errors', function() {
    return this.get('shouldShowErrors') && !Ember.isEmpty(this.get('errors'));
  })
});
