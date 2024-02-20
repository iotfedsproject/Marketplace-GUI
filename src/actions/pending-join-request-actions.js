import {ROOT_URL} from "../configuration";
import {FETCH_PENDING_JOIN_REQUESTS,WITHDRAW_PARTICIPATION, headers} from "./index";
import axios from "axios";

axios.defaults.withCredentials = true;


export function fetchJoinPendingRequests() {
    const url = `${ROOT_URL}/federation_vote_request/pending`;

    const config = {
        url: url,
        method: 'get',
        headers: headers
    };

    const request = axios.request(config);//.then((response) => console.log("Received",response.data))
                                           //  .catch((err) => alert(err));
   /// console.log("request",request.data);

    return {
        type: FETCH_PENDING_JOIN_REQUESTS,
        payload: request
    };
}

export function activateWithdrawParticipationModal(type, clientId) {
    return {
        type: type,
        payload: clientId
    };
}

export function deactivateWithdrawParticipationModal(type) {
    return {
        type: type,
    };
}


export function withdrawParticipation(voteId) {

 alert("withdrawParticipation");

 const url = `${ROOT_URL}/user/cpanel/withdrawParticipation`;
    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('voteId', voteId);


    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };
    return {
        type: WITHDRAW_PARTICIPATION,
    };
}

