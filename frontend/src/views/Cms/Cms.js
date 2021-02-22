import { CBadge, CButton, CCardBody, CCollapse, CDataTable, CImg } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { listUsers, addUser, deleteUser, updateUser, listUserDetails } from '../../actions/userMAction'

const UserManagement = (props) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList
  useEffect(() => {
    dispatch(listUsers())
    if (!loading) {
      setData(users)
    }
  }, [dispatch])

  const [details, setDetails] = useState([])
  const [items, setItems] = useState(users)
  const [status, setStatus] = useState([])
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    console.log(position);
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  const deleteChallengeHandler = async (id) => {
    await dispatch(deleteUser(id))
    const { data } = await axios.get('https://humanrace-1.herokuapp.com/users')
    setData(data)
  }

  const changeStatusHandler = async (id, active, index) => {
    if (active) {
      await dispatch(updateUser(id, false))
      const { data } = await axios.get('https://humanrace-1.herokuapp.com/users')
      setData(data)
    } else {
      await dispatch(updateUser(id, true));
      const { data } = await axios.get('https://humanrace-1.herokuapp.com/users')
      setData(data)
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
    { key: 'active', _style: { width: '8%' } },
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
  console.log(data);
  return (
    <>
      {loading ? <Loader /> :
        <div>
          <CDataTable
            items={data.list || users.list}
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
                (item, index) => (
                  <td className="py-2">
                    <CButton size="sm" color={getBadge(item.active)} onClick={() => {
                      changeStatusHandler(item._id, item.active, index)

                    }}>
                      {item.active ? "Active" : "In Active"}
                    </CButton>
                  </td>
                ),
              'image':
                (item) => (
                  <td className="py-2">
                    <CImg
                      src={`https://humanrace-1.herokuapp.com${item.image}`}
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

export default UserManagement
