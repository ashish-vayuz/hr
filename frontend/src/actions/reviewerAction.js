import axios from "axios";
import {
  REVIEWER_LIST_REQUEST,
  REVIEWER_LIST_SUCCESS,
  REVIEWER_LIST_FAIL,
  REVIEWER_DETAILS_REQUEST,
  REVIEWER_DETAILS_SUCCESS,
  REVIEWER_DETAILS_FAIL,
  REVIEWER_DELETE_SUCCESS,
  REVIEWER_DELETE_REQUEST,
  REVIEWER_DELETE_FAIL,
  REVIEWER_ADD_REQUEST,
  REVIEWER_ADD_SUCCESS,
  REVIEWER_ADD_FAIL,
  REVIEWER_STATUS_REQUEST,
  REVIEWER_STATUS_SUCCESS,
  REVIEWER_STATUS_FAIL,
} from "../constants/ReviewerConstatnt";

export const listReviewer = () => async (dispatch) => {
  try {
    dispatch({ type: REVIEWER_LIST_REQUEST });

    const { data } = await axios.get("/admin/reviewer");
    console.log(data);
    dispatch({
      type: REVIEWER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEWER_LIST_FAIL,
      payload:
        error.response && error.response.data.errormessage
          ? error.response.data.errormessage
          : error.errormessage,
    });
  }
};

export const listViewerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: REVIEWER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: REVIEWER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEWER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.errormessage
          ? error.response.data.errormessage
          : error.errormessage,
    });
  }
};

export const addViewers = (name, email, password, location) => async (
  dispatch
) => {
  try {
    dispatch({
      type: REVIEWER_ADD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/users/signup",
      { name: name, password: password, email: email, location: location },
      config
    );

    dispatch({
      type: REVIEWER_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEWER_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateViewers = (id, active) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEWER_STATUS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/users/${id}`,
      { active: active },
      config
    );
    console.log(active);
    dispatch({
      type: REVIEWER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEWER_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteViewers = (id) => async (dispatch) => {
  try {
    dispatch({ type: REVIEWER_DELETE_REQUEST });

    const { data } = await axios.delete(`/users/${id}`);

    dispatch({
      type: REVIEWER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEWER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
