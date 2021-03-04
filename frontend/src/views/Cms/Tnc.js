// import React, { Component, useState } from 'react'
// import { HashRouter, Route, Switch, Router, BrowserRouter, Redirect, createBrowserHistory, useHistory } from "react-router-dom"
// import routes from "../../routes"
// //import Adduser from "./Adduser"



// import {
//   CBadge,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CDataTable,
//   CRow,
//   CButton,
//   CCollapse, CCardTitle
// } from '@coreui/react'
// import cmsPages from '../cmspages/Cmspages'

// // const [items, setItems] = useState(usersData)


// const getBadge = status => {
//   switch (status) {
//     case 'Active': return 'success'
//     case 'Inactive': return 'secondary'
//     case 'Pending': return 'warning'
//     case 'Banned': return 'danger'
//     default: return 'primary'
//   }
// }
// //const fields = ['name','email', 'usertype', 'contact no','added on','status','edit']
// const handel = () => {
//   return (

//     <Router history={BrowserRouter}>
//       <Route to="/">

//       </Route>
//     </Router>
//   )
// }
// const Faq = () => {
//   const history = useHistory();

//   // const fields = [
//   //     { key: 'name', _style: { width: '40%'} },
//   //     'registered',
//   //     { key: 'role', _style: { width: '20%'} },
//   //     { key: 'status', _style: { width: '20%'} },
//   //     {
//   //       key: 'show_details',
//   //       label: '',
//   //       _style: { width: '1%' },
//   //       sorter: false,
//   //       filter: false
//   //     }
//   //   ]
//   const [details, setDetails] = useState([])
//   const toggleDetails = (index) => {
//     const position = details.indexOf(index)
//     let newDetails = details.slice()
//     if (position !== -1) {
//       newDetails.splice(position, 1)
//     } else {
//       newDetails = [...details, index]
//     }
//     setDetails(newDetails)
//   }




//   return (<div>
//     {/* <h3>Cms</h3> */}
//     {/* <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
//               <CButton block color="info" onClick={handel}>Add User</CButton>
//             </CCol> */}
//     <div>
//       <CDataTable
//         items={cmsPages}
//         //     fields={fields}
//         // columnFilter
//         //  tableFilter
//         // footer
//         itemsPerPageSelect
//         itemsPerPage={5}
//         hover
//         sorter
//         pagination
//         scopedSlots={{
//           'status':
//             (item) => (
//               <td>
//                 <CBadge color={getBadge(item.status)}>
//                   {item.status}
//                 </CBadge>
//               </td>
//             ), 'show_details':
//             (item, index) => {


//               return (
//                 <td className="py-2">
//                   <CButton
//                     color="primary"
//                     variant="outline"
//                     shape="square"
//                     size="sm"
//                     onClick={() => { toggleDetails(index) }}
//                   >
//                     Action
//                   </CButton>
//                 </td>
//               )
//             },
//           'details':
//             (item, index) => {


//               const getFaqdata = () => {
//                 fetch(Api()+"/faq", {
//                   method: "get",
//                   headers: {
//                     "Content-Type": "application/json"
//                   }
//                 }).then(res => res.json())
//                   .then(data => {
//                     console.log(data)
//                     console.log(data[0].title)
//                     console.log(data[0].content)
//                   }
//                   )

//                 history.push("/cms/cmsform")


//               }

//               const updateTnc = () => {
//                 history.push("/cms/cmsform")
//               }



//               return (
//                 // show={details.includes(index)}
//                 <CCollapse >
//                   <CCardBody>
//                     <h4>
//                       {item.username}
//                     </h4>
//                     {/* <p className="text-muted">User since: {item.registered}</p> */}
//                     <CButton size="sm" color="info" onClick={getFaqdata}>
//                       Details
//                   </CButton>
//                     {/* onClick={updateFaq} */}
//                     <CButton size="sm" color="danger" className="ml-1" >
//                       Update
//                   </CButton>
//                   </CCardBody>
//                 </CCollapse>
//               )
//             }

//         }}
//       />

//     </div>

//   </div>
//   )
// }

// export default Faq;