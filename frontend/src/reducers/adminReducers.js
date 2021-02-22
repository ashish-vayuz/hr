import {
    ADMIN_LIST_REQUEST,
    ADMIN_LIST_SUCCESS,
    ADMIN_LIST_FAIL,
    ADMIN_DETAILS_REQUEST,
    ADMIN_DETAILS_SUCCESS,
    ADMIN_DETAILS_FAIL,
    ADMIN_DELETE_REQUEST,
    ADMIN_DELETE_SUCCESS,
    ADMIN_DELETE_FAIL,
    ADMIN_STATUS_REQUEST,
    ADMIN_STATUS_SUCCESS,
    ADMIN_STATUS_FAIL,
} from '../constants/adminConstant'

export const adminListReducer = (state = { admins: [] }, action) => {
    switch (action.type) {
        case ADMIN_LIST_REQUEST:
            return { loading: true, admins: [] }
        case ADMIN_LIST_SUCCESS:
            return { loading: false, admins: action.payload }
        case ADMIN_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const adminDetailsReducer = (state = { admin: { reviews: [] } }, action) => {
    switch (action.type) {
        case ADMIN_DETAILS_REQUEST:
            return { loading: true, ...state }
        case ADMIN_DETAILS_SUCCESS:
            return { loading: false, admin: action.payload }
        case ADMIN_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const adminDeleteReducer = (state = { admin: { reviews: [] } }, action) => {
    switch (action.type) {
        case ADMIN_DELETE_REQUEST:
            return { loading: true, ...state }
        case ADMIN_DELETE_SUCCESS:
            return { loading: false, admin: action.payload }
        case ADMIN_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const adminStatusReducer = (state = { admin: { reviews: [] } }, action) => {
    switch (action.type) {
        case ADMIN_STATUS_REQUEST:
            return { loading: true, ...state }
        case ADMIN_STATUS_SUCCESS:
            return { loading: false, admin: action.payload }
        case ADMIN_STATUS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const adminAddReducer = (state = { admins: [] }, action) => {
    switch (action.type) {
        case ADMIN_LIST_REQUEST:
            return { loading: true, admins: [] }
        case ADMIN_LIST_SUCCESS:
            return { loading: false, admins: action.payload }
        case ADMIN_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}