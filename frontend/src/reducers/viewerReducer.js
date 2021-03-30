import {
  VIEWER_LIST_REQUEST,
  VIEWER_LIST_SUCCESS,
  VIEWER_LIST_FAIL,
  VIEWER_DETAILS_REQUEST,
  VIEWER_DETAILS_SUCCESS,
  VIEWER_DETAILS_FAIL,
  VIEWER_DELETE_REQUEST,
  VIEWER_DELETE_SUCCESS,
  VIEWER_DELETE_FAIL,
  VIEWER_STATUS_REQUEST,
  VIEWER_STATUS_SUCCESS,
  VIEWER_STATUS_FAIL,
  VIEWER_ADD_FAIL,
  VIEWER_ADD_REQUEST,
  VIEWER_ADD_SUCCESS,
} from "../constants/viewerConstatnt";

export const ViewerListReducer = (state = { viewers: [] }, action) => {
  switch (action.type) {
    case VIEWER_LIST_REQUEST:
      return { loading: true, viewers: [] };
    case VIEWER_LIST_SUCCESS:
      return { loading: false, viewers: action.payload };
    case VIEWER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewerDetailsReducer = (
  state = { user: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case VIEWER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case VIEWER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case VIEWER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewerDeleteReducer = (
  state = { user: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case VIEWER_DELETE_REQUEST:
      return { loading: true, ...state };
    case VIEWER_DELETE_SUCCESS:
      return { loading: false, user: action.payload };
    case VIEWER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewerStatusReducer = (
  state = { user: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case VIEWER_STATUS_REQUEST:
      return { loading: true, ...state };
    case VIEWER_STATUS_SUCCESS:
      return { loading: false, user: action.payload };
    case VIEWER_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewerAddReducer = (state = { viewers: [] }, action) => {
  switch (action.type) {
    case VIEWER_ADD_REQUEST:
      return { loading: true, viewers: [] };
    case VIEWER_ADD_SUCCESS:
      return { loading: false, viewers: action.payload };
    case VIEWER_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
