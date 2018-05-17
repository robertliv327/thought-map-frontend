import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';

import { createPost } from '../actions';
import uploadImage from '../s3';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestedTitle: '',
      requestedContent: '',
      requestedTags: '',
      // requestedCoverURL: '',
      preview: '',
      file: {},
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    // this.onCoverURLChange = this.onCoverURLChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
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
  // onCoverURLChange(event) {
  //   this.setState({ requestedCoverURL: event.target.value });
  // }
  onSubmit(event) {
    if (this.state.file) {
      uploadImage(this.state.file).then((url) => {
        // use url for content_url and
        // either run your createPost actionCreator
        // or your updatePost actionCreator
        const post = {
          title: this.state.requestedTitle,
          content: this.state.requestedContent,
          tags: this.state.requestedTags,
          cover_url: url,
          x: 30,
          y: 0,
        };
        this.props.createPost(post, this.props.history);
      }).catch((error) => {
        console.log('error with upload image');
      });
    }
  }
  onImageUpload(event) {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      this.setState({
        preview: window.URL.createObjectURL(file),
        file,
      });
    }
  }
  render() {
    return (
      // <input className="input" placeholder="Image URL" onChange={this.onCoverURLChange} value={this.state.requestedCoverURL} />
      <div id="input-area">
        <h3>Create a New Post</h3>
        <input className="input" placeholder="Title" onChange={this.onTitleChange} value={this.state.requestedTitle} />
        <img id="preview" alt="preview" src={this.state.preview} />
        <input type="file" name="coverImage" onChange={this.onImageUpload} />
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
