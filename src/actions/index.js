import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const ROOT_URL = 'https://rlivaudais-lab5.herokuapp.com/api';
const API_KEY = '?key=r_livaudais';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // CREATE_POST: 'CREATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

export function fetchPosts() {
  // ActionCreator returns a function
  // that gets called by the middleware passing in dispatch to it as an argument
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    }).catch((error) => {
      console.log('Error with axios call in fetchPosts()');
    });
  };
}

export function createPost(post, history) {
  // ActionCreator returns a function
  // that gets called by the middleware passing in dispatch to it as an argument
  return (dispatch) => {
    const fields = {
      title: post.title,
      content: post.content,
      tags: post.tags,
      cover_url: post.cover_url,
      x: post.x,
      y: post.y,
    };
    axios.post(`${ROOT_URL}/posts${API_KEY}`, fields).then((response) => {
      history.push('/');
    }).catch((error) => {
      console.log('Error with axios call in createPost()');
    });
  };
}

export function updatePost(id, post) {
  // ActionCreator returns a function
  // that gets called by the middleware passing in dispatch to it as an argument
  return (dispatch) => {
    const fields = {
      title: post.title,
      content: post.content,
      tags: post.tags,
      cover_url: post.cover_url,
      x: post.x,
      y: post.y,
    };
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch((error) => {
      console.log('Error with axios call in updatePost()');
    });
  };
}

export function fetchPost(id) {
  // ActionCreator returns a function
  // that gets called by the middleware passing in dispatch to it as an argument
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch((error) => {
      console.log('Error with axios call in fetchPost()');
    });
  };
}

export function deletePost(id, history) {
  // ActionCreator returns a function
  // that gets called by the middleware passing in dispatch to it as an argument
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      history.push('/');
    }).catch((error) => {
      console.log('Error with axios call in deletePost()');
    });
  };
}
