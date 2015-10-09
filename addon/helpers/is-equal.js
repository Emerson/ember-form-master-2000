import Ember from 'ember';

function oldIsEqualHelper(first, second) {
  return first === second;
}

function isEqualHelper(params) {
  return params[0] === params[1];
}

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(isEqualHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(isEqualHelper);
} else if (Ember.Handlebars.makeBoundHelper) {
  Ember.Handlebars.makeBoundHelper(oldIsEqualHelper)
}

export default forExport;