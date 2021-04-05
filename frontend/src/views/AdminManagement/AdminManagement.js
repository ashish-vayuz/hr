import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
  CImg,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import moment from "moment";
import axios from "axios";
import {
  listAdmins,
  deleteAdmin,
  updateAdmin,
} from "../../actions/adminAction";
import { useHistory } from "react-router-dom";

const CategoryManagement = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  console.log(props.location.pathname);
  const dispatch = useDispatch();
  const adminList = useSelector((state) => state.adminList);
  const { loading, error, admins } = adminList;
  useEffect(() => {
    dispatch(listAdmins());
    if (!loading) {
      setData(admins);
    }
  }, [dispatch]);

  const [details, setDetails] = useState([]);
  const [items, setItems] = useState(admins);
  const [status, setStatus] = useState([]);
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    console.log(position);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  const deleteChallengeHandler = async (id) => {
    await dispatch(deleteAdmin(id));
    const { data } = await axios.get("/admin");
    setData(data);
  };

  const changeStatusHandler = async (id, active, index) => {
    if (active) {
      await dispatch(updateAdmin(id, false));
      const { data } = await axios.get("/admin");
      setData(data);
    } else {
      await dispatch(updateAdmin(id, true));
      const { data } = await axios.get("/admin");
      setData(data);
    }
  };

  const fields = [
    { key: "name", _style: { width: "10%" } },
    { key: "email", _style: { width: "10%" } },
    { key: "role", label: "Sections accessible", _style: { width: "10%" } },
    { key: "createdAt", label: "Added on", _style: { width: "10%" } },
    {
      key: "active",
      _style: { width: "4%" },
      sorter: false,
      filter: false,
    },
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

  const handleUpdate = (info) => {
    history.push({
      pathname: "/updateadmin",
      state: info,
    });
  };
  console.log(data);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <CDataTable
            items={data.list || admins.list}
            fields={fields}
            columnFilter
            tableFilter
            footer
            itemsPerPageSelect
            responsive
            outlined
            itemsPerPage={20}
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
              createdAt: (item) => (
                <td className="py-2">{moment(item.createdAt).format("LLL")}</td>
              ),
              image: (item) => (
                <td className="py-2">
                  <CImg
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
                      {/* <CButton color="info" to="/viewChallenge">
                                                    View
                                                </CButton> */}
                      <CButton
                        color="secondary"
                        className="ml-1"
                        onClick={() => handleUpdate(item)}
                      >
                        Edit
                      </CButton>
                      <CButton
                        color="danger"
                        className="ml-1"
                        onClick={() => {
                          deleteChallengeHandler(item._id);
                        }}
                      >
                        Delete
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

export default CategoryManagement;
