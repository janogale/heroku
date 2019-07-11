import React, { Component } from 'react';



class Updates extends Component {

  render() {
    const updatesData = this.props.updatesData.map(data => {

      if (data.achiements.length === 0) return null

      return (
        < section key={data.id} className="section" style={{ padding: "0.7rem 0" }}>
          <div className="columns">
            <div className="column"></div>
            <div className="column is-three-quarters" id={data.department}>

              {/* Box Content Start */}
              <div className="box">
                <article className="media">
                  <div className="print-article">
                    <button
                      className="button is-small is-outlined is-pulled-right"
                      onClick={() => this.props.printPage(data.department)}
                    >print</button>
                  </div>
                  <div className="media-content has-text-centered">
                    <div className="">
                      <h1 className="is-size-4">{data.department} updates</h1>
                    </div>
                    <div className="content updates">
                      <div>
                        <strong className="has-text-primary">Key Acheivements</strong> <small>last Weeek</small>
                        <br />
                        <ul className="has-text-left updates-list">
                          {data.achiements.map((achiement, index) => {
                            return <li key={index}>{achiement}</li>
                          })}
                        </ul>
                        <hr />
                        <br />
                        <strong className="has-text-primary">Key Activity Plan</strong> <small>for next Weeek</small>
                        <br />
                        <ul className="has-text-left updates-list">
                          {data.plans.map((plan, index) => {
                            return <li key={index}> <strong>Activity {index + 1}: </strong>{plan}</li>
                          })}
                        </ul>

                      </div>
                    </div>
                    <nav className="level is-mobile">
                      <div className="level-left">

                        <span className="icon is-small">

                        </span>


                        <span className="icon is-small">
                          <i className="fas fa-retweet" aria-hidden="true"></i>
                        </span>


                        <span className="icon is-small">
                          <i className="fas fa-heart" aria-hidden="true"></i>
                        </span>

                      </div>
                    </nav>
                  </div>
                </article>
              </div>
              {/* Box Content End */}

            </div>
            <div className="column"></div>
          </div>
        </section >
      )
    }
    );

    return (
      <React.Fragment>
        {this.props.heading}
        < div className="is-block" style={{ padding: "3rem" }}>
          <button onClick={() => this.props.printPage("updates")} className="button is-pulled-right">Print</button>
        </div >
        <div id="updates">
          {updatesData}
        </div>
      </React.Fragment >

    );
  }
}

export default Updates;