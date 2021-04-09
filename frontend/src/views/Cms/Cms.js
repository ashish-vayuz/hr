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
import axios from "axios";
import {
  listUsers,
  addUser,
  deleteUser,
  updateUser,
  listUserDetails,
} from "../../actions/userMAction";
import { deleteCms, listCmss, updateCms } from "src/actions/cmsAction";
import moment from "moment";

const CmsManagement = ({ history }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const cmsList = useSelector((state) => state.cmsList);
  const { loading, error, cmss } = cmsList;
  useEffect(() => {
    document.title = "Human Race |  CMS";

    dispatch(listCmss());
    if (!loading) {
      setData(cmss);
    }
  }, [dispatch]);

  const [details, setDetails] = useState([]);
  const [items, setItems] = useState(cmss);
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
    await dispatch(deleteCms(id));
    const { data } = await axios.get("/cms");
    setData(data);
  };

  const changeStatusHandler = async (id, active, index) => {
    if (active) {
      await dispatch(updateCms(id, false));
      const { data } = await axios.get("/cms");
      setData(data);
    } else {
      await dispatch(updateCms(id, true));
      const { data } = await axios.get("/cms");
      setData(data);
    }
  };

  const fields = [
    { key: "name", label: "Page Name", _style: { width: "10%" } },
    { key: "createdAt", label: "Created On", _style: { width: "10%" } },
    { key: "active", _style: { width: "10%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  const editHandler = (item) => {
    history.push({ pathname: `/cmsform/${item._id}`, state: { detail: item } });
  };
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
  console.log(data);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <CDataTable
            items={data.list || cmss.list}
            fields={fields}
            columnFilter
            tableFilter
            footer
            itemsPerPageSelect
            responsive
            outlined
            itemsPerPage={5}
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
                <td className="py2">{moment(item.createdAt).format("LLL")}</td>
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
                        Created at: {moment(item.createdAt).format("LLL")}{" "}
                        Updated on: {moment(item.updatedAt).format("LLL")}
                      </p>
                      {/* <CButton color="info" to="/viewChallenge">
                                                    View
                                                </CButton> */}
                      <CButton
                        color="secondary"
                        className="ml-1"
                        onClick={() => editHandler(item)}
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

export default CmsManagement;
