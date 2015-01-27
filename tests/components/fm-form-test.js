import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';
import {test, moduleForComponent} from 'ember-qunit';

moduleForComponent('fm-form', {}, {
  setup: function(container) {
    container.inject = container.injection;
    initialize(null, container);
  }
});

test('renders properly', function() {
  var component = this.subject();
  this.$();
  ok(component.$().hasClass('form-vertical'), 'Has the form-vertical class');
});

test('it uses allows classNames to be passed in', function() {
  var component = this.subject();
  // This emulates the user passing in a className {{#em-form classNames='form-horizontal'}}
  component.set('classNames', ['ember-view', 'form-horizontal']);
  this.$();
  ok(component.$().hasClass('form-horizontal'), 'Has the form-horizontal class');
  ok(!component.$().hasClass('form-vertical'), 'Does not have the default form-vertical class');
});