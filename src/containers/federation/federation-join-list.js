import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import CollapsibleFederationJoinPanel from "../../components/federation/collapsible-federation-join-panel";

import FederationLeaveModal from "../../components/federation/federation-leave-modal";
import FederationDeleteModal from "../../components/federation/federation-delete-modal";

import FederationJoinModal from "../../components/federation/federation-join-modal";

import { FieldError, AlertDismissable } from "../../helpers/errors";
import { fetchAllInformationModels, fetchUserInformationModels } from "../../actions/info-model-actions";
import {
    fetchFederations, /*deleteFederation,*/ leaveFederation,
    activateFederationDeleteModal, deactivateFederationDeleteModal,
    activateFederationJoinModal, deactivateFederationJoinModal,
    activateFederationLeaveModal, deactivateFederationLeaveModal,
    activateFederationInviteModal,joinToFederation
} from "../../actions/federation-actions";
import {
    changeModalState,
    dismissAlert,
    DISMISS_FEDERATION_DELETION_SUCCESS_ALERT,
    DISMISS_FEDERATION_DELETION_ERROR_ALERT,
    DISMISS_FEDERATION_LEAVE_SUCCESS_ALERT,
    DISMISS_FEDERATION_LEAVE_ERROR_ALERT,
    DISMISS_FEDERATION_INVITATION_SUCCESS_ALERT,
    DISMISS_FEDERATION_JOIN_SUCCESS_ALERT,
    DISMISS_FEDERATION_JOIN_ERROR_ALERT
} from "../../actions";
import { ROOT_URL } from "../../configuration";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { getUserFederations } from "../../selectors";

class FederationToJoinList extends Component {

    constructor() {
        super();

        //this.handleDeleteFederation = this.handleDeleteFederation.bind(this);
        this.handleLeaveFederation = this.handleLeaveFederation.bind(this);
        this.dismissFederationLeaveSuccessAlert = this.dismissFederationLeaveSuccessAlert.bind(this);
        this.dismissFederationLeaveErrorAlert = this.dismissFederationLeaveErrorAlert.bind(this);
        this.dismissFederationDeletionSuccessAlert = this.dismissFederationDeletionSuccessAlert.bind(this);
        this.dismissFederationDeletionErrorAlert = this.dismissFederationDeletionErrorAlert.bind(this);
        this.dismissFederationInvitationSuccessAlert = this.dismissFederationInvitationSuccessAlert.bind(this);

        this.handleJoinFederation              = this.handleJoinFederation.bind(this);
        this.dismissFederationJoinSuccessAlert = this.dismissFederationJoinSuccessAlert.bind(this);
        this.dismissFederationJoinErrorAlert   = this.dismissFederationJoinErrorAlert.bind(this);

    }

    componentDidMount() {
        this.props.fetchUserInformationModels();
        this.props.fetchAllInformationModels();
       // this.props.fetchFederations();
    }

    handleJoinFederation = () => {
     //alert("handleJoinFederation");
     const { isAdmin } = this.props;

     this.props.joinToFederation(this.props.federationJoinModal.federationIdToJoin, isAdmin, (res) => {
         const pattern = new RegExp(`${ROOT_URL}$`);

         // If the root url is returned, that means that the user is not authenticated (possibly the
         // session is expired, so we redirect to the homepage and open the login modal
         if (pattern.test(res.request.responseURL)) {
             this.props.changeModalState(USER_LOGIN_MODAL, true);
             this.props.history.push(ROOT_URL);
         }
         });
          this.props.deactivateFederationJoinModal();
    };

    handleLeaveFederation = () => {
        const { federationId, platformId } = this.props.federationLeaveModal;
        const { isAdmin } = this.props;

        this.props.leaveFederation(federationId, platformId, isAdmin, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivateFederationLeaveModal();
    };

    handleDeleteFederation = () => {
        const { isAdmin } = this.props;

       /* this.props.deleteFederation(this.props.federationDeleteModal.federationIdToDelete, isAdmin, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivateFederationDeleteModal();*/
    };

    showFederationLeaveModal = (federationIdToLeave, platformIdToLeave, availableUserFederations,
                                deactivateFederationLeaveModal, handleLeaveFederation) => {
        return (

            availableUserFederations ?
                <FederationLeaveModal
                    federation={availableUserFederations[federationIdToLeave]}
                    platformId={platformIdToLeave}
                    modalOpen={!!federationIdToLeave}
                    closeModal={deactivateFederationLeaveModal}
                    handleLeaveFederation={handleLeaveFederation} />
                : null
        );
    };

    showFederationJoinModal = (federationIdToJoin, availableFederations,
                                 deactivateFederationJoinModal, handleJoinFederation) => {
                               //alert("jksjdsjk");
        return (
            availableFederations ?
                <FederationJoinModal
                    federation={availableFederations[federationIdToJoin]}
                    modalOpen={!!federationIdToJoin}
                    closeModal={deactivateFederationJoinModal}
                    handleJoinFederation={handleJoinFederation} />
                : null
        );
    };


    dismissFederationLeaveSuccessAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_LEAVE_SUCCESS_ALERT)
    }

    dismissFederationLeaveErrorAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_LEAVE_ERROR_ALERT)
    }

    dismissFederationDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_DELETION_SUCCESS_ALERT)
    }

    dismissFederationDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_DELETION_ERROR_ALERT)
    }

    dismissFederationInvitationSuccessAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_INVITATION_SUCCESS_ALERT)
    }

     dismissFederationJoinSuccessAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_JOIN_SUCCESS_ALERT)
     }

     dismissFederationJoinErrorAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_JOIN_ERROR_ALERT)
    }

    render() {
        const { availableFederations, successfulFederationLeave, successfulFederationDeletion,
            successfulFederationInvitation, federationLeaveError, federationDeletionError,
            fetching_error,successfulFederationJoin, federationJoinError} = this.props.federations;
        const { federationIdToJoin }   = this.props.federationJoinModal;
        const federationIdToLeave      = this.props.federationLeaveModal.federationId;
        const platformIdToLeave        = this.props.federationLeaveModal.platformId;
        const availableUserFederations = this.props.userFederations;
        const { isAdmin } = this.props;
        {/*const federations = isAdmin ? availableFederations : availableUserFederations;*/}
        const federations = availableFederations;

        return(
            <Fragment>
                <FieldError error={fetching_error}/>
                <AlertDismissable alertStyle="danger" message={federationDeletionError}
                                  dismissHandler={this.dismissFederationDeletionErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulFederationDeletion}
                                  dismissHandler={this.dismissFederationDeletionSuccessAlert} />
                <AlertDismissable alertStyle="danger" message={federationLeaveError}
                                  dismissHandler={this.dismissFederationLeaveErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulFederationLeave}
                                  dismissHandler={this.dismissFederationLeaveSuccessAlert} />
                <AlertDismissable alertStyle="success" message={successfulFederationInvitation}
                                  dismissHandler={this.dismissFederationInvitationSuccessAlert} />

                <AlertDismissable alertStyle="danger" message={federationJoinError}
                                 dismissHandler={this.dismissFederationJoinErrorAlert} />
                <AlertDismissable alertStyle="success" message={successfulFederationJoin}
                                 dismissHandler={this.dismissFederationJoinSuccessAlert} />

                {_.map(federations, (federation) => {
                    return (
                        <CollapsibleFederationJoinPanel
                            key={federation.id}
                            userPlatforms={this.props.userPlatforms}
                            federation={federation}
                            informationModels={this.props.informationModels}
                            //openLeaveModal={this.props.activateFederationLeaveModal}
                            //openDeleteModal={this.props.activateFederationDeleteModal}
                            openFederationJoinModal={this.props.activateFederationJoinModal}
                            //openInviteModal={this.props.activateFederationInviteModal}
                            isAdmin={isAdmin} />
                    )
                })}

                {/*
                    this.showFederationDeleteModal(federationIdToDelete, federations,
                        this.props.deactivateFederationDeleteModal, this.handleDeleteFederation)
                        */
                  /* TODO add the       this.handleJoinFederation parameter in the  this.showFederationJoinModal*/
                  this.showFederationJoinModal(federationIdToJoin,federations,this.props.deactivateFederationJoinModal,this.handleJoinFederation)

                  /* this.showFederationJoinModal(federationIdToDelete, federations,
                       this.props.deactivateFederationDeleteModal, this.handleDeleteFederation)
                    */
                }

                {
                    this.showFederationLeaveModal(federationIdToLeave, platformIdToLeave, federations,
                        this.props.deactivateFederationLeaveModal, this.handleLeaveFederation)
                }

              {/*  <FederationJoinModal />*/}

            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        userPlatforms: state.userPlatforms.availablePlatforms,
        federations: state.federations,
        informationModels: state.informationModels,
        userFederations: getUserFederations(state),
       // federationDeleteModal: state.federationDeleteModal,<-- caused the problem
        federationLeaveModal: state.federationLeaveModal,
        federationInviteModal: state.federationInviteModal,
        federationJoinModal: state.federationJoinModal
    };
}

export default connect(mapStateToProps, {
    fetchFederations,
    fetchUserInformationModels,
    fetchAllInformationModels,
    changeModalState,
    leaveFederation,
   // deleteFederation,
    joinToFederation,
    activateFederationDeleteModal,
    deactivateFederationDeleteModal,
    activateFederationJoinModal,
    deactivateFederationJoinModal,
    activateFederationLeaveModal,
    deactivateFederationLeaveModal,
    activateFederationInviteModal,
    dismissAlert
})(withRouter(FederationToJoinList));