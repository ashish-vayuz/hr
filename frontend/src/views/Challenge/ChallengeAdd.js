import { CButton, CCol, CContainer, CForm, CFormGroup, CFormText, CInput, CLabel, CRow, CSpinner } from '@coreui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addCategory } from 'src/actions/categoryActions';
import Loader from '../Loader/Loader';


const ChallengeAdd = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [category, setCategory] = useState('');
    const [rewards, setRewards] = useState('');
    const [rewardDetails, setRewardDetails] = useState('');
    const [rewardContactNo, setRewardContactNo] = useState('');
    const [rewardEmail, setRewardEmail] = useState('');
    const [coinAllocated, setCoinAllocated] = useState('');
    const [coinRequired, setCoinRequired] = useState('');
    const [visibility, setVisibility] = useState('');
    const [reviewAmount, setReviewAmount] = useState('');
    const [duration, setDuration] = useState('');
    const [video, setVideo] = useState('');
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('challenge', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('https://humanrace-1.herokuapp.com/challenge/upload', formData, config)

            setVideo(data.link)
            console.log(data.link);
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addCategory(title, description, hashtags, category, rewards, rewardDetails, rewardContactNo, rewardEmail, coinAllocated, coinRequired, visibility, reviewAmount, duration, video))
    }
    return (
        <CContainer fluid>
            <CForm action="" method="post" wasValidated={false} onSubmit={submitHandler}>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Title</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Title.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Description</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Description.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Hashtags</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={hashtags}
                        onChange={(e) => setHashtags(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Hashtags.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Category</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Category.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Rewards</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={rewards}
                        onChange={(e) => setRewards(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Rewards.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Reward Details</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={rewardDetails}
                        onChange={(e) => setRewardDetails(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Reward details.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Reward Contact No.</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={rewardContactNo}
                        onChange={(e) => setRewardContactNo(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Reward Contact no.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Reward Email</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={rewardEmail}
                        onChange={(e) => setRewardEmail(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Reward Email.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Coins Allocated</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={coinAllocated}
                        onChange={(e) => setCoinAllocated(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Coins Allocated.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Coin Required</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={coinRequired}
                        onChange={(e) => setCoinRequired(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Coins Required.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Visibility</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Visibility.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Review Amount</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={reviewAmount}
                        onChange={(e) => setReviewAmount(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Review Amount.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-email">Duration</CLabel>
                    <CInput
                        type="text"
                        id="nf-email"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        name="nf-email"
                        placeholder="Enter Duration.."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-password">Video </CLabel>
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

                <CButton
                    type="submit"
                    disabled={
                        uploading
                        || title == ""
                        || description == ""
                        || hashtags == ""
                        || category == ""
                        || rewards == ""
                        || rewardDetails == ""
                        || rewardContactNo == ""
                        || rewardEmail == ""
                        || coinAllocated == ""
                        || coinRequired == ""
                        || visibility == ""
                        || reviewAmount == ""
                        || duration == ""
                        || video == ""
                    }
                    color="success">{uploading && <CSpinner />}Submit</CButton>
            </CForm>

        </CContainer>
    )
}

export default ChallengeAdd
