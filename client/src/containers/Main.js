import React, { Component } from 'react';
import '../App.css';

import Header from '../components/Header';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import TopLists from '../components/TopLists';

class Main extends Component {
  constructor(props) {
    super(props);
    fetch('http://localhost:3000/api/playlists/recent')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          ...res,
        })
      })
      .catch(e => console.error(e));
  }

  //========================================= RENDERING

  renderTopLists(state) {
    if (state) {
      return <TopLists content={this.state.playlists} title="Recently Created Playlists" />
    } else {
      return <Loader />
    }
  }

  render() {
    const lists = this.renderTopLists(this.state);
    return (
      <div className="Wrapper">
        <Header />
        <Banner />
        {lists}
      </div>
    );
  }
}

export default Main;
