import axios from "axios";
import {
  VIEWER_LIST_REQUEST,
  VIEWER_LIST_SUCCESS,
  VIEWER_LIST_FAIL,
  VIEWER_DETAILS_REQUEST,
  VIEWER_DETAILS_SUCCESS,
  VIEWER_DETAILS_FAIL,
  VIEWER_DELETE_SUCCESS,
  VIEWER_DELETE_REQUEST,
  VIEWER_DELETE_FAIL,
  VIEWER_ADD_REQUEST,
  VIEWER_ADD_SUCCESS,
  VIEWER_ADD_FAIL,
  VIEWER_STATUS_REQUEST,
  VIEWER_STATUS_SUCCESS,
  VIEWER_STATUS_FAIL,
} from "../constants/viewerConstatnt";

export const listViewer = () => async (dispatch) => {
  try {
    dispatch({ type: VIEWER_LIST_REQUEST });

    const { data } = await axios.get("/users");

    dispatch({
      type: VIEWER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIEWER_LIST_FAIL,
      payload:
        error.response && error.response.data.errormessage
          ? error.response.data.errormessage
          : error.errormessage,
    });
  }
};

export const listViewerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VIEWER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: VIEWER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIEWER_DETAILS_FAIL,
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
      type: VIEWER_ADD_REQUEST,
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
      type: VIEWER_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIEWER_ADD_FAIL,
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
      type: VIEWER_STATUS_REQUEST,
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
      type: VIEWER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIEWER_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteViewers = (id) => async (dispatch) => {
  try {
    dispatch({ type: VIEWER_DELETE_REQUEST });

    const { data } = await axios.delete(`/users/${id}`);

    dispatch({
      type: VIEWER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIEWER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
