import { CBadge, CButton, CCardBody, CCollapse, CDataTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listChallenges, deleteChallenge } from '../../actions/challengeActions'

const UserManagement = (props) => {
    console.log(props.location.pathname);
    const dispatch = useDispatch()
    const challengeList = useSelector(state => state.challengeList)
    const { loading, error, challenges } = challengeList
    useEffect(() => {
        dispatch(listChallenges())
    }, [dispatch])

    const [details, setDetails] = useState([])
    const [items, setItems] = useState(challenges)

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
        dispatch(deleteChallenge(id))
        console.log(id);
    }

    const fields = [
        { key: 'title', _style: { width: '10%' } },
        { key: 'coinAllocated', _style: { width: '10%' } },
        { key: 'coinRequired', _style: { width: '10%' } },
        { key: 'reviewAmount', _style: { width: '10%' } },
        { key: 'isPaymentDone', _style: { width: '4%' } },
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
            {loading ? <div>Loading</div> :
                <div>
                    <CDataTable
                        items={challenges.list}
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
                                        <CButton size="sm" color={getBadge(item.active)}>
                                            {item.active.toString()}
                                        </CButton>
                                    </td>
                                ),
                            'isPaymentDone':
                                (item) => (
                                    <td >
                                        <CBadge color={getBadge(item.isPaymentDone)}>
                                            {item.isPaymentDone.toString()}
                                        </CBadge>
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
                                                <CButton color="info" to="/viewChallenge">
                                                    View
                                                </CButton>
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

export default UserManagement
