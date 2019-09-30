import {combineReducers, bindActionCreators} from 'redux';
import _ from "lodash"


const userReducer = (state={}, action) => {
    switch(action.type) {
        case 'LOGIN-USER':
            return action.user
        case 'LOGOUT-USER':
            return {}
        default: 
        return state
    }
}

const userPlaylistReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET-USER-PLAYLISTS':
            return action.playlists
        default:
            return state
    }
}


const tokenReducer = (state=null, action) => {
    switch(action.type) {
        case 'SET-TOKEN': 
            return action.token;
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

const pageReducer = (state=null, action) => {
    switch(action.type){
        case 'HOME-PAGE':
            return 'home'
        case 'BROWSE-PAGE':
            return 'browse'
        case 'PLAYLIST-PAGE':
            return action.name
        default:
            return state
    }
}

const TrackReducer = (state=[], action) => {
    switch(action.type){
        case 'SET-TRACKS':
            return action.tracks
        default:
            return state
    }
}

const queueReducer = (state=[], action) => {
    switch(action.type){
        case 'QUEUE-TRACKS':    
            return action.tracks
        case 'CLEAR-QUEUE':
            return []
        case 'ADD-LIKE-QUEUE':
              let newQueue = state.map(track => {
                  if (track.id === action.song.id){
                      return action.song
                  } else {
                      return track
                  }
              })
              return newQueue
        case 'DELETE-SONG-QUEUE':
            let filterQueue = state.filter(track => track.id !== action.songId)
            return filterQueue
        default:
            return state
    }
}


const playPositionReducer = (state=0, action) => {
    switch(action.type){
        case 'SET-POSITION':
            return action.position  
        case 'RESET':
            return 0
        default: 
            return state
    }
}


const featuredPlaylistsReducer = (state=[], action) => {
    switch(action.type){
        case 'SET-FEATURED':
            return action.playlists
        case 'RESET':
            return []
        default:
            return state
    }
}

const sharedPlaylistsReducer = (state=[], action) => {
    switch(action.type){
        case 'SET-SHARED':
            return action.playlists
        case 'RESET':
            return []
        case 'ADD':
            return [...state, action.playlist]
        case 'ADD-SONG':
          const newCopy = state.map(playlist => {
              
              if (playlist.id === action.id) {
                  const copySongs = [...playlist.songs, action.song]
                 playlist.songs = copySongs
                 return playlist
              } else {
                  return playlist
              }
          })
          return newCopy
          case 'ADD-LIKE':
              const likeCopy = state.map(playlist => {
                  if (playlist.id === action.song.playlist_id){
                     let newSongs = playlist.songs.map(song => {
                         
                          if(song.id === action.song.id){
                              return action.song
                              
                          } else {
                              return song
                          }
                      })
                      playlist.songs = newSongs
                      return playlist
                  } else {
                      return playlist
                  }
              })
              
              return likeCopy
            case 'DELETE-SONG-FROM-PLAYLIST':
                let deleteCopy = state.map(playlist => {
                    if(playlist.id === action.playlistId){
                        let songsCopy = playlist.songs.filter(song => song.id !== action.songId)
                        playlist.songs = songsCopy
                        return playlist
                    } else {
                        return playlist
                    }
                })
                return deleteCopy
        default:
            return state
    }
}


const playReducer = (state=null, action) => {
    switch(action.type){
        case 'PLAY':
            return true
        case 'PAUSE':
            return false
        default:
            return state
    }
}


const searchTracksReducer = (state=[], action) => {
    switch(action.type){
        case 'SET-SEARCHED-TRACKS':
            return action.tracks
        default:
            return state
    }
}

const copyingReducer = (state='', action) => {
    switch(action.type){
        case 'COPYING':
            return action.playlistId
        default:
        return state
    }
}

const playlistUsersReducers = (state=[], action) => {
    switch(action.type){
        case 'SET-USERS': 
            return action.users
        case 'CLEAR':
            return []
        default:
            return state
    }
}

const rootReducer = combineReducers({
    currentUser: userReducer,
    token: tokenReducer,
    page: pageReducer,
    userPlaylists: userPlaylistReducer,
    currentTracks: TrackReducer,
    queueTracks: queueReducer,
    playPosition: playPositionReducer,
    featuredPlaylists: featuredPlaylistsReducer,
    sharedPlaylists: sharedPlaylistsReducer,
    play: playReducer,
    searchTracks: searchTracksReducer,
    copying: copyingReducer,
    playlistUsers: playlistUsersReducers
})




export default rootReducer