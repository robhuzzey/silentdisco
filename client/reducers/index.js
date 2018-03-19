import { combineReducers } from 'redux'

import authenticate from './authenticate'
import user from './user'
import queued from './queued'
import search from './search'

const rootReducer = combineReducers({
  authenticate,
  user,
  queued,
  search
})

export default rootReducer
