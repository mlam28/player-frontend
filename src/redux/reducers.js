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
    play: playReducer
})




export default rootReducer