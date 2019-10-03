import React from 'react'

import {connect} from 'react-redux'
import {Icon, Input} from 'semantic-ui-react'
import {setCurrentTracks, setPlayPosition, playMusic} from '../redux/userActions'
import FormPop from '../components/FormPop'





class SongContainer extends React.Component{

    constructor(){
        super()
        this.state={
            filter: ''
        }
    }


    handleFilterChange = (e) => {
        this.setState({
            filter: e.target.value
        })
    }

    handleClick = (e, index) => {
        console.log('clicked')
        this.props.setCurrentTracks(this.props.queueTracks)
        this.props.setPlayPosition(index)
       this.props.playMusic()
    }

    filteredSongs = () => {
       return this.props.queueTracks.filter(track => track.name.toLowerCase().includes(this.state.filter.toLowerCase()) || track.artist.toLowerCase().includes(this.state.filter.toLowerCase()))
    }

    render(){
        return(
           <div id='song-container' >
               <div className='my-row'>
                    <div className='my-small-column'></div>
                    <div className='my-column'>Title</div>
                    <div className='my-column'>Artist</div>
                    <div className='my-column'>Time</div>
                   <div className='filter-column'><Input placeholder='Filter' onChange={this.handleFilterChange} icon='filter'></Input></div>
                </div>

                {this.filteredSongs().map((song, index) => {
                    return(
                        <div className='my-row' key={song.uri}>
                            <div className='my-small-column'><Icon size='large' color='blue' name='play circle outline'  onClick={(e) => this.handleClick(e, index)}></Icon></div>
                            <div className='my-column'>{song.name}</div>
                            <div className='my-column'>{song.artist}</div>
                            <div className='my-column'>{song.time}</div>
                            <div className='add-column'><FormPop song={song} artisturi={song.artist_uri}/></div>
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
        playMusic: () => dispatch(playMusic()),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SongContainer) 
