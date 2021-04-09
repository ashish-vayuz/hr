import { CButton } from "@coreui/react";

const Report = ({ dateFormat, setDateFormat }) => {
  return (
    <>
      <form>
        By Date: {"       "}
        <input
          value={dateFormat.start}
          onChange={(e) =>
            setDateFormat({ ...dateFormat, start: e.target.value })
          }
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
          type="date"
        />{" "}
        to{" "}
        <input
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
          value={dateFormat.end}
          format="dd/mm/yy"
          disabled={dateFormat.start === ""}
          min={dateFormat.start}
          onChange={(e) =>
            setDateFormat({ ...dateFormat, end: e.target.value })
          }
          type="date"
        />
        <CButton
          type="submit"
          disabled={dateFormat.start === "" || dateFormat.end === ""}
          color="primary"
        >
          Submit
        </CButton>
      </form>
      <CButton
        onClick={() => setDateFormat({ start: "", end: "" })}
        className="ml-2"
        type="Cancle"
        color="secondary"
      >
        Reset
      </CButton>
    </>
  );
};

export default Report;
