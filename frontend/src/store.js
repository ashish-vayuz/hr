import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

//Reducer
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { categoryListReducer } from './reducers/categoryReducers'
import { challengeListReducer, deleteChallengeReducer } from './reducers/challengeReducers'
import { changeState } from './reducers/responsideReducers'

const initialState = {
  sidebarShow: 'responsive'
}

const reducer = combineReducers({
  challengeList: challengeListReducer,
  deleteChallenge: deleteChallengeReducer,
  categoryList: categoryListReducer,
  cstate: changeState,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer
})

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store