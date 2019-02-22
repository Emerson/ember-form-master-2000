import { helper } from '@ember/component/helper';

function isEqualHelper(params) {
  return params[0] === params[1];
}

export default helper(isEqualHelper);
