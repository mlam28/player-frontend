import React from 'react';
import './App.css';
import {setUser} from './redux/userActions'
import {setToken, setHome, fetchUserPlaylists, fetchFeaturedPlaylists, fetchSharedPlaylists} from './redux/userActions'
import HomePage from './containers/HomePage'
import LoginContainer from './containers/LoginContainer'
import { Route, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import NavBar from './components/NavBar'
import Header from './components/Header'
import SongContainer from './containers/SongContainer'
import BrowseContainer from './containers/BrowsePage'
import SpotifyPlayer from 'react-spotify-web-playback';
import styled from 'styled-components'
import SharedSongContainer from './containers/SharedSongContainer';
import SearchBar from './components/SearchBar'


const StyledPlayer = styled.div` 
  visibility: ${props => props.visible ? "visible" : "hidden"};
  position: fixed;
  bottom: 0;
  z-index: 100;
  width: 100%;
}
`

function getUrlParams(search) {
  let hashes = search.slice(search.indexOf('?') + 1).split('&')
  let params = {}
  hashes.map(hash => {
      let [key, val] = hash.split('=')
      params[key] = decodeURIComponent(val)
  })

  return params
} 

class App extends React.Component {

  componentDidMount(){
    if (window.location.hash.includes('display_name')){
    let hash = getUrlParams(window.location.hash.slice(1))
    this.props.setUser({token: hash.token, userId: hash.id, spotifyId: hash.spotify_id, spotify_uri: hash.spotify_uri})
    this.props.setToken(hash.token)
    this.props.setHome()
   
    window.localStorage.setItem('user', JSON.stringify({token: hash.token, userId: hash.id, spotifyId: hash.spotify_id, spotify_uri: hash.spotify_uri}))

    this.props.fetchUserPlaylists(hash.token)
    
    this.props.fetchSharedPlaylists(hash.id)
    this.props.history.push('/home')
    } else if (window.localStorage.getItem('user')) {
        let user = JSON.parse(window.localStorage.getItem('user'))
        this.props.setUser(user)
        this.props.setHome()
        this.props.fetchUserPlaylists(user.token)
       this.props.fetchFeaturedPlaylists(user.token)
       
       this.props.fetchSharedPlaylists(user.userId)
       this.props.history.push('/home')
        
    } else {
      this.props.history.push('/login')
    }
  }


  formatTrackUris = (tracks) => {
    let songs = tracks.map(track => track.uri)
    return songs
  }

  render(){
    return (
      <div className="App"> 
    {Object.keys(this.props.currentUser).length > 0 ? <><NavBar></NavBar><Header /><SearchBar /><Route exact path='/home' render={() => <HomePage />}></Route><Route exact path='/browse' render={() => <BrowseContainer />}></Route><Route path='/playlist/:name' render={() => <SongContainer />}></Route><Route path='/shared/:name' render={() => <SharedSongContainer />}></Route></> : <Route path='/login' render={() => <LoginContainer />}></Route>
    }


    <StyledPlayer visible={true}><SpotifyPlayer id='spotify-player' play={this.props.play} magnifySliderOnHover={true} offset={this.props.playPosition} autoPlay={true} token={this.props.currentUser.token} uris={this.formatTrackUris(this.props.currentTracks)}/></StyledPlayer>
      </div>
    );
  }
}






const mapStateToProps = (store) => {
  return{
    currentUser: store.currentUser,
    token: store.token,
    currentTracks: store.currentTracks,
    playPosition: store.playPosition,
    play: store.play
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    setUser: (user) => dispatch(setUser(user)),
    setToken: (token) => dispatch(setToken(token)),
    setHome: () => dispatch(setHome()),
    fetchUserPlaylists: (token) => dispatch(fetchUserPlaylists(token)),
    fetchFeaturedPlaylists: (token) => dispatch(fetchFeaturedPlaylists(token)),
    fetchSharedPlaylists: (userId) => dispatch(fetchSharedPlaylists(userId))
    
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
