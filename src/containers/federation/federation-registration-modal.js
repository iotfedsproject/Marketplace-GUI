import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { reduxForm ,Field, FieldArray } from "redux-form";
import { Modal, Button,Row, Col,FormGroup,FormControl, HelpBlock,FieldError,ControlLabel } from "react-bootstrap";
import _ from "lodash";
import { ADMIN_LOGIN_MODAL, FEDERATION_REGISTRATION_MODAL } from "../../reducers/modal/modal-reducer";
import { getFederationRegistrationValidity } from "../../selectors";
import { AlertDismissable } from "../../helpers/errors";
import FederationFormBody from "../../components/federation/federation-form-body";
import { registerFederation } from "../../actions/federation-actions";
import {
    validateName, validatePlatformIds, validateQoSConstraints,validateQofEsWeights,validatePercent
} from "../../validation/federation-registration-validation";
import { validateInformationModel } from "../../validation/platform-registration-validation";
import { isNotEmpty, validateId } from "../../validation/helpers";
import {renderInputField} from "../../helpers/render-input";

import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";

import {
    changeModalState, dismissAlert, removeErrors,
    DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT, DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT,
    REMOVE_FEDERATION_REGISTRATION_ERRORS
} from "../../actions/index";
import { ROOT_URL } from "../../configuration";
import { Federation, FederationMember, InformationModel,Quality,Metrics,FedTypeRules,FedMarketplace,Type,VoteRules,Proposals,BoardGov,FedGov,IoTFedsRules,SmartContract,QualityExpWeights,QualityOfServicesWeights,QualityAssuranceMetrics } from "../../helpers/object-definitions";

import { RULE_TYPES,DATA_AVAILABILITY,SERVICE_TYPES,SUPPORTED_ONTOLOGIES,BOARD_GOV,PROPOSALS,APPROVAL_PERCENT,VOTE_RULES_BASE,UNDER_PERFORMANCE,CHARGE_POLICY,FED_PRODUCT,PROFIT_POLICY,COIN   } from "../../configuration/index";


class FederationRegistrationModal extends Component {

    constructor() {
        super();

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.dismissFederationRegistrationSuccessAlert = this.dismissFederationRegistrationSuccessAlert.bind(this);
        this.dismissFederationRegistrationErrorAlert = this.dismissFederationRegistrationErrorAlert.bind(this);
    }

    open() {
        this.props.changeModalState(FEDERATION_REGISTRATION_MODAL, true);
    }

    close() {
        this.props.changeModalState(FEDERATION_REGISTRATION_MODAL, false);
        this.props.reset();
        this.props.removeErrors(REMOVE_FEDERATION_REGISTRATION_ERRORS);
    }




    onSubmit = (props) => {
        const { id, name, informationModel, members, slaConstraints,regRuleTypeId} = props;
        const isPublic  = props.public;
        const infoModel = informationModel ? new InformationModel(informationModel, null, null, null, null, null) : null;

        /////////////////////////////////////////////////
        const federationMembers = members.map(
            // If there is no platformId in member and just put empty string
            member => member.platformId
        );
        //member   => new FederationMember(member.platformId ? member.platformId : "", null)

        ///////////////////////////////////////////// Smart Contract objects ///////////////////////////////////
        const bgovMembers = props.regBoardGovId.map(
         bgovMember => new BoardGov(bgovMember ? bgovMember : "", null)
        );


        const quality = new Quality(props.regMinValueFedId);
        const metrics = new Metrics(props.regQosPercentageId,quality);
        //const qualityAssurance = new QualityAssurance(metrics, props.regreputationPercentId ,props.regUnderperformanceId);
        const type             = new Type(props.regapprovalPercentId,props.regvoteRulesBaseId);
        const voteRules        = new VoteRules(props.regTokensId,type);
        const fedMarketplace   = new FedMarketplace(props.regChargePolicyId,props.regCoinId,props.regFedProductId,props.regProfitPolicyId);
        const fedTypeRules     = new FedTypeRules(props.regDataAvailabilityId,props.regServiceTypeId,props.regSupportedOntologiesId,props.regRuleTypeId);
        //const boardGov         = new BoardGov(props.regBoardGovId);// regTest);//TODO add again regBoardGovId)///must be array of users
        //const proposals        = new Proposals(props.regproposalsId);//must be array
        //const fedGov           = new FedGov(boardGov,proposals,voteRules);
        //const fedGov           = new FedGov(props.regTest,proposals,voteRules);
        //
        //const fedGov           = new FedGov(props.regBoardGovId,proposals,voteRules);

        const qualityExpWeights = new QualityExpWeights(props.regBusinessEnablementId,props.regCompletenessId,
                                                       props.regCorrectnessId,props.regEasyOfUseId,props.regPrecisionId,
                                                       props.regRelevanceId,props.regResponseTimeId,props.regValueForMoneyId);

        const qualityOfServicesWeights = new QualityOfServicesWeights(props.regQosAvailabilityId,props.regQosPrecisionId,props.regQosResponseTimeId);
        const qualityAssuranceMetrics  = new QualityAssuranceMetrics(qualityExpWeights,props.regQosPercentageId,qualityOfServicesWeights,quality,props.regreputationPercentId ,props.regUnderperformanceId);

        const fedGov                   = new FedGov(props.regBoardGovId,props.regproposalsId,voteRules);
        const ioTFedsRules             = new IoTFedsRules(fedGov,fedMarketplace,fedTypeRules,qualityAssuranceMetrics);
        const smartContract            = new SmartContract(ioTFedsRules);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////

        const federation = new Federation(id, name, isPublic, infoModel, slaConstraints, federationMembers,smartContract);
        console.log(props.regRuleTypeId)
        console.log(props.regCoinId)
        console.log(props.members)
        console.log(props.regBoardGovId)
        this.props.registerFederation(
            federation,
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
    };

    dismissFederationRegistrationSuccessAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT)
    }

    dismissFederationRegistrationErrorAlert() {
        this.props.dismissAlert(DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT)
    }

    informationModels = () => {
        return _.map(this.props.informationModels.availableInfoModels, (model) => {
            return({ value: model.id, label: model.name});
        });
    };



    render() {
        const { handleSubmit, modalState, federations, federationsRegistrationValidity } = this.props;
        const opts = { disabled : !federationsRegistrationValidity };


        return(
            <Fragment>

                <Button
                    className="registration-btn"
                    bsStyle="info"
                    onClick={this.open.bind(this)}>
                    Register New Federation
                </Button>

                <AlertDismissable alertStyle="success" message={federations.successfulFederationRegistration}
                                  dismissHandler={this.dismissFederationRegistrationSuccessAlert} />

                <Modal show={modalState[FEDERATION_REGISTRATION_MODAL]} onHide={this.close}  >
                    <Modal.Header closeButton>
                        <Modal.Title>Federation Registration</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Modal.Body>
                            <AlertDismissable alertStyle="danger" message={federations.federationRegistrationError}
                                              dismissHandler={this.dismissFederationRegistrationErrorAlert} />

                           <FederationFormBody
                               federations={federations}
                               informationModels={this.informationModels()}
                               isActive={!!modalState[FEDERATION_REGISTRATION_MODAL]}
                           />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="info" { ...opts }>Submit</Button>
                            <Button type="button" bsStyle="default" onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </Fragment>
        );
    }

}

function validate(values) {
    const errors = {};
    const validationFunctions = {
        "id" : validateId,
        "name" : validateName,
        "public" : isNotEmpty,
        "members" : validatePlatformIds,
        "slaConstraints" : validateQoSConstraints,
        "regRuleTypeId" : isNotEmpty,
        "regDataAvailabilityId" : isNotEmpty,
        "regServiceTypeId"  : isNotEmpty,
        "regSupportedOntologiesId": isNotEmpty,
        "regBoardGovId": isNotEmpty,
        "regproposalsId": isNotEmpty,
        "regTokensId": isNotEmpty,
        "regapprovalPercentId" : validatePercent,
        "regvoteRulesBaseId" : isNotEmpty,
        "regQosPercentageId" : validatePercent,
        "regreputationPercentId" : validatePercent,
        "regMinValueFedId" : isNotEmpty,
        "regUnderperformanceId" : isNotEmpty,
        "regChargePolicyId" : isNotEmpty,
        "regFedProductId" : isNotEmpty,
        "regProfitPolicyId" : isNotEmpty,
        "regCoinId": isNotEmpty,
        "regBusinessEnablementId":validateQofEsWeights,
        "regCompletenessId":validateQofEsWeights,
        "regCorrectnessId":validateQofEsWeights,
        "regEasyOfUseId":validateQofEsWeights,
        "regPrecisionId":validateQofEsWeights,
        "regRelevanceId":validateQofEsWeights,
        "regResponseTimeId":validateQofEsWeights,
        "regValueForMoneyId":validateQofEsWeights,
        "regQualityOfservicePercentageId":validatePercent,
        "regQosPrecisionId":validateQofEsWeights,
        "regQosAvailabilityId":validateQofEsWeights,
        "regQosResponseTimeId":validateQofEsWeights


    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });
    return errors;
}

function mapStateToProps(state) {
    return {
        modalState: state.modalState,
        userPlatforms: state.userPlatforms,
        informationModels: state.informationModels,
        federations: state.federations,
        federationsRegistrationValidity: getFederationRegistrationValidity(state),
        //initialValues: {regBoardGovId: [""], regproposalsId: [""], regTest: [""], public : "true" ,regRuleTypeId : "Providers" ,regDataAvailabilityId : "Closed",regServiceTypeId : "environment",regSupportedOntologiesId : "environment",regTokensId : "50",regapprovalPercentId : "75",regvoteRulesBaseId : "Board",regQosPercentageId : "50",regreputationPercentId : "75",regMinValueFedId : "2",regUnderperformanceId : "None",regChargePolicyId : "Free",regFedProductId : "Packaging",regProfitPolicyId : "PerSource",regCoinId : "Euro"}
        initialValues: { regBoardGovId: [""], regproposalsId: [""],public : "true" }
    };
}

FederationRegistrationModal = reduxForm({
    form: 'FederationRegistrationForm',
    validate
})(FederationRegistrationModal);

export default FederationRegistrationModal = connect(mapStateToProps, {
    changeModalState,
    registerFederation,
    dismissAlert,
    removeErrors
})(withRouter(FederationRegistrationModal));