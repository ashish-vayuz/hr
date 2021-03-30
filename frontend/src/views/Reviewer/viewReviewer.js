import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CHeader,
  CRow,
  CWidgetBrand,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const ReviewView = () => {
  useEffect(() => {
    document.title = "Human Race | View User";
  }, []);
  const history = useHistory();
  return (
    <CContainer fluid>
      <div className="float-right">
        <button
          type="button"
          className="btn btn-xing"
          onClick={() => history.push("/reviewer")}
        >
          <span className="cib-xing btn-icon mr-2"></span> Back
        </button>
        <button type="button" className="btn btn-instagram ml-2">
          <span className="cib-instagram btn-icon mr-2 "></span> Edit
        </button>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          {" "}
          <CCard>
            <CCardBody className=" ">
              {/* <div className="row "> */}
              <div className="float-right">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="c-callout c-callout-danger b-t-1 b-r-1 b-b-1 ml-2 ">
                      <small className="text-muted"> Earned</small>
                      <br />
                      <strong className="h4">384,23</strong>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="c-callout c-callout-danger b-t-1 b-r-1 b-b-1 ml-2 ">
                      <small className="text-muted"> Withdraw</small>
                      <br />
                      <strong className="h4">267,32</strong>
                    </div>
                  </div>
                </div>

                <img
                  src="/avatars/8.jpg"
                  className="img-thumbnail rounded  d-block  "
                  alt="user_img"
                />
              </div>

              {/* <div className="text-value-xl mt-4 ml-4  col">
                <strong className="text-value-xl">John due</strong>
              </div> */}
              {/* </div> */}
              <div className="row mt-4">
                <CCol>Name</CCol>
                <CCol>John Due</CCol>
              </div>
              <div className="row mt-2">
                <CCol>Age</CCol>
                <CCol>25 year old</CCol>
              </div>
              <div className="row mt-2">
                <CCol>Bank name</CCol>
                <CCol>ICICI Bank</CCol>
              </div>
              <div className="row mt-2">
                <CCol>IFSC code</CCol>
                <CCol>icicic04134232</CCol>
              </div>
              <div className="row mt-2">
                <CCol>Branch name</CCol>
                <CCol>umari </CCol>
              </div>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </CContainer>
  );
};

export default ReviewView;
