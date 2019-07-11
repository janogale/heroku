import React from 'react';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';

import NavBar from "./components/layout/Header"
import Home from "./components/home/Home"
import UpdatesPage from "./components/updates/Updates"
import Login from "./components/login/login"
import RichEditor from "./components/editor"
import Hero from "./components/home/Hero"

import updatesData from './Modal/updates-data';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLogedIn: false,
      pin: '',
      department: '',
      logins: [],
      alert: null
    }
  }

  //getch department data
  getLogins = async () => {
    let result = await axios.get("http://127.0.0.1:5000/login");
    const { data } = result
    this.setState({ logins: data });
  };

  componentDidMount() {
    this.getLogins();
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value
    })

  }

  handleLogin = (event) => {
    event.preventDefault()

    const logins = this.state.logins;

    const department = logins.filter(login => {
      return login.department === this.state.department;
    })

    if (!this.state.pin) {
      this.setState({ alert: "Invalid PIN number" })
      return;
    }


    if (department[0].pin === parseInt(this.state.pin)) {
      return this.setState({ isLogedIn: true });

    } else {
      return this.setState({ alert: "Department and PIN mismatch" });
    }

  }

  handleLogout = (event) => {
    event.preventDefault()
    this.setState({ isLogedIn: false });
    this.setState({ department: '' });
    this.setState({ pin: '' });
  }

  renderLogin = () => {
    return <Login
      handleLogin={this.handleLogin}
      message={"Please Login"}
      pin={this.state.pin}
      logins={this.state.logins}
      alert={this.state.alert}
      department={this.state.department}
      handleChange={this.handleChange}
    />
  }

  renderEditorPage = () => {
    if (!this.state.isLogedIn) {
      return <this.renderLogin />
    }
    return (
      <React.Fragment>
        {/* display logged in Department */}
        {this.state.department &&
          <div className="is-size-7 has-text-success is-pulled-right"><span>Logged in as {this.state.department}</span></div>
        }

        <Hero title="Post Your updates and plans"
          color={'primary'}
          size={'is-size-3'} />
        <RichEditor department={this.state.department} />
      </React.Fragment>

    )
  }


  printPage = (elem) => {

    let mywindow = window.open('', 'PRINT', "fullscreen,scrollbars");

    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write(`<style>
    .print-article{
      display: none;
    }
    h1{
      color: green;
    }

    </style>`);
    mywindow.document.write('</head><body >');
    mywindow.document.write("<img src='heroku.png' alt='Meeting Updates' width='100px'/>");
    mywindow.document.write('<h1>' + document.title + '</h1>');

    let content = document.getElementById(elem);

    mywindow.document.write(content.innerHTML);
    mywindow.document.write("</body></html>");
    mywindow.focus();
    mywindow.print();

    mywindow.close();

    return true;
  }

  //updates page in updates/updates.js
  renderUpdatesPage = () => {
    return (

      <UpdatesPage
        updatesData={updatesData}
        printPage={this.printPage}
        heading={
          <Hero
            title="Weekly Program Updates and Plans."
            subTitle={"May 21, 2019"} />
        }
      />

    )
  }

  // render home page with props
  renderHomePage = () => {
    if (!this.state.isLogedIn) {
      return <this.renderLogin />
    }
    return (
      <React.Fragment>
        <Hero title="Weekly Program Updates and Plans" subTitle="Meeting Minutes Records." />
        <Home updatesData={updatesData} />
      </React.Fragment>
    )

  }

  render() {
    return (

      <section className="section" >
        <div className="container">

          {/* navbar */}
          <NavBar
            isLogedIn={this.state.isLogedIn}
            handleLogout={this.handleLogout}
          />

          {/* Switch Routing */}
          <Switch>
            <Route exact path='/' component={this.renderHomePage} />
            <Route exact path='/updates' component={this.renderUpdatesPage} />
            <Route exact path='/edit' component={this.renderEditorPage} />
            <Route exact path='/login' component={this.renderHomePage} />
          </Switch>
        </div>
      </section>
    )
  };
}

export default App;
