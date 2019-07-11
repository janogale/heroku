import React, { Component } from 'react';


class Hero extends Component {

  render() {
    return (
      <section className="hero has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className={`title ${this.props.size} has-text-${this.props.color}`}>{this.props.title}</h1>
            <h2 className="subtitle">{this.props.subTitle}</h2>
          </div>
        </div>
        <hr />
      </section>
    )
  }
}

export default Hero;