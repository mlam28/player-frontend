import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setPlaylistPage, fetchPlaylistTracks, setCurrentTracks} from '../redux/userActions'
import {withRouter} from 'react-router-dom'


const PlaylistCard = ({currentUser, playlist, setPlaylistPage, fetchPlaylistTracks, history, setCurrentTracks}) => {
    
   const handlePlaylistClick = () => {
       setPlaylistPage(playlist.name)
       debugger
       history.push('/playlist/' + playlist.name)
       fetchPlaylistTracks(currentUser.token, playlist.id)
       debugger
    }
    
    const handlePlayButtonClick = (e, playlist) => {
        console.log('clicked')
        setCurrentTracks([playlist])
    }

    return(
        <Card className='playlist-card' >
            <Image className='card-image' onClick={handlePlaylistClick} src={playlist.images.length > 0 ? playlist.images[0].url : 'https://image.shutterstock.com/image-vector/playlist-app-icon-260nw-1208935387.jpg'} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{playlist.name}</Card.Header>
              <img onClick={(e) => handlePlayButtonClick(e, playlist)}src={require('../images/icons8-circled-play-50.png')}></img>
             
            </Card.Content>
  </Card>
    )
}

const mapStateToProps = (store) => {
    return {
        currentUser: store.currentUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setPlaylistPage: (name) => dispatch(setPlaylistPage(name)),
        fetchPlaylistTracks: (token, playlistId) => dispatch(fetchPlaylistTracks(token, playlistId)),
        setCurrentTracks: (tracks) => dispatch(setCurrentTracks(tracks))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistCard))