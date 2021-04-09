import {
  CButton,
  CDataTable,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRedeemReq, updateRedeemReq } from "src/actions/adminAction";
import Loader from "../Loader/Loader";
import moment from "moment";
const TransactionManage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [status, setStatus] = useState("");
  useEffect(() => {
    setLoading(true);
    document.title = "Human Race | Transaction Management";
    dispatch(getAllRedeemReq()).then((data) => {
      setState(data);
      setLoading(false);
    });
  }, [dispatch]);

  console.log(status);
  const fields = [
    { label: "Reviewer name", key: "user", _style: { width: "10%" } },
    { label: "Amount requested", key: "amount", _style: { width: "10%" } },
    { label: "Requested on", key: "createdAt", _style: { width: "10%" } },
    { key: "status", _style: { width: "10%" } },
  ];
  const getBadge = (active) => {
    switch (active) {
      case true:
      case "Approved":
        return "success";
      case false:
      case "Reject":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <CDataTable
          items={state ? state : []}
          fields={fields}
          columnFilter
          tableFilter
          footer
          itemsPerPageSelect
          responsive
          outlined
          itemsPerPage={10}
          hover
          sorter
          pagination
          scopedSlots={{
            user: (item) => <td className="py-2">{item.user.name}</td>,
            createdAt: (item) => (
              <td className="py-2">{moment(item.createdAt).format("LLL")}</td>
            ),
            status: (item) => {
              return (
                <td className="py-2">
                  <CDropdown className="mt-2">
                    <CDropdownToggle caret color={getBadge(item.status)}>
                      {item.status}
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem
                        onClick={() =>
                          dispatch(updateRedeemReq(item._id, "Approved")).then(
                            (data) => {
                              dispatch(getAllRedeemReq()).then((datam) => {
                                setState(datam);
                              });
                            }
                          )
                        }
                        style={{
                          display:
                            item.status === "Approved" ? "none" : "block",
                        }}
                      >
                        Approved
                      </CDropdownItem>

                      <CDropdownItem
                        style={{
                          display: item.status === "Reject" ? "none" : "block",
                        }}
                        onClick={() =>
                          dispatch(updateRedeemReq(item._id, "Reject")).then(
                            (data) => {
                              dispatch(getAllRedeemReq()).then((datam) => {
                                setState(datam);
                              });
                            }
                          )
                        }
                      >
                        Reject
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </td>
              );
            },
          }}
        />
      )}
    </>
  );
};

export default TransactionManage;
