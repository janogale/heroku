import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill';
import MHDPatients from './mhd-patients';
import MPABeneficiaries from './mpa-beneficiaries';


class EditorUpdates extends Component {


  //use this.props.value as data tobe edited.

  render() {
    return (
      <div>
        <h2 className="subtitle">{this.props.title}</h2>
        <ReactQuill
          theme={'snow'}
          onChange={this.props.handleChange}
          value={this.props.value}
          modules={EditorUpdates.modules}
          formats={EditorUpdates.formats}
          bounds={".updates-editor"}
          placeholder={this.props.placeholder}
        >
        </ReactQuill>

        {/* if department is MHD render patient info */}
        {this.props.department === "MHD" &&
          <MHDPatients
            getPatients={this.props.getPatients}
            mhdPatients={this.props.mhdPatients}

          />}
        {/* if department is MPA render Beneficieries info */}
        {this.props.department === "MPA" &&
          <MPABeneficiaries
            getMPAData={this.props.getMPAData}
            mpaData={this.props.mpaData}

          />}

      </div>
    )
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
EditorUpdates.modules = {
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
EditorUpdates.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link'
]

/*
* PropType validation
*/
EditorUpdates.propTypes = {
  placeholder: PropTypes.string,
}

/*
* Render component on page
*/

export default EditorUpdates;