import { CButton, CCol, CContainer, CForm, CFormGroup, CFormText, CInput, CLabel, CRow } from '@coreui/react'
import React from 'react'

const ChallengeAdd = () => {
    
    return (
        <CContainer fluid>
            <CForm action="" method="post" wasValidated={false}>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Name</CLabel>
                    <CInput
                        type="name"
                        id="nf-email"
                        name="nf-email"
                        placeholder="Enter Name"
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-password">Password</CLabel>
                    <CInput
                        type="password"
                        id="nf-password"
                        name="nf-password"
                        placeholder="Enter Password.."
                        required
                    />
                </CFormGroup>
                <CButton type="submit" color="success">Submit</CButton>
            </CForm>

        </CContainer>
    )
}

export default ChallengeAdd
