import { CContainer } from '@coreui/react'
import React from 'react'
import './Loader.css'

const Loader = () => {
    return (
        <CContainer className="text-center my-5">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </CContainer>
    )
}

export default Loader
