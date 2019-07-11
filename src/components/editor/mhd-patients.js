import React from 'react';
import './mhd-patients.css';

class MHDPatients extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.mhdPatients
    }

    this.handleChange = this.handleChange.bind(this);
  }

  //update state from props if state and props are different.
  componentWillReceiveProps(nextProps) {
    if (nextProps.mhdPatients !== this.props.mhdPatients) {
      this.setState({
        ...nextProps.mhdPatients
      })
    }
  }


  handleChange(event) {
    const { name, value } = event.target

    if (!isFinite(value)) return null;

    // update the input than state than sent to parent.
    this.setState({
      [name]: Number(value),
    },
      () => this.setState({
        totalMales: this.state.maleabove5 + this.state.maleunder5,
        totalFemales: this.state.femaleabove5 + this.state.femaleunder5
      },
        () => this.props.getPatients(this.state)
      ))
  }



  render() {
    return (
      <div className="box box-mhd" >
        <h2 className="subtitle is-size-6 has-text-weight-bold">HMIS data from MHD supported health facilities</h2>
        <p className="">Beneficiaries supported by health facilities during last week (HMIS Data)</p>
        <br />
        <div className="field is-grouped is-block">

          <div className="field has-addons">
            <div className="control">
              <span className="button is-size-6">Males</span>
            </div>
            <div className="control">
              <input
                className="input"
                name="maleabove5"
                type="text"
                value={this.state.maleabove5 || ''}
                placeholder="Above 5 years"
                onChange={this.handleChange} />
            </div>
            <div className="control">
              <input
                className="input"
                name="maleunder5"
                type="text"
                value={this.state.maleunder5 || ''}
                placeholder="Under 5 years"
                onChange={this.handleChange} />
            </div>
            <div className="control" style={{ margin: '0 1.5rem' }}>

              <span className=""><strong>Total Males: </strong> {this.state.totalMales}</span>
            </div>
          </div>

        </div>
        <div className="field is-grouped is-block">

          <div className="field has-addons">
            <div className="control">
              <span className="button is-size-6">Females</span>
            </div>
            <div className="control">
              <div className="control">
                <input
                  className="input"
                  name="femaleabove5"
                  type="text"
                  value={this.state.femaleabove5 || ''}
                  placeholder="Under 5 years"
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className="control">
              <div className="control">
                <input
                  className="input"
                  name="femaleunder5"
                  value={this.state.femaleunder5 || ''}
                  type="text"
                  placeholder="Under 5 years"
                  onChange={this.handleChange} />
              </div>            </div>
            <div className="control" style={{ margin: '0 1.5rem' }}>

              <span className=""><strong>Total Females: </strong> {this.state.totalFemales}</span>
            </div>
          </div>

        </div>
      </div>
    )
  }
}


export default MHDPatients;