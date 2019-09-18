import React from 'react'
import {logoutUser} from '../redux/userActions'
import {connect} from 'react-redux'
class HomePage extends React.Component{

    render(){
        return(
            <div>Home Page Here</div>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        currentUser: store.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

