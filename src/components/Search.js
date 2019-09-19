import React from 'react'
import {logoutUser} from '../redux/userActions'
import {connect} from 'react-redux'



class Header extends React.Component {

    render() {
    return (
        <div id='header'>
            <h2>Header here</h2>
            <h2>{this.props.page}</h2>

        </div>
        )
    }
}


const mapStateToProps = (store) => {
   return {
       page: store.page
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)


