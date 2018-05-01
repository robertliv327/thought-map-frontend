import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
    };
    this.onHover = this.onHover.bind(this);
    this.offHover = this.offHover.bind(this);
  }
  onHover() {
    this.setState({ isHovering: true });
  }
  offHover() {
    this.setState({ isHovering: false });
  }
  renderPin() {
    if (this.state.isHovering) {
      return (
        // <NavLink className="pin" to={`/posts/${this.props.post.id}`} onMouseOver={this.onHover} onMouseOut={this.offHover}>
        //   <img src={this.props.post.cover_url} alt="Cover URL" />
        //   <div className="pin-text">{this.props.post.tags}<br />{this.props.post.title}</div>
        // </NavLink>
        <NavLink className="pin" to={`/posts/${this.props.post.id}`} onMouseOver={this.onHover} onMouseOut={this.offHover}>
          <div className="pin-text">
            <h4>{this.props.post.title}<br />{this.props.post.tags}</h4>
          </div>
          <img className="img-responsive tint" src={this.props.post.cover_url} alt="Cover URL" />
        </NavLink>
      );
    } else {
      return (
        <NavLink className="pin" to={`/posts/${this.props.post.id}`} onMouseOver={this.onHover} onMouseOut={this.offHover}>
          <img src={this.props.post.cover_url} alt="Cover URL" />
        </NavLink>
      );
    }
  }
  render() {
    return (
      <div>
        {this.renderPin()}
      </div>
    );
  }
}

export default Pin;
