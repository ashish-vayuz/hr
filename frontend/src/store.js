import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

//Reducer
import { userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { userListReducer, userDeleteReducer, userDetailsReducer, userStatusReducer, userAddReducer } from './reducers/userMReducers'
import { categoryListReducer, categoryDeleteReducer, categoryStatusReducer, categoryAddReducer } from './reducers/categoryReducers'
import { challengeListReducer, deleteChallengeReducer } from './reducers/challengeReducers'
import { changeState } from './reducers/responsideReducers'
import { adminListReducer, adminDeleteReducer, adminDetailsReducer, adminStatusReducer, adminAddReducer } from './reducers/adminReducers'
import { cmsAddReducer, cmsDeleteReducer, cmsListReducer, cmsStatusReducer, cmsDetailsReducer } from './reducers/cmsReducer'



const reducer = combineReducers({
  challengeList: challengeListReducer,
  deleteChallenge: deleteChallengeReducer,
  //CMS
  cmsList: cmsListReducer,
  deleteCms: cmsDeleteReducer,
  updateCms: cmsStatusReducer,
  addCms: cmsAddReducer,
  viewCms: cmsDetailsReducer,
  //Category
  categoryList: categoryListReducer,
  deleteCategory: categoryDeleteReducer,
  updateCategory: categoryStatusReducer,
  addCategory: categoryAddReducer,
  cstate: changeState,
  //userManagement
  userAdd: userAddReducer,
  userList: userListReducer,
  deleteUser: userDeleteReducer,
  updateUser: userStatusReducer,
  //admin
  adminList: adminListReducer,
  deleteAdmin: adminDeleteReducer,
  updateAdmin: adminStatusReducer,
  addAdmin: adminAddReducer,
  //users
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  //userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  sidebarShow: 'responsive',
  userLogin: { userInfo: userInfoFromStorage }
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store