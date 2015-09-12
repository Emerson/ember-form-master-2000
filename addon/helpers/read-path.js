import Ember from 'ember';

function readPathHelper(object, path) {
  return Ember.get(object, path);
}

export default Ember.Handlebars.makeBoundHelper(readPathHelper);