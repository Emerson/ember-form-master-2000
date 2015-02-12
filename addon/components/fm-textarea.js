import Ember from 'ember';
import DataAttributesSupport from 'ember-form-master-2000/mixins/data-attribute-support';

export default Ember.TextArea.extend(DataAttributesSupport, {

  init: function() {
    this._super(arguments);
    this.setDataAttributes();
  }

});