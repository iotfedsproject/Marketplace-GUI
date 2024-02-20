import { ACTIVATE_FEDERATION_LEAVE_WITH_VOTE_MODAL, DEACTIVATE_FEDERATION_LEAVE_WITH_VOTE_MODAL } from "../../actions";

const INITIAL_STATE = { federationId : "", platformId : "" };

export default function(state = INITIAL_STATE, action) {
    console.log("leave-with-vote-federation-modal-reducer");
    switch(action.type) {
        case ACTIVATE_FEDERATION_LEAVE_WITH_VOTE_MODAL:
            const { federationId, platformId } = action.payload;
            console.log(action.payload);
            return { federationId, platformId };
        case DEACTIVATE_FEDERATION_LEAVE_WITH_VOTE_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}