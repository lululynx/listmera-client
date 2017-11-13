import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    console.log('Redux Status: ',this.props.user);
    console.log('Local Storage: ',JSON.parse(window.localStorage.getItem('user')));
    const login = !this.props.user.name
    ? <Link to="/access">
        <p>login</p>
      </Link>
    : <div className="ProfileSample">
        <Link style={{ textDecoration: 'none' }} to="/me">
          <p>{this.props.user.name.split(' ')[0]}</p>
        </Link>
        <div className="ProfilePicWrapper">
          <img alt="yourpic" className="ProfilePic" src={this.props.user.picture}/>
        </div>
      </div>;
    return (
        <nav className="NavBar">
          <div className="MaxWidth">
            <div className="Logotype">
              <div className="LogoWrap">
                <Link to="/">
                    <img alt="logo" className="Logo" src={require('../assets/listmera.png')}/>
                </Link>
              </div>
              <h1>Listmera</h1>
            </div>
            {login}
          </div>
        </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

export default connect(mapStateToProps, null)(Header);
