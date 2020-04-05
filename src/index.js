// Edited from https://goshakkk.name/instant-form-fields-validation-react/
import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

function validateMail(email) {
  // check email valide par regex
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validate(email, password) {
  // true means invalid, so our conditions got reversed

  let isValideMail = validateMail(email);
  let msgMail = null;
  let msgPassword = null;

  if (email.length === 0) {
    msgMail = "Email required";
  } else if (!isValideMail) {
    msgMail = "Email not valid pls";
  }

  if (password.length === 0) {
    msgPassword = "Password required";
  }
  return {
    email: msgMail,
    password: msgPassword
  };
}

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",

      touched: {
        email: false,
        password: false
      },

      errors: {
        email: "",
        password: ""
      }
    };
  }

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { email, password } = this.state;
    alert(`Signed up with email: ${email} password: ${password}`);
  };

  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return shouldShow ? hasError : null;
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className={shouldMarkError("email") ? "error" : ""}
          type="text"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          onBlur={this.handleBlur("email")}
        />
        {shouldMarkError("email")}
        <input
          className={shouldMarkError("password") ? "error" : ""}
          type="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          onBlur={this.handleBlur("password")}
        />
        {shouldMarkError("password")}
        <button disabled={isDisabled}>Sign up</button>
      </form>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<SignUpForm />, rootElement);
