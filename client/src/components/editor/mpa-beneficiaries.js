import React from 'react';
import './mpa-beneficieries.css';

class MPABeneficiaries extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mpaData: {
        avrrCase: null,
        saCase: null,
        libyaCase: null,
        notReachable: null,
        inProcurement: null,
        inProgress: null,
        recieved: null,
        notStarted: null
      },
      totalCases: null
    }


    this.handleChange = this.handleChange.bind(this);
  }

  //update state from props if state and props are different.
  componentWillReceiveProps(nextProps) {
    if (nextProps.mpaData !== this.props.mpaData) {
      this.setState({
        mpaData: { ...nextProps.mhdPatients }
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.mpaData !== prevProps.mpaData) {
      this.setState({
        mpaData: { ...this.props.mpaData }
      }, () => {
        const { avrrCase, saCase, libyaCase } = this.state.mpaData
        //update total
        this.setState(state => ({ totalCases: avrrCase + saCase + libyaCase }))
      })
    }
  }


  handleChange(event) {
    const { name, value } = event.target

    if (isNaN(value)) return null;

    let changeState = Object.assign({}, this.state.mpaData, { [name]: +(value) })

    this.setState({
      mpaData: changeState
    },
      () => this.props.getMPAData(this.state.mpaData)
    )



  }



  render() {
    return (
      <div className="box box-mhd" >
        <h2 className=" has-text-centered subtitle has-text-weight-bold">Beneficiaries Assisted this week</h2>

        <br />
        <div className="columns">
          <div className="column is-6-desktop">
            <p className="subtitle is-size-6">Beneficiaries supported by MPA</p>
            <div className="field is-grouped is-block">
              <div className="field has-addons">
                <div className="control">
                  <span className="button is-size-6">AVRR Cases</span>
                </div>
                <div className="control">
                  <input
                    className="input"
                    name="avrrCase"
                    type="text"
                    value={this.state.mpaData.avrrCase || ''}
                    placeholder="Assisted Number"
                    onChange={this.handleChange} />
                </div>
              </div>
            </div>
            <div className="field is-grouped is-block">
              <div className="field has-addons">
                <div className="control">
                  <span className="button is-size-6">Saudi Cases</span>
                </div>
                <div className="control">
                  <input
                    className="input"
                    name="saCase"
                    type="text"
                    value={this.state.mpaData.saCase || ''}
                    placeholder="Assisted Number"
                    onChange={this.handleChange} />
                </div>
              </div>
            </div>
            <div className="field is-grouped is-block">
              <div className="field has-addons">
                <div className="control">
                  <span className="button is-size-6">Libya Cases</span>
                </div>
                <div className="control">
                  <input
                    className="input"
                    name="libyaCase"
                    type="text"
                    value={this.state.mpaData.libyaCase || ''}
                    placeholder="Assisted Number"
                    onChange={this.handleChange} />
                </div>
              </div>
            </div>
            <div className="tags has-addons">
              <span className="tag">Total Cases</span>
              <span className="tag is-white"><strong>{this.state.totalCases}</strong></span>
            </div>
          </div>
          {/* divider */}
          <div className="column is-5">
            <p className="has-text-centered subtitle is-size-6">Assitance provided to Returnees from Libya  so far</p>
            <div className="field">
              <div className="control">
                <input className="input"
                  name="notReachable"
                  type="text"
                  value={this.state.mpaData.notReachable || ''}
                  placeholder="not reachable"
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input"
                  name="inProgress"
                  type="text"
                  value={this.state.mpaData.inProgress || ''}
                  placeholder="in progress"
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input"
                  name="inProcurement"
                  type="text"
                  value={this.state.mpaData.inProcurement || ''}
                  placeholder="in procurement"
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input"
                  name="recieved"
                  type="text"
                  value={this.state.mpaData.recieved || ''}
                  placeholder="assistance recieved"
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input"
                  name="notStarted"
                  type="text"
                  value={this.state.mpaData.notStarted || ''}
                  placeholder="not started yet"
                  onChange={this.handleChange} />
              </div>
            </div>
          </div>
          <div className="column"></div>
        </div>
      </div >
    )
  }
}


export default MPABeneficiaries;