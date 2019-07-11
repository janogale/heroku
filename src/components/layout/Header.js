import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const style = {
  nav: {
    padding: "10px 30px"
  }
}

class NavBar extends Component {

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation" style={style.nav}>
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src="./assets/img/heroku.png" alt="Meeting Hub" width="100" height="50" />
          </Link>

          <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <Link className="navbar-item" to="/"> Home </Link>
            <Link className="navbar-item" to="/updates"> Updates </Link>
          </div>

          {/* left navbar */}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-success is-outlined" to="/edit">
                  <strong>post new update</strong>
                </Link>

                {/* Render login and logout buttons */}
                {this.props.isLogedIn ?
                  <button onClick={this.props.handleLogout} className="button is-outlined is-danger">Log out</button>
                  :
                  <Link to="/login" className="button is-success is-light">Log in</Link>
                }
              </div>
            </div>
          </div>
        </div>
      </nav >
    )
  }
}

export default NavBar;