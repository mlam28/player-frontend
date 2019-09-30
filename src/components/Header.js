import React from 'react'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUserFromStorage, downToSpotify, updateToSpotify} from '../redux/userActions'
import {Button, Input, Label, Icon} from 'semantic-ui-react'


class Header extends React.Component{

    handleLogout = () => {
        this.props.logoutUserFromStorage()
        this.props.history.push('/login')
    }

    handleDownload = () => {
        console.log('want to download')
        
        if (window.location.hash.includes('undefined') || window.location.hash.includes('null')){
            // create new playlist in spotify and update user-playlist in project backend
            this.props.downToSpotify(this.props.page)
        } else {
            // update playlist in spotify
            this.props.updateToSpotify()
        }
    }

    render(){
        return(
        <div id='header'>
            <h2> header {this.props.page} Page</h2>
            <div><Button onClick={this.handleLogout}>Logout</Button></div>
            {window.location.href.includes('shared') ? 
            <div><Button color='teal' onClick={this.handleDownload}>Download/Update to Spotify<Icon name='arrow alternate circle down outline'></Icon></Button>
            <div><Label>Add Spotify User to this Group</Label></div>
            <Input placeholder='Spotify URI'></Input></div> : null }
        </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {page: store.page}
}


const mapDispatchToProps = (dispatch) => {
    return {
        logoutUserFromStorage: () => dispatch(logoutUserFromStorage()),
        downToSpotify: (name) => dispatch(downToSpotify(name)),
        updateToSpotify: () => dispatch(updateToSpotify())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))