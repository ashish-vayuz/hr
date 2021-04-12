import { CCard, CCardBody, CCol, CContainer } from "@coreui/react";
import React from "react";

const Userinfo = ({ userInfo }) => {
  return (
    <CContainer className="mt-4" fluid>
      <div className="row justify-content-center">
        <div className="col-8">
          {" "}
          <CCard>
            <CCardBody className=" ">
              <div className="float-right">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="c-callout c-callout-danger b-t-1 b-r-1 b-b-1 ml-2 ">
                      <small className="text-muted">Coin Earned</small>
                      <br />
                      <strong className="h4">{userInfo.coinsEarned}</strong>
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
                  src={userInfo.image}
                  className="img-thumbnail rounded  d-block  "
                  alt="user_img"
                  style={{ maxWidth: "250px" }}
                />
              </div>

              <div className="row mt-4">
                <CCol>Name</CCol>
                <CCol>{userInfo.name}</CCol>
              </div>
              <div className="row mt-2">
                <CCol>Age</CCol>
                <CCol>{userInfo && userInfo.reviewerData.age}</CCol>
              </div>
              <div className="row mt-2">
                <CCol>Bank name</CCol>
                <CCol>{userInfo && userInfo.reviewerData.bankName}</CCol>
              </div>
              <div className="row mt-2">
                <CCol>IFSC code</CCol>
                <CCol>{userInfo && userInfo.reviewerData.IFSCcode}</CCol>
              </div>
              <div className="row mt-2">
                <CCol>Branch name</CCol>
                <CCol>{userInfo && userInfo.reviewerData.branchName}</CCol>
              </div>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </CContainer>
  );
};

export default Userinfo;
