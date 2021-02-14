import { CButton, CCol, CContainer, CForm, CFormGroup, CFormText, CInput, CLabel, CRow } from '@coreui/react'
import React from 'react'

const ChallengeAdd = () => {
    return (
        <CContainer fluid>
            <CForm action="" method="post" wasValidated={false}>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Email</CLabel>
                    <CInput
                        type="email"
                        id="nf-email"
                        name="nf-email"
                        placeholder="Enter Email.."
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
