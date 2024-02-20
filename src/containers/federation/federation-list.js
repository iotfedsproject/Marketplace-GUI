import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsibleFederationPanel from "../../components/federation/collapsible-federation-panel";
import FederationLeaveModal from "../../components/federation/federation-leave-modal";
import FederationLeaveWithVoteModal from "../../components/federation/federation-leave-with-vote-modal";
import FederationDeleteModal from "../../components/federation/federation-delete-modal";
import FederationInviteModal from "../../components/federation/federation-invite-modal";
import ChangeFederationRulesModal from "../../components/federation/federation-change-rules-modal";
import { FieldError, AlertDismissable } from "../../helpers/errors";
import { fetchAllInformationModels, fetchUserInformationModels } from "../../actions/info-model-actions";
import {
    fetchFederations, deleteFederation, leaveFederation,
    activateFederationDeleteModal, deactivateFederationDeleteModal,
    activateFederationLeaveModal, deactivateFederationLeaveModal,
    activateFederationLeaveWithVoteModal, deactivateFederationLeaveWithVoteModal,
    activateFederationInviteModal,activateFederationChangeRulesModal,changeFederationRules,
    leaveFederationWithVote
} from "../../actions/federation-actions";
import {
    changeModalState,
    dismissAlert,
    DISMISS_FEDERATION_DELETION_SUCCESS_ALERT,
    DISMISS_FEDERATION_DELETION_ERROR_ALERT,
    DISMISS_FEDERATION_LEAVE_SUCCESS_ALERT,
    DISMISS_FEDERATION_LEAVE_ERROR_ALERT,
    DISMISS_FEDERATION_INVITATION_SUCCESS_ALERT,
    DISMISS_FEDERATION_CHANGE_RULES_SUCCESS_ALERT
} from "../../actions";
import { ROOT_URL } from "../../configuration";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { getUserFederations } from "../../selectors";

class FederationList extends Component {

    constructor() {
        super();

        this.handleDeleteFederation                   = this.handleDeleteFederation.bind(this);
        this.handleLeaveFederation                    = this.handleLeaveFederation.bind(this);
        this.handleLeaveFederationWithVote            = this.handleLeaveFederationWithVote.bind(this);
        this.dismissFederationLeaveSuccessAlert       = this.dismissFederationLeaveSuccessAlert.bind(this);
        this.dismissFederationLeaveErrorAlert         = this.dismissFederationLeaveErrorAlert.bind(this);
        this.dismissFederationDeletionSuccessAlert    = this.dismissFederationDeletionSuccessAlert.bind(this);
        this.dismissFederationDeletionErrorAlert      = this.dismissFederationDeletionErrorAlert.bind(this);
        this.dismissFederationInvitationSuccessAlert  = this.dismissFederationInvitationSuccessAlert.bind(this);
        this.dismissFederationChangeRulesSuccessAlert = this.dismissFederationChangeRulesSuccessAlert.bind(this);
    }

  //  componentDidMount() {
    //    this.props.fetchUserInformationModels();
    //    this.props.fetchAllInformationModels();
    //    this.props.fetchFederations();
    //}

    handleLeaveFederationWithVote = () => {
            const { federationId, platformId } = this.props.federationLeaveWithVoteModalModal;
            const { isAdmin } = this.props;
            console.log("handleLeaveFederationWithVote");
            this.props.leaveFederationWithVote(federationId, platformId, isAdmin, (res) => {
                const pattern = new RegExp(`${ROOT_URL}$`);

                // If the root url is returned, that means that the user is not authenticated (possibly the
                // session is expired, so we redirect to the homepage and open the login modal
                if (pattern.test(res.request.responseURL)) {
                    this.props.changeModalState(USER_LOGIN_MODAL, true);
                    this.props.history.push(ROOT_URL);
                }
            });
            this.props.deactivateFederationLeaveWithVoteModal();
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

        this.props.deleteFederation(this.props.federationDeleteModal.federationIdToDelete, isAdmin, (res) => {
            const pattern = new RegExp(`${ROOT_URL}$`);

            // If the root url is returned, that means that the user is not authenticated (possibly the
            // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
                this.props.changeModalState(USER_LOGIN_MODAL, true);
                this.props.history.push(ROOT_URL);
            }
        });
        this.props.deactivateFederationDeleteModal();
    };

    showFederationLeaveModal = (federationIdToLeave, platformIdToLeave, availableUserFederations,
                                deactivateFederationLeaveModal, handleLeaveFederation) => {
                   console.log("######### showFederationLeaveModal 333 ############");

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

    showFederationLeaveWithVoteModal = (federationIdToLeaveWithVote, platformIdToLeave, availableUserFederations,
                                    deactivateFederationLeaveWithVoteModal, handleLeaveWithVoteFederation) => {
           console.log("######### showFederationLeaveWithVoteModal ############");
            return (
                availableUserFederations ?
                    <FederationLeaveWithVoteModal
                        federation={availableUserFederations[federationIdToLeaveWithVote]}
                        platformId={platformIdToLeave}
                        modalOpen={!!federationIdToLeaveWithVote}
                        closeModal={deactivateFederationLeaveWithVoteModal}
                        handleLeaveFederation={handleLeaveWithVoteFederation} />
                    : null
            );
        };

    showFederationDeleteModal = (federationIdToDelete, availableFederations,
                                 deactivateFederationDeleteModal, handleDeleteFederation) => {
        return (
            availableFederations ?
                <FederationDeleteModal
                    federation={availableFederations[federationIdToDelete]}
                    modalOpen={!!federationIdToDelete}
                    closeModal={deactivateFederationDeleteModal}
                    handleDeleteFederation={handleDeleteFederation} />
                : null
        );
    };

    showChangeFederationRulesModal = (federationIdToChangeRules, availableFederations,
                                     deactivateFederationDeleteModal, handleDeleteFederation) => {
            return (
              <Fragment>
                <h1>Change Federation Rules</h1>
                <h1>{federationIdToChangeRules}</h1>openChangeFederationModal
                <h1>FILL ME</h1>
              </Fragment>
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

     dismissFederationChangeRulesSuccessAlert() {
            this.props.dismissAlert(DISMISS_FEDERATION_CHANGE_RULES_SUCCESS_ALERT)
     }

    render() {
        const { availableFederations, successfulFederationLeave, successfulFederationDeletion,
            successfulFederationInvitation, federationLeaveError, federationDeletionError,
            fetching_error } = this.props.federations;
        const { federationIdToDelete }    = this.props.federationDeleteModal;
        const federationIdToLeave         = this.props.federationLeaveModal.federationId;
        const federationIdToLeaveWithVote = this.props.federationLeaveWithVoteModal.federationId;
        const platformIdToLeaveWithVote   = this.props.federationLeaveWithVoteModal.platformId;
        const platformIdToLeave           = this.props.federationLeaveModal.platformId;
        console.log("federationIdToLeaveWithVote");
        console.log(federationIdToLeaveWithVote);
        const availableUserFederations = this.props.userFederations;
        const { isAdmin } = this.props;
        const federations = isAdmin ? availableFederations : availableUserFederations;
        {/*const federations = availableFederations;*/} {/*THIS WILL BE USED FOR JOIN TO FEDERATION ONLY*/}

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

                {_.map(federations, (federation) => {
                    return (
                        <CollapsibleFederationPanel
                            key={federation.id}
                            userPlatforms           = {this.props.userPlatforms}
                            federation              = {federation}
                            informationModels       = {this.props.informationModels}
                            openLeaveModal          = {this.props.activateFederationLeaveModal}
                            openLeaveWithVoteModal  = {this.props.activateFederationLeaveWithVoteModal}
                            openDeleteModal         = {this.props.activateFederationDeleteModal}
                            openInviteModal         = {this.props.activateFederationInviteModal}
                            openChangeFederationRulesModal = {this.props.activateFederationChangeRulesModal}
                            isAdmin={isAdmin} />
                    )
                })}

                {
                    this.showFederationDeleteModal(federationIdToDelete, federations,
                        this.props.deactivateFederationDeleteModal, this.handleDeleteFederation)

                }

                {
                    this.showFederationLeaveModal(federationIdToLeave, platformIdToLeave, federations,
                        this.props.deactivateFederationLeaveModal, this.handleLeaveFederation)
                }

                {
                  this.showFederationLeaveWithVoteModal(federationIdToLeaveWithVote, platformIdToLeaveWithVote, federations,
                                        this.props.deactivateFederationLeaveWithVoteModal, this.handleLeaveFederationWithVote)

                }

                <FederationInviteModal />

                <ChangeFederationRulesModal/>

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
        federationDeleteModal: state.federationDeleteModal,
        federationLeaveModal: state.federationLeaveModal,
        federationLeaveWithVoteModal: state.federationLeaveWithVoteModal,
        federationInviteModal: state.federationInviteModal
    };
}

export default connect(mapStateToProps, {
    //fetchFederations,
    fetchUserInformationModels,
    fetchAllInformationModels,
    changeModalState,
    leaveFederation,
    deleteFederation,
    activateFederationDeleteModal,
    deactivateFederationDeleteModal,
    activateFederationLeaveModal,
    deactivateFederationLeaveModal,
    activateFederationInviteModal,
    activateFederationChangeRulesModal,
    activateFederationLeaveWithVoteModal,
    deactivateFederationLeaveWithVoteModal,
    dismissAlert,
    leaveFederationWithVote
})(withRouter(FederationList));