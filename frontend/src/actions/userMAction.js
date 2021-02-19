import axios from 'axios'
import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DELETE_SUCCESS,
    USER_DELETE_REQUEST,
    USER_DELETE_FAIL,
    USER_ADD_REQUEST,
    USER_ADD_SUCCESS,
    USER_ADD_FAIL,
    USER_STATUS_REQUEST,
    USER_STATUS_SUCCESS,
    USER_STATUS_FAIL
} from '../constants/userMConstants'

export const listUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        const { data } = await axios.get('https://humanrace-1.herokuapp.com/users')

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.errormessage
                    ? error.response.data.errormessage
                    : error.errormessage,
        })
    }
}

export const listUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.errormessage
                    ? error.response.data.errormessage
                    : error.errormessage,
        })
    }
}

export const addUser = (name, image) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ADD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'https://humanrace-1.herokuapp.com/users', { name, image }, config
        )

        dispatch({
            type: USER_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateUser = (id, active) => async (dispatch) => {
    try {
        dispatch({
            type: USER_STATUS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            `https://humanrace-1.herokuapp.com/users/${id}`, { "active": active }, config
        )
        console.log(active);
        dispatch({
            type: USER_STATUS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_STATUS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })

        const { data } = await axios.delete(`https://humanrace-1.herokuapp.com/users/${id}`)

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}