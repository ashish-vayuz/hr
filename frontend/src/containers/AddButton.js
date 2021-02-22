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
            default:
                setDisplay(true)
                break
            case "/category":
                setPath('/addcat')
                setValue('Add Category')
                setDisplay(false)
                break
            case "/admin":
                setPath('/addadmin')
                setValue('Add Admin')
                setDisplay(false)
                break
            // case "/challenge":
            //     setPath('/addChallenge')
            //     setValue('Add Challenge')
            //     setDisplay(false)
            //     break
            case "/user":
                setPath('adduser')
                setValue('Add User')
                setDisplay(false)
                break
        }
    }, [action, setDisplay, setValue])
    return (
        <>{display ? <></> : <CButton to={path} color="primary" >{value}</CButton>}</>

    )
}

export default AddButton
