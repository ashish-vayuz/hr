import CIcon from "@coreui/icons-react";
import { CButton, CCol, CContainer, CRow, CWidgetBrand } from "@coreui/react";

const ChallengeView = () => {
  return (
    <CContainer>
      <div className={"row mt-2"}>
        <div className={"col-6"}>
          <CWidgetBrand
            color="twitter"
            rightHeader="973k"
            rightFooter="followers"
            leftHeader="1.792"
            leftFooter="tweets"
          >
            <CIcon name="cibTwitter" height="52" className="my-4" />
          </CWidgetBrand>
        </div>
      </div>
    </CContainer>
  );
};

export default ChallengeView;
