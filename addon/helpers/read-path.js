import Ember from 'ember';

function readPathHelper(object, path) {
  return Ember.get(object, path);
}

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(readPathHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(readPathHelper);
} else if (Ember.Handlebars.makeBoundHelper) {
  Ember.Handlebars.makeBoundHelper(readPathHelper)
}

export default forExport;