import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPosts } from '../actions';
import Pin from './pin';

class Posts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      // need these containers to get things centered correctly...
      <div id="big-container">
        <div id="map-container">
          <div id="map">
            {this.props.allPosts.map(post => (
              <Pin key={post.id} x={post.x} y={post.y} post={post} />
            ))}
          </div>
        </div>
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
