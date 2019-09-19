import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi()

function setUser (user) {
    return {type: 'LOGIN-USER', user: user}
}

function logoutUser () {
    return {type: 'LOGOUT-USER'}
}

function setToken (token){
    return {type: 'SET-TOKEN', token: token}
}

function setHome(){
    return {type: 'HOME-PAGE'}
}

function setBrowse(){
    return {type: 'BROWSE-PAGE'}
}



export {setUser, logoutUser, setToken, setHome, setBrowse}