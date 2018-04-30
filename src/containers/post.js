import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

import { fetchPost, updatePost, deletePost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editingTitle: '',
      editingContent: '',
      editingTags: '',
      editingCoverURL: '',
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onCoverURLChange = this.onCoverURLChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
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
      editingCoverURL: this.props.post.cover_url,
    });
  }
  onSaveClick(event) {
    const post = {
      title: this.state.editingTitle,
      content: this.state.editingContent,
      tags: this.state.editingTags,
      cover_url: this.state.editingCoverURL,
    };
    this.setState({
      isEditing: false,
      editingTitle: '',
      editingContent: '',
      editingTags: '',
      editingCoverURL: '',
    });
    this.props.updatePost(this.props.match.params.postID, post);
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
  onCoverURLChange(event) {
    this.setState({ editingCoverURL: event.target.value });
  }
  renderNote() {
    if (this.state.isEditing) {
      // render note in editing mode... with textarea and input fields in place of title and text
      return (
        <div className="post-page">
          <div className="post-content">
            <input className="input" placeholder="Edit Cover URL" onChange={this.onCoverURLChange} value={this.state.editingCoverURL} />
            <input className="input" placeholder="Edit Title" onChange={this.onTitleChange} value={this.state.editingTitle} />
            <Textarea className="input textarea" placeholder="Edit Content" onChange={this.onContentChange} value={this.state.editingContent} />
            <input className="input" placeholder="Edit Tags" onChange={this.onTagsChange} value={this.state.editingTags} />
          </div>
          <button className="button" type="button" name="button" onClick={this.onDeleteClick}>Delete Post</button>
          <button className="button" type="button" name="button" onClick={this.onSaveClick}>Save Post</button>
        </div>
      );
    } else {
      // render note as normal
      return (
        <div className="post-page">
          <div className="post-content">
            <img src={this.props.post.cover_url} alt="Cover URL" />
            <div>{this.props.post.title}</div>
            <div dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
            <div>{this.props.post.tags}</div>
          </div>
          <button className="button" type="button" name="button" onClick={this.onDeleteClick}>Delete Post</button>
          <button className="button" type="button" name="button" onClick={this.onEditClick}>Edit Post</button>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        {this.renderNote()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    post: state.posts.post,
  }
);

// react-redux glue -- outputs Container that knows how to call actions
  // new way to connect with react router 4
export default withRouter(connect(mapStateToProps, { fetchPost, updatePost, deletePost })(Post));
