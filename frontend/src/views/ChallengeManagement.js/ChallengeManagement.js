import { CBadge, CButton, CCardBody, CCollapse, CDataTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listChallenges } from '../../actions/challengeActions'

const UserManagement = () => {
    const dispatch = useDispatch()
    const challengeList = useSelector(state => state.challengeList)
    const { loading, error, challenges } = challengeList
    useEffect(() => {
        dispatch(listChallenges())
    }, [dispatch])

    const [details, setDetails] = useState([])
    // const [items, setItems] = useState(usersData)

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


    const fields = [
        { key: 'name', _style: { width: '20%' } },
        'image',
        { key: 'createdAt', _style: { width: '20%' } },
        { key: 'active', _style: { width: '20%' } },
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
            case 'Active': return 'success'
            case 'Inactive': return 'secondary'
            case 'Banned': return 'danger'
            case 'Pending': return 'warning'
            default: return 'primary'
        }
    }

    return (
        <>
            {loading ?
                <div>
                    <CDataTable
                        items={challenges.list}
                        fields={fields}
                        columnFilter
                        tableFilter
                        footer
                        itemsPerPageSelect
                        itemsPerPage={20}
                        hover
                        sorter
                        pagination
                        scopedSlots={{
                            'active':
                                (item) => (
                                    <td>
                                        <CBadge color={getBadge(item.active)}>
                                            {item.active}
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
                                                <p className="text-muted">User since: {item.image}</p>
                                                <CButton size="sm" color="info">
                                                    User Settings
                                    </CButton>
                                                <CButton size="sm" color="danger" className="ml-1">
                                                    Delete
                                    </CButton>
                                            </CCardBody>
                                        </CCollapse>
                                    )
                                }
                        }}
                    />
                </div> : <div>{error}</div>
            }
        </>
    )
}

export default UserManagement
