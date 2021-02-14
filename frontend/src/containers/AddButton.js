import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'

const AddButton = (location) => {
    const action = location.location
    console.log(action);
    const [path, setPath] = useState('');
    const [display, setDisplay] = useState(false)
    const [value, setValue] = useState('');
    useEffect(() => {

        switch (action) {
            case "/challenge":
                setPath('addChallenge')
                setValue('Add Challenge')
                setDisplay(false)
                break
            case "/user":
                setPath('adduser')
                setValue('Add User')
                setDisplay(false)
                break
            case "/category":
                setPath('addcategroy')
                setValue('Add Category')
                setDisplay(false)
                break
            case "/dashboard":
                setDisplay(true)
                break
            default:
                setDisplay(false)
        }
    }, [action, setDisplay, setValue])
    return (
        <>{display ? <></> : <CButton to={path} color="primary" >{value}</CButton>}</>

    )
}

export default AddButton
