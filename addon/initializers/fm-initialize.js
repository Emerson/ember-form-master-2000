export function initialize(container, application, overrides) {
  var config = {
    submitButtonClasses: ['btn', 'btn-primary'],
    errorClass: 'has-error',
    wrapperClass: 'form-group',
    labelClass: 'control-label',
    inputClass: 'form-control',
    selectClass: 'form-control',
    formClass: 'form-horizontal',
    checkboxWrapperClass: 'form-group',
    radioGroupWrapperClass: 'form-group',
    radioClass: 'radio'
  };
  if(typeof overrides !== 'undefined') {
    for(var attr in overrides) {
      config[attr] = overrides[attr];
    }
  }
  application.register('fmconfig:main', config, { instantiate: false });
  application.inject('component', 'fmconfig', 'fmconfig:main');
}