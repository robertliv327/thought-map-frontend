import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/new-post';
import SignIn from '../containers/sign-in';
import SignUp from '../containers/sign-up';
import Nav from '../containers/nav-bar';
import requireAuth from '../containers/requireAuth';

const MainLayout = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={requireAuth(NewPost)} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default MainLayout;
