import React from 'react'
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import { Menu, Icon} from 'semantic-ui-react'
import { Header, Button, Popup, Grid, Input } from 'semantic-ui-react'
import {logoutUserFromStorage, setHome, setBrowse, makePlaylist, setQueueTracks, setPlaylistPage, copying, fetchPlaylistMembers} from '../redux/userActions'
import {connect} from 'react-redux'


class NavBar extends React.Component{

  constructor(){
    super()
    this.state = {
      playlistName: '',
      imageURL: ''
    }
  }

  handleSubmit = () => {

    this.props.makePlaylist(this.state.playlistName, this.state.imageURL)

    this.setState({
      playlistName: '',
      imageURL: ''
    })

  }

  handleChange = (e) => {
   
    this.setState({playlistName: e.target.value})
  }

  handlePlaylistClick = (e, playlist) => {
    this.props.setQueueTracks(playlist.songs)
    this.props.setPlaylistPage(playlist.name)
    this.props.copying(playlist.id)
    this.props.fetchPlaylistMembers()
    this.props.history.push('/shared/' + playlist.name + '#' + playlist.playlist_uri)
  }

  handleLogout = () => {
    this.props.logoutUserFromStorage()
    this.props.history.push('/login')
}

handleurlChange = (e) => {
  this.setState({
    imageURL: e.target.value
  })
}

    render(){
        return(
            <Menu inverted pointing vertical fluid size='large' id='nav-bar'>
             <Menu.Item>
                <img id='profile-img' src={this.props.currentUser.image}></img><p id='display-name'>{this.props.currentUser.display_name}</p>
              </Menu.Item>
            <NavLink to='/home'><Menu.Item
              name='home'
              active={this.props.page === 'Home'}
              onClick={this.props.setHome}
            /></NavLink>
            <NavLink to='/browse'><Menu.Item
              name='Browse'
              active={this.props.page === 'Browse'}
              onClick={this.props.setBrowse}
            /></NavLink>
            <Menu.Item id='menu-playlists-container'>
              <Menu.Header>Shared Playlists</Menu.Header>
                <Menu.Menu>
                <Menu.Item className='my-menu-item'>
                          <Popup trigger={<p>New Playlist<Icon name='add' color='yellow'></Icon></p>} on='click'>
                              <Grid centered divided columns={1}>
                                <Grid.Column textAlign='center'>
                                  <Input className='playist-input' name='playlistName' value={this.state.playlistName} placeholder='Playlist Name' onChange={this.handleChange}></Input>
                                  <Input className='playlist-input' name='imageURL' value={this.state.imageURL} placeholder='image URL (opt)' onChange={this.handleurlChange}></Input>
                                  <Button color='blue' onClick={this.handleSubmit}>Make</Button>
                                </Grid.Column>
                              </Grid>
                        </Popup>
                </Menu.Item>
                {this.props.sharedPlaylists.length > 0 ? this.props.sharedPlaylists.map(playlist => <Menu.Item active={this.props.page === playlist.name}onClick={(e) => this.handlePlaylistClick(e, playlist)}>{playlist.name}</Menu.Item>) : null}
                </Menu.Menu>
              </Menu.Item>
              <Menu.Item hover onClick={this.handleLogout}>Logout</Menu.Item>
          </Menu>
        )
    }
}

const mapStateToProps = (store) => {
  return {
    sharedPlaylists: store.sharedPlaylists,
    page: store.page,
    currentUser: store.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    setHome: () => dispatch(setHome()),
    setBrowse: () => dispatch(setBrowse()),
    makePlaylist: (name, imageURL) => dispatch(makePlaylist(name, imageURL)),
    setQueueTracks: (tracks) => dispatch(setQueueTracks(tracks)),
    setPlaylistPage: (name) => dispatch(setPlaylistPage(name)),
    copying: (playlistId) => dispatch(copying(playlistId)),
    fetchPlaylistMembers: () => dispatch(fetchPlaylistMembers()),
    logoutUserFromStorage: () => dispatch(logoutUserFromStorage())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))