import {combineReducers} from 'redux';
import _ from "lodash"


const userReducer = (state=null, action) => {
    switch(action.type) {
        case 'LOGIN-USER':
            return action.user
        case 'LOGOUT-USER':
            return null
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

const pageReducer = (state='login', action) => {
    switch(action.type){
        case 'LOGIN-PAGE':
            return 'login'
        case 'HOME-PAGE':
            return 'home'
        case 'BROWSE-PAGE':
            return 'browse'
        default:
            return state
    }
}

const rootReducer = combineReducers({
    currentUser: userReducer,
    token: tokenReducer,
    page: pageReducer
})




export default rootReducer