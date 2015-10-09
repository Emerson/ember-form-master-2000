import Ember from 'ember';

function readPathHelper(params) {
  return Ember.get(params[0], params[1]);
}

var forExport = null;
if(typeof Ember.HTMLBars.makeBoundHelper === 'function') {
  forExport = Ember.Helper.helper(readPathHelper);
}else{
  forExport = Ember.Handlebars.makeBoundHelper(readPathHelper);
}
export default forExport;
