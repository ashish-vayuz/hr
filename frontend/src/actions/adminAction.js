import axios from 'axios'
import {
    ADMIN_LIST_REQUEST,
    ADMIN_LIST_SUCCESS,
    ADMIN_LIST_FAIL,
    ADMIN_DETAILS_REQUEST,
    ADMIN_DETAILS_SUCCESS,
    ADMIN_DETAILS_FAIL,
    ADMIN_DELETE_SUCCESS,
    ADMIN_DELETE_REQUEST,
    ADMIN_DELETE_FAIL,
    ADMIN_ADD_REQUEST,
    ADMIN_ADD_SUCCESS,
    ADMIN_ADD_FAIL,
    ADMIN_STATUS_REQUEST,
    ADMIN_STATUS_SUCCESS,
    ADMIN_STATUS_FAIL
} from '../constants/adminConstant'

export const listAdmins = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_LIST_REQUEST })
        
        const { data } = await axios.get('https://humanrace-1.herokuapp.com/admin')

        dispatch({
            type: ADMIN_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_LIST_FAIL,
            payload:
                error.response && error.response.data.errormessage
                    ? error.response.data.errormessage
                    : error.errormessage,
        })
    }
}

export const listAdminDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DETAILS_REQUEST })
        
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: ADMIN_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_DETAILS_FAIL,
            payload:
                error.response && error.response.data.errormessage
                    ? error.response.data.errormessage
                    : error.errormessage,
        })
    }
}

export const addAdmin = (name, image) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_ADD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'https://humanrace-1.herokuapp.com/admin', { "name": name, "image": image }, config
        )

        dispatch({
            type: ADMIN_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: ADMIN_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateAdmin = (id, active) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_STATUS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            `https://humanrace-1.herokuapp.com/admin/${id}`, { "active": active }, config
        )
        dispatch({
            type: ADMIN_STATUS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: ADMIN_STATUS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteAdmin = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_REQUEST })

        const { data } = await axios.delete(`https://humanrace-1.herokuapp.com/admin/${id}`)

        dispatch({
            type: ADMIN_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}