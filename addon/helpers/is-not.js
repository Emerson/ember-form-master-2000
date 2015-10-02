import Ember from 'ember';

function oldIsNotHelper(first) {
  return !first;
}

function isNotHelper(params) {
  return !params[0];
}

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(isNotHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(isNotHelper);
} else if (Ember.Handlebars.makeBoundHelper) {
  Ember.Handlebars.makeBoundHelper(oldIsNotHelper)
}

export default forExport;