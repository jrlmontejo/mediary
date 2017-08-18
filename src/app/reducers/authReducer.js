import { Map } from 'immutable'

const initialState = Map({
  loading: false,
  auth: false
})

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default authReducer