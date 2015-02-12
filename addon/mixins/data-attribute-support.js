import Ember from 'ember';

export default Ember.Mixin.create({

  setDataAttributes: function() {
    // TODO: Figure out why the ES6 syntax is not working here
    var _this = this;
    var parentView = _this.get('parentView');
    parentView.get('dataAttributes').forEach(function(attr) {
      _this.get('attributeBindings').push(attr);
      _this.set(attr, _this.get('parentView.' + attr));
    });
  }.observes('parentView.dataAttributes.[]')

});