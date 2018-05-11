import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Draggable from 'react-draggable';

import { updatePost } from '../actions';

class Pin extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      x: nextProps.x,
      y: nextProps.y,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      x: this.props.post.x,
      y: this.props.post.y,
    };
    this.onHover = this.onHover.bind(this);
    this.offHover = this.offHover.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStop = this.onStop.bind(this);
  }
  onDrag(e, ui) {
    this.setState({ x: ui.x, y: ui.y });
  }
  onStop(e, ui) {
    this.setState({ x: ui.x, y: ui.y });
    const post = {
      title: this.props.post.title,
      content: this.props.post.content,
      tags: this.props.post.tags,
      cover_url: this.props.post.cover_url,
      x: this.state.x,
      y: this.state.y,
    };
    this.props.updatePost(this.props.post.id, post);
  }
  onHover() {
    this.setState({ isHovering: true });
  }
  offHover() {
    this.setState({ isHovering: false });
  }
  renderPin() {
    if (this.state.isHovering) {
      if (this.props.authenticated) {
        return (
          <div>
            <i className="pin-mover fa fa-arrows-alt" />
            <NavLink className="pin" to={`/posts/${this.props.post.id}`} onMouseOver={this.onHover} onMouseOut={this.offHover}>
              <div className="pin-text">
                <h4>{this.props.post.title}<br />{this.props.post.tags}</h4>
              </div>
              <img className="img-responsive tint" src={this.props.post.cover_url} alt="Cover URL" />
            </NavLink>
          </div>
        );
      } else {
        return (
          <div>
            <NavLink className="pin" to={`/posts/${this.props.post.id}`} onMouseOver={this.onHover} onMouseOut={this.offHover}>
              <div className="pin-text">
                <h4>{this.props.post.title}<br />{this.props.post.tags}</h4>
              </div>
              <img className="img-responsive tint" src={this.props.post.cover_url} alt="Cover URL" />
            </NavLink>
          </div>
        );
      }
    } else if (this.props.authenticated) {
      return (
        <div>
          <i className="pin-mover fa fa-arrows-alt" />
          <NavLink className="small-pin" to={`/posts/${this.props.post.id}`} onMouseOver={this.onHover} onMouseOut={this.offHover}>
            <img src={this.props.post.cover_url} alt="Cover URL" />
          </NavLink>
        </div>
      );
    } else {
      return (
        <div>
          <NavLink className="small-pin" to={`/posts/${this.props.post.id}`} onMouseOver={this.onHover} onMouseOut={this.offHover}>
            <img src={this.props.post.cover_url} alt="Cover URL" />
          </NavLink>
        </div>
      );
    }
  }
  render() {
    return (
      // <div>
      //   {this.renderPin()}
      // </div>
      <Draggable
        handle=".pin-mover"
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.state.x, y: this.state.y }}
        grid={[1, 1]}
        onDrag={this.onDrag}
        onStop={this.onStop}
      >
        {this.renderPin()}
      </Draggable>
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
export default withRouter(connect(mapStateToProps, { updatePost })(Pin));
