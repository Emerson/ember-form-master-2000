import Ember from 'ember';

const {inject, computed} = Ember;

export default Ember.Component.extend({
  tagName: '',
  styles: inject.service('fm-config'),
  inputClasses: computed('styles.errorClass', 'styles.inputClass', function(){
    return ['styles.errorClass', 'styles.inputClass'].map(x => this.get(x));
  })
});
