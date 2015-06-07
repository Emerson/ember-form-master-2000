import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return Ember.RSVP.hash({
      exampleModel: Ember.Object.create(),
      disableSubmit: false,
      selectedLanguage: null,
      selectOptions: Ember.A([
        {label: 'French', value: 'fr'},
        {label: 'English', value: 'en'},
        {label: 'German', value: 'gr'}
      ]),
      radioOptions: Ember.A([
        {label: 'Ruby', value: 'ruby'},
        {label: 'Javascript', value: 'js'},
        {label: 'Cold Fusion', value: 'cf'}
      ])
    });
  },

  actions: {

    submit: function() {
      window.alert('You triggered a form submit!');
    },

    toggleErrors: function() {
      var model = this.get('currentModel').exampleModel;
      if(model.get('errors')) {
        model.set('errors', null);
      }else{
        var errors = {
          first_name: ['That first name is wrong'],
          last_name: ['That last name is silly'],
          language: ['Please choose a better language'],
          isAwesome: ['You must be awesome to submit this form'],
          bestLanguage: ['Wrong, Cold Fusion is the best language'],
          essay: ['This essay is not very good']
        };
        model.set('errors', errors);
      }
    },

    toggleSelectValue: function() {
      if(this.get('currentModel.exampleModel.language')) {
        this.set('currentModel.exampleModel.language', null);
      }else{
        this.set('currentModel.exampleModel.language', 'fr');
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
    },

    toggleRadio: function() {
      if(this.get('currentModel.exampleModel.bestLanguage')) {
        this.set('currentModel.exampleModel.bestLanguage', null);
      }else{
        this.set('currentModel.exampleModel.bestLanguage', 'js');
      }
    }

  }

});
