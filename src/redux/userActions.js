import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi()

function setUser (user) {
    return {type: 'LOGIN-USER', user: user}
}

function logoutUser () {
    return {type: 'LOGOUT-USER'}
}


export {setUser, logoutUser}