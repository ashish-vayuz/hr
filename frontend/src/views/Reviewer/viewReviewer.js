import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
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
import { useEffect } from "react";
import Userinfo from "./components/Userinfo";

const ReviewView = (props) => {
  console.log(props);
  useEffect(() => {
    document.title = "Human Race | View Reviewer";
    if (!(props && props.location.state)) {
      history.push("/reviewer");
    }
  }, []);
  const history = useHistory();

  return (
    <CTabs activeTab="home">
      <div className="float-right">
        <button
          type="button"
          className="btn btn-xing"
          onClick={() => history.push("/reviewer")}
        >
          <span className="cib-xing btn-icon mr-2"></span> Back
        </button>
      </div>
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink data-tab="home">User information</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink data-tab="messages">Challenge reviewed</CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane data-tab="home">
          {" "}
          <Userinfo userInfo={props && props.location.state} />
        </CTabPane>

        <CTabPane data-tab="messages">789</CTabPane>
      </CTabContent>
    </CTabs>
  );
};

export default ReviewView;
