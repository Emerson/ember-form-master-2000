export function initialize(container, application) {
  var config = {
    submitButtonClasses: ['btn', 'btn-primary'],
    errorClass: 'has-error',
    wrapperClass: 'form-group',
    labelClass: 'control-label',
    inputClass: 'form-control',
    formClass: 'form-horizontal'
  };
  application.register('fmconfig:main', config, { instantiate: false });
  application.inject('component', 'fmconfig', 'fmconfig:main');
}