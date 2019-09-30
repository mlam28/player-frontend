import React from 'react'
import {connect} from 'react-redux'
import { withRouter} from 'react-router-dom'


class Members extends React.Component{

    constructor(){
        super()
        this.state = {
            members: []
        }
    }

    setUsers = (users) => {
   
        this.setState({
            members:  users
        })
    
    }

    componentDidMount(){
        
        this.fetchMembers()
    debugger
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     debugger

    //     if(nextState.members.length !== this.state.members.length){
    //         debugger
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    componentDidUpdate(){
        debugger
    }

    componentDidUpdate(){
        this.fetchMembers()
    }

    fetchMembers(){
        debugger
        if (window.location.href.includes('shared'))
            {let userId = this.props.currentUser.userId
            let playlistId = this.props.copying
            debugger
            fetch(`http://localhost:3000/playlists/${playlistId}/${userId}`).then(resp => resp.json()).then(data => {console.log(data)
            this.setUsers(data)
        })}
    }
    
    isEqual(value, other){
        if(value === other){
            return true
        } else {
            return false
        }
    }
    
    render(){
        this.fetchMembers()
        return(
        <p>Members: {this.state.members > 0 ? this.state.members.map(user => <a href={user.spotify_uri}>{user.name}</a>) : 'No Group Members Yet'}</p>

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

export default connect(mapStateToProps)(Members)