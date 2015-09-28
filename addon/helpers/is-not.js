import Ember from 'ember';

function isNotHelper(first) {
  return !first;
}

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(isNotHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(isNotHelper);
} else if (Ember.Handlebars.makeBoundHelper) {
  Ember.Handlebars.makeBoundHelper(isNotHelper)
}

export default forExport;