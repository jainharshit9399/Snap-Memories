import { GET_CURRENT_POST, CLEAR_CURRENT_POST } from '../constants/actionTypes';

const reducer = (post = null, action) => {
  switch (action.type) {
    case GET_CURRENT_POST:
      return action.payload;
    case CLEAR_CURRENT_POST:
      return null;
    default:
      return post;
  }
};

export default reducer;
