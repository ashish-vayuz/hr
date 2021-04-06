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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  addCategory,
  listCategorys,
  updateCategory,
} from "src/actions/categoryActions";
import Loader from "../Loader/Loader";

const CategoryAdd = (props) => {
  console.log(props);
  const history = useHistory();
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const { loading, category: categoryResult, error } = useSelector(
    (state) => state.updateCategory
  );
  const { categorys } = useSelector((state) => state.categoryList);
  useEffect(() => {
    if (props && props.location.state === undefined) {
      history.push("/category");
    }
    document.title =
      props && props.location.state
        ? "Human Race | Update Category"
        : "Human Race | Add Category";
    if (props && props.location.state) {
      setName(props.location.state.name);
    }
  }, [props && props.location.state]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("category", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/category/upload", formData, config);

      setImage(data.image);
      console.log(data.image);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setUploading(true);
    // console.log(image);
    dispatch(
      props && props.location.state
        ? updateCategory(
            props && props.location.state._id,
            props && props.location.state.active,
            name,
            image
          )
        : addCategory(name, image)
    );
    setUploading(false);
    if (categoryResult || categorys) {
      listCategorys();
      history.push("/category");
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
          <CLabel htmlFor="nf-password">Image </CLabel>
          <CInput
            type="file"
            id="nf-password"
            //value={image}
            onChange={uploadFileHandler}
            name="nf-password"
            placeholder="Enter Password.."
            required={props && props.location.state ? false : true}
          />
        </CFormGroup>

        <CButton
          type="submit"
          disabled={
            uploading || name == "" || (props && props.location.state)
              ? false
              : image == ""
          }
          color="success"
        >
          {uploading || (loading && <CSpinner />)}
          {props && props.location.state ? "Update" : "Submit"}
        </CButton>
      </CForm>
    </CContainer>
  );
};

export default CategoryAdd;
