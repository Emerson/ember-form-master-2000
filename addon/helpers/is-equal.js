import Ember from 'ember';

function isEqualHelper(first, second) {
  return first === second;
}

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(isEqualHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(isEqualHelper);
} else if (Ember.Handlebars.makeBoundHelper) {
  Ember.Handlebars.makeBoundHelper(isEqualHelper)
}

export default forExport;