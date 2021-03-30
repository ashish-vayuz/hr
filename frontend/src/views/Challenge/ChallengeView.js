import CIcon from "@coreui/icons-react";
import "./style.css";
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

const ChallengeView = () => {
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
          onClick={() => history.push("/user")}
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
            <CCardBody className="row ml-4">
              <div className="row">
                <img
                  src="/avatars/8.jpg"
                  className="img-thumbnail rounded  d-block "
                  alt="user_img"
                />
                <div className="text-value-xl mt-4 ml-4  col">
                  <strong className="text-value-xl">John due</strong>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="c-callout c-callout-info b-t-1 b-r-1 b-b-1 ">
                        <small className="text-muted">Followers</small>
                        <br />
                        <strong className="h4">9,123</strong>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="c-callout c-callout-danger b-t-1 b-r-1 b-b-1 ml-2 ">
                        <small className="text-muted"> Following</small>
                        <br />
                        <strong className="h4">22,643</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="c-callout c-callout-info b-t-1 b-r-1 b-b-1">
                    <small className="text-muted">Likes</small>
                    <br />
                    <strong className="h4">9,123</strong>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="c-callout c-callout-danger b-t-1 b-r-1 b-b-1">
                    <small className="text-muted"> Coins</small>
                    <br />
                    <strong className="h4">22,643</strong>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="c-callout c-callout-warning b-t-1 b-r-1 b-b-1">
                    <small className="text-muted">Created challenges</small>
                    <br />
                    <strong className="h4">78,623</strong>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="c-callout c-callout-success b-t-1 b-r-1 b-b-1">
                    <small className="text-muted">
                      Participated challenges
                    </small>
                    <br />
                    <strong className="h4">49,123</strong>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="c-callout b-t-1 b-r-1 b-b-1">
                    <small className="text-muted"> Bucket list</small>
                    <br />
                    <strong className="h4">23%</strong>
                  </div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </CContainer>
  );
};

export default ChallengeView;
