import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  onSubmit(event) {
    const user = {
      email: this.state.username,
      password: this.state.password,
    };
    console.log(user.u);
    this.props.signupUser(user, this.props.history);
  }
  render() {
    return (
      <div id="input-area">
        <h3>Please Sign Up:</h3>
        <input className="input" placeholder="Username" onChange={this.onUsernameChange} value={this.state.username} />
        <input className="input" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
        <button className="button small" type="button" name="button" onClick={this.onSubmit}>Sign Up</button>
      </div>
    );
  }
}

// react-redux glue -- outputs Container that knows how to call actions
// new way to connect with react router 4
export default withRouter(connect(null, { signupUser })(SignUp));
