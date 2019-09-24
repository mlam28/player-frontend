import React from 'react'
import {logoutUser} from '../redux/userActions'
import {connect} from 'react-redux'
import CardContainer from './CardContainer'

class HomePage extends React.Component{

    render(){
        return(
            <div> 
                <h2>Your Shared Playlists</h2>
                <CardContainer playlists={null}/>
                <h2>Your Personal Playlists</h2>
                <CardContainer playlists={this.props.userPlaylists}/>
            </div>
        )
}
}


const mapStateToProps = (store) => {
    return {
        currentUser: store.currentUser,
        userPlaylists: store.userPlaylists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

