import React from 'react'
import {connect} from 'react-redux'
import {Icon} from 'semantic-ui-react'
import {setCurrentTracks, setPlayPosition, playMusic} from '../redux/userActions'
import FormPop from '../components/FormPop'

class SharedSongContainer extends React.Component{

    render(){
        return(
            <div id='shared-song-container'>
                  <div className='my-row'>
                    <div className='my-small-column'></div>
                    <div className='my-fourths-column'>Title</div>
                    <div className='my-fourths-column'>Artist</div>
                    <div className='my-fourths-column'>Time</div>
                </div>

                {this.props.queueTracks.map((song, index) => {
                    return(
                        <div className='my-row' key={song.uri}>
                            <div className='my-small-column'><Icon name='play'  onClick={(e) => this.handleClick(e, index)}></Icon></div>
                            <div className='my-fourths-column'>{song.name}</div>
                            <div className='my-fourths-column'>{song.artist}</div>
                            <div className='my-fourths-column'>{song.time}</div>
                            <div className='add-column'><FormPop artisturi={song.artist_uri}/></div>
                            <div className='add-column'><Icon name='thumbs up outline'></Icon></div>
                            <div className='add-column'><Icon name='thumbs down outline'></Icon></div>
                        </div>

                    )

                })}

            </div>
        )
    }

}

const mapStateToProps = (store) => {
    return {
    currentTracks: store.currentTracks,
    queueTracks: store.queueTracks
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTracks: (tracks) => dispatch(setCurrentTracks(tracks)),
        setPlayPosition: (num) => dispatch(setPlayPosition(num)),
        playMusic: () => dispatch(playMusic())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedSongContainer) 