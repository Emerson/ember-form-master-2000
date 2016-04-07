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

### Overview

Ember Form Master 2000 is an extensible library for creating forms in
Ember.  The library comes out of the box with the standard form components
you would expect and it is easy to add more custom components as
needed.

FM2000's primary entry point is the `fm-field` component.  This is
used to render a form field to the page.  Even when you are making custom
components you will still use `fm-field` to render them.

Every time a field is rendered, it renders a `display` and a `widget`.
`displays` are responible for the layout and css formatting of your form
field.  For example, a using different `display`s you could opt to
render a field using horizontal form style or a stacked form style.
`widgets` are responsible for encapulsating the actual component
that is manipulated.  There are built in widgets for things like
`input` and `textarea` but you could add a custom date picker widget or
a fancy autocomplete widget.  To learn more about creating custom `displays` 
and `widgets` see the **Extending Form Master** below.

#### A Brief Not on What FM2000 is Not

FM2000 is all about rendering interactive forms in a standardized
way with a concise and extensible syntax.  FM2000 is *not* about doing
form validation or managing CRUD logic.

### Built-In Components

The following is the basic API for Ember 2.3+.  The `hash` helper that
is used below is not present in Ember 2.0-2.2. We are currently still supporting
setting the widgetAttrs values for the default widgets directly on the
`fm-field` component.  You can look at aso for those versions just
specifiy `widgetAttrs` directly on the the component.  The supported
attributes for this are listed in the `WIDGET_ATTR_ALIASES` constant in
`addon/components/fm-field.js`.

```handlebars
{{#fm-form action='submit'}}

  {{fm-field
    type='text'
    value=model.first_name
    errors=model.errors.first_name
    label='First Name'}}

  {{fm-field type='password' value=model.password}}

  {{fm-field
    label='Choose Something'
    type='select'
    widgetAttrs=(hash
      content=model.selectOptions
      optionValuePath='id'
      optionLabelPath='label'
      prompt='Select Something'
    )
    value=model.valueToSelect
  }}

  {{fm-field
    type='textarea'
    label='Write an Essay'
    value=model.essay
    errors=model.errors.essay
    widgetAttrs=(hash
      rows='6'
    )
  }}

  {{fm-checkbox
    checked=model.exampleModel.isAwesome
    label='Are you awesome?'
  }}

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

### Extending Form Master

There are two ways to extend form-master's built in functionality.

#### Widgets

Widgets are responsible for creating a UI object to manipulate some
data. Form-master provides some builtin widgets such as `select`, `textarea` and
`radio-group`.  Note that some widgets are interchangeable for the same
type of data.  Both a `textarea` and `input` work well for manipulating
a string attribute.  Similarly, a selection from a predefined list could
be done with either a `select` or a `radio-group` widget.

You can easily override any of the existing widgets to augment or modify
their functionality.

**Widgets should do as little as possible to affect their appearance**.
They should not specify css classes and should contain as little dom in
their templates as is necessary for them to function.  For an example of
this, look at how `fm-widgets/checkbox` contains only the checkbox
element itself and the `label` and surrounding divs are in the
`fm-displays/checkbox` component.

You can also create your own custom widgets. For instance, you may want to
create an autocompleting text input.  This would be easily done by creating
a new component called `fm-widgets/autocomplete`.
You would then be able to create a field
with an autocomplete widget as follows:

```
{{fm-field
  widget='autocomplete'
  value=value
  widgetAttrs=(hash
    choices=autocompleteChoices
    placeholder=placeholder
  )
}}
```

The `fm-field` component will take care of adding labels, errors and
formatting classes around your autocomplete widget.  Meanwhile your
autocomplete widget can focus solely on adding the extra autocomplete
functionality you want.

You can create custom form widgets easily.  Simply create a new
component named as `fm-widgets/<your widget name>`. A widget will
receive the following attrs:

- `value`: the current value of the input.

- `action` (optional): action to call with a new value chosen through
  user interaction with the widget. If you do not want to support
  actions-up/data-down design you can modify `value` directly and ignore
  `action`.

- `widgetAttrs`: an Ember.Object which is used as a vessel to pass any
  custom values for your widget.  For instance a select, widget would
  look for the choices, labelField and valueField properties in the
  `widgetAttrs` property.

- `onUserInteraction`: your custom widget needs to call this action
  whenever it is manipulated. This lets `fm-field` know when it should
  show errors on the form field.

- `classNames`: allows the `fm-field's` display component to add certain
  standard css classes.

#### Displays

Displays let you customize the aesthetics of a form field.  For
instance, you may want to create a display where the fields label and
inputs appear in rows.  You could do this by creating a component
called `fm-displays/horizontal`. Your
`templates/components/fm-displays/horizontal.hbs` might look like this:

```
<div class="{{styles.wrapperClass}}">
  <label for="{{forAttribute}}" class="col-sm-2 {{styles.labelClass}}">
    {{label}}
  </label>
  <div class="col-sm-10">
    {{yield inputClasses}}
  </div>

  {{#if visibleErrors.length}}
    <span class="{{styles.errortextClass}}">
      {{visibleErrors.firstObject}}
    </span>
  {{/if}}

  {{#if helptext}}
    <span class="{{styles.helptextClass}}">
      {{helptext}}
    </span>
  {{/if}}
</div>
```

This widget will be included wherever you place the `yield` statement.
The `inputClasses` attribute is passed to the `yield` statement to
specify classes that should be applied to the widget itself.

You can now use this display anywhere in your application by simply specifying
the layout when creating an `fm-field`:

```
{{fm-field
  display='horizontal'
  widget='input'
  value=myValue
  errors=errors
  placholder=placehodler
}}
```

Note how we defer to `styles` property for class names where possible.
This ties in the `fmConfig` service which provides easy configuration of
form classes on a global basis.

The best place to start for creating a display is to look at
`fm-displays/default.hbs`.

### Errors

Displaying validation errors is a core requirement for any form library.
To keep things simple, you must explicitly tell fm-fields what errors
should be displayed.  When provided an array of errors,
`fm-field` will display the first error.

```
var model = Ember.Object.create();
model.set('errors', Ember.Object.create({first_name: ['Required', 'Too short']}));

{{fm-field type='text' value=model.first_name errors=model.errors.first_name}}
```

### Minor Customizations

If you need to make minor adjustments to classnames of the elements, you can easily override the default initializer with your own. The default initializer can be found [here](https://github.com/Emerson/ember-form-master-2000/blob/master/app/initializers/ember-form-master-2000.js), which imports the [initialize method form the addon directory](https://github.com/Emerson/ember-form-master-2000/blob/master/addon/initializers/fm-initialize.js).

### Demo App

You can see a more holistic example by looking at the [Dummy app](https://github.com/Emerson/ember-form-master-2000/tree/master/tests/dummy/app) that we use to test against. The [index.hbs](https://github.com/Emerson/ember-form-master-2000/blob/master/tests/dummy/app/templates/index.hbs) template and the [application route](https://github.com/Emerson/ember-form-master-2000/blob/master/tests/dummy/app/routes/application.js) are of particular interest.
