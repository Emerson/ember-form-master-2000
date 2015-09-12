import Ember from 'ember';

function isNotHelper(first) {
  return !first;
}

export default Ember.Handlebars.makeBoundHelper(isNotHelper);