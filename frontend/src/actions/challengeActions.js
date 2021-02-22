import axios from 'axios'
import {
    CHALLENGE_LIST_REQUEST,
    CHALLENGE_LIST_SUCCESS,
    CHALLENGE_LIST_FAIL,
    CHALLENGE_DETAILS_REQUEST,
    CHALLENGE_DETAILS_SUCCESS,
    CHALLENGE_DETAILS_FAIL,
    CHALLENGE_DELETE_REQUEST,
    CHALLENGE_DELETE_SUCCESS,
    CHALLENGE_DELETE_FAIL,
    CHALLENGE_STATUS_REQUEST,
    CHALLENGE_STATUS_SUCCESS,
    CHALLENGE_STATUS_FAIL,
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

export const deleteChallenge = (id) => async (dispatch) => {
    try {
        dispatch({ type: CHALLENGE_DELETE_REQUEST })

        const { data } = await axios.delete(`https://humanrace-1.herokuapp.com/challenge/${id}`)

        dispatch({
            type: CHALLENGE_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CHALLENGE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateChallenge = (id, active) => async (dispatch) => {
    try {
        dispatch({
            type: CHALLENGE_STATUS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            `https://humanrace-1.herokuapp.com/challenge/${id}`, { "active": active }, config
        )
        dispatch({
            type: CHALLENGE_STATUS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: CHALLENGE_STATUS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}