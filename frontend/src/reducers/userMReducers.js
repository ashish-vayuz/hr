import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_STATUS_REQUEST,
  USER_STATUS_SUCCESS,
  USER_STATUS_FAIL,
  USER_ADD_FAIL, USER_ADD_REQUEST, USER_ADD_SUCCESS
} from '../constants/userMConstants'

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: [] }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: { reviews: [] } }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true, ...state }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDeleteReducer = (state = { user: { reviews: [] } }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true, ...state }
    case USER_DELETE_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userStatusReducer = (state = { user: { reviews: [] } }, action) => {
  switch (action.type) {
    case USER_STATUS_REQUEST:
      return { loading: true, ...state }
    case USER_STATUS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_STATUS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userAddReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_ADD_REQUEST:
      return { loading: true, users: [] }
    case USER_ADD_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}