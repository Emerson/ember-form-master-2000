import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('fm-field', 'Unit | Component | fm field', {
  unit: true
});

test('generate safe id', function(assert) {
  const component = this.subject();
  assert.equal(
    component.generateSafeId('abcABC'),
    'abcABC',
    'ASCII letters aren\'t removed'
  );
  assert.equal(
    component.generateSafeId('123'),
    '123',
    'numbers aren\'t removed'
  );
  assert.equal(
    component.generateSafeId('_-.'),
    '_-.',
    'underscore, hyphen and dot aren\'t removed'
  );
  assert.equal(
    component.generateSafeId('a b c'),
    'a-b-c',
    'whitespaces and tabs are replaced by hyphen'
  );
  assert.equal(
    component.generateSafeId('a?b!c"d#eäfßg'),
    'abcdefg',
    'non ASCII characters are removed'
  );
});
