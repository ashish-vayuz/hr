import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CSpinner,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAdmin, updateAdmin, listAdmins } from "src/actions/adminAction";
import { addUser } from "../../actions/userMAction";
import Loader from "../Loader/Loader";

const AddUser = (props) => {
  console.log(props);
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, admin } = useSelector((state) => state.updateAdmin);
  const { loading: adminAddLoading, admins } = useSelector(
    (state) => state.addAdmin
  );

  useEffect(() => {
    document.title =
      props && props.location.state
        ? "Human Race | Update Staff "
        : "Human Race | Add Staff";

    if (props && props.location.state) {
      setEmail(props.location.state.email);
      setName(props.location.state.name);
      setRole(props.location.state.role);
    }
  }, [props && props.location.state]);

  const submitHandler = (e) => {
    e.preventDefault();
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()<>?/",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
    dispatch(
      props && props.location.state
        ? updateAdmin(
            props.location.state._id,
            props.location.state.active ? true : false,
            name,
            email,
            role
          )
        : addAdmin(email, name, role, password)
    );
    if (admin && admins) {
      dispatch(listAdmins());
      history.push("/admin");
    }
  };
  return (
    <CContainer fluid>
      <CForm
        action=""
        method="post"
        wasValidated={false}
        onSubmit={submitHandler}
      >
        <CFormGroup>
          <CLabel htmlFor="nf-email">Email</CLabel>
          <CInput
            type="email"
            id="nf-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="nf-email"
            placeholder="Enter Email.."
            required
          />
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="nf-email">Name</CLabel>
          <CInput
            type="text"
            id="nf-email"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="nf-email"
            placeholder="Enter Name.."
            required
          />
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="nf-email">Role</CLabel>
          <CInput
            type="text"
            id="nf-email"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            name="nf-email"
            placeholder="Enter Role.."
            required
          />
        </CFormGroup>
        <CButton type="submit" to="/admin" color="secondary" className="mr-2">
          Back
        </CButton>
        <CButton
          type="submit"
          disabled={name == "" || email == "" || role == ""}
          color="success"
        >
          {props && props.location.state
            ? "Update"
            : adminAddLoading || loading
            ? "Loading..."
            : "Submit"}
        </CButton>
      </CForm>
    </CContainer>
  );
};

export default AddUser;
