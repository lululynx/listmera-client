import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../App.css';

import Header from '../components/Header';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import TopLists from '../components/TopLists';

import { getRecent } from '../actions'

class Main extends Component {

  //========================================= RENDERING

  componentDidMount() {
    this.props.getRecent()
  }

  renderTopLists(user) {
    console.log('userplay', user.playlists);
    if (user) {
      return <TopLists content={user.playlists} title="Recently Created Playlists" />
    } else {
      return <Loader />
    }
  }

  render() {
    const lists = this.renderTopLists(this.props.user);
    return (
      <div className="Wrapper">
        <Header />
        <Banner />
        {lists}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

const mapDispatchToProps = (dispatch) => ({
  getRecent: () => dispatch(getRecent())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
