import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import { logout, getProfile } from '../actions'

import Header from '../components/Header';
import Loader from '../components/Loader';
import TopLists from '../components/TopLists';

class Profile extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      window.location = '/access';
    } else {
      props.getProfile(user)
    }
  }

  logout = () => {
    window.localStorage.removeItem('user');
    this.props.logout();
    window.location = '/';
  }

  //========================================= RENDERING

  renderProfile(state) {
    if (state) {
      return (
        <div className="MaxWidthCreate">
          <div className="ProfileWrapper">
            <div className="ProfileImage">
              <img alt="you" className="WelcomePicture" src={state.picture}/>
            </div>
            <div className="ProfileDetails">
              <h3>Name: {state.name}</h3>
              <h3>e-mail: {state.email}</h3>
              <h3>Username: {state.username}</h3>
              <a onClick={this.logout}><p>log out</p></a>
            </div>
          </div>
          <TopLists content={state.adminOf} title="Your Playlists"/>
        </div>
      )
    } else {
      return <Loader />
    }
  }

  render() {
    const profile = this.renderProfile(this.props.user);
    return (
      <div className="Wrapper">
        <Header />
        {profile}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  getProfile: (user) => dispatch(getProfile(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
