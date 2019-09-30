import React from 'react'
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import { Menu, Icon} from 'semantic-ui-react'
import { Header, Button, Popup, Grid } from 'semantic-ui-react'
import {setHome, setBrowse, makePlaylist, setQueueTracks, setPlaylistPage, copying} from '../redux/userActions'
import {connect} from 'react-redux'


class NavBar extends React.Component{

  constructor(){
    super()
    this.state = {
      playlistName: ''
    }
  }

  handleSubmit = () => {
    console.log('clicked')

  
    this.props.makePlaylist(this.state.playlistName)

    this.setState({
      playlistName: ''
    })

  }

  handleChange = (e) => {
   
    this.setState({playlistName: e.target.value})
  }

  handlePlaylistClick = (e, playlist) => {

    console.log('clicked')
    this.props.setQueueTracks(playlist.songs)
    this.props.setPlaylistPage(playlist.name)
    this.props.copying(playlist.id)
    this.props.history.push('/shared/' + playlist.name + '#' + playlist.playlist_uri)
  }

    render(){
        return(
            <Menu inverted pointing vertical id='nav-bar'>
            <NavLink to='/home'><Menu.Item
              name='home'
            //   active={activeItem === 'home'}
              onClick={this.props.setHome}
            /></NavLink>
            <NavLink to='/browse'><Menu.Item
              name='Browse'
            //   active={activeItem === 'messages'}
              onClick={this.props.setBrowse}
            /></NavLink>
            <Menu.Item id='menu-playlists-container'>
              <Menu.Header>Shared Playlists</Menu.Header>
                <Menu.Menu>
                <Menu.Item className='my-menu-item'>
                          <Popup trigger={<p>New Playlist<Icon name='add' color='yellow'></Icon></p>} on='click'>
                              <Grid centered divided columns={1}>
                                <Grid.Column textAlign='center'>
                                  <Header as='h4'>Playlist Name</Header>
                                  <input name='playlistName' value={this.state.playlistName} onChange={this.handleChange}></input>
                                  <Button onClick={this.handleSubmit}>Submit</Button>
                                </Grid.Column>
                              </Grid>
                        </Popup>
                </Menu.Item>
                {this.props.sharedPlaylists.length > 0 ? this.props.sharedPlaylists.map(playlist => <Menu.Item onClick={(e) => this.handlePlaylistClick(e, playlist)}>{playlist.name}</Menu.Item>) : null}
                </Menu.Menu>
              </Menu.Item>
          </Menu>
        )
    }
}

const mapStateToProps = (store) => {
  return {
    sharedPlaylists: store.sharedPlaylists
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    setHome: () => dispatch(setHome()),
    setBrowse: () => dispatch(setBrowse()),
    makePlaylist: (name) => dispatch(makePlaylist(name)),
    setQueueTracks: (tracks) => dispatch(setQueueTracks(tracks)),
    setPlaylistPage: (name) => dispatch(setPlaylistPage(name)),
    copying: (playlistId) => dispatch(copying(playlistId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))