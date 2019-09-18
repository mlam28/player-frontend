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

const rootReducer = combineReducers({
    currentUser: userReducer
})

export default rootReducer