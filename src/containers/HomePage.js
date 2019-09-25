import React from 'react'
import {logoutUser} from '../redux/userActions'
import {connect} from 'react-redux'
import CardContainer from './CardContainer'

class HomePage extends React.Component{

    
    filterShared = () => {
    const uris = this.props.sharedPlaylists.map(playlist => playlist.uri)
      return  this.props.userPlaylists.filter(playlist => !uris.includes(playlist.uri))
    }

    render(){
        return(
            <div> 
                <h2>Your Shared Playlists</h2>
                <CardContainer playlists={this.props.sharedPlaylists}/>
                <h2>Your Personal Playlists</h2>
                <CardContainer playlists={this.filterShared()}/>
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

