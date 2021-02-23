import axios from 'axios'
import {
    CMS_LIST_REQUEST,
    CMS_LIST_SUCCESS,
    CMS_LIST_FAIL,
    CMS_DETAILS_REQUEST,
    CMS_DETAILS_SUCCESS,
    CMS_DETAILS_FAIL,
    CMS_DELETE_SUCCESS,
    CMS_DELETE_REQUEST,
    CMS_DELETE_FAIL,
    CMS_ADD_REQUEST,
    CMS_ADD_SUCCESS,
    CMS_ADD_FAIL,
    CMS_STATUS_REQUEST,
    CMS_STATUS_SUCCESS,
    CMS_STATUS_FAIL
} from '../constants/cmsConstant'

export const listCmss = () => async (dispatch) => {
    try {
        dispatch({ type: CMS_LIST_REQUEST })

        const { data } = await axios.get('/cms')

        dispatch({
            type: CMS_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CMS_LIST_FAIL,
            payload:
                error.response && error.response.data.errormessage
                    ? error.response.data.errormessage
                    : error.errormessage,
        })
    }
}

export const listCmsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CMS_DETAILS_REQUEST })

        const { data } = await axios.get(`/cms/${id}`)

        dispatch({
            type: CMS_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CMS_DETAILS_FAIL,
            payload:
                error.response && error.response.data.errormessage
                    ? error.response.data.errormessage
                    : error.errormessage,
        })
    }
}

export const addCms = (name, data) => async (dispatch) => {
    try {
        dispatch({
            type: CMS_ADD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/cms', { "name": name, "data": data }, config
        )

        dispatch({
            type: CMS_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: CMS_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateCms = (id, active, name, desc) => async (dispatch) => {
    try {
        dispatch({
            type: CMS_STATUS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            `/cms/${id}`, {
            "active": active,
            "name": name ? name : '',
            "desc": desc ? desc : ''
        }, config
        )
        dispatch({
            type: CMS_STATUS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: CMS_STATUS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteCms = (id) => async (dispatch) => {
    try {
        dispatch({ type: CMS_DELETE_REQUEST })

        const { data } = await axios.delete(`/cms/${id}`)

        dispatch({
            type: CMS_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CMS_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}