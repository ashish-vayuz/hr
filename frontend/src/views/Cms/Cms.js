import React, { Component, useState, useEffect } from 'react'
import { HashRouter, Route, Switch, Router, BrowserRouter, Redirect, createBrowserHistory, useHistory } from "react-router-dom"
import routes from "../../routes"
import Axios from 'axios';



import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCollapse, CCardTitle
} from '@coreui/react'
//import cmsPages from '../cmspages/Cmspages'
import Cmsform from "../cmsform/Cmsform"

// const [items, setItems] = useState(usersData)


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'danger'

  }
}
//const fields = ['name','email', 'usertype', 'contact no','added on','status','edit']
//const fields = ['status']
const handel = () => {
  return (

    <Router history={BrowserRouter}>
      <Route to="/">

      </Route>
    </Router>
  )
}
const Cms = () => {
  const history = useHistory();
  document.title = "Human Race | CMS"

  const [stdata, setStdata] = useState();
  // console.log(stdata);
  const [pagename, setpagename] = useState("");
  const [status, setStatus] = useState("")

  // const [getData, setData] = useState([]);
  useEffect(() => {
    getData();

  }, [])

  function getData() {
    fetch("https://humanrace-1.herokuapp.com/cms", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(result => {
        // console.log(result);
        setStdata(result)
      })

  }

  //console.log(status.activeObject);


  const updatestatus = (id) => {

    fetch(`https://humanrace-1.herokuapp.com/cms/update/${stdata[id]._id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pagename: stdata[id].pagename,
        status: (stdata[id].status === "Inactive") ? "Active" : "Inactive"
      })
    })

      //   Axios.put(`localhost:3000/cms/update/${stdata[id]._id}`, {
      //     pagename: stdata[id].pagename,
      //     status: (stdata[id].status==="Inactive")?"Active":"Inactive",
      // })
      .then((res) => {
        getData();
      }).catch((err) => {
        console.log(err);
      })

    // history.push("/cms/cmsgetform/"+id);

  }





  const updatedata = (id) => {
    history.push({
      pathname: `/cms/cmsform/${id}`,


    })
  }





  const fields = [
    { key: 'pagename', _style: { width: '40%' } },

    // { key: 'Action', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    {
      key: 'show_details',
      label: 'Action',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ]
  const [id, setId] = useState("")
  const [details, setDetails] = useState([])
  const toggleDetails = (index, id) => {
    // alert(id)
    setId(id)
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }




  return (<div>
    <h3>Content Management</h3>
    {/* <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="info" onClick={handel}>Add User</CButton>
            </CCol> */}
    <div>
      <CDataTable
        items={stdata}
        fields={fields}

        // itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        // pagination
        scopedSlots={{
          'status':
            ({ status }) => (
              <td>
                <CBadge style={{ height: "20px", width: "45px" }} color={getBadge(status)}>
                  {status}
                </CBadge>
              </td>
            ), 'show_details':
            (item, index) => {
              // {console.log(item)}


              return (
                <td className="py-2">

                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => { toggleDetails(index, item.id) }}

                  >
                    {details.includes(index) ? 'Hide' : 'Show'}
                  </CButton>
                </td>
              )
            },
          'details':
            (item, index) => {

              //   console.log(item, index);

              if (item._id == 0) {

              } else {

              }


              const viewdata = (id) => {
                //     fetch("http://localhost:4000/tnc",{
                //       method:"get",
                //       headers:{
                //         "Content-Type":"application/json"
                //       }
                //     }).then(res=>res.json())
                //       .then(data=>{
                //           console.log(data)

                //       setData(data);          }         
                //       )
                //       console.log(getData);

                //history.push("/cms/cmsgetform")
                history.push({
                  pathname: `/cms/cmsgetform/${id}`,

                  // state:{id:id}
                })


              }





              return (
                <CCollapse show={details.includes(index)}>
                  <CCardBody>
                    <h4>
                      {item.username}
                    </h4>
                    {/* <p className="text-muted">User since: {item.registered}</p> */}
                    <CButton size="sm" color="info" onClick={() => viewdata(index)}>
                      View
                  </CButton>
                    <CButton size="sm" color="danger" className="ml-1" onClick={() => updatedata(index)}>
                      Edit
                  </CButton>
                    <CButton size="sm" color="danger" className="ml-1" onClick={() => updatestatus(index)}  >
                      Change Status
                  </CButton>
                  </CCardBody>
                </CCollapse>
              )
            }

        }}
      />

    </div>

  </div>
  )
}

export default Cms;