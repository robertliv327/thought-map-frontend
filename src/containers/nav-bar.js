import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import { signoutUser } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }
  signOut(event) {
    this.props.signoutUser(this.props.history);
  }
  renderNav() {
    if (this.props.authenticated) {
      return (
        <nav id="nav">
          <ul className="navlinks">
            <li><NavLink exact to="/" className="navlink title">Thought Map</NavLink></li>
            <li>
              <NavLink to="/posts/new" className="navlink">
                <button className="button" type="button" name="button">Add a Pin</button>
              </NavLink>
              <button className="button margin-left" type="button" name="button" onClick={this.signOut}>Sign Out</button>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav id="nav">
          <ul className="navlinks">
            <li><NavLink exact to="/" className="navlink title">Thought Map</NavLink></li>
            <li>
              <NavLink to="/posts/new" className="navlink">
                <button className="button" type="button" name="button">Add a Pin</button>
              </NavLink>
              <NavLink to="/signin" className="navlink">
                <button className="button margin-left" type="button" name="button">Sign In</button>
              </NavLink>
              <NavLink to="/signup" className="navlink">
                <button className="button margin-left" type="button" name="button">Sign Up</button>
              </NavLink>
            </li>
          </ul>
        </nav>
      );
    }
  }
  render() {
    return (
      <div>
        {this.renderNav()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

// react-redux glue -- outputs Container that knows how to call actions
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
