import CIcon from "@coreui/icons-react";
import "./style.css";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CCollapse,
  CContainer,
  CHeader,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
  CWidgetBrand,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import ViewTable from "./component/viewTable";
import Columns from "src/reusable/Columns";

const ChallengeView = (props) => {
  console.log(props);
  useEffect(() => {
    document.title = "Human Race | View Challenge";
    if (!(props && props.location.state)) {
      history.push("/challenge");
    }
  }, []);
  const history = useHistory();

  const [collapse, setCollapse] = useState(true);
  const [collapse2, setCollapse2] = useState(false);

  const onEntering = () => {};
  const onEntered = () => {};
  const onExiting = () => {};
  const onExited = () => {};

  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  // inner
  const toggle2 = (e) => {
    setCollapse2(!collapse2);
    e.preventDefault();
  };
  return (
    <CTabs activeTab="home">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink data-tab="home">Challenge details</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink data-tab="profile">Responses</CNavLink>
        </CNavItem>
        {/* <CNavItem>
          <CNavLink data-tab="messages">Messages</CNavLink>
        </CNavItem> */}
      </CNav>
      <CTabContent>
        <CTabPane data-tab="home">
          <CCardBody>
            <CRow className="lg-4 ml-4">
              <CContainer>
                <div className="row mt-4">
                  <CCol className="hover bg-red">
                    <strong>Title</strong>
                  </CCol>
                  <CCol>{props && props.location.state.title}</CCol>
                </div>
                <hr />

                <Columns
                  title="Discription"
                  data={props && props.location.state.description}
                />

                <Columns
                  title="Hashtag"
                  data={props && props.location.state.hashtags}
                />

                <Columns
                  title="Category"
                  data={
                    props &&
                    props.location.state.category &&
                    props.location.state.category.name
                  }
                />

                <Columns
                  title="Reward"
                  data={props && props.location.state.rewards}
                />

                <Columns
                  title="Coins to be Allocated"
                  data={props && props.location.state.coinAllocated}
                />

                <Columns
                  title="Coins required to redeem the Reward"
                  data={props && props.location.state.coinRequired}
                />

                <Columns
                  title="Duration of the challenge"
                  data={props && props.location.state.duration}
                />

                <Columns
                  title="Visibility of the challenge"
                  data={props && props.location.state.visibility}
                />

                <Columns
                  title="Amount"
                  data={props && props.location.state.reviewAmount}
                />

                <Columns
                  title="Number of participants allowed"
                  data={props && props.location.state.totalparticipated}
                />
              </CContainer>
            </CRow>
          </CCardBody>
        </CTabPane>
        <CTabPane data-tab="profile">
          <ViewTable></ViewTable>
        </CTabPane>
        {/* <CTabPane data-tab="messages">789</CTabPane> */}
      </CTabContent>
    </CTabs>
  );
};

export default ChallengeView;
