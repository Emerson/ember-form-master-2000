import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-helptext';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNameBindings: ['helptextClass'],
  fmConfig: Ember.inject.service('fm-config'),
  helptextClass: Ember.computed.reads('fmConfig.helptextClass')
});
