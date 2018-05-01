import React, { Component } from 'react';
import config from '../config';
import '../App.css';

import { connect } from 'react-redux';
import { unset, getPlaylist, collaborate, deletePlaylist, getRecent } from '../actions'

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
      // targetPlaylist: props.playlists.filter(p => {
      //   if (p.id === this.playlistId) return p
      // })

    }
  }





  //   fetch(`${config.baseServerUrl}/api${window.location.pathname}`, {
  //     'Origin': config.baseClientUrl,
  //   })
  //     .then(res => {
  //       if (res.status === 404) return false;
  //       return res.json()
  //     })
  //     .then(res => {
  //       if (!res) this.setState({deleted: true});
  //       if (window.localStorage.getItem('user') && JSON.parse(window.localStorage.getItem('user')).username === res.adminId) {
  //         this.setState({
  //           ...res,
  //           isAdmin: true,
  //           loaded: true,
  //         });
  //       } else {
  //         this.setState({
  //           ...res,
  //           loaded: true,
  //         });
  //       }
  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });
  // }


  // componentDidMount() {
  //
  //
  //
  // static getDerivedStateFromProps (nextProps, prevState) {
  //   return {
  //     ...nextProps,
  //   }
  // }

  // collaborate () {
  //   // fetch(`${config.baseServerUrl}/api${window.location.pathname}`, {
  //   //   method: 'PUT',
  //   //   body: window.localStorage.getItem('user'),
  //   //   mode: 'cors',
  //   //   header: {
  //   //     'Accept': 'application/json',
  //   //     'Content-Type': 'application/json',
  //   //     'Origin': config.baseClientUrl,
  //   //   },
  //   // }).then(res => {
  //   //   if (res.status === 200) window.location.reload();
  //   // })
  //   //   .catch(e => console.error(e));
  // }

  generate = () => {
    this.setState({
      ...this.state,
      loading: true,
    });
    fetch(`${config.baseServerUrl}/api${window.location.pathname}`, {
      method: 'POST',
      body: window.localStorage.getItem('user'),
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': config.baseClientUrl,
      },
    }).then(res => window.location = '/generated')
      .catch(e => console.error(e));
  }

  copy = () => {
    this.setState({
      ...this.state,
      loading: true,
    });
    const body = {
      ...JSON.parse(window.localStorage.getItem('user')),
      copy: true,
    }
    fetch(`${config.baseServerUrl}/api${window.location.pathname}`, {
      method: 'POST',
      body: JSON.stringify(body),
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': config.baseClientUrl,
      },
    }).then(res => window.location = '/generated')
      .catch(e => console.error(e));
  }

  // delete = () => {
  //   let user = JSON.parse(window.localStorage.getItem('user'));
  //   const sure = window.confirm(`Hey ${user.name.split(' ')[0]}, are you sure you want to delete this playlist?`);
  //   if (sure) {
  //     const body = {username: user.username};
  //     fetch(`${config.baseServerUrl}/api${window.location.pathname}`, {
  //       method: 'DELETE',
  //       body: JSON.stringify(body),
  //       mode: 'cors',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Origin': config.baseClientUrl,
  //       },
  //     }).then(res => {
  //       const track = window.location.pathname.split('/')[2];
  //       const newPlaylists = user.playlists.filter(el => el !== track)
  //       user = {
  //         ...user,
  //         playlists: newPlaylists,
  //       }
  //       window.localStorage.setItem('user', JSON.stringify(user));
  //       this.props.unset(track)
  //       window.location = '/';
  //     })
  //       .catch(e => console.error(e));
  //   }
  // }

  handleDelete = (id, user) => {
    console.log(user, 'AAAAAAAHHHHHHH')
    const sure = window.confirm(`Hey ${user.name.split(' ')[0]}, are you sure you want to delete this playlist?`);
    if (sure) {
      this.props.deletePlaylist(id, user)
    }
  }

  //========================================= RENDERING

  renderTracks(tracks) {
    console.log("///////", tracks);
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
      if (p.id === this.state.playlistId) return p
    })
    console.log('TAAAAAARGET PLAYSLIST', targetPlaylist)
    let buttonClass;
    if (this.props.user === null) {
      buttonClass = 'Collabed';
    } else {
      buttonClass = targetPlaylist[0].collabers.indexOf(this.state.user) >= 0
        ? 'Collabed'
        : '';
    }
    console.log('one moreee', state);
    if (state.isAdmin) {
      const text = state.loading ? (<img alt="LOADING" className="ButtonLoad" src={require('../assets/circle.png')}/>) : 'GENERATE';
      const color = state.loading ? 'Generate Clicked' : 'Generate';
      return state.done ? (
        <div className="PlaylistManage">
          <button className="Generate Clicked InactiveButton">DONE</button>
        </div>
      ) : (
        <div className="PlaylistManage">
          <button className="Create Delete" onClick={() => this.handleDelete(targetPlaylist[0].id, state)}><img className="DeleteIco"alt="DELETE" src={require('../assets/delete.png')}/></button>
          <button className={color} onClick={this.generate}>{text}</button>
        </div>
      )
    } else {
      const text = state.loading ? (<img alt="LOADING" className="ButtonLoad" src={require('../assets/circle.png')}/>) : 'COPY';
      const color = state.loading ? 'Generate Clicked' : 'Generate';
      return state.done ? (
        <button className={color} onClick={this.copy}>{text}</button>
      ) : (
        <button className={'Collaborate ' + buttonClass} onClick={() => this.props.collaborate(this.state.playlistId, state)}>COLLABORATE</button>
      );
    }
  }

  renderContent = (state) => {
    console.log('another', state);
    
    const targetPlaylist = state.playlists.filter(p => {
      if (p.id === this.state.playlistId) return p
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
        const name = state.name;
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
  getRecent: () => dispatch(getRecent())
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
