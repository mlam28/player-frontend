import SpotifyWebApi from 'spotify-web-api-js';
import {formatDuration} from './helpers.js'

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

function setPlaylistPage(name){
    return {type: 'PLAYLIST-PAGE', name: name}
}

function setBrowse(){
    return {type: 'BROWSE-PAGE'}
}

function setUserPlaylists(playlists){
    return {type: 'SET-USER-PLAYLISTS', playlists: playlists}
}


function formatPlaylists(playlistObj){
    debugger
  return playlistObj.items.map(x => Object.assign({}, {'id': x.id, 'name': x.name, 'uri': x.uri, 'images': x.images, 'tracks': x.tracks}))
}
function fetchUserPlaylists(token){
    spotifyApi.setAccessToken(token)
    return function (dispatch) {
        spotifyApi.getUserPlaylists().then(playlists => dispatch(setUserPlaylists(formatPlaylists(playlists))))
    }
    
}


function setFeaturedPlaylists(playlists){
    return {type: 'SET-FEATURED', playlists: playlists}
}


function fetchFeaturedPlaylists(token){
    spotifyApi.setAccessToken(token)
    return function(dispatch) {
        spotifyApi.getFeaturedPlaylists().then(obj => {console.log(obj.playlists); dispatch(setFeaturedPlaylists(formatPlaylists(obj.playlists)))})
    }
}

function setCurrentTracks(tracks) {
    return {type: 'SET-TRACKS', tracks: tracks}
}

function fetchPlaylistTracks(token, playlistId){
    spotifyApi.setAccessToken(token)
    return function (dispatch){
        spotifyApi.getPlaylistTracks(playlistId).then(resp => {console.log(resp); const tracks = resp.items.map(item => Object.assign({}, {name: item.track.name, artist: item.track.artists[0].name, artist_uri: item.track.artists[0].uri, uri: item.track.uri, time: formatDuration(item.track.duration_ms)}))
        dispatch(setQueueTracks(tracks));
        
        })
        // .then(tracks => {console.log(tracks); dispatch(setPlaylistTracks(tracks))})
    }
}


function setQueueTracks(tracks){
    return {type: 'QUEUE-TRACKS', tracks: tracks}
}

function setPlayPosition(num){
    return {type: 'SET-POSITION', position: num}
}


function logoutUserFromStorage(){
    return function (dispatch) {
        window.localStorage.removeItem('user')
        dispatch(logoutUser())
    }
}








export {setUser, logoutUser, setToken, setHome, setBrowse, fetchUserPlaylists, logoutUserFromStorage, fetchPlaylistTracks, setPlaylistPage, setCurrentTracks, setQueueTracks, setPlayPosition, fetchFeaturedPlaylists}