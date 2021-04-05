import { CCol } from "@coreui/react";

const Columns = ({ title, data }) => {
  return (
    <>
      <div className="row mt-2">
        <CCol>
          <strong>{title}</strong>
        </CCol>
        <CCol>{data}</CCol>
      </div>
      <hr />
    </>
  );
};

export default Columns;
