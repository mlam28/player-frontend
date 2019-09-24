import React from 'react'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import CardContainer from './CardContainer'




class BrowseContainer extends React.Component{
    
    render(){
        return(
            <div id='browse-container'>
                Browse HERE
                <CardContainer playlists={this.props.featuredPlaylists}/>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return{
        featuredPlaylists: store.featuredPlaylists
    }
}


export default withRouter(connect(mapStateToProps)(BrowseContainer))