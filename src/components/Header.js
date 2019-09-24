import React from 'react'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUserFromStorage} from '../redux/userActions'
import {Button} from 'semantic-ui-react'


class Header extends React.Component{

    handleLogout = () => {
        this.props.logoutUserFromStorage()
        this.props.history.push('/login')
    }

    render(){
        return(
        <div id='header'>
            <h2> header {this.props.page} Page</h2>
            <Button onClick={this.handleLogout}>Logout</Button>
        </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {page: store.page}
}


const mapDispatchToProps = (dispatch) => {
    return {
        logoutUserFromStorage: () => dispatch(logoutUserFromStorage())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))