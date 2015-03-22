import {
  moduleForComponent,
  test
} from 'ember-qunit';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';

moduleForComponent('fm-form', {
  setup: function() {
    this.container.inject = this.container.injection;
    initialize(null, this.container);
  }
});

test('renders properly', function(assert) {
  var component = this.subject();
  assert.equal(component._state, 'preRender');
  this.render();
  assert.ok(component.$().hasClass('form-vertical'), 'Has the form-vertical class');
  assert.equal(component._state, 'inDOM');
});

test('it uses allows classNames to be passed in', function(assert) {
  var component = this.subject();
  // This emulates the user passing in a className {{#em-form classNames='form-horizontal'}}
  component.set('classNames', ['ember-view', 'form-horizontal']);
  this.render();
  assert.ok(component.$().hasClass('form-horizontal'), 'Has the form-horizontal class');
  assert.ok(!component.$().hasClass('form-vertical'), 'Does not have the default form-vertical class');
});