import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPost, updatePost, deletePost } from '../actions';

const Post = (props) => {
  return (
    <div>Here is a post</div>
  );
};

// react-redux glue -- outputs Container that knows how to call actions
  // new way to connect with react router 4
export default withRouter(connect(null, { fetchPost, updatePost, deletePost })(Post));
