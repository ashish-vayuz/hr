import {
    CMS_LIST_REQUEST,
    CMS_LIST_SUCCESS,
    CMS_LIST_FAIL,
    CMS_DETAILS_REQUEST,
    CMS_DETAILS_SUCCESS,
    CMS_DETAILS_FAIL,
    CMS_DELETE_REQUEST,
    CMS_DELETE_SUCCESS,
    CMS_DELETE_FAIL,
    CMS_STATUS_REQUEST,
    CMS_STATUS_SUCCESS,
    CMS_STATUS_FAIL,
} from '../constants/cmsConstant'

export const cmsListReducer = (state = { cmss: [] }, action) => {
    switch (action.type) {
        case CMS_LIST_REQUEST:
            return { loading: true, cmss: [] }
        case CMS_LIST_SUCCESS:
            return { loading: false, cmss: action.payload }
        case CMS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const cmsDetailsReducer = (state = { cms: { reviews: [] } }, action) => {
    switch (action.type) {
        case CMS_DETAILS_REQUEST:
            return { loading: true, ...state }
        case CMS_DETAILS_SUCCESS:
            return { loading: false, cms: action.payload }
        case CMS_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const cmsDeleteReducer = (state = { cms: { reviews: [] } }, action) => {
    switch (action.type) {
        case CMS_DELETE_REQUEST:
            return { loading: true, ...state }
        case CMS_DELETE_SUCCESS:
            return { loading: false, cms: action.payload }
        case CMS_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const cmsStatusReducer = (state = { cms: { reviews: [] } }, action) => {
    switch (action.type) {
        case CMS_STATUS_REQUEST:
            return { loading: true, ...state }
        case CMS_STATUS_SUCCESS:
            return { loading: false, cms: action.payload }
        case CMS_STATUS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const cmsAddReducer = (state = { cmss: [] }, action) => {
    switch (action.type) {
        case CMS_LIST_REQUEST:
            return { loading: true, cmss: [] }
        case CMS_LIST_SUCCESS:
            return { loading: false, cmss: action.payload }
        case CMS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}