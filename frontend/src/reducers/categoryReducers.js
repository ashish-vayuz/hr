import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_STATUS_REQUEST,
    CATEGORY_STATUS_SUCCESS,
    CATEGORY_STATUS_FAIL,
} from '../constants/categoryContant'

export const categoryListReducer = (state = { categorys: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categorys: [] }
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categorys: action.payload }
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const categoryDetailsReducer = (state = { category: { reviews: [] } }, action) => {
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return { loading: true, ...state }
        case CATEGORY_DETAILS_SUCCESS:
            return { loading: false, category: action.payload }
        case CATEGORY_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const categoryDeleteReducer = (state = { category: { reviews: [] } }, action) => {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return { loading: true, ...state }
        case CATEGORY_DELETE_SUCCESS:
            return { loading: false, category: action.payload }
        case CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const categoryStatusReducer = (state = { category: { reviews: [] } }, action) => {
    switch (action.type) {
        case CATEGORY_STATUS_REQUEST:
            return { loading: true, ...state }
        case CATEGORY_STATUS_SUCCESS:
            return { loading: false, category: action.payload }
        case CATEGORY_STATUS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}