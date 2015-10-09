import Ember from 'ember';

function oldReadPathHelper(object, path) {
  return Ember.get(object, path);
}

function readPathHelper(params) {
  return Ember.get(params[0], params[1]);
}

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(readPathHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(readPathHelper);
} else if (Ember.Handlebars.makeBoundHelper) {
  Ember.Handlebars.makeBoundHelper(oldReadPathHelper)
}

export default forExport;