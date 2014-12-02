import Ember from 'ember';

if(Ember.libraries) {
  Ember.libraries.register('Ember Form Master 2000', '0.0.1');
}

export default {
  name: 'ember-form-master-2000',
  initialize: function(container, application) {
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
};