import axios from 'axios'
import {
    CHALLENGE_LIST_REQUEST,
    CHALLENGE_LIST_SUCCESS,
    CHALLENGE_LIST_FAIL,
    CHALLENGE_DETAILS_REQUEST,
    CHALLENGE_DETAILS_SUCCESS,
    CHALLENGE_DETAILS_FAIL,
} from '../constants/challengeConstant'

export const listChallenges = () => async (dispatch) => {
    try {
        dispatch({ type: CHALLENGE_LIST_REQUEST })

        const { data } = await axios.get('https://humanrace-1.herokuapp.com/challenge')

        dispatch({
            type: CHALLENGE_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log(typeof (error.response.data.errormessage));
        dispatch({
            type: CHALLENGE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listChallengeDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CHALLENGE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: CHALLENGE_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CHALLENGE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}