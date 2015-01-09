import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return Ember.RSVP.hash({
      selectOptions: [
        {label: 'French', value: 'fr'},
        {label: 'English', value: 'en'},
        {label: 'German', value: 'gr'}
      ]
    });
  }

});