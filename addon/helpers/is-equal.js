import Ember from 'ember';

function isEqualHelper(params) {
  return params[0] === params[1];
}

var forExport = null;
if(typeof Ember.HTMLBars.makeBoundHelper === 'function') {
  forExport = Ember.Helper.helper(isEqualHelper);
}else{
  forExport = Ember.Handlebars.makeBoundHelper(isEqualHelper);
}
export default forExport;
