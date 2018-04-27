import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions';

class Posts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.actions.fetchPosts();
  }
  render() {
    return (
      <div>Here are all my posts: {this.props.allPosts}</div>
    );
  }
}

const mapStateToProps = state => (
  {
    allPosts: state.posts.all,
  }
);

// react-redux glue -- outputs Container that knows how to call actions
// new way to connect with react router 4
export default withRouter(connect(mapStateToProps, actions)(Posts));
