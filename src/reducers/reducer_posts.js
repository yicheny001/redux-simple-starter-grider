import { FETCH_POSTS, FETCH_POST } from '../actions/index'
const INITIAL_STATE = {all:[], post:null}

export default function(state=INITIAL_STATE, action){
  switch(action.type){
    case FETCH_POSTS:
      return { ...state, all:action.payload.data}
      //with redux promise, the response we get will be available at action.payload.data
      //reducer needs to return a new object
      //above means adding the latter piece with what we had before
    case FETCH_POST:
      return {...state, post: action.payload.data}
    default:
      return state;

  }
}
