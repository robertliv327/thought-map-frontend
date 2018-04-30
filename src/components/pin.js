import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { NavLink } from 'react-router-dom';

class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x,
      y: this.props.y,
    };
    this.onDrag = this.onDrag.bind(this);
  }
  onDrag(e, ui) {
    this.setState({ x: ui.x, y: ui.y });
  }
  render() {
    return (
      <Draggable
        handle=".mover"
        defaultPosition={{ x: 100, y: 100 }}
        position={{ x: this.state.x, y: this.state.y }}
        grid={[1, 1]}
        onDrag={this.onDrag}
      >
        <NavLink to={`/posts/${this.props.post.id}`}>
          <div className="pin mover">
            <img src={this.props.post.cover_url} alt="Cover URL" />
            <div>{this.props.post.title}</div>
            <div>{this.props.post.tags}</div>
          </div>
        </NavLink>
      </Draggable>
    );
  }
}

export default Pin;
