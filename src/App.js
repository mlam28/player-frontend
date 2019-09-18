import React from 'react';
import logo from './logo.svg';
import './App.css';
import {setUser} from './redux/userActions'
import HomePage from './containers/HomePage'
import LoginContainer from './containers/LoginContainer'
import { Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import NavBar from './components/NavBar'


function getUrlParams(search) {
  let hashes = search.slice(search.indexOf('?') + 1).split('&')
  let params = {}
  hashes.map(hash => {
      let [key, val] = hash.split('=')
      params[key] = decodeURIComponent(val)
  })

  return params
}

class App extends React.Component {

  componentDidMount(){
    if (window.location.hash.includes('display_name')){
    let hash = getUrlParams(window.location.hash.slice(1))
    this.props.setUser(hash)
    debugger
    this.props.history.push('/home')
    }
  }

  render(){
    return (
      <div className="App">     
        <NavBar></NavBar>
        <Route exact path='/login' render={() => <LoginContainer />}></Route>
        <Route exact path='/home' render={() => <HomePage />}></Route>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return{
    currentUser: store.currentUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    setUser: (user) => dispatch(setUser(user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
