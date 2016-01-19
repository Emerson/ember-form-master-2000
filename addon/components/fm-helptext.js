import Ember from 'ember';
import layout from '../templates/components/ember-form-master-2000/fm-helptext';

const {inject, computed} = Ember;
const {reads} = computed;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNameBindings: ['helptextClass'],
  fmConfig: inject.service('fm-config'),
  helptextClass: reads('fmConfig.helptextClass')
});
