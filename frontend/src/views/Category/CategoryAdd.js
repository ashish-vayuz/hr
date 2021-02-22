import { CButton, CCol, CContainer, CForm, CFormGroup, CFormText, CInput, CLabel, CRow, CSpinner } from '@coreui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addCategory } from 'src/actions/categoryActions';
import Loader from '../Loader/Loader';


const CategoryAdd = () => {
    const [name, setName] = useState('');
    const [uploading, setUploading] = useState(false)
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch()
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('category', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('https://humanrace-1.herokuapp.com/category/upload', formData, config)

            setImage(data.image)
            console.log(data.image);
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addCategory(name,image))
    }
    return (
        <CContainer fluid>
            <CForm action="" method="post" wasValidated={false} onSubmit={submitHandler}>
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
                    <CLabel htmlFor="nf-password">Image </CLabel>
                    <CInput
                        type="file"
                        id="nf-password"
                        //value={image}
                        onChange={uploadFileHandler}
                        name="nf-password"
                        placeholder="Enter Password.."
                        required
                    />
                </CFormGroup>

                <CButton type="submit" disabled={uploading || name == "" || image == ""} color="success">{uploading && <CSpinner />}Submit</CButton>
            </CForm>

        </CContainer>
    )
}

export default CategoryAdd
