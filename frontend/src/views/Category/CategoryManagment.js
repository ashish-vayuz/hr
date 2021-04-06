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
import {
  listCategorys,
  deleteCategory,
  updateCategory,
} from "../../actions/categoryActions";
import Loader from "../Loader/Loader";
import axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CategoryManagement = ({ location }) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  console.log(location.pathname);
  const dispatch = useDispatch();
  const updateCategoryData = useSelector((state) => state.updateCategory);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categorys } = categoryList;
  useEffect(() => {
    document.title = "Human Race | Category Management";
    dispatch(listCategorys());
    if (!loading) {
      setData(categorys);
    }
  }, [dispatch]);

  const [details, setDetails] = useState([]);
  const [items, setItems] = useState(categorys);
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
    await dispatch(deleteCategory(id));
    const { data } = await axios.get("/category");
    setData(data);
  };

  const changeStatusHandler = async (id, active, index) => {
    if (active) {
      await dispatch(updateCategory(id, false));
      const { data } = await axios.get("/category");
      setData(data);
    } else {
      await dispatch(updateCategory(id, true));
      const { data } = await axios.get("/category");
      setData(data);
    }
  };

  const fields = [
    { key: "name", _style: { width: "10%" } },
    {
      key: "image",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
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
  const editHandler = (item) => {
    history.push({
      pathname: `/editCategory/${item._id}`,
      state: { detail: item },
    });
  };
  const handleEdit = (info) => {
    history.push({
      pathname: "/updatecategory",
      state: info,
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <CDataTable
            items={data.list || categorys.list}
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
                        // onClick={() => editHandler(item)}
                        onClick={() => handleEdit(item)}
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
