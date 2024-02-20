import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import { ROOT_URL } from "../../configuration";
import { USER_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import  FederationRules  from "../../components/federation/federation-rules";

//not called
class ModifyFederationRulesContainer extends Component {

    constructor() {
    super();


 };

 render() {
        {/* const { availableFederations, successfulFederationLeave, successfulFederationDeletion,*/}
        {/*     successfulFederationInvitation, federationLeaveError, federationDeletionError,*/}
        {/*     fetching_error,successfulFederationJoin, federationJoinError} = this.props.federations;*/}
        {/* const { federationIdToJoin }   = this.props.federationJoinModal;*/}
         {/*const federationIdToLeave      = this.props.federationLeaveModal.federationId;*/}
         {/*const platformIdToLeave        = this.props.federationLeaveModal.platformId;*/}
         {/*const availableUserFederations = this.props.userFederations;*/}
         {/*const { isAdmin } = this.props;*/}
         {/*const federations = isAdmin ? availableFederations : availableUserFederations;*/}
         {/* const federations = availableFederations;*/}

         return(
             <Fragment>
              <FederationRules/>
             </Fragment>
             );

             }


             }

export default ModifyFederationRulesContainer;