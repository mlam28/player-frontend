import React from 'react'
import {connect} from 'react-redux'
import {Input, Button} from 'semantic-ui-react'
import {spotifySearch} from '../redux/userActions'

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
                 <Input fluid icon='search' onChange={this.handleChange} placeholder='Search Spotify' />
                 <Button onClick={this.handleSearch}>Get Results</Button>
                 <div id='search-results'>

                 </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        spotifySearch: (input) => dispatch(spotifySearch(input))
    }
}

export default connect(null, mapDispatchToProps)(SearchBar)