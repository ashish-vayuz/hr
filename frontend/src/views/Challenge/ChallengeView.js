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
  CRow,
  CWidgetBrand,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import ViewTable from "./component/viewTable";

const ChallengeView = (props) => {
  console.log(props);
  useEffect(() => {
    document.title = "Human Race | View Challenge";
    if (!(props && props.location.state)) {
      history.push("/challenge");
    }
  }, []);
  const history = useHistory();

  const [collapse, setCollapse] = useState(false);
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
    <CContainer>
      <CRow>
        <CCol className="py-3">
          <CCard>
            <CHeader className="ml-4 mt-2">
              <strong>
                <h4>Challenge details</h4>
              </strong>
            </CHeader>
            <CCardBody className="hover ml-4 mt-0">
              <CCard>
                <CCollapse
                  show={collapse}
                  onEntering={onEntering}
                  onEntered={onEntered}
                  onExiting={onExiting}
                  onExited={onExited}
                >
                  <CCardBody>
                    <CRow className="lg-4 ml-4"></CRow>
                  </CCardBody>
                </CCollapse>
                <CCardFooter>
                  <CButton color="primary" onClick={toggle} className={"mb-1"}>
                    {!collapse
                      ? "See Challenge Details"
                      : "Hide Challenge Details"}
                  </CButton>
                </CCardFooter>
              </CCard>
            </CCardBody>
          </CCard>
          <CCard className="mt-4">
            <CHeader className="ml-4 mt-2">
              <strong>
                <h4>Responses</h4>
              </strong>
            </CHeader>
            <CCardBody>
              <ViewTable></ViewTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ChallengeView;
