import Ember from 'ember';

function isNotHelper(params) {
  return !params[0];
}

var forExport = null;
if(typeof Ember.HTMLBars.makeBoundHelper === 'function') {
  forExport = Ember.Helper.helper(isNotHelper);
}else{
  forExport = Ember.Handlebars.makeBoundHelper(isNotHelper);
}
export default forExport;
