import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink exact to="/">My Super Awesome Blog</NavLink></li>
        <li><NavLink to="/posts/new">new post</NavLink></li>
      </ul>
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
