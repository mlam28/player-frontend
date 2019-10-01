import React from 'react'
import {connect} from 'react-redux'
import {Input, Button, Card, Image} from 'semantic-ui-react'
import {spotifySearch} from '../redux/userActions'
import {withRouter} from 'react-router-dom'

class SearchBar extends React.Component{

    constructor(){
        super()
        this.state = {
            search: ''
        }
    }


    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }


    handleSearch = () => {
        console.log('hit search')
        this.props.spotifySearch(this.state.search)
        this.setState({
            search: ''
        })
    }

     

    render(){
        return(
            <div>
                <div id='search-bar'>
                 <Input id='search-input' fluid icon='search' onChange={this.handleChange} value={this.state.search} placeholder='Search Spotify' />
                 <Button onClick={this.handleSearch}>Get Results</Button>
                 </div>

                 <div id='search-results'>
                    <div id='search-tracks'>
                    {this.props.searchTracks ? this.props.searchTracks.map(track => <Card className='search-card'>
                        <Image size='mini' src={track.image}></Image>
                        <Card.Header className='search-header'>{track.name}</Card.Header>
                        <Card.Meta class='search-meta'>{track.artist}</Card.Meta>
                    </Card>) : null}

                    </div>


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
        spotifySearch: (input) => dispatch(spotifySearch(input))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar))