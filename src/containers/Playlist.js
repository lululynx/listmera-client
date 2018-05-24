import React, { Component } from 'react';
import config from '../config';
import '../App.css';

import { connect } from 'react-redux';

import {
  unset,
  getPlaylist,
  collaborate,
  deletePlaylist,
  getRecent,
  generatePlaylist
} from '../actions'

import Header from '../components/Header';
import Loader from '../components/Loader';
import Track from '../components/Track';

class Playlist extends Component {
  constructor(props) {
    super(props);
    props.getPlaylist(window.location.pathname, props.user.username);

    this.state = {
      playlistId: window.location.pathname.split('/')[2],
      user: JSON.parse(window.localStorage.getItem('user')).username || props.user.username,
      done: false
    }
  }

  handleDelete = (id, user) => {
    const sure = window.confirm(`Hey ${user.name.split(' ')[0]}, are you sure you want to delete this playlist?`);
    if (sure) {
      this.props.deletePlaylist(id, user)
      window.location = '/';
    }
  }

  handleGenerate = (id, user) => {
    this.props.generatePlaylist(id, user)
    this.setState({
      ...this.state,
      done: true})
    window.location = '/generated'
  }

  //========================================= RENDERING

  renderTracks(tracks) {
    return tracks.map((el, i) => {
      return <Track key={i}
        img={el.image}
        title={el.name}
        artists={el.artists}
        album={el.album}
        popularity={el.popularity}/>
    })
  }

  renderButtons = (state) => {
    const targetPlaylist = state.playlists.filter(p => {
      if ((p !== null) && p.id === this.state.playlistId) return p
    })
    let buttonClass;
    if (this.props.user === null) {
      buttonClass = 'Collabed';
    } else {
      if (targetPlaylist[0]) {
        buttonClass = targetPlaylist[0].collabers.indexOf(this.state.user) >= 0
          ? 'Collabed'
          : '';
      } else {
        buttonClass = ''
      }
    }
    if (state.isAdmin) {
      const text = state.loading ? (<img alt="LOADING" className="ButtonLoad" src={require('../assets/circle.png')}/>) : 'GENERATE';
      const color = state.loading ? 'Generate Clicked' : 'Generate';
      return this.props.user.done ? (
        <div className="PlaylistManage">
          <button className="Generate Clicked InactiveButton">DONE</button>
        </div>
      ) : (
        <div className="PlaylistManage">
          <button className="Create Delete" onClick={() => this.handleDelete(targetPlaylist[0].id, state)}><img className="DeleteIco"alt="DELETE" src={require('../assets/delete.png')}/></button>
          <button className={color} onClick={() => this.handleGenerate(this.state.playlistId, state)}>{text}</button>
        </div>
      )
    } else {
      const text = state.loading ? (<img alt="LOADING" className="ButtonLoad" src={require('../assets/circle.png')}/>) : 'COPY';
      const color = state.loading ? 'Generate Clicked' : 'Generate';
      return this.props.user.done ? (
        <button className={color} onClick={this.copy}>{text}</button>
      ) : (
        <button className={'Collaborate ' + buttonClass} onClick={() => this.props.collaborate(this.state.playlistId, state)}>COLLABORATE</button>
      );
    }
  }

  renderContent = (state) => {
    const targetPlaylist = state.playlists.filter(p => {
      if ((p !== null) && p.id === this.state.playlistId) return p
    })
    if (state) {
      if (state.deleted) {
        return (
          <div className="Error">
            <h1>This playlist no longer exists</h1>
            <p>(or maybe it never did)</p>
            <p className="EasterEgg">[insert spooky theremin sound here]</p>
          </div>
        )
      } else {
        const buttons = this.renderButtons(state);
        const tracks = this.renderTracks(targetPlaylist[0].tracks);
        const name = state.playlists.filter(name => name.id === this.state.playlistId)[0].name
        const admin = targetPlaylist[0].admin ? targetPlaylist[0].admin.split(' ')[0] : 'N/A';
        const collabers = (targetPlaylist[0].collabers.filter(el => el !== admin).length > 0)
        ? ` with the help of ${targetPlaylist[0].collabers
          .map(el => el !== null ? el.split(' ')[0] : null)
          .filter(el => (el !== null && el !== admin) ? true : false)
          .join(', ')}`
        : ' and in need of collaborators';
        const extra = (targetPlaylist[0].tracks.length === 0)
        ? (<p className="MoreSongs">this playlist needs a little help. Come on, click that button!</p>)
        : (<p className="MoreSongs">{`... making that ${this.state.length} songs in total`}</p>);
        return (
          <div className="MaxWidthCreate">
            <div className="PlaylistTitleWrapper">
              <div className="PlaylistTitle">
                <h1>{name}</h1>
                <p>{'created by ' + admin + collabers}</p>
              </div>
              {buttons}
            </div>
            <div className="TrackWrapper">
              {tracks}
            </div>
            {extra}
        </div>
        )
      }
    } else {
      return <Loader />
    }
  }

  render() {
    if (this.props.user.loaded) {
      const content = this.renderContent(this.props.user);
      return (
        <div className="Wrapper">
          <Header />
          {content}
        </div>
      );
    } else {
      return (
        <div className="Wrapper">
          <Header />
          <Loader />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

const mapDispatchToProps = (dispatch) => ({
  unset: (playlist) => dispatch(unset(playlist)),
  getPlaylist: (id, user) => dispatch(getPlaylist(id, user)),
  collaborate: (id, user) => dispatch(collaborate(id, user)),
  deletePlaylist: (id, user) => dispatch(deletePlaylist(id, user)),
  getRecent: () => dispatch(getRecent()),
  generatePlaylist: (id, user) => dispatch(generatePlaylist(id, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
