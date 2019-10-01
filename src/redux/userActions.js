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
        spotifyApi.getPlaylistTracks(playlistId).then(resp => {console.log(resp); const tracks = resp.items.map(item => { return Object.assign({}, {name: item.track ? item.track.name : '', artist: item.track ? item.track.artists[0].name : '', artist_uri: item.track ? item.track.artists[0].uri : '', uri: item.track ? item.track.uri : '', time: item.track ? formatDuration(item.track.duration_ms) : ''})})
        dispatch(setQueueTracks(tracks));
        
        })

    }
}

function setSharedPlaylists(playlists){
    return {type: 'SET-SHARED', playlists: playlists}
}


function fetchSharedPlaylists(userId){

    return function (dispatch) {
  
        fetch(`http://localhost:3000/users/${userId}`).then(resp => resp.json()).then(data => {console.log(data); dispatch(setSharedPlaylists(data))})
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

function playMusic(){
    return {type: 'PLAY'}
}

function pauseMusic(){
    return {type: 'PAUSE'}
}


function makePlaylist(name){

    return function(dispatch, getState){
       const userId = getState().currentUser.userId
       
    const data = {
        playlist: {name: name, user_ids:[userId]}
    }
    const obj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }

    fetch(`http://localhost:3000/playlists`, obj).then(resp => resp.json()).then(data => {console.log(data); dispatch(addPlaylist(data))} )
}
}


function addPlaylist(playlist){
    return {type: 'ADD', playlist: playlist}
}


function addSong(e, song, playlist_id){
    console.log('hello')

    return function(dispatch){
        const data = {
            song_playlist: {name: song.name, uri: song.uri, time: song.time, artist_uri: song.artist_uri, playlist_id: playlist_id, artist: song.artist}
        }
        const obj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch('http://localhost:3000/song_playlists', obj).then(resp => resp.json()).then(song => {console.log(song); dispatch(findPlaylistAddSong(song))})
    }
}





function findPlaylistAddSong(playlistSong) {
    return {
        type: 'ADD-SONG', id: playlistSong.playlist_id, song: playlistSong.song
    }
}

function addLike(song){
    return{type: 'ADD-LIKE', song: song}
}

function addLikeQueue(song){
    return {type: 'ADD-LIKE-QUEUE', song: song}
}

function fetchAddLike(e, song_id){

    return function(dispatch, getState){

        const userId = getState().currentUser.userId
        const data ={ 
            like: {song_playlist_id: song_id, user_id: userId, liked: true}
        }
        const obj ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch('http://localhost:3000/likes', obj).then(resp => resp.json()).then(song => {console.log(song); dispatch(addLike(song)); dispatch(addLikeQueue(song))})
    }
}

function spotifySearch(input){
    debugger
    return function(dispatch, getState){
        let token = getState().currentUser.token
        
        spotifyApi.setAccessToken(token)
        spotifyApi.search(input, ['track', 'album', 'artist']).then(resp => {console.log(resp); 
        let tracks = resp.tracks.items.map(item => {
          return  Object.assign({}, {image: item.album.images[2].url, name: item.name, artist: item.artists[0].name, artist_uri: item.artists[0].uri, song_uri: item.uri})
        })

        let albums = resp.albums.items.map(item => {
           return Object.assign({}, {
                name: item.name, image: item.images[2].url, artist: item.artists[0].name, artist_uri: item.artists[0].uri, album_uri: item.uri
            })
        })

        dispatch(setSearchTracks(tracks));
        dispatch(setSearchAlbums(albums))
        
        } )
    }
}

function deleteSong(songPlaylistId){
    return function(dispatch, getState){
        let userId = getState().currentUser.id
        let data = {}
        let obj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
           },
           
        }

        fetch(`http://localhost:3000/song_playlists/${songPlaylistId}`, obj).then(resp => resp.json()).then(data => {console.log(data); dispatch(deleteSongFromQueue(data)); dispatch(deleteSongFromPlaylist(data))})
    }
}

function deleteSongFromQueue(data){
    return {type: 'DELETE-SONG-QUEUE', songId: data.songId}
}

function deleteSongFromPlaylist(data){
    return {type: 'DELETE-SONG-FROM-PLAYLIST', songId: data.songId, playlistId: data.playlistId}
}


function downToSpotify(name){
    debugger
    return function(dispatch, getState){
        let userId = getState().currentUser.userId
        let tracks = getState().queueTracks.map(track => track.uri)
        let playlistId = getState().copying
        let obj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userId, playlistId: playlistId, name: name, tracks: tracks})
        }
        fetch('http://localhost:3000/copytospotify', obj).then(resp => resp.json()).then(data => {console.log(data); 
        if(data.message){
            alert(data.message)
        }
    })
    }
}

function copying(playlistId){
    return {type: 'COPYING', playlistId: playlistId}
}

function updateToSpotify(){
    debugger
    return function(dispatch, getState){
        let userId = getState().currentUser.userId
        let tracks = getState().queueTracks.map(track => track.uri)
        let playlistId = getState().copying
        debugger
        let obj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userId, playlistId: playlistId,  tracks: tracks})
        }
        fetch('http://localhost:3000/updatespotify', obj).then(resp => resp.json()).then(data => {console.log(data); 
        if (data.message){
            alert(data.message)
        }
    })


    }
}


function addUserToPlaylist(uri){
    return function(dispatch, getState){
        let userId = getState().currentUser.userId
        let playlistId = getState().copying
        debugger
        let data = { user_playlist: {user_id: userId, playlist_id: playlistId, add_uri: uri}}
        let obj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('http://localhost:3000/user_playlists', obj).then(resp => resp.json()).then(data => {console.log(data); 
        if(data.message){
            alert(data.message)
        }
    })
    }
}

function fetchPlaylistMembers(){
  
    return function(dispatch, getState){
        let userId = getState().currentUser.userId
        let playlistId = getState().copying
        
        fetch(`http://localhost:3000/playlists/${playlistId}/${userId}`).then(resp => resp.json()).then(data => {console.log(data); dispatch(setUsers(data))})
    }
}

function setUsers(users){
    return {type: 'SET-USERS', users: users}
}

function clearPUsers(){
    return{type: 'CLEAR'}
}


function setSearchTracks(results){
    return {type: 'SET-SEARCHED-TRACKS', tracks: results}
}

function setSearchAlbums(results){
    return {type: 'SET-SEARCHED-ALBUMS', albums: results}
}

export {setUser, logoutUser, setToken, setHome, setBrowse, fetchUserPlaylists, logoutUserFromStorage, fetchPlaylistTracks, setPlaylistPage, setCurrentTracks, setQueueTracks, setPlayPosition, fetchFeaturedPlaylists, fetchSharedPlaylists, playMusic, pauseMusic, makePlaylist, addSong, fetchAddLike, spotifySearch, deleteSong, copying, downToSpotify, updateToSpotify, addUserToPlaylist, fetchPlaylistMembers, clearPUsers}