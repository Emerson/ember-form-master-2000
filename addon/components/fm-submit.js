import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-submit';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['wrapperClass'],
  fmConfig: Ember.inject.service('fm-config'),
  init: function() {
    this._super(this);
    this.set('wrapperClass', this.get('fmConfig.wrapperClass'));
    this.set('submitButtonClasses', this.get('fmConfig.submitButtonClasses').join(' '));
  },
  tagName: 'div'
});
