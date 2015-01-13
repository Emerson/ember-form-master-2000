import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return Ember.RSVP.hash({
      exampleModel: Ember.Object.create(),
      disableSubmit: false,
      selectOptions: [
        {label: 'French', value: 'fr'},
        {label: 'English', value: 'en'},
        {label: 'German', value: 'gr'}
      ]
    });
  },

  actions: {

    submit: function() {
      alert('You triggered a form submit!');
    },

    toggleErrors: function() {
      var model = this.get('currentModel').exampleModel;
      if(model.get('errors')) {
        model.set('errors', null);
      }else{
        var errors = {
          first_name: ['That first name is wrong'],
          last_name: ['That last name is silly'],
          language: ['Please choose a better language']
        };
        model.set('errors', errors);
      }
    },

    toggleSubmit: function() {
      if(this.get('currentModel.disableSubmit')) {
        this.set('currentModel.disableSubmit', false);
      }else{
        this.set('currentModel.disableSubmit', true);
      }
    },

    toggleCheckbox: function() {
      if(this.get('currentModel.exampleModel.isAwesome')) {
        this.set('currentModel.exampleModel.isAwesome', false);
      } else {
        this.set('currentModel.exampleModel.isAwesome', true);
      }
    }

  }

});