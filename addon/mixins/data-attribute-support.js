import Ember from 'ember';

export default Ember.Mixin.create({

  setDataAttributes: Ember.observer('parentView.dataAttributes.[]', function() {
    var dataAttributes = this.get('parentView.dataAttributes');
    if(Ember.isArray(dataAttributes)) {
      dataAttributes.forEach((attr)=> {
        this.get('attributeBindings').push(attr);
        this.set(attr, this.get('parentView.' + attr));
      });
    }
  })

});
