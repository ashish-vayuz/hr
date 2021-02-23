import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
import { CButton, CFormGroup, CInput, CLabel } from "@coreui/react";
import { useDispatch, useSelector } from 'react-redux';
import { listCmsDetails } from 'src/actions/cmsAction';

const TwoWayBinding = ({ match,location }) => {
  console.log(location.state.detail.data)
  const [desc, setDesc] = useState(location.state.detail.desc)
  const [name, setName] = useState(location.state.detail.name);
  useEffect(() => {
    dispatch(listCmsDetails(match.params.id))
  }, [dispatch, loading]);
  const viewCms = useSelector(state => state.viewCms)
  const { loading, error, cms } = viewCms
  const dispatch = useDispatch()
  const onEditorChange = (evt) => {
    setDesc(evt.editor.getData())
  }
  const handleChange = (changeEvent) => {
    setDesc(changeEvent.target.value)
  }
  const submitHandler=()=>{
    
  }
  return (
    <div>
      <CFormGroup>
        <CLabel htmlFor="nf-email">Name</CLabel>
        <CInput
          type="name"
          id="nf-email"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="nf-email"
          placeholder="Enter Name.."
          required
        />
      </CFormGroup>
      <CKEditor
        data={desc}
        onChange={onEditorChange} />
      <div className="my-3">
        <CButton color="secondary" to="/cms" className="mr-3">Back</CButton>
        <CButton color="success" onClick={submitHandler}>Submit</CButton>
      </div>
      <EditorPreview data={desc} />
    </div>
  );
}

class EditorPreview extends Component {
  render() {
    return (
      <div className="editor-preview bg-white my-5 card p-4">
        <h2>Rendered content</h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.data }}></div>
      </div>
    );
  }
}

EditorPreview.defaultProps = {
  data: ''
};

EditorPreview.propTypes = {
  data: PropTypes.string
};

export default TwoWayBinding;