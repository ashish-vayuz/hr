import {
  REVIEWER_LIST_REQUEST,
  REVIEWER_LIST_SUCCESS,
  REVIEWER_LIST_FAIL,
  REVIEWER_DETAILS_REQUEST,
  REVIEWER_DETAILS_SUCCESS,
  REVIEWER_DETAILS_FAIL,
  REVIEWER_DELETE_REQUEST,
  REVIEWER_DELETE_SUCCESS,
  REVIEWER_DELETE_FAIL,
  REVIEWER_STATUS_REQUEST,
  REVIEWER_STATUS_SUCCESS,
  REVIEWER_STATUS_FAIL,
  REVIEWER_ADD_FAIL,
  REVIEWER_ADD_REQUEST,
  REVIEWER_ADD_SUCCESS,
} from "../constants/ReviewerConstatnt";

export const ReViewerListReducer = (state = { viewers: [] }, action) => {
  switch (action.type) {
    case REVIEWER_LIST_REQUEST:
      return { loading: true, viewers: [] };
    case REVIEWER_LIST_SUCCESS:
      return { loading: false, viewers: action.payload };
    case REVIEWER_LIST_FAIL:
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
    case REVIEWER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case REVIEWER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case REVIEWER_DETAILS_FAIL:
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
    case REVIEWER_DELETE_REQUEST:
      return { loading: true, ...state };
    case REVIEWER_DELETE_SUCCESS:
      return { loading: false, user: action.payload };
    case REVIEWER_DELETE_FAIL:
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
    case REVIEWER_STATUS_REQUEST:
      return { loading: true, ...state };
    case REVIEWER_STATUS_SUCCESS:
      return { loading: false, user: action.payload };
    case REVIEWER_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewerAddReducer = (state = { viewers: [] }, action) => {
  switch (action.type) {
    case REVIEWER_ADD_REQUEST:
      return { loading: true, viewers: [] };
    case REVIEWER_ADD_SUCCESS:
      return { loading: false, viewers: action.payload };
    case REVIEWER_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
