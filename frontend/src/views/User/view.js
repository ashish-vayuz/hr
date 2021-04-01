import CIcon from "@coreui/icons-react";
// import "./style.css";
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
import { useEffect, useState } from "react";

const UserViewsManagement = (props) => {
  //   console.log(props);
  const [state, setState] = useState("");
  useEffect(() => {
    document.title = "Human Race | View User";
    if (props && props.location.state) {
      setState(props && props.location.state);
    } else {
      history.push("/user");
    }
  }, [props && props.location.state]);
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
        <button
          type="button"
          className="btn btn-instagram ml-2"
          onClick={() =>
            history.push({
              pathname: "/useredit/edit",
              state: props && props.location.state,
              isview: true,
            })
          }
        >
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
                  src={
                    props && props.location.state && props.location.state.image
                  }
                  style={{ width: "40%" }}
                  className="img-thumbnail rounded  d-block "
                  alt="user_img"
                />
                <div className="text-value-xl mt-4 ml-4  col">
                  <strong className="text-value-xl">
                    {" "}
                    {props && props.location.state && props.location.state.name}
                  </strong>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="c-callout c-callout-info b-t-1 b-r-1 b-b-1 ">
                        <small className="text-muted">Followers</small>
                        <br />
                        <strong className="h4">
                          {props &&
                            props.location.state &&
                            props.location.state.totalFollowers}
                        </strong>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="c-callout c-callout-danger b-t-1 b-r-1 b-b-1 ml-2 ">
                        <small className="text-muted"> Following</small>
                        <br />
                        <strong className="h4">
                          {" "}
                          {props &&
                            props.location.state &&
                            props.location.state.totalFollowings}
                        </strong>
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
                    <strong className="h4">
                      {props &&
                        props.location.state &&
                        props.location.state.likes}
                    </strong>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="c-callout c-callout-danger b-t-1 b-r-1 b-b-1">
                    <small className="text-muted">Earned Coins</small>
                    <br />
                    <strong className="h4">
                      {" "}
                      {props &&
                        props.location.state &&
                        props.location.state.coinsEarned}
                    </strong>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="c-callout c-callout-warning b-t-1 b-r-1 b-b-1">
                    <small className="text-muted">Created challenges</small>
                    <br />
                    <strong className="h4">
                      {" "}
                      {props &&
                        props.location.state &&
                        props.location.state.myChallenges.length}
                    </strong>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="c-callout c-callout-success b-t-1 b-r-1 b-b-1">
                    <small className="text-muted">
                      Participated challenges
                    </small>
                    <br />
                    <strong className="h4">
                      {" "}
                      {props &&
                        props.location.state &&
                        props.location.state.participatedChallenges.length}
                    </strong>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="c-callout b-t-1 b-r-1 b-b-1">
                    <small className="text-muted"> Bucket list</small>
                    <br />
                    <strong className="h4">
                      {" "}
                      {props &&
                        props.location.state &&
                        props.location.state.coinsEarned}
                    </strong>
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

export default UserViewsManagement;
