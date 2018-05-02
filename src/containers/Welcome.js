import React, { Component } from 'react';
import query from 'query-string';

import { connect } from 'react-redux';
import { login, postLogin } from '../actions';

import Header from '../components/Header';
import Loader from '../components/Loader';
import '../App.css';

class Welcome extends Component {
  constructor(props) {
    super(props);
    const code = {code: query.parse(window.location.search).code};
    props.postLogin(code)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.user) {
      window.localStorage.setItem('user', JSON.stringify(nextProps.user))
    }
    return {
      ...nextProps
      }
  }

  //========================================= RENDERING

  render() {
    const user = this.props.user;
    const name = user.name ? user.name : user.username;
    return user.loaded ? (
      <div className="Wrapper">
        <Header />
        <div className="MaxWidthCreate">
          <h1>Welcome {name}</h1>
          <img alt="you" className="WelcomePicture" src={user.picture}/>
          <h2>We're glad to have you</h2>
        </div>
      </div>
    ) : (
      <div className="Wrapper">
        <Loader />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state,
})
const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  postLogin: (code) => dispatch(postLogin(code))
})
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
