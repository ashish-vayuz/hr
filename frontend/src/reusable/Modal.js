import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react'

const Modal = ({ title, message, color, onClickFunction }) => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }
    const onClickHandler = () => {
        onClickFunction()
    }

    return (
        <>
            <div
                onClick={toggle}
            >{title}</div>
            <CModal
                show={modal}
                onClose={toggle}
            >
                <CModalBody className="h2 font-weight-normal text-dark p-5">
                    {message}
                </CModalBody>
                <CModalFooter className="d-flex justify-content-around">
                    <CButton color={color} size="lg" onClick={onClickHandler}>Yes</CButton>
                    <CButton
                        size="lg"
                        color="secondary"
                        onClick={toggle}
                    >No</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Modal
