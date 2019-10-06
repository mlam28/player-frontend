import React from 'react'
import {logoutUser} from '../redux/userActions'
import {connect} from 'react-redux'
import CardContainer from './CardContainer'
import styled from 'styled-components'


const H2 = styled.div`
    padding-top: 30px;
    padding-bottom: 7px
`


class HomePage extends React.Component{

    
    filterShared = () => {
    const uris = this.props.sharedPlaylists.map(playlist => playlist.uri)
      return  this.props.userPlaylists.filter(playlist => !uris.includes(playlist.uri))
    }

    render(){
        return(
            <div> 
                <H2><h2>Personal Spotify Playlists</h2></H2>
                <CardContainer playlists={this.filterShared()}/>
                <h2>Shared Playlists</h2>
                <CardContainer playlists={this.props.sharedPlaylists}/>
            </div>
        )
}
}


const mapStateToProps = (store) => {
    return {
        currentUser: store.currentUser,
        userPlaylists: store.userPlaylists,
        sharedPlaylists: store.sharedPlaylists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

