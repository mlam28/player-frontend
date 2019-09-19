import React from 'react';
import logo from './logo.svg';
import './App.css';
import {setUser} from './redux/userActions'
import {setToken, setHome} from './redux/userActions'
import HomePage from './containers/HomePage'
import LoginContainer from './containers/LoginContainer'
import { Route, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import NavBar from './components/NavBar'
import Header from './components/Header'
import BrowseContainer from './containers/BrowsePage'


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
    debugger
    if (window.location.hash.includes('display_name')){
    let hash = getUrlParams(window.location.hash.slice(1))
    this.props.setUser(hash)
    this.props.setToken(hash.access_token)
    this.props.setHome()
    debugger
    this.props.history.push('/home')
    }
  }

  render(){
    return (
      <div className="App"> 
      <Route path='/' render={() => <Redirect to='/login'/>}></Route>    
      <NavBar></NavBar>
      <Header />
      <Route exact path='/home' render={() => <HomePage />}></Route>
      <Route exact path='/browse' render={() => <BrowseContainer />}></Route>
     <Route path='/login' render={() => <LoginContainer />}></Route>
        
      
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return{
    currentUser: store.currentUser,
    token: store.token
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    setUser: (user) => dispatch(setUser(user)),
    setToken: (token) => dispatch(setToken(token)),
    setHome: () => dispatch(setHome)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
