import React, { Component, Fragment } from "react";
import _ from "lodash";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { FieldArray, reduxForm } from "redux-form";
import { renderPlatforms } from "../../helpers/render-platformId-fields";
import { deactivateFederationChangeRulesModal, changeFederationRules } from "../../actions/federation-actions";
import { USER_LOGIN_MODAL,FEDERATION_CHANGE_RULES_MODAL,ADMIN_LOGIN_MODAL } from "../../reducers/modal/modal-reducer";
import { ROOT_URL } from "../../configuration";
import { InvitationRequest } from "../../helpers/object-definitions";
import { withRouter } from "react-router-dom";
import { changeModalState, DISMISS_FEDERATION_CHANGE_RULES_ERROR_ALERT, DISMISS_FEDERATION_CHANGE_RULES_SUCCESS_ALERT,dismissAlert } from "../../actions";
import { validatePlatformIds} from "../../validation/federation-registration-validation";
import { AlertDismissable } from "../../helpers/errors";


import { RULE_TYPES,DATA_AVAILABILITY,SERVICE_TYPES,SUPPORTED_ONTOLOGIES,BOARD_GOV,PROPOSALS,APPROVAL_PERCENT,VOTE_RULES_BASE,UNDER_PERFORMANCE,CHARGE_POLICY,FED_PRODUCT,PROFIT_POLICY,COIN   } from "../../configuration/index";
import FederationChangeRulesFormBody from "../../components/federation/federation-change-rules-form-body";
import { isNotEmpty} from "../../validation/helpers";
import {validateValue,validateQofEsWeights,validatePercent } from "../../validation/federation-registration-validation";

import { Federation, FederationToUpdate,FederationMember, InformationModel,Quality,Metrics,FedTypeRules,FedMarketplace,Type,VoteRules,Proposals,BoardGov,FedGov,IoTFedsRules,SmartContract,QualityOfServicesWeights,QualityAssuranceMetrics,QualityExpWeights } from "../../helpers/object-definitions";


class FederationChangeRulesModal extends Component {

    constructor() {
        super();
        this.dismissFederationChangeRulesErrorAlert    = this.dismissFederationChangeRulesErrorAlert.bind(this);
        this.dismissFederationRegistrationSuccessAlert = this.dismissFederationRegistrationSuccessAlert.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.deactivateFederationChangeRulesModal();
        this.dismissFederationChangeRulesErrorAlert();
        this.dismissFederationRegistrationSuccessAlert();
        this.props.reset();
    }

    dismissFederationChangeRulesErrorAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_CHANGE_RULES_ERROR_ALERT);
    }

    dismissFederationRegistrationSuccessAlert(){
       this.props.dismissAlert(DISMISS_FEDERATION_CHANGE_RULES_SUCCESS_ALERT);
    }


    onSubmit = (props) => {
        const { fed } = this.props;
        console.log("======");
        console.log(this.props);
        console.log(props.public)
        console.log(props.changeRuleTypeId);
        console.log(this.props.fed);
        console.log("==============");

        //////////////////////////////////////
      const bgovMembers = props.changeBoardGovId.map(
         bgovMember => new BoardGov(bgovMember ? bgovMember : "", null)
        );

        //console.log(bgovMember);


        const quality          = new Quality(props.changeMinValueFedId);
        const metrics          = new Metrics(props.changeQosPercentageId,quality);
        const type             = new Type(props.changeapprovalPercentId,props.changevoteRulesBaseId);
        const voteRules        = new VoteRules(props.changeTokensId,type);
        //const qualityAssurance  = new QualityAssurance(metrics, props.changereputationPercentId ,props.changeUnderperformanceId);
        const qualityExpWeights = new QualityExpWeights(props.changeBusinessEnablementId,props.changeCompletenessId,
                                                               props.changeCorrectnessId,props.changeEasyOfUseId,props.changePrecisionId,
                                                               props.changeRelevanceId,props.changeResponseTimeId,props.changeValueForMoneyId);

        const qualityOfServicesWeights = new QualityOfServicesWeights(props.changeQosAvailabilityId,props.changeQosPrecisionId,props.changeQosResponseTimeId);
        const qualityAssuranceMetrics  = new QualityAssuranceMetrics(qualityExpWeights,props.changeQosPercentageId,qualityOfServicesWeights,quality,props.changereputationPercentId ,props.changeUnderperformanceId);

        const fedMarketplace   = new FedMarketplace(props.changeChargePolicyId,props.changeCoinId,props.changeFedProductId,props.changeProfitPolicyId);
        const fedTypeRules     = new FedTypeRules(props.changeDataAvailabilityId,props.changeServiceTypeId,props.changeSupportedOntologiesId,props.changeRuleTypeId);
        const fedGov           = new FedGov(props.changeBoardGovId,props.changeproposalsId,voteRules);
        const ioTFedsRules     = new IoTFedsRules(fedGov,fedMarketplace,fedTypeRules,qualityAssuranceMetrics);
        const smartContract    = new SmartContract(ioTFedsRules);
        console.log("---------------------------- updated smart contract --------------------------------");
        console.log(smartContract);
        console.log("------------------------------------------------------------------------------------");
        console.log("---------------------------- federation variables ----------------------------------");
        console.log(fed.id);
        console.log(fed.name);
        console.log(fed.public);
        console.log(fed.informationModel);
        console.log(fed.slaConstraints);
        console.log(fed.members);
        console.log(fed.openInvitations);

        console.log("-------------------------------------------------------------------------------------")
        //const federationToUpdate = new FederationToUpdate(fed.id, fed.name, fed.public, fed.informationModel, fed.slaConstraints, fed.members,fed.openInvitations, smartContract);
        const federationToUpdate   = new Federation(fed.id, fed.name, fed.public, fed.informationModel, fed.slaConstraints, fed.members, smartContract);

        console.log("---------------------------- federationToUpdate  --------------------------------------");
        console.log(federationToUpdate);
        ////////////////////////////////////


       /* const invitationRequest = new InvitationRequest(
            this.props.changeFederationRulesModal.federationId,
            _.map(props.invitedPlatforms, (invited) => invited.platformId));

        this.props.changeFederationRules(
            invitationRequest,
            (res) => {
                const pattern = new RegExp(`${ROOT_URL}$`);

                // If the root url is returned, that means that the user is not authenticated (possibly the
                // session is expired, so we redirect to the homepage and open the login modal
                if (pattern.test(res.request.responseURL)) {
                    this.props.history.push(ROOT_URL);
                    this.props.changeModalState(USER_LOGIN_MODAL, true);
                } else if (res.status === 200) {
                    this.close();
                }
            }
        );*/
        //////////////////////////////////////////
       this.props.changeFederationRules(
          federationToUpdate,
          (res) => {
           const pattern = new RegExp(`${ROOT_URL}$`);

           // If the root url is returned, that means that the user is not authenticated (possibly the
           // session is expired, so we redirect to the homepage and open the login modal
            if (pattern.test(res.request.responseURL)) {
              this.props.history.push(ROOT_URL);
              this.props.changeModalState(ADMIN_LOGIN_MODAL, true);
            }
            else if (res.status === 201) {
             this.close();
            }
           }
       );
        //////////////////////////////////////////
    };

    // This function is used in order to preserve the animation on closing the modal
    modalContent = (federation) => {
        const { handleSubmit, federations,modalState } = this.props;
        const { federationRulesUpdateError,federationRulesUpdateSuccessful } = federations;
        return(
            federation ?
                <Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title>Update federation rules of federation with id
                            <strong> {federation.id}</strong>?</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Modal.Body>


                             <FederationChangeRulesFormBody
                               federations={federations}
                               federation={federation}
                               isActive={true}
                              />

                        </Modal.Body>
                        <AlertDismissable alertStyle="success" message={federationRulesUpdateSuccessful}
                                          dismissHandler={this.dismissFederationRegistrationSuccessAlert} />
                        <AlertDismissable alertStyle="danger" message={federationRulesUpdateError}
                                          dismissHandler={this.dismissFederationChangeRulesErrorAlert} />
                        <Modal.Footer>
                            <Button type="submit" bsStyle="info">Submit</Button>
                            <Button type="button" bsStyle="default"
                                    onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Fragment> :
                null
        );
    };

    render() {
        const federationIdToChangeRules = this.props.changeFederationRulesModal.federationId;
        const modalOpen = !!federationIdToChangeRules;
        const { federations } = this.props;
        const { availableFederations } = federations;
        const federation = availableFederations ? availableFederations[federationIdToChangeRules] : null;
       // const smartContract = this.props.changeFederationRulesModal.federation.smartContract;
        console.log("ooooooooooooooooooooooooooo");
        console.log(federation);
        //console.log(smartContract);
        console.log("ooooooooooooooooooooooooooo");

        return(
            <Modal show={modalOpen} onHide={this.close}>
                {this.modalContent(federation)}
            </Modal>
        );
    }

}

function validate(values) {
    const errors = {};
    const validationFunctions = {
        "invitedPlatforms" : validatePlatformIds
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });
    return errors;
}


function validate(values) {
    const errors = {};
    const validationFunctions = {
        "changeRuleTypeId" : isNotEmpty,
        "changeDataAvailabilityId" : isNotEmpty,
        "changeServiceTypeId"  : isNotEmpty,
        "changeSupportedOntologiesId": isNotEmpty,
        "changeBoardGovId": validateValue,
        "changeproposalsId": validateValue,
        "changeTokensId": isNotEmpty,
        "changeapprovalPercentId" : validatePercent,
        "changevoteRulesBaseId" : isNotEmpty,
        "changeQosPercentageId" : validatePercent,
        "changereputationPercentId" : validatePercent,
        "changeMinValueFedId" : isNotEmpty,
        "changeUnderperformanceId" : isNotEmpty,
        "changeChargePolicyId" : isNotEmpty,
        "changeFedProductId" : isNotEmpty,
        "changeProfitPolicyId" : isNotEmpty,
        "changeCoinId": isNotEmpty,
        "changeBusinessEnablementId":validateQofEsWeights,
        "changeCompletenessId":validateQofEsWeights,
        "changeCorrectnessId":validateQofEsWeights,
        "changeEasyOfUseId":validateQofEsWeights,
        "changePrecisionId":validateQofEsWeights,
        "changeRelevanceId":validateQofEsWeights,
        "changeResponseTimeId":validateQofEsWeights,
        "changeValueForMoneyId":validateQofEsWeights,
        "changeQualityOfservicePercentageId":validatePercent,
        "changeQosPrecisionId":validateQofEsWeights,
        "changeQosAvailabilityId":validateQofEsWeights,
        "changeQosResponseTimeId":validateQofEsWeights


    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });
    return errors;
}

function mapStateToProps(state) {
    console.log("mapStateToProps");
    /////////////////// TO DO /////////////////////////////////
    ////Change federation to IoTFedsRules //////
    /////////////////////////////////////////////////////////


    console.log("----------- IoTFedsRules ----------------------");
    const IoTFedsRules = state.changeFederationRulesModal.federation;
    console.log(state.changeFederationRulesModal.federation);

   // console.log("----------- FedTypeRules ----------------------");
    //const FedTypeRules = state.changeFederationRulesModal.federation.FedTypeRules;
    //console.log(FedTypeRules);

    //console.log("----------- FedGov.BoardGov ----------------------");
    //const FedGov = state.changeFederationRulesModal.federation.FedGov.BoardGov;
   // console.log(FedGov);


    //console.log(state.changeFederationRulesModal.federation.FedTypeRules);

    const serv = state.changeFederationRulesModal.federationId;
    const federations = state.federations;
    const { availableFederations } = federations;
    console.log("==777777777777777777=====");
    console.log(state.changeFederationRulesModal.federation);
    console.log(state.changeFederationRulesModal.federationId);
    console.log(state.changeFederationRulesModal.fedTypeRules);
    console.log(state.changeFederationRulesModal.fedGovBoardGov);

    console.log("====77777777777777777=====");
    //console.log(availableFederations);
   // console.log(state.changeFederationRulesModal.federationId);
    const federation  = state.changeFederationRulesModal.federation;//availableFederations ? availableFederations[state.changeFederationRulesModal.federation.id] : null;
    //console.log("9999999999999999999");
   // console.log(federation);
    //const serviceType = federation.federation.smartContract.IoTFedsRules.FedTypeRules.ServiceType;

     ///////////////////////////////////////////////////////////////////////////////////////////////////////////
     //federationId,federation,fedTypeRules,fedGovBoardGov,fedGovProposals,fedGovVoteRules,fedGovVoteRulesTypes,qualityAssurance,qualityAssuranceMetrics,qualityAssuranceMetricsQuality,fedMarketplace}
     const  fedGovBoardGov        = state.changeFederationRulesModal.fedGovBoardGov;
     const  fedGovProposals       = state.changeFederationRulesModal.fedGovProposals;
     const  fedGovVoteRulesTokens = state.changeFederationRulesModal.fedGovVoteRules.Tokens;
     const  fedGovVoteRulesApprovalPercentage            = ''+ state.changeFederationRulesModal.fedGovVoteRulesTypes.ApprovalPercentage;

     const  fedGovVoteRulesApprovalBase                  = state.changeFederationRulesModal.fedGovVoteRulesTypes.Base;
     const  qualityAssuranceReputationPercentage         = state.changeFederationRulesModal.qualityAssuranceMetrics.ReputationPercentage;
     const  qualityAssuranceUnderPerformance             = state.changeFederationRulesModal.qualityAssuranceMetrics.Underperformance;
     const  qualityAssuranceMetricsQualityMinValueFed    = state.changeFederationRulesModal.qualityAssuranceMetricsQuality.MinValueFed;//.Quality;//.MinValueFed;//.MinValueFed;
     const  qualityAssuranceMetricsQosPercentage         = state.changeFederationRulesModal.qualityAssuranceMetrics.QoSPercentage;


     const businessEnablement                            = state.changeFederationRulesModal.QualityAssuranceMetricsQoEWeights.business_enablement;
     const completeness                                  = state.changeFederationRulesModal.QualityAssuranceMetricsQoEWeights.completeness;
     const correctness                                   = state.changeFederationRulesModal.QualityAssuranceMetricsQoEWeights.correctness;
     const easyOfUse                                     = state.changeFederationRulesModal.QualityAssuranceMetricsQoEWeights.ease_of_use;
     const precision                                     = state.changeFederationRulesModal.QualityAssuranceMetricsQoEWeights.precision;
     const relevance                                     = state.changeFederationRulesModal.QualityAssuranceMetricsQoEWeights.relevance;
     const responseTime                                  = state.changeFederationRulesModal.QualityAssuranceMetricsQoEWeights.response_time;
     const valueForMoney                                 = state.changeFederationRulesModal.QualityAssuranceMetricsQoEWeights.value_for_money;

     const availability                                  = state.changeFederationRulesModal.QualityAssuranceMetricsQoSWeights.availability;
     const qosPrecision                                  = state.changeFederationRulesModal.QualityAssuranceMetricsQoSWeights.precision;
     const qosResponseTime                               = state.changeFederationRulesModal.QualityAssuranceMetricsQoSWeights.response_time;

     //QualityAssuranceMetricsQoEWeights,QualityAssuranceMetricsQoSWeights
    // const businessEnablement                            = QoEWeights.business_enablement;

     //console.log("businessEnablement");
     //console.log(businessEnablement);

     const  fedMarketplaceChargePolicy                   = state.changeFederationRulesModal.fedMarketplace.ChargePolicy;
     const  fedMarketplaceFedProduct                     = state.changeFederationRulesModal.fedMarketplace.FedProduct;
     const  fedMarketplaceProfitPolicy                   = state.changeFederationRulesModal.fedMarketplace.ProfitPolicy;
     const  fedMarketplaceCoin                           = state.changeFederationRulesModal.fedMarketplace.Coin;
     const  fedTypeRulesType                             = state.changeFederationRulesModal.fedTypeRules.Type;
     const  fedTypeRulesDataAvailability                 = state.changeFederationRulesModal.fedTypeRules.DataAvailability;
     const  fedTypeRulesServiceType                      = state.changeFederationRulesModal.fedTypeRules.ServiceType;
     const  fedTypeRulesSupportedOntologies              = state.changeFederationRulesModal.fedTypeRules.SupportedOntologies;



     console.log("fedGovVoteRulesApprovalPercentage");
     console.log(fedGovVoteRulesApprovalPercentage);
     console.log("qualityAssuranceReputationPercentage");
     console.log(qualityAssuranceReputationPercentage);
     console.log("qualityAssuranceUnderPerformance");
     console.log(qualityAssuranceUnderPerformance);
     console.log("qualityAssuranceMetricsQualityMinValueFed");
     console.log(qualityAssuranceMetricsQualityMinValueFed);
     console.log("qualityAssuranceMetricsQosPercentage");
     console.log(qualityAssuranceMetricsQosPercentage);

     console.log("fedMarketplaceChargePolicy");
     console.log(fedMarketplaceChargePolicy);

     console.log("fedMarketplaceFedProduct");
     console.log(fedMarketplaceFedProduct);

     console.log("fedMarketplaceProfitPolicy");
     console.log(fedMarketplaceProfitPolicy);

     console.log("fedMarketplaceCoin");
     console.log(fedMarketplaceCoin);

     console.log("fedTypeRulesType");
     console.log(fedTypeRulesType);

     console.log("fedTypeRulesDataAvailability");
     console.log(fedTypeRulesDataAvailability);

     console.log("fedTypeRulesServiceType");
     console.log(fedTypeRulesServiceType);

     console.log("fedTypeRulesSupportedOntologies");
     console.log(fedTypeRulesSupportedOntologies);

     console.log("---- fedGovVoteRulesApprovalBase----");
     console.log(fedGovVoteRulesApprovalBase)

     console.log("state.changeFederationRulesModal.qualityAssuranceMetrics");
     console.log(state.changeFederationRulesModal.qualityAssuranceMetrics);








     //////////////////////////////////////////////////////////////////////////////////////////////////////////
   // if(federation === null){
  //   console.log("-----FEDERATION = null-----------------");
    // }else{
     //   if(federation.smartContract === undefined){
     //   }
      //  else{
        // console.log(federation);
         //console.log(federation.id);
        // console.log(federation.smartContract);
        // console.log(federation);
      // }
      //console.log(smartContract);
     //}
   // const federationFromState = availableFederations[state.changeFederationRulesModal.federationId];
    //const smartContract = federation.smartContract;
   // console.log(smartContract);
    //console.log(state);


    return {
        federations: state.federations,
        fed:state.changeFederationRulesModal.federation,
        //fed:federation,
        changeFederationRulesModal: state.changeFederationRulesModal,
        modalState: state.modalState,
        initialValues: {changeQualityOfservicePercentageId:qualityAssuranceMetricsQosPercentage,changeQosResponseTimeId:qosResponseTime,changeQosPrecisionId:qosPrecision,changeQosAvailabilityId:availability,changeValueForMoneyId:valueForMoney,changeResponseTimeId:responseTime,changeRelevanceId:relevance,changePrecisionId:precision,changeEasyOfUseId:easyOfUse,changeCorrectnessId:correctness,changeCompletenessId:completeness,changeBusinessEnablementId:businessEnablement,changeMinValueFedId : qualityAssuranceMetricsQualityMinValueFed,changeBoardGovId: fedGovBoardGov, changeproposalsId: fedGovProposals, changeRuleTypeId : fedTypeRulesType ,changeDataAvailabilityId : fedTypeRulesDataAvailability,changeServiceTypeId : fedTypeRulesServiceType,changeSupportedOntologiesId : fedTypeRulesSupportedOntologies,changeTokensId : fedGovVoteRulesTokens,changeapprovalPercentId : fedGovVoteRulesApprovalPercentage,changevoteRulesBaseId : fedGovVoteRulesApprovalBase,changeQosPercentageId : qualityAssuranceMetricsQosPercentage,changereputationPercentId : qualityAssuranceReputationPercentage,changeUnderperformanceId : qualityAssuranceUnderPerformance,changeChargePolicyId : fedMarketplaceChargePolicy,changeFedProductId : fedMarketplaceFedProduct,changeProfitPolicyId : fedMarketplaceProfitPolicy,changeCoinId : fedMarketplaceCoin}
        //add it again changeBusinessEnablementId:businessEnablement,
    };
}

/*export default reduxForm({
    form: 'FederationChangeRulesModalForm',
    validate
})(
    connect(mapStateToProps, {
        changeModalState,
        changeFederationRules,
        deactivateFederationChangeRulesModal,
        dismissAlert
    })(withRouter(FederationChangeRulesModal))
);*/

FederationChangeRulesModal = reduxForm({
    form: 'FederationChangeRulesModal',
    validate,
    enableReinitialize : true
})(FederationChangeRulesModal);

export default FederationChangeRulesModal = connect(mapStateToProps, {
    changeModalState,
    changeFederationRules,
    deactivateFederationChangeRulesModal,
    dismissAlert
})(withRouter(FederationChangeRulesModal));