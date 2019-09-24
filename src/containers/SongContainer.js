import React from 'react'

import {connect} from 'react-redux'
import {Icon} from 'semantic-ui-react'
import {setCurrentTracks, setPlayPosition} from '../redux/userActions'
import FormPop from '../components/FormPop'





class SongContainer extends React.Component{

    handleClick = (e, index) => {
        console.log('clicked')
        this.props.setCurrentTracks(this.props.queueTracks)
        this.props.setPlayPosition(index)
        debugger
    }

    render(){
        return(
           <div id='song-container' >
               <div className='my-row'>
                    <div className='my-small-column'></div>
                    <div className='my-column'>Title</div>
                    <div className='my-column'>Artist</div>
                    <div className='my-column'>Time</div>
                </div>

                {this.props.queueTracks.map((song, index) => {
                    return(
                        <div className='my-row' key={song.uri}>
                            <div className='my-small-column'><Icon name='play'  onClick={(e) => this.handleClick(e, index)}></Icon></div>
                            <div className='my-column'>{song.name}</div>
                            <div className='my-column'>{song.artist}</div>
                            <div className='my-column'>{song.time}</div>
                            <div className='add-column'><FormPop/></div>
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
        setPlayPosition: (num) => dispatch(setPlayPosition(num))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SongContainer) 
