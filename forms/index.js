// import in caolan forms
const forms = require("forms");
// create some shortcuts
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;

const bootstrapField = function (name, object) {
  if (!Array.isArray(object.widget.classes)) {
    object.widget.classes = [];
  }

  if (object.widget.classes.indexOf('form-control') === -1) {
    object.widget.classes.push('form-control');
  }

  var validationclass = object.value && !object.error ? 'is-valid' : '';
  validationclass = object.error ? 'is-invalid' : validationclass;
  if (validationclass) {
    object.widget.classes.push(validationclass);
  }

  const label = object.labelHTML(name);
  const error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

  const widget = object.widget.toHTML(name, object);
  return '<div class="form-group">' + label + widget + error + '</div>';
};

const createProductForm = (types, sizes) => {
  return forms.create({
    'name': fields.string({
      'required': true,
      'errorAfterField': true,
      'cssClasses': {
        label: ['form-label']
      }
    }),
    'cost': fields.string({
      'required': true,
      'errorAfterField': true,
      'cssClasses': {
        'label': ['form-label']
      },
      'validators': [validators.integer()]
    }),
    'image': fields.string({
      'required': true,
      'errorAfterField': true,
      'cssClasses': {
        'label': ['form-label']
      }
    }),
    'description': fields.string({
      'required': true,
      'errorAfterField': true,
      'cssClasses': {
        'label': ['form-label']
      }
    }),
    'ingredient': fields.string({
      'required': true,
      'errorAfterField': true,
      'cssClasses': {
        'label': ['form-label']
      }
    }),
    'source': fields.string({
      'required': true,
      'errorAfterField': true,
      'cssClasses': {
        'label': ['form-label']
      }
    }),
    'type_id': fields.string({
      'label': 'Type',
      'required': true,
      'errorAfterField': true,
      'cssClasses': {
        'label': ['form-label']
      },
      'widget': widgets.select(),
      'choices': types
    }),
    'sizes': fields.string({
      'required': true,
      'errorAfterField': true,
      'cssClasses': {
        'label': ['form-label']
      },
      'widget': widgets.multipleSelect(),
      'choices': sizes
    })
  })
};

module.exports = {
  createProductForm,
  bootstrapField
};