/* eslint-disable-next-line */
import React, { lazy, useState, useEffect, useRef, Component } from "react";
import { useHistory, useParams } from "react-router-dom";
//import CKEditor from "react-ckeditor-component";


import CKEditor from 'ckeditor4-react';
import {
  //  CBadge,
  CButton,
  // CButtonGroup,
  // CCard,
  // CCardBody,
  CCardFooter,
  // CCardHeader,
  CCol,
  CInput,
  CFormText,
  //CSelect,
  CLabel,
  CTextarea,
  CForm,
  // CInputFile,
  CFormGroup,
  // CInputCheckbox,
  // CInputRadio,
  // CProgress,
  // CRow,
  // CCallout,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import { func } from "prop-types";
// import Api from "../../utils";


// import MainChartExample from "../charts/MainChartExample.js";

// const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
// const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Cmsform = () => {
  document.title = "Human Race | Cms edit form"
  // console.log(Api());
  const { id } = useParams();
  console.log(id);

  const [dat, setDat] = useState([]);
  console.log(dat);
  const history = useHistory();
  // const textInput = useRef();

  // const focusTextInput = () => textInput.current.focus();
  //  console.log(dat);


  useEffect(() => {

    if (id == 0) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/tnc", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(result => {

          setDat({ title: result[0].title, content: result[0].content })

        }).catch(err => {
          console.log(err)
        })
    } else if (id == 1) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/faq", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(result => {

          setDat({ title: result[0].title, content: result[0].content })

        }).catch(err => {
          console.log(err)
        })
    }
    else if (id == 2) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/privacy", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(result => {

          setDat({ title: result[0].title, content: result[0].content })

        }).catch(err => {
          console.log(err)
        })
    }
    else if (id == 3) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/events", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(result => {

          setDat({ title: result[0].title, content: result[0].content })

        }).catch(err => {
          console.log(err)
        })
    }
    else if (id == 4) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/press", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(result => {

          setDat({ title: result[0].title, content: result[0].content })

        }).catch(err => {
          console.log(err)
        })
    }

  }, []);

  // UPDATE SUBMIT //

  const submit = () => {
    if (id == 0) {

      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/tnc/5f8c230fe1e9a40dd89555b8/update", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: dat.title, content: dat.content
        })
      })
        // .then(res => res.json())
        .then(result => {
          console.log(result)


        }).catch(err => {
          console.log(err)
        })

      history.push("/cms/cmsgetform/" + id);

    } else if (id == 1) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/faq/5fa3fcedefe8f519740aa2d1/update", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: dat.title, content: dat.content
        })
      })
        // .then(res => res.json())
        .then(result => {
          console.log(result)


        }).catch(err => {
          console.log(err)
        })

      history.push("/cms/cmsgetform/" + id);

    } else if (id == 2) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/privacy/5f7c32aa1c232f18581b6604/update", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: dat.title, content: dat.content
        })
      })
        // .then(res => res.json())
        .then(result => {
          console.log(result)


        }).catch(err => {
          console.log(err)
        })

      history.push("/cms/cmsgetform/" + id);

    } else if (id == 3) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/events/5f927489a0aefb18749035c2/update", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: dat.title, content: dat.content
        })
      })
        // .then(res => res.json())
        .then(result => {
          console.log(result)


        }).catch(err => {
          console.log(err)
        })

      history.push("/cms/cmsgetform/" + id);

    } else if (id == 4) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/press/5f9272d525fe851ce43b2567/update", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: dat.title, content: dat.content
        })
      })

        .then(result => {
          console.log(result)


        }).catch(err => {
          console.log(err)
        })

      history.push("/cms/cmsgetform/" + id);

    }
  }

  const back = () => {
    history.push("../")
  }

  const handleChange = (event) => {
    const dataa = event.editor.getData();
    setDat({ ...dat, content: dataa })
  }

  return (
    <>


      <CForm
        action=""
        method="post"
        encType="multipart/form-data"
        className="form-horizontal"
      >
        <CFormGroup row></CFormGroup>
        <CFormGroup row>
          <CCol md="3">
            <CLabel htmlFor="text-input">Title</CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CInput
              id="text-input"
              name="text-input"
              placeholder="Enter Title"
              value={dat.title}
              onChange={e => setDat({ ...dat, title: e.target.value })}
            />
          </CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol xs="12" md="9"></CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol xs="12" md="9"></CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol xs="12" md="9"></CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol md="3">
            <CLabel htmlFor="textarea-input">Description</CLabel>
          </CCol>
          <CCol xs="12" md="9">

            <CKEditor activeClass="editor" id="editor" data={dat.content} onChange={handleChange} />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "2vh" }}>
              <CButton type="submit" size="sm" color="primary" onClick={submit}>
                Submit
        </CButton>
              <CButton type="reset" size="sm" color="danger" onClick={back}>
                Back
        </CButton>
            </div>

          </CCol>

        </CFormGroup>


      </CForm>





    </>
  );
};

export default Cmsform;
