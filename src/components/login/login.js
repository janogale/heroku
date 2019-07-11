import React, { Component } from 'react';

// Login Component
class Login extends Component {

  render() {

    const departments = this.props.logins.map( login => {
      return login.department
    })

    return (
      <section className="section" style={{ height: "80vh" }}>
        <div style={{marginBottom: "3rem"}}>
          <h1 className="has-text-primary is-size-2 has-text-centered">Meeting Hub - IOM</h1>
        </div>
        <div className="columns is-vcentered" >
          <div className="column"></div>

          <div className="column has-background-white" style={{ padding: "3%", "borderRadius": "3%" }}>
            <div className="message has-text-danger has-text-centered">
              <p>{null && this.props.message}</p>
            </div>
            <div className="subtitle has-text-centered">

            </div>
            <form>
              <div className="field">
                <label className="label">PIN</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    name="pin"
                    value={this.props.pin}
                    onChange={this.props.handleChange}
                    className="input is-primary"
                    type="number" placeholder="Type your PIN number"
                  />
                </div>
                {this.props.alert && <p className="help is-danger">{this.props.alert}</p>}
              </div>
              <br />
              <div className="field">
                <div className="control">
                  <div className="select">
                    <select name="department" defaultValue="Select Department" onChange={this.props.handleChange}>
                      <option disabled>Select Department</option>

                      {/* departments loop */}
                      {departments.map((key) => <option key={key}>{key}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <br />
              <div className="field is-grouped">
                <div className="control">

                  <button
                    onClick={this.props.handleLogin}
                    className="button is-link">
                    Login
                  </button>

                </div>
                <div className="control">
                  <button className="button">Cancel</button>
                </div>
              </div>
            </form>
          </div>
          <div className="column"></div>
        </div>

      </section >

    )
  }
}


export default Login;