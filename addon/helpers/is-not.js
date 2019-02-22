import { helper } from '@ember/component/helper';

function isNotHelper(params) {
  return !params[0];
}

export default helper(isNotHelper);
