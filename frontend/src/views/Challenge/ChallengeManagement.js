import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
  CImg,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Loader from "../Loader/Loader";
import axios from "axios";
import { CSVLink } from "react-csv";

import {
  listChallenges,
  deleteChallenge,
  updateChallenge,
} from "../../actions/challengeActions";
import { useHistory } from "react-router-dom";
import Report from "src/reusable/Report";

const ChallengeManagement = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const challengeList = useSelector((state) => state.challengeList);
  const { loading, error, challenges } = challengeList;
  //   console.log(challenges, error);
  useEffect(() => {
    document.title = "Human Race | Challenge Mangement";
    dispatch(listChallenges());
    if (!loading) {
      setData(challenges);
    }
  }, [dispatch]);

  const [details, setDetails] = useState([]);
  const [items, setItems] = useState(challenges);
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
    await dispatch(deleteChallenge(id));
    const { data } = await axios.get("/challenge/list");
    setData(data);
  };

  const changeStatusHandler = async (id, active, index) => {
    if (active) {
      await dispatch(updateChallenge(id, false));
      const { data } = await axios.get("/challenge/list");
      setData(data);
    } else {
      await dispatch(updateChallenge(id, true));
      const { data } = await axios.get("/challenge/list");
      setData(data);
    }
  };

  const fields = [
    { key: "title", _style: { width: "10%" } },
    { key: "hashtags", _style: { width: "10%" } },
    { key: "category", _style: { width: "10%" } },
    { key: "coinAllocated", _style: { width: "10%" } },
    { key: "duration", _style: { width: "10%" } },
    { key: "visibility", _style: { width: "10%" } },
    { key: "reviewAmount", _style: { width: "10%" } },
    { key: "isPaymentDone", label: "Payment Status", _style: { width: "4%" } },
    { key: "active", _style: { width: "4%" } },
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
  const createMarkup = () => {
    return { __html: "&#x20B9" };
  };
  // console.log(data);
  const handleView = (info) => {
    history.push({
      pathname: "/viewChallenge",
      state: info,
    });
  };
  const header = [
    { label: " Title", key: "title" },
    { label: "Hashtags", key: "hashtags" },
    { label: "CoinAllocated", key: "coinAllocated" },
    { label: "Duration	", key: "duration" },
    { label: "Visibility	", key: "visibility" },
    { label: "ReviewAmount	", key: "reviewAmount" },
    { label: "Payment Status	", key: "isPaymentDone" },
    { label: "Visibility", key: "visibility" },
  ];
  const csvReport = {
    data: `${data}` && data.list,
    headers: header,
    filename: "challenge-Report.csv",
  };
  const [dateFormat, setDateFormat] = useState({
    start: "",
    end: "",
  });

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
            items={challenges && challenges.list}
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
              category: (item) => (
                <td className="py-2">{item.category.name}</td>
              ),
              duration: (item) => (
                <td className="py-2">{item.duration} Days</td>
              ),
              isPaymentDone: (item) => (
                <td className="py-2">{item.active ? "Success" : "Failure"}</td>
              ),
              reviewAmount: (item) => (
                <td className="py-2">
                  <span dangerouslySetInnerHTML={createMarkup()} />
                  {item.reviewAmount}
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

export default ChallengeManagement;
