import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
import { CButton } from "@coreui/react";

const TwoWayBinding = () => {
  const [data, setData] = useState('<p>React is really <em>nice</em>!</p>');

  const onEditorChange = (evt) => {
    setData(evt.editor.getData())
  }

  const handleChange = (changeEvent) => {
    setData(changeEvent.target.value)
  }

  return (
    <div>
      <CKEditor
        data={data}
        onChange={onEditorChange} />
      <div className="my-3">
        <CButton color="secondary" className="mr-3">Back</CButton>
        <CButton color="success">Submit</CButton>
      </div>
      <EditorPreview data={data} />
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