import axios from 'axios'
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_FAIL,
    CATEGORY_ADD_REQUEST,
    CATEGORY_ADD_SUCCESS,
    CATEGORY_ADD_FAIL,
    CATEGORY_STATUS_REQUEST,
    CATEGORY_STATUS_SUCCESS,
    CATEGORY_STATUS_FAIL
} from '../constants/categoryContant'

export const listCategorys = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })

        const { data } = await axios.get('https://humanrace-1.herokuapp.com/category')

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload:
                error.response && error.response.data.errormessage
                    ? error.response.data.errormessage
                    : error.errormessage,
        })
    }
}

export const listCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload:
                error.response && error.response.data.errormessage
                    ? error.response.data.errormessage
                    : error.errormessage,
        })
    }
}

export const addCategory = (name, image) => async (dispatch) => {
    try {
        dispatch({
            type: CATEGORY_ADD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'https://humanrace-1.herokuapp.com/category', { name, image }, config
        )

        dispatch({
            type: CATEGORY_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: CATEGORY_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateCategory = (id, active) => async (dispatch) => {
    try {
        dispatch({
            type: CATEGORY_STATUS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            `https://humanrace-1.herokuapp.com/category/${id}`, { "active": active }, config
        )
        dispatch({
            type: CATEGORY_STATUS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: CATEGORY_STATUS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DELETE_REQUEST })

        const { data } = await axios.delete(`https://humanrace-1.herokuapp.com/category/${id}`)

        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}