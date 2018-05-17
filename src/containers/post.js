import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

import { fetchPost, updatePost, deletePost } from '../actions';
import uploadImage from '../s3';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editingTitle: '',
      editingContent: '',
      editingTags: '',
      // editingCoverURL: '',
      preview: '',
      file: {},
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    // this.onCoverURLChange = this.onCoverURLChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
  }
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }
  onEditClick(event) {
    this.setState({
      isEditing: true,
      editingTitle: this.props.post.title,
      editingContent: this.props.post.content,
      editingTags: this.props.post.tags,
      // editingCoverURL: this.props.post.cover_url,
    });
  }
  onSaveClick(event) {
    if (this.state.file) {
      uploadImage(this.state.file).then((url) => {
        // use url for content_url and
        // either run your createPost actionCreator
        // or your updatePost actionCreator
        const post = {
          title: this.state.editingTitle,
          content: this.state.editingContent,
          tags: this.state.editingTags,
          cover_url: url,
          x: this.props.post.x,
          y: this.props.post.y,
        };
        this.setState({
          isEditing: false,
        });
        this.props.updatePost(this.props.match.params.postID, post);
      }).catch((error) => {
        console.log('error with upload image');
      });
    }
  }
  onDeleteClick(event) {
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }
  onTitleChange(event) {
    this.setState({ editingTitle: event.target.value });
  }
  onContentChange(event) {
    this.setState({ editingContent: event.target.value });
  }
  onTagsChange(event) {
    this.setState({ editingTags: event.target.value });
  }
  // onCoverURLChange(event) {
  //   this.setState({ editingCoverURL: event.target.value });
  // }
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
  renderPost() {
    if (this.state.isEditing) {
      return (
        <div id="input-area">
          <h3>Editing Post</h3>
          <input className="input" placeholder="Edit Title" onChange={this.onTitleChange} value={this.state.editingTitle} />
          <img id="preview" alt="preview" src={this.state.preview} />
          <input type="file" name="coverImage" onChange={this.onImageUpload} />
          <Textarea className="input textarea" placeholder="Edit Content" onChange={this.onContentChange} value={this.state.editingContent} />
          <input className="input" placeholder="Edit Tags" onChange={this.onTagsChange} value={this.state.editingTags} />
          <div>
            <button className="button" type="button" name="button" onClick={this.onSaveClick}>Save Post</button>
            <button className="button margin-left" type="button" name="button" onClick={this.onDeleteClick}>Delete Post</button>
          </div>
        </div>
      );
    } else if (this.props.authenticated) {
      return (
        <div id="post-page">
          <p id="post-title">{this.props.post.title}</p>
          <img src={this.props.post.cover_url} alt="Cover URL" />
          <div dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
          <div id="tags">{this.props.post.tags}</div>
          <p>Author: {this.props.post.username}</p>
          <div className="bottom-buttons">
            <button className="button" type="button" name="button" onClick={this.onEditClick}>Edit Post</button>
            <button className="button margin-left" type="button" name="button" onClick={this.onDeleteClick}>Delete Post</button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="post-page">
          <p id="post-title">{this.props.post.title}</p>
          <img src={this.props.post.cover_url} alt="Cover URL" />
          <div dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
          <div id="tags">{this.props.post.tags}</div>
          <p>Author: {this.props.post.username}</p>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        {this.renderPost()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    post: state.posts.post,
    authenticated: state.auth.authenticated,
  }
);

// react-redux glue -- outputs Container that knows how to call actions
  // new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { fetchPost, updatePost, deletePost })(Post));
