import { CButton, CCol, CContainer, CForm, CFormGroup, CFormText, CInput, CLabel, CRow, CSpinner } from '@coreui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../../actions/userMAction'
import Loader from '../Loader/Loader';


const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()<>?/",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        setPassword(retVal)
        dispatch(addUser(email, name, location, password))
    }
    return (
        <CContainer fluid>
            <CForm action="" method="post" wasValidated={false} onSubmit={submitHandler}>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Email</CLabel>
                    <CInput
                        type="email"
                        id="nf-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Email.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Name</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Name.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Location</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Name.."
                        required
                    />
                </CFormGroup>
                <CButton type="submit" to="/user" color="secondary" className="mr-2">Back</CButton>
                <CButton type="submit" disabled={name == "" || email == "" || location == ""} color="success">Create</CButton>
            </CForm>

        </CContainer >
    )
}

export default AddUser
