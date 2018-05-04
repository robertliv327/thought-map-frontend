import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';

import { createPost } from '../actions';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestedTitle: '',
      requestedContent: '',
      requestedTags: '',
      requestedCoverURL: '',
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onCoverURLChange = this.onCoverURLChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onTitleChange(event) {
    this.setState({ requestedTitle: event.target.value });
  }
  onContentChange(event) {
    this.setState({ requestedContent: event.target.value });
  }
  onTagsChange(event) {
    this.setState({ requestedTags: event.target.value });
  }
  onCoverURLChange(event) {
    this.setState({ requestedCoverURL: event.target.value });
  }
  onSubmit(event) {
    const post = {
      title: this.state.requestedTitle,
      content: this.state.requestedContent,
      tags: this.state.requestedTags,
      cover_url: this.state.requestedCoverURL,
      x: 30,
      y: 0,
    };
    this.props.createPost(post, this.props.history);
  }
  render() {
    return (
      <div id="input-area">
        <h3>Create a New Post</h3>
        <input className="input" placeholder="Title" onChange={this.onTitleChange} value={this.state.requestedTitle} />
        <input className="input" placeholder="Image URL" onChange={this.onCoverURLChange} value={this.state.requestedCoverURL} />
        <Textarea className="input textarea" placeholder="Content" onChange={this.onContentChange} value={this.state.requestedContent} />
        <input className="input" placeholder="Tags" onChange={this.onTagsChange} value={this.state.requestedTags} />
        <button className="button small" type="button" name="button" onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

// react-redux glue -- outputs Container that knows how to call actions
// new way to connect with react router 4
export default withRouter(connect(null, { createPost })(NewPost));
