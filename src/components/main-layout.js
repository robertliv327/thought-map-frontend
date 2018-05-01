import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/new-post';

const Nav = (props) => {
  return (
    <nav id="nav">
      <ul className="navlinks">
        <li><NavLink exact to="/" className="navlink title">My Animal Gif Page</NavLink></li>
        <li>
          <NavLink to="/posts/new" className="navlink">
            <button className="button" type="button" name="button">Add a Gif</button>
          </NavLink>
        </li>
      </ul>
      <hr className="divider" />
    </nav>
  );
};
const MainLayout = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default MainLayout;
