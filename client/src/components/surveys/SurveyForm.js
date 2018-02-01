import _ from "lodash";
import React, { Component } from "react";

import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ name, label }) => (
      <Field
        key={name}
        component={SurveyField}
        type="text"
        label={label}
        name={name}
      />
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <button className="teal btn-flat right white-text">
            Next <i className="material-icons right">done</i>
          </button>
          <Link className="red btn-flat white-text" to="/surveys">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  _.forEach(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide ${name}!`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  destroyOnUnmount: false,
  form: "surveyForm"
})(SurveyForm);
