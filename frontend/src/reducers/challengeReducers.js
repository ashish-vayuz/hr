import {
    CHALLENGE_LIST_REQUEST,
    CHALLENGE_LIST_SUCCESS,
    CHALLENGE_LIST_FAIL,
    CHALLENGE_DETAILS_REQUEST,
    CHALLENGE_DETAILS_SUCCESS,
    CHALLENGE_DETAILS_FAIL,
} from '../constants/challengeConstant'

export const challengeListReducer = (state = { challenges: [] }, action) => {
    switch (action.type) {
        case CHALLENGE_LIST_REQUEST:
            return { loading: true, challenges: [] }
        case CHALLENGE_LIST_SUCCESS:
            return { loading: false, challenges: action.payload }
        case CHALLENGE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const challengeDetailsReducer = (state = { challenge: { reviews: [] } }, action) => {
    switch (action.type) {
        case CHALLENGE_DETAILS_REQUEST:
            return { loading: true, ...state }
        case CHALLENGE_DETAILS_SUCCESS:
            return { loading: false, challenge: action.payload }
        case CHALLENGE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}