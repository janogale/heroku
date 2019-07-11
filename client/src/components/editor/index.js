import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import EditorUpdates from './Editor-updates';
import EditorPlans from './Editor-plans';



function isEditorEmpy(html) {
  if (html === '' || html === "<p><br></p>" || html === "<p> </p>") {
    return true;
  }

  return false;
}

class RichEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editors: {
        updates: '',
        plans: '',
      },
      mhdPatients: {},
      mpaData: {},
      department: this.props.department,
      updateID: null,
      updateSubmited: false,
      alert: ""
    }

    this.getPatients = this.getPatients.bind(this);
    this.getMPAData = this.getMPAData.bind(this)
    this.handleChangeUpdates = this.handleChangeUpdates.bind(this);
    this.handleChangeUpdates = this.handleChangeUpdates.bind(this);
    this.handleChangePlans = this.handleChangePlans.bind(this);
    this.handleEditor = this.handleEditor.bind(this);
  }

  getPatients(obj) {
    let mhdPatients = Object.assign({}, this.state.mhdPatients, obj)
    return this.setState({ mhdPatients })
  }

  getMPAData(obj) {
    let mpaData = Object.assign({}, this.state.mpaData, obj)

    this.setState({ mpaData })

  }

  handleChangeUpdates(html) {

    let newUpdates = Object.assign({}, this.state.editors, { updates: html })
    this.setState({ editors: newUpdates });
  }

  handleChangePlans(html) {

    let newUpdates = Object.assign({}, this.state.editors, { plans: html.trim() })
    this.setState({ editors: newUpdates });
  }


  //save data.
  async handleEditor() {

    //exact state data.
    let { updates } = this.state.editors
    let { plans } = this.state.editors

    // return if fields are empty.
    if (isEditorEmpy(updates)) { return this.setState({ alert: "please insert your updates" }) }
    if (isEditorEmpy(plans)) { return this.setState({ alert: "please insert your plans" }) }

    //if update sumbited & updateId exist, update data
    if (this.state.updateId) {
      let r = await axios.put(`http://localhost:5000/updates/${this.state.updateId}`,
        {
          "department": this.state.department,
          "achievements": this.state.editors.updates,
          "plans": this.state.editors.plans,
          mhdPatients: this.state.mhdPatients,
          mpaData: this.state.mpaData
        });


      //display alert.
      this.setState({ alert: "successfully updated data" });
      return console.log("updated", r.status)
    } else {
      // post new data.
      let result = await axios.post('http://localhost:5000/updates',
        {
          "department": this.state.department,
          "achievements": this.state.editors.updates,
          "plans": this.state.editors.plans,
          mhdPatients: this.state.mhdPatients || null,
          mpaData: this.state.mpaData || null
        });

      this.setState({ updateSubmited: true })
      this.setState({ updateId: result.data.update._id })

      // display alert
      this.setState({ alert: "successfully saved updates" });

    }


  }

  // chech if department already submited updates if so then update
  // retrieve submited Data.

  async componentDidMount() {

    let res = await axios.get(`http://localhost:5000/updates/${this.state.department}/date`);

    if (res.data.length > 0) {
      let resData = res.data[0];

      //update state.
      let stateData = this.state.editors;
      stateData.updates = resData.achievements;
      stateData.plans = resData.plans;
      //  update mhdpatients and MPA fields state
      this.setState({ mhdPatients: resData.mhdPatients })
      this.setState({ mpaData: resData.mpaData })
      this.setState({ editors: stateData })
      this.setState({ updateSubmited: true })
      this.setState({ updateId: resData._id })

      //set alert message
      this.setState({ alert: "updates already submited, you can edit now" });
    } else {
      console.log("updates not submited");

    }

  }

  render() {
    return (
      <React.Fragment>
        <div className="columns">
          <div className="column"></div>
          <div className="column is-three-quarters">

            <p className="is-size-6 has-background-success has-text-white has-text-centered">{this.state.alert}</p>
            <br />
            <div className="updates-editor">
              <EditorUpdates
                placeholder='Type your updates...'
                title="Enter Your Achiements below"
                handleChange={this.handleChangeUpdates}
                value={this.state.editors.updates}
                department={this.state.department || null}
                mhdPatients={this.state.mhdPatients}
                mpaData={this.state.mpaData}
                getPatients={this.getPatients}
                getMPAData={this.getMPAData}
              />
            </div>
            <br />

            <EditorPlans
              placeholder='Type your Plans here...'
              title="Enter Your Plans below"
              handleChange={this.handleChangePlans}
              value={this.state.editors.plans}
            />

            {/* Button to save data */}
            <hr />
            <div className="divider">
              <button onClick={this.handleEditor} className="button is-success is-medium">{this.state.updateSubmited ? "update" : "save"}</button>
            </div>
          </div>
          <div className="column"></div>
        </div>
      </React.Fragment>
    )
  }
}


export default RichEditor


