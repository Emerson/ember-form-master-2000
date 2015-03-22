import Ember from 'ember';

export default Ember.Mixin.create({

  setDataAttributes: function() {
    var parentView = this.get('parentView');
    parentView.get('dataAttributes').forEach((attr)=> {
      this.get('attributeBindings').push(attr);
      this.set(attr, this.get('parentView.' + attr));
    });
  }.observes('parentView.dataAttributes.[]')

});