# Ember FormMaster2000

A flexible and lightweight ember-cli addon will eventually make forms easier to deal with.

### API

```
{{#fm-form for=model action='submit'}}

  {{fm-field type='text' value=model.first_name errors=model.errors.first_name label='First Name'}}

  {{fm-field type='password' value=model.password}}

  {{fm-submit value='Create'}}

{{/fm-form}}
```