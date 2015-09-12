import Ember from 'ember';

function isEqualHelper(first, second) {
  return first === second;
}

export default Ember.Handlebars.makeBoundHelper(isEqualHelper);