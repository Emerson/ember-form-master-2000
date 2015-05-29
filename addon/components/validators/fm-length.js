import Ember from 'ember';
export default Ember.Component.extend({

  on: ['blur', 'keyup'],
  message: "The value must be between {min} and {max} characters",

  didInsertElement: function() {
    this.get('parentView').registerValidation(this.validate.bind(this), this.get('on'));
  },

  getMessage: function() {
    var message = this.get('message');
    message = message.replace('{min}', this.get('min'));
    message = message.replace('{max}', this.get('max'));
    return message;
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

  isValid: function(value) {
    return (value && value.length > this.get('min') && value.length < this.get('max'));
  }

});