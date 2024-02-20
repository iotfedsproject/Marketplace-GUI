import _ from "lodash";

import {FETCH_PENDING_JOIN_REQUESTS} from "../../actions";
import { ROOT_URL } from "../../configuration";


const INITIAL_STATE = { availablePendingJoinRequest: {} };

export default function(state = {}, action) {

  switch(action.type){
   case FETCH_PENDING_JOIN_REQUESTS:
    console.log("action",action.payload);

    if (action.error)
        return { ...INITIAL_STATE, fetching_error : `${action.payload.message}: Could not fetch the pending of join requests list`};
     else{
       return {...state, availablePendingJoinRequest :  _.mapKeys(action.payload.data, "federationId")};
       //return state;//
    }
    //return state;
   break;
   default:
    return state;
  }

}