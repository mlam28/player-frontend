import React from 'react'
import {connect} from 'react-redux'
import {Input, Button, Card, Image, Icon} from 'semantic-ui-react'
import {spotifySearch, clearSearchedTracks, setCurrentTracks, playMusic, setPlayPosition} from '../redux/userActions'
import {withRouter} from 'react-router-dom'
import FormPop from './FormPop'
import styled from 'styled-components'

const SearchInput = styled.div`
    max-width: 95%;
    padding-top: 30px
`

const StylePlay = styled.div`
opacity: 0
`

class SearchBar extends React.Component{

    constructor(){
        super()
        this.state = {
            search: '',
            history: '',
            counter: 0
        }
    }


    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }


    handlePage = () => {
      return this.props.searchTracks.slice(this.state.counter, (this.state.counter+20))
    }

    handleSearchEnter = (e) => {
        if(e.key === "Enter"){
            console.log('hit search')
            this.props.spotifySearch(this.state.search)
            this.setState({
                search: '',
                history: this.state.search
            })
        }
        
    }

     handlePlayImage = (index) => {
        console.log('click')
        this.props.setCurrentTracks(this.props.searchTracks)
        this.props.playMusic()
        this.props.setPlayPosition(index)

     }

     handleClear = () => {
         this.setState({
             history: ''
         })

         this.props.clearSearchedTracks()
     }

   

    render(){
        return(
            <div>
                <div id='search-bar'>
                 <SearchInput><Input id='search-input' fluid icon='search' onChange={this.handleChange} onKeyUp={this.handleSearchEnter} value={this.state.search} placeholder='Search Spotify' /></SearchInput>
                 </div>


                 <div id='search-results'>
                 {this.state.history !== '' ? <><div>Results For "  {this.state.history}"</div><div onClick={this.handleClear} id='clear'>Clear</div></> : null}
                    <div id='search-tracks'>
                    {this.props.searchTracks ? this.props.searchTracks.map((track, index) => <Card className='search-card'>
                        <div className='hover-container'>
                        <img className='very-small-cover' height='60' width='60' onClick={() => this.handlePlayImage(index)} size='tiny' src={track.image}></img><div className='content-details fadeIn-top'>Play</div></div>
                        <Card.Header className='search-header'>{track.name}</Card.Header>
                        <Card.Meta class='search-meta'>{track.artist}</Card.Meta>
                        <FormPop song={track}></FormPop>
                    </Card>) : null}
                    </div>

                <div><Icon name='chevron left'></Icon><Icon name='chevron right' ></Icon></div>

                 </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        searchTracks: store.searchTracks,
        searchAlbums: store.searchAlbums
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        spotifySearch: (input) => dispatch(spotifySearch(input)),
        clearSearchedTracks: () => dispatch(clearSearchedTracks()),
        setCurrentTracks: (tracks) => dispatch(setCurrentTracks(tracks)),
        playMusic: () => dispatch(playMusic()),
        setPlayPosition: (index) => dispatch(setPlayPosition(index))

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar))