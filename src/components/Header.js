import React from 'react'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


class Header extends React.Component{

    render(){
        return(
        <div id='header'>
            <h2> header {this.props.page} Page</h2>
        </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {page: store.page}
}



export default withRouter(connect(mapStateToProps)(Header))