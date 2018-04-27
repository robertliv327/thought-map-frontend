import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPosts } from '../actions';

class Posts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <div>
        {this.props.allPosts.map(post => (
          <div className="card">
            <img src={post.cover_url} alt="pic" />
            <div key={post.id}>{post.title}</div>
          </div>
        ))}
      </div>
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
export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
