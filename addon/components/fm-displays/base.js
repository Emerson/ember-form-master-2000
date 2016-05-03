import Ember from 'ember';

const {inject, computed} = Ember;

export default Ember.Component.extend({
  tagName: '',
  styles: inject.service('fm-config'),
  inputClasses: computed('styles.errorClass', 'styles.inputClass', function(){
    let classNames = ['styles.inputClass'];
    let visibleErrors = this.get('visibleErrors');
    if(visibleErrors && visibleErrors.length > 0) {
      classNames.push('styles.errorClass');
    }
    return classNames.map(x => this.get(x));
  })
});
