import axios from 'axios'
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
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