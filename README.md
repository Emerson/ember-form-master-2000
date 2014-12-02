# Ember FormMaster2000

A flexible and lightweight ember-cli addon will eventually make forms easier to deal with.

### Basic API

```
{{#fm-form for=model action='submit'}}

  {{fm-field type='text' value=model.first_name errors=model.errors.first_name label='First Name'}}

  {{fm-field type='password' value=model.password}}

  {{fm-submit value='Create'}}

{{/fm-form}}
```

### Errors

Displaying validation errors is a core requirement for any form library. To keep things simple, you must explicitly tell fields where to look for errors. When provided an array of errors, `fm-field` will display the first error.

```
var model = Ember.Object.create();
model.set('errors', Ember.Object.create({first_name: ['Required', 'Too short']}));

{{fm-field type='text' value=model.first_name errors=model.errors.first_name}}
```
