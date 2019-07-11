import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const departments = ['ADMIN', 'MPA', 'MHD', 'ICT', 'SSU']

const UpdatesUI = ({ updatesData, index }) => {

  // extract data
  const {
    createdAt
  } = updatesData[0]

  return (
    <div className="columns">
      <div className="column"></div>
      <div className="column is-three-fifths">
        <div className="card has-text-centered">
          <div className="card-content">

            <p className="title is-5">{new Date(createdAt).toDateString()} Meeting Updates</p>
            <p className="subtitle is-6">Sunday</p>


            <div className="content">
              last updated by <span className="tag">LMHD</span>
              at
                <time dateTime="2016-1-1"> 11:09 PM</time>
            </div>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              <span>
                Recieved from
                {departments.map((dep, index) => (
                  <span key={index} className="tag">{dep}</span>
                ))}
              </span>
            </p>
          </footer>
        </div>
      </div>
      <div className="column"></div>
    </div >
  )

}

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      updatesData: [],
      isLoading: true,
      recievedFrom: [],
      error: false
    }
  }

  fetchData = async () => {
    axios.get("http://localhost:5000/updates")
      .then((response) => {
        this.setState({ updatesData: response.data, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error)
      })
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { updatesData, isLoading, error } = this.state;

    if (error) {
      return (
        <h1>Error Occured Please refresh Page.</h1>
      )
    }
    return (
      <React.Fragment>
        {isLoading ? <h1>...Loading</h1> :

          updatesData.map((updates, index) => (
            < section key={index} className="section" style={{ padding: "0.7rem 0" }}>
              <Link to="/updates"><UpdatesUI updatesData={updates} index={index} /></Link>
            </section>
          ))

        }
      </React.Fragment>

    )
  }
}

export default Home;