import { createStore,applyMiddleware,combineReducers } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const initialState = {
  sidebarShow: 'responsive'
}

const reducer = combineReducers({
  cstate: changeState
})

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

const middleware = [thunk]
const store = createStore(changeState,initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store