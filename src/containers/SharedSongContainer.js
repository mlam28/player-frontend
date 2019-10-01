import React from 'react'
import {connect} from 'react-redux'
import {Icon, Button} from 'semantic-ui-react'
import {setCurrentTracks, setPlayPosition, playMusic, fetchAddLike, deleteSong} from '../redux/userActions'
import FormPop from '../components/FormPop'
import SharedPop from '../components/SharedPop'

class SharedSongContainer extends React.Component{

    handleClick = (e, index) => {
        this.props.setCurrentTracks(this.props.queueTracks)
        this.props.setPlayPosition(index)
       this.props.playMusic()
    }


    handleDeleteClick = (songId) => {
        console.log('delete')
        this.props.deleteSong(songId)
    }


    render(){
        return(
            <>
           
            <div id='shared-song-container'>
                  <div className='my-row'>
                    <div className='my-smaller-column'></div>
                    <div className='my-fourths-column'>Title</div>
                    <div className='my-fourths-column'>Artist</div>
                    <div className='my-small-column'>Time</div>

                </div>

                {this.props.queueTracks.map((song, index) => {
                    return(
                        <div className='my-row' key={song.uri}>
                            <div className='my-smaller-column'><Icon name='play circle outline'  size='large' color='blue' onClick={(e) => this.handleClick(e, index)}></Icon></div>
                            <div className='my-fourths-column'>{song.name}</div>
                            <div className='my-fourths-column'>{song.artist}</div>
                            <div className='my-small-column'>{song.time}</div>
                            <div className='my-smaller-column'><SharedPop artisturi={song.artist_uri}/></div>
                            <div className='my-smaller-column'><Button onClick={(e) => this.props.fetchAddLike(e, song.id)}><Icon name='thumbs up outline'></Icon></Button><div></div>{song.likes.length}</div>
                            <div className='my-smaller-column'><Button><Icon name='thumbs down outline'></Icon></Button></div>
                            <div className='my-smaller-column'><Button onClick={() => this.handleDeleteClick(song.id)}><Icon name='trash alternate outline'></Icon></Button></div>
                        </div>

                    )

                })}

            </div>
            </>
        )
    }

}

const mapStateToProps = (store) => {
    return {
    currentTracks: store.currentTracks,
    queueTracks: store.queueTracks,
    currentUser: store.currentUser
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTracks: (tracks) => dispatch(setCurrentTracks(tracks)),
        setPlayPosition: (num) => dispatch(setPlayPosition(num)),
        playMusic: () => dispatch(playMusic()),
        fetchAddLike: (e, song_id) => dispatch(fetchAddLike(e, song_id)),
        deleteSong: (songId) => dispatch(deleteSong(songId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedSongContainer) 