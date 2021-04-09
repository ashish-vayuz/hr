import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
  CImg,
} from "@coreui/react";
import { useState } from "react";
import moment from "moment";
const ViewTable = ({ usersData }) => {
  const [details, setDetails] = useState([]);
  // const [items, setItems] = useState(usersData)
  console.log(usersData);
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "user", label: "User Name", _style: { width: "40%" } },

    { key: "userimage", label: "User image", _style: { width: "20%" } },
    { key: "submitdate", label: "Submitted on", _style: { width: "20%" } },
    { key: "reviewedby", label: "Reviewed by", _style: { width: "20%" } },
    { key: "notsub", label: "N.O.T submitted    ", _style: { width: "20%" } },
    { key: "active", label: "status", _style: { width: "20%" } },
  ];

  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "danger";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "warning";
    }
  };
  return (
    <CDataTable
      items={usersData}
      fields={fields}
      columnFilter
      tableFilter
      footer
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots={{
        user: (item) => (
          <td className="py-2">
            {item ? (item.user && item.user.name ? item.user.name : "-") : ""}
          </td>
        ),
        userimage: (item) => (
          <td className="py-2">
            <CImg
              style={{ borderRadius: "50%" }}
              src={
                item
                  ? item.user && item.user.image
                    ? item.user.image
                    : "-"
                  : "-"
              }
              fluid
              className="mb-2"
              width="50px"
              height="50px"
            />
          </td>
        ),
        reviewedby: (item) => (
          <td className="py-2">
            {item
              ? item.user && item.user.reviewedby
                ? item.user.reviewedby
                : "-"
              : "-"}
          </td>
        ),
        notsub: (item) => (
          <td className="py-2">
            {item
              ? item.user && item.user.notsub
                ? item.user.notsub
                : "-"
              : "-"}
          </td>
        ),
        submitdate: (item) => (
          <td className="py-2">
            {item
              ? item.user && moment(item.user.createdAt).format("DD/MM/YYYY LT")
              : "-"}
          </td>
        ),
        active: (item) => (
          <td>
            <CBadge color={getBadge(item.active)}>
              {item.active ? "Active" : "Inactive"}
            </CBadge>
          </td>
        ),
      }}
    />
  );
};

export default ViewTable;
