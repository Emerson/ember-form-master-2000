import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  styles: inject('fm-config'),
  inputClasses: computed('styles.{errorClass,inputClass}', 'visibleErrors', function() {
    let classNames = [];
    if (this.formControlClass) {
      classNames.push('formControlClass')
    } else {
      classNames.push('styles.inputClass')
    }
    let visibleErrors = this.visibleErrors;
    if(visibleErrors && visibleErrors.length > 0) {
      classNames.push('styles.errorClass');
    }
    return classNames.map(classPropertyName => this.get(classPropertyName));
  })

});
