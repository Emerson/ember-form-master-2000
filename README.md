<div align="right">
  <img src="https://travis-ci.org/Emerson/ember-form-master-2000.svg?branch=master" alt="Build Status">
</div>

<p align="center">
  <img src="https://raw.githubusercontent.com/Emerson/ember-form-master-2000/master/addon/assets/form-master-2000.png" alt="FormMaster2000"/>
</p>

<div align="center">
  <h4>A flexible and lightweight ember-cli addon that will <em>(eventually)</em> make forms easier to deal with.</h4>
</div>

----------------------------

### Installation

This is an [ember-cli](http://www.ember-cli.com/) addon and can be installed using [npm](https://www.npmjs.org/package/ember-form-master-2000):

```bash
npm install --save-dev ember-form-master-2000
```

### Basic API

```handlebars
{{#fm-form for=model action='submit'}}

  {{fm-field type='text' value=model.first_name errors=model.errors.first_name label='First Name'}}

  {{fm-field type='password' value=model.password}}

  {{fm-field 
    label='Choose Something' 
    type='select'
    content=model.selectOptions
    optionValuePath='content.id'
    optionLabelPath='content.label'
    prompt='Select Something'
  }}

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
