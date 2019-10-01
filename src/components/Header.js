import React from 'react'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUserFromStorage, downToSpotify, updateToSpotify, addUserToPlaylist, fetchPlaylistMembers} from '../redux/userActions'
import {Button, Input, Label, Icon, Form} from 'semantic-ui-react'
import styled from 'styled-components'


const StyledP = styled.div`
padding-top: 10px;
margin-right: 3000px;
width: 200px;
justify-content: left`

class Header extends React.Component{

    constructor(){
        super()
        this.state={
            uri: '',

        }
    }

 
    

    handleChange = (e) => {
        this.setState({
            uri: e.target.value
        })
    }

   
    handleLogout = () => {
        this.props.logoutUserFromStorage()
        this.props.history.push('/login')
    }

    handleDownload = () => {

        if (window.location.hash.includes('undefined') || window.location.hash.includes('null')){
            // create new playlist in spotify and update user-playlist in project backend
            this.props.downToSpotify(this.props.page)
        } else {
            // update playlist in spotify
            this.props.updateToSpotify()
        }
    }

    handleAddUser = () => {
        console.log('add user please')
        this.props.addUserToPlaylist(this.state.uri)
        this.setState({
            uri: ''
        })
    }



   
   renderMembers(){
       if(window.location.href.includes('shared')){
           return(
            <StyledP><p>Members: {this.props.playlistUsers.length > 0 ? this.props.playlistUsers.map(user => <a href={user.spotify_uri}>{user.name}</a>) : 'No Members Yet'}</p></StyledP>
           )
       }
   }

    render(){
       
        return(
        <div id='header'>
            <div id='header-text'>
                <h1>{this.props.page}</h1><br></br>  
                {this.renderMembers()}
            </div>
            <div id='meta-data'></div>
            <div id='logout-button'><Button onClick={this.handleLogout}>Logout</Button></div>
            {window.location.href.includes('shared') ? 
            <>
            <div id='download-button'><Button color='blue' onClick={this.handleDownload}>Download/Update to Spotify<Icon name='arrow alternate circle down outline'></Icon></Button></div>
          <Form id='user-form'>
            <Input onChange={this.handleChange} value={this.state.uri} placeholder='Spotify URI'></Input><br></br><Button onClick={this.handleAddUser}>Add Friend</Button></Form></> : null }
         </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {page: store.page,
        copying: store.copying,
        playlistUsers: store.playlistUsers,
        currentUser: store.currentUser
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logoutUserFromStorage: () => dispatch(logoutUserFromStorage()),
        downToSpotify: (name) => dispatch(downToSpotify(name)),
        updateToSpotify: () => dispatch(updateToSpotify()),
        addUserToPlaylist: (uri) => dispatch(addUserToPlaylist(uri)),
        fetchPlaylistMembers: () => dispatch(fetchPlaylistMembers())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))