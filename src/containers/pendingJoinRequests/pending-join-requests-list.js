import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import _ from "lodash";

import CollapsiblePendingJoinRequestsPanel from "../../components/pending-join-requests/collapsible-pending-join-requests-panel";
import ClientDeleteModal from "../../components/pending-join-requests/pending-join-requests-delete-modal";

import { changeModalState, dismissAlert } from "../../actions";
import { ROOT_URL } from "../../configuration";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { fetchJoinPendingRequests ,activateWithdrawParticipationModal, deactivateWithdrawParticipationModal,withdrawParticipation} from "../../actions/pending-join-request-actions";
import { FieldError,AlertDismissable} from "../../helpers/errors";

import {
    DISMISS_CLIENT_DELETION_SUCCESS_ALERT,
    DISMISS_CLIENT_DELETION_ERROR_ALERT,
    DEACTIVATE_ClIENT_DELETE_MODAL
}from "../../actions"

class PendingJoinRequestList extends Component {

    constructor() {
        super();
        {/*Is called when the is called when the verify withrdrawal button is pressed*/}
        this.handleWithdrawalParticipation     = this.handleWithdrawalParticipation.bind(this);
        {/*the following lines can be removed*/}
        this.dismissClientDeletionSuccessAlert = this.dismissClientDeletionSuccessAlert.bind(this);
        this.dismissClientDeletionErrorAlert   = this.dismissClientDeletionErrorAlert.bind(this);
    }

     componentDidMount() {
      this.props.fetchJoinPendingRequests();
     }

     handleWithdrawalParticipation(){
      this.props.withdrawParticipation("TODO voteId");
     }

    xhandleDeleteClient = () => {
    this.props.withdrawParticipation();

        this.props.deleteClient(this.props.clientDeleteModal.clientIdToDelete, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivateClientModal(DEACTIVATE_ClIENT_DELETE_MODAL);
    };

    showWithdrawalParticipationModal = (clientIdToDelete, clients,
                             deactivateClientDeleteModal, handleWithdrawalParticipation) => {
                             //alert("showClientDeleteModal");
        return (
            clients ?
                <ClientDeleteModal
                    clientId={clientIdToDelete}
                    deleteModalOpen={!!clientIdToDelete}
                    closeModal={deactivateClientDeleteModal}
                    handleDeleteClient={handleWithdrawalParticipation} />
                : null
        );
    };

    dismissClientDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_CLIENT_DELETION_SUCCESS_ALERT)
        alert("dismissClientDeletionSuccessAlert")
    }

    dismissClientDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_CLIENT_DELETION_ERROR_ALERT)
        alert("dismissClientDeletionErrorAlert")
    }

    render() {
        const {availablePendingJoinRequest,fetching_error} = this.props.pendingJoinRequests;

        const { clients, successfulClientDeletion, clientDeletionError } = this.props.userDetails;

        const { clientIdToDelete } = this.props.clientDeleteModal;

        return(
            <Fragment>
               <h2>Voting results</h2>
               <FieldError error={fetching_error}/>
               <AlertDismissable alertStyle="danger" message={clientDeletionError}
                                  dismissHandler={this.dismissClientDeletionErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulClientDeletion}
                                  dismissHandler={this.dismissClientDeletionSuccessAlert} />
                {/* whenClicked is a property not an event, per se. */}
                {


                _.map(availablePendingJoinRequest, (available) => {
                    return <CollapsiblePendingJoinRequestsPanel
                        key={available.federationId}
                        federationName={available.federationId}

                        handledDate= {available.handledDate}
                        requestDate= {available.requestDate}
                        votingState= {available.status}
                        voteAction = {available.voteAction}
                        votingId   = {available.votingId}
                       // comparator = {available.slaConstraints[0].comparator}
                       // duration   = {available.slaConstraints[0].duration}
                       // metric     = {available.slaConstraints[0].metric}
                       // resourceType = {available.slaConstraints[0].resourceType}
                        //threshold    = {available.slaConstraints[0].threshold}
                        authority    = {available.requestingUser.authorities[0].authority}

                        details={"Voting details"+"\n"+
                        "------------------------------------"    + "\n" +
                        "Federation Id: "+ available.federationId + "\n" +
                        "Request Date: " + available.requestDate  + "\n" +
                        "Handle date: "  + available.handledDate  + "\n" +
                        "Voting Id: "    + available.votingId     + "\n" +
                        "Vote Action: "  + available.voteAction   + "\n" +
                        "Authority: "    + available.requestingUser.authorities[0].authority + "\n"+

                        "Voting state: " + available.status + "\n" + "\n"


                       }

                        showButton = {"false"}
                        openModal={this.props.activateWithdrawParticipationModal}
                   />
                })}

                {
                    this.showWithdrawalParticipationModal(clientIdToDelete, clients,
                        this.props.deactivateWithdrawParticipationModal, this.handleWithdrawalParticipation)
                }

            </Fragment>
        );
    }
}

//state is the entire Redux store state (the same value returned by a call to store.getState()
//Whenever the store changes, all of the mapStateToProps functions of all of the connected components will run.
function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
        clientDeleteModal: state.clientDeleteModal,
        pendingJoinRequests: state.pendingJoinRequests
    };
}

export default connect(mapStateToProps, {
    fetchJoinPendingRequests,
    changeModalState,
    withdrawParticipation,
    activateWithdrawParticipationModal,
    deactivateWithdrawParticipationModal,
    dismissAlert
})(withRouter(PendingJoinRequestList));