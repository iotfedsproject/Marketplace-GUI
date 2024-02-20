import { ACTIVATE_FEDERATION_JOIN_MODAL, DEACTIVATE_FEDERATION_JOIN_MODAL } from "../../actions";

const INITIAL_STATE = { federationIdToJoin : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_FEDERATION_JOIN_MODAL:
            return { federationIdToJoin : action.payload };
        case DEACTIVATE_FEDERATION_JOIN_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}