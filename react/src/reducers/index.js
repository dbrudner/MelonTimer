import { combineReducers } from 'redux';
import loginOrLogout from './loginOrLogout'
import openSignUp from './openSignUp'
import openLogin from './openLogin'

const rootReducer = combineReducers({
    user: loginOrLogout,
    openSignUp,
    openLogin
});

export default rootReducer;