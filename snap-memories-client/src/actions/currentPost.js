import * as api from '../api';
import { GET_CURRENT_POST, CLEAR_CURRENT_POST } from '../constants/actionTypes';

export const getCurrentPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.getCurrentPost(id);
    const action = {
      type: GET_CURRENT_POST,
      payload: data,
    };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const clearForm = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_CURRENT_POST });
  } catch (error) {
    console.log(error.message);
  }
};
