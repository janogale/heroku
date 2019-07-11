import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill';


class EditorPlans extends Component {

  render() {
    return (
      <div>
        <h2 className="subtitle">{this.props.title}</h2>
        <ReactQuill
          theme={"snow"}
          onChange={this.props.handleChange}
          value={this.props.value}
          modules={EditorPlans.modules}
          formats={EditorPlans.formats}
          bounds={".plans-editor"}
          placeholder={this.props.placeholder}
        />
        
      </div>
    )
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
EditorPlans.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
EditorPlans.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link'
]

/*
 * PropType validation
 */
EditorPlans.propTypes = {
  placeholder: PropTypes.string,
}

/*
 * Render component on page
 */

export default EditorPlans;