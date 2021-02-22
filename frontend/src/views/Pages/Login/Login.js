import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../actions/userActions'
const Login = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/dashboard'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))

    }
    return (

        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={submitHandler}>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-user" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="text" placeholder="Username" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton color="primary" type="submit" className="px-4">Login</CButton>
                                            </CCol>
                                            {/* <CCol xs="6" className="text-right">
                                                <CButton color="link" className="px-0">Forgot password?</CButton>
                                            </CCol> */}
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
