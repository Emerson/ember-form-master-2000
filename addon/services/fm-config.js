import Ember from 'ember';

export default Ember.Service.extend({
  submitButtonClass: 'btn btn-primary',
  errorClass: 'has-error',
  wrapperClass: 'form-group',
  labelClass: 'control-label',
  inputClass: 'form-control',
  textareaClass: 'form-control',
  selectClass: 'form-control',
  formClass: 'form-vertical',
  checkboxWrapperClass: 'form-group',
  radioGroupWrapperClass: 'form-group',
  radioClass: 'radio',
  helptextClass: 'help-block',
  errortextClass: 'help-block',

  /*
  *   If true, always show validation errors. If false, wait until some sort of
  *   user interaction on each field before showing errors.
  */
  showErrorsByDefault: true
});
