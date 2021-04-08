import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
  CImg,
  CRow,
} from "@coreui/react";
import { CSVLink } from "react-csv";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import axios from "axios";
import {
  listUsers,
  addUser,
  deleteUser,
  updateUser,
  listUserDetails,
} from "../../actions/userMAction";
import moment from "moment";
import Modal from "src/reusable/Modal";
import { listReviewer } from "src/actions/reviewerAction";
import { useHistory } from "react-router-dom";
import Report from "src/reusable/Report";

const ReviewerManagement = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.viewerList);

  const { loading, error, viewers } = userList;
  useEffect(() => {
    document.title = "Human Race | Re-Viewer Management";
    dispatch(listReviewer());
    if (!loading) {
      setData(viewers);
    }
  }, [dispatch]);

  const [details, setDetails] = useState([]);
  const [items, setItems] = useState(viewers);
  const [status, setStatus] = useState([]);
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    // console.log(position);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  const deleteChallengeHandler = async (id) => {
    await dispatch(deleteUser(id));
    const { data } = await axios.get("/admin/reviewer");
    setData(data);
  };

  const changeStatusHandler = async (id, active, index) => {
    if (active) {
      await dispatch(updateUser(id, false));
      const { data } = await axios.get("/admin/reviewer");
      setData(data);
    } else {
      await dispatch(updateUser(id, true));
      const { data } = await axios.get("/admin/reviewer");
      setData(data);
    }
  };

  const fields = [
    { key: "name", _style: { width: "10%" } },
    { key: "email", _style: { width: "10%" } },
    { key: "contact", _style: { width: "10%" } },
    { key: "location", _style: { width: "10%" } },
    { key: "totalReports", _style: { width: "10%" } },
    { key: "isReviewer", _style: { width: "10%" } },
    { key: "image", _style: { width: "1%" } },
    { key: "active", _style: { width: "8%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const getBadge = (active) => {
    switch (active) {
      case true:
      case "true":
        return "success";
      case false:
      case "false":
        return "danger";
      default:
        return "primary";
    }
  };

  const handleView = (info) => {
    history.push({
      pathname: "/review/viewReview",
      state: info,
    });
  };
  const [dateFormat, setDateFormat] = useState({
    start: "",
    end: "",
  });
  console.log(userList);
  const header = [
    { label: " Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Contact", key: "contact" },
    { label: "Location", key: "location" },
    { label: "Total Reports	", key: "totalReports" },
    { label: "Is Reviewer	", key: "isReviewer" },
    { label: "Active", key: "active" },
  ];
  const csvReport = {
    data: `${viewers}` && viewers.list,
    headers: header,
    filename: "ReViewer-Report.csv",
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <CRow
            className="container"
            style={{
              background: "white",
              marginBottom: "4px",
              marginLeft: "5px",
              padding: "10px",
            }}
          >
            <Report dateFormat={dateFormat} setDateFormat={setDateFormat} />
          </CRow>
          <CButton className="float-right ml-2 mt-1" color="primary">
            <CSVLink style={{ color: "white" }} {...csvReport}>
              Export to CSV
            </CSVLink>
          </CButton>
          <CDataTable
            items={data.list || viewers.list}
            fields={fields}
            columnFilter
            tableFilter
            // footer
            itemsPerPageSelect
            responsive
            outlined
            itemsPerPage={10}
            hover
            sorter
            pagination
            scopedSlots={{
              active: (item, index) => (
                <td className="py-2">
                  <CButton
                    size="sm"
                    color={getBadge(item.active)}
                    onClick={() => {
                      changeStatusHandler(item._id, item.active, index);
                    }}
                  >
                    {item.active ? "Active" : "In Active"}
                  </CButton>
                </td>
              ),
              isReviewer: (item, index) => (
                <td className="py-2">{item.isReviewer ? "Yes" : "No"}</td>
              ),
              image: (item) => (
                <td className="py-2">
                  <CImg
                    style={{ borderRadius: "50%" }}
                    src={`${item.image}`}
                    fluid
                    className="mb-2"
                    width="50px"
                    height="50px"
                  />
                </td>
              ),
              show_details: (item, index) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(index);
                      }}
                    >
                      Action
                    </CButton>
                  </td>
                );
              },
              details: (item, index) => {
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <h4>{item.username}</h4>
                      <p className="text-muted">
                        Created at:{" "}
                        {moment(item.createdAt).format("DD/MM/YYYY LT")}/Updated
                        on: {moment(item.updatedAt).format("DD/MM/YYYY LT")}
                      </p>
                      <CButton color="info" onClick={() => handleView(item)}>
                        View
                      </CButton>
                      {/* <CButton
                        color="secondary"
                        className="ml-1"
                        to="/editChallenge"
                      >
                        Edit
                      </CButton> */}
                      <CButton color="danger" className="ml-1">
                        <Modal
                          message={"Are you sure want to delete?"}
                          title={"Delete"}
                          color={"danger"}
                          onClickFunction={() => {
                            deleteChallengeHandler(item._id);
                          }}
                        />
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default ReviewerManagement;
