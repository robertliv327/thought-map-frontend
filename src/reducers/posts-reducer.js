import { ActionTypes } from '../actions';

const PostsReducer = (state = { all: [], post: {} }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POST:
      return state.all;
    case ActionTypes.FETCH_POSTS:
      return state.post;
    default:
      return state;
  }
};

export default PostsReducer;
