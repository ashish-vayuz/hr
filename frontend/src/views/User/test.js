import { CBadge, CButton, CCardBody, CCollapse, CDataTable, CImg } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, addUser, deleteUser, updateUser, listUserDetails } from '../../actions/userMAction'
import Loader from '../Loader/Loader'

const CategoryManagement = (props) => {
    console.log(props.location.pathname);
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList
    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])

    const [details, setDetails] = useState([])
    const [items, setItems] = useState(users)

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
    }
    const deleteChallengeHandler = (id) => {
        dispatch(deleteUser(id))
        console.log(id);
    }

    const changeStatusHandler = (id, active) => {
        if (active) {
            dispatch(updateUser(id, false))
        } else {
            dispatch(updateUser(id, true));
        }
    }

    const fields = [
        { key: 'name', _style: { width: '10%' } },
        { key: 'email', _style: { width: '10%' } },
        { key: 'contact', _style: { width: '10%' } },
        { key: 'location', _style: { width: '10%' } },
        { key: 'totalReports', _style: { width: '10%' } },
        { key: 'isReviewer', _style: { width: '10%' } },
        { key: 'image', _style: { width: '1%' } },
        { key: 'active', _style: { width: '4%' } },
        {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ]

    const getBadge = (active) => {
        switch (active) {
            case true:
            case 'true':
                return 'success'
            case false:
            case 'false':
                return 'danger'
            default: return 'primary'
        }
    }

    return (
        <>
            {loading ? <Loader /> :
                <div>
                    <CDataTable
                        items={users.list}
                        fields={fields}
                        columnFilter
                        tableFilter
                        footer
                        itemsPerPageSelect
                        responsive
                        outlined
                        itemsPerPage={20}
                        hover
                        sorter
                        pagination
                        scopedSlots={{
                            'active':
                                (item) => (
                                    <td className="py-2">
                                        <CButton size="sm" color={getBadge(item.active)} onClick={() => {
                                            changeStatusHandler(item._id, item.active)

                                        }}>
                                            {item.active.toString()}
                                        </CButton>
                                    </td>
                                ),
                            'image':
                                (item) => (
                                    <td className="py-2">
                                        <CImg
                                            src={`${item.image}`}
                                            fluid
                                            className="mb-2"
                                            width="50px"
                                            height="50px"
                                        />
                                    </td>
                                ),
                            'show_details':
                                (item, index) => {
                                    return (
                                        <td className="py-2">
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={() => { toggleDetails(index) }}
                                            >
                                                {details.includes(index) ? 'Hide' : 'Show'}
                                            </CButton>
                                        </td>
                                    )
                                },
                            'details':
                                (item, index) => {
                                    return (
                                        <CCollapse show={details.includes(index)}>
                                            <CCardBody>
                                                <h4>
                                                    {item.username}
                                                </h4>
                                                <p className="text-muted">Created at: {item.createdAt}   Updated on: {item.updatedAt}</p>
                                                {/* <CButton color="info" to="/viewChallenge">
                                                    View
                                                </CButton> */}
                                                <CButton color="secondary" className="ml-1" to="/editChallenge">
                                                    Edit
                                                </CButton>
                                                <CButton color="danger" className="ml-1" onClick={() => { deleteChallengeHandler(item._id) }}>
                                                    Delete
                                                </CButton>
                                            </CCardBody>
                                        </CCollapse>
                                    )
                                }
                        }}
                    />
                </div>
            }
        </>
    )
}

export default CategoryManagement
