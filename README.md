<div align="right">
  <a href="https://travis-ci.org/Emerson/ember-form-master-2000" target="_blank">
    <img src="https://travis-ci.org/Emerson/ember-form-master-2000.svg?branch=master" alt="Build Status">
  </a>
</div>

<p align="center">
  <img src="https://raw.githubusercontent.com/Emerson/ember-form-master-2000/master/addon/assets/form-master-2000.png" alt="FormMaster2000"/>
</p>

<div align="center">
  <h4>A flexible and lightweight ember-cli addon that tries to make forms easier to deal with.</h4>
</div>

----------------------------

### NOTE

This project is in the process of moving towards Ember 2.1. There is still some work to be done, so please have patience.

### Installation

This is an [ember-cli](http://www.ember-cli.com/) addon and can be installed using [npm](https://www.npmjs.org/package/ember-form-master-2000):

```bash
npm install --save-dev ember-form-master-2000
```

### Demo

You can see the basic dummy app here:

  * [Dummy App](http://ember-form-master-2000.emersonlackey.com)
  * [Tests](http://ember-form-master-2000.emersonlackey.com/tests/)

### Basic API

```handlebars
{{#fm-form action='submit'}}

  {{fm-field type='text' value=model.first_name errors=model.errors.first_name label='First Name'}}

  {{fm-field type='password' value=model.password}}

  {{fm-field
    label='Choose Something'
    type='select'
    content=model.selectOptions
    optionValuePath='id'
    optionLabelPath='label'
    prompt='Select Something'
    value=model.valueToSelect
    action=(action (mut model.valueToSelect))
  }}

  {{fm-field
    label='Write an Essay'
    type='textarea'
    value=model.essay
    errors=model.errors.essay
    rows='6'
  }}

  {{fm-checkbox checked=model.exampleModel.isAwesome label='Are you awesome?'}}

  {{fm-radio-group
    label='Choose the best language'
    name='bestLanguage'
    content=model.radioOptions
    optionValuePath='value'
    optionLabelPath='label'
    value=model.exampleModel.bestLanguage
    errors=model.exampleModel.errors.bestLanguage
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

### Minor Customizations

If you need to make minor adjustments to classnames of the elements, you can easily override the default initializer with your own. The default initializer can be found [here](https://github.com/Emerson/ember-form-master-2000/blob/master/app/initializers/ember-form-master-2000.js), which imports the [initialize method form the addon directory](https://github.com/Emerson/ember-form-master-2000/blob/master/addon/initializers/fm-initialize.js).

### Major Customizations

Sometimes you'll want to _really_ customize things. In this case you can leverage the power of Ember-CLI and simply override the default templates provided by Ember-Form-Master-2000. These are all defined [here](https://github.com/Emerson/ember-form-master-2000/tree/master/app/templates/components/ember-form-master-2000). In simple terms, create a folder in your host application `templates/components/ember-form-master-2000/`, copy over the existing templates from this project, and modify to your liking.

### Demo App

You can see a more holistic example by looking at the [Dummy app](https://github.com/Emerson/ember-form-master-2000/tree/master/tests/dummy/app) that we use to test against. The [index.hbs](https://github.com/Emerson/ember-form-master-2000/blob/master/tests/dummy/app/templates/index.hbs) template and the [application route](https://github.com/Emerson/ember-form-master-2000/blob/master/tests/dummy/app/routes/application.js) are of particular interest.
