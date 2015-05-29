import Ember from 'ember';
export default Ember.Component.extend({

  on: ['blur', 'keyup'],
  message: 'This is a required field',

  didInsertElement: function() {
    this.get('parentView').registerValidation(this.validate.bind(this), this.get('on'));
  },

  validate: function(value) {
    var model = this.get('parentView.parentView.model');
    var property = this.get('parentView.for');
    if(model) {
      if(!model.get('errors')) {
        model.set('errors', Ember.Object.create());
        model.set('errors.' + property, Ember.A([]));
      }
      if(!this.isValid(value)) {
        model.get('errors.' + property).addObject(this.getMessage());
      }else{
        model.get('errors.' + property).removeObject(this.getMessage());
      }
      model.get('errors').notifyPropertyChange();
    }
  },

  getMessage: function() {
    return this.get('message');
  },

  isValid: function(value) {
    return (value && value.length !== 0);
  }

});