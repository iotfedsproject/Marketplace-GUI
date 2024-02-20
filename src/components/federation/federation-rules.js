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
    validateName, validatePlatformIds, validateQoSConstraints
} from "../../validation/federation-registration-validation";
import { validateInformationModel } from "../../validation/platform-registration-validation";
import { isNotEmpty, validateId } from "../../validation/helpers";
import {renderInputField} from "../../helpers/render-input";

import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";
import Select from "react-select";

import {
    changeModalState, dismissAlert, removeErrors,
    DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT, DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT,
    REMOVE_FEDERATION_REGISTRATION_ERRORS
} from "../../actions/index";
import { ROOT_URL } from "../../configuration";
import { Federation, FederationMember, InformationModel } from "../../helpers/object-definitions";

import { RULE_TYPES,DATA_AVAILABILITY,SERVICE_TYPES,SUPPORTED_ONTOLOGIES,BOARD_GOV,PROPOSALS,APPROVAL_PERCENT,VOTE_RULES_BASE,UNDER_PERFORMANCE,CHARGE_POLICY,FED_PRODUCT,PROFIT_POLICY,COIN   } from "../../configuration/index";


class FederationRules extends Component {
    constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);

 };

 onSubmit = (props) => {

 };

 render() {
      console.log("------------------------");
      console.log(this.props);
      console.log("------------------------");
      console.log()
      const { handleSubmit,federation,federationsRegistrationValidity,title,readValuesFromBackend,ioTFedsRules,readOnly } = this.props;
      //console.log(federation.SmartContract.IoTFedsRules.FedTypeRules.DataAvailability);
     // console.log("-----");
      {/*const { handleSubmit, modalState, federation, federationsRegistrationValidity } = this.props;*/}
      const opts = { disabled : !federationsRegistrationValidity };
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

         {/* TODO  Add values to Field eg value = federation.id, federation.ruleType ...the values received from backend */}

         return(       <Fragment>
                          <form>
                          {/*<h4><strong> Update Federation Rules {federation.name}</strong></h4>*/}
                          <h4><strong>{title}</strong></h4>
                           <div className="qos-constraint">
                           <h3><strong>Federation rule types</strong></h3>
                             <Row>
                              <Col lg={6} md={6} sm={6} xs={6}>
                                <FormGroup controlId="RuleTypeId" style={{zIndex: "5"}}>
                                  <ControlLabel>Rule Type</ControlLabel>
                                  {readOnly ?
                                    <FormControl
                                      value={federation.smartContract.IoTFedsRules.FedTypeRules.Type}
                                      disabled={true} />
                                    :
                                    <Field
                                       name="RuleTypeId"
                                       label="Rule Type" placeholder="Select the type of rules"
                                       options={RULE_TYPES}
                                       component={RFReactSelect}

                                     />
                                     }
                                  {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                  {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                              </Col>

                              <Col lg={6} md={6} sm={6} xs={6}>
                                 <FormGroup controlId="DataAvailabilityId" style={{zIndex: "5"}}>
                                    <ControlLabel>Data Availability</ControlLabel>
                                    {readOnly ?
                                      <FormControl
                                      value={federation.smartContract.IoTFedsRules.FedTypeRules.DataAvailability}
                                      disabled={true} />
                                      :
                                     <Field
                                       name="DataAvailabilityId"
                                       label="Data Availability" placeholder="Select the data availability"
                                       options={DATA_AVAILABILITY}
                                       component={RFReactSelect}
                                      />
                                    }
                                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                               </Col>
                              </Row>

                              <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                  <FormGroup controlId="ServiceTypeId" style={{zIndex: "5"}}>
                                    {readOnly ? <ControlLabel>Service Type</ControlLabel>:""}
                                    {readOnly ?
                                    <FormControl
                                     value={federation.smartContract.IoTFedsRules.FedTypeRules.ServiceType}
                                     disabled={true}
                                     />
                                    :
                                    <Field
                                      name="ServiceTypeId"
                                      label="Service Type" placeholder="Insert the type of service"
                                      //{/*options={SERVICE_TYPES}*/}
                                      component={renderInputField}
                                    />
                                   }
                                   {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                   {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                                   </Col>

                                  <Col lg={6} md={6} sm={6} xs={6}>
                                   <FormGroup controlId="SupportedOntologiesId" style={{zIndex: "5"}}>
                                     {readOnly ? <ControlLabel>Supported Ontologies</ControlLabel>:""}

                                     {readOnly ?
                                      <FormControl
                                       value={federation.smartContract.IoTFedsRules.FedTypeRules.SupportedOntologies}
                                       disabled={true}
                                       />
                                      :
                                        <Field
                                           name="SupportedOntologiesId"
                                           label="Supported  Ontologies" placeholder="Insert the  ontology"
                                           //{/*options={SUPPORTED_ONTOLOGIES}*/}
                                           component={renderInputField}
                                       />
                                       }
                                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                 </FormGroup>
                                  </Col>

                                 </Row>
                                </div>

                                <div className="qos-constraint">
                                <h3><strong>Federation government rules </strong></h3>
                                 <Row>
                                  {/*<Col lg={6} md={6} sm={6} xs={6}>*/}
                                  <Col lg={12} md={12} sm={12} xs={12}>
                                   <FormGroup controlId="BoardGovId" style={{zIndex: "5"}}>
                                    {readOnly ? <ControlLabel>Board Gov</ControlLabel>:""}
                                      {readOnly ?
                                      <FormControl
                                       value={federation.smartContract.IoTFedsRules.FedGov.BoardGov}
                                       disabled={true}
                                       />
                                      :
                                      <Field
                                       name="BoardGovId"
                                       label="Board Gov" placeholder="Insert the boardgov"
                                       //{/*options={BOARD_GOV}*/}
                                       component={renderInputField}
                                      />
                                      }
                                  {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                  {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                               </Col>
                               </Row>
                               <Row>
                               {/*<Col lg={6} md={6} sm={6} xs={6}>*/}
                                 <Col lg={12} md={12} sm={12} xs={12}>
                                  <FormGroup controlId="proposalsId" style={{zIndex: "5"}}>
                                   {readOnly ? <ControlLabel>Proposals</ControlLabel>:""}
                                     {readOnly ?
                                     <FormControl
                                     componentClass="textarea"
                                     value={federation.smartContract.IoTFedsRules.FedGov.Proposals}
                                     disabled={true}
                                    />
                                     :
                                     <Field
                                       name="proposalsId"
                                       label="Proposals" placeholder="Insert the supported proposal"
                                      // {/*options={PROPOSALS}*/}
                                       component={renderInputField}
                                  />
                                  }
                                {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                               </FormGroup>
                               </Col>

                               </Row>

                               <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                 <FormGroup controlId="TokensId" style={{zIndex: "5"}}>
                                  {readOnly ? <ControlLabel>Tokens</ControlLabel>:""}
                                    {readOnly ?
                                      <FormControl
                                       value={federation.smartContract.IoTFedsRules.FedGov.VoteRules.Tokens}
                                       disabled={true}
                                       />
                                      :
                                  <Field
                                   label = "Tokens" name="TokensId" type="text"
                                   placeholder="Insert the token"
                                   component={renderInputField}
                                 />
                                 }
                                {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                               </FormGroup>
                              </Col>

                              <Col lg={6} md={6} sm={6} xs={6}>
                               <FormGroup controlId="approvalPercentId" style={{zIndex: "5"}}>
                                 <ControlLabel>Vote Rules Approval %</ControlLabel>
                                    {readOnly ?
                                      <FormControl
                                       value={federation.smartContract.IoTFedsRules.FedGov.VoteRules.Type.ApprovalPercentage}
                                       disabled={true}
                                       />
                                      :
                                  <Field
                                    name="approvalPercentId"
                                    placeholder="Select the approval percent"
                                    options={APPROVAL_PERCENT}
                                    component={RFReactSelect}
                                  />
                                  }
                               {/* <HelpBlock>Mandatory</HelpBlock>*/}
                               {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}

                               </FormGroup>
                                  </Col>
                               </Row>

                               <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                 <FormGroup controlId="voteRulesBaseId" style={{zIndex: "5"}}>
                                 <ControlLabel>Vote Rules Base</ControlLabel>
                                  {readOnly ?
                                   <FormControl
                                    value={federation.smartContract.IoTFedsRules.FedGov.VoteRules.Type.Base}
                                    disabled={true}
                                   />
                                  :
                                  <Field
                                    name="voteRulesBaseId"
                                    label="voteRulesBase" placeholder="Select the vote rules base"
                                    options={VOTE_RULES_BASE}
                                    component={RFReactSelect}
                                  />
                                  }
                                  {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                  {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                 </FormGroup>
                                 </Col>
                                </Row>
                              </div>

                             <div className="qos-constraint">
                              <h3><strong>Quality assurance</strong></h3>
                           <Row>
                          <Col lg={6} md={6} sm={6} xs={6}>
                            <FormGroup controlId="QosPercentage" style={{zIndex: "5"}}>
                              {readOnly ? <ControlLabel>Qos %</ControlLabel>:""}
                               {readOnly ?
                                 <FormControl
                                  value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QosPercentage}
                                  disabled={true}
                               />
                               :
                               <Field
                                 name="QosPercentageId" type="text"
                                 label= "Qos %" placeholder="Insert the qos %"
                                 component={renderInputField}
                               />
                               }
                            {/* <HelpBlock>Mandatory</HelpBlock>*/}
                            {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                        </FormGroup>
                        </Col>

                        <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="reputationPercentId" style={{zIndex: "5"}}>
                            {readOnly ? <ControlLabel>Reputation %</ControlLabel>:""}
                             {readOnly ?
                              <FormControl
                               value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.ReputationPercentage}
                               disabled={true}
                              />
                            :
                          <Field
                            name="reputationPercentId"
                            label = "Reputation %" placeholder="Insert the reputation %"
                            component={renderInputField}
                          />
                          }
                      {/* <HelpBlock>Mandatory</HelpBlock>*/}
                      {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="MinValueFedId" style={{zIndex: "5"}}>
                        {readOnly ? <ControlLabel>Min Number of Federations</ControlLabel>:""}
                         {readOnly ?
                          <FormControl
                           value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.Quality.MinValueFed}
                           disabled={true}
                         />
                        :
                       <Field
                        name="MinValueFedId"
                        label = "Min Number of Federations" name="MinValueFedId" type="text"
                        placeholder="Insert the minimum value fed"
                        component={renderInputField}
                     />
                     }
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                       </Col>

                        <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="UnderperformanceId" style={{zIndex: "5"}}>
                            <ControlLabel>Under Performance</ControlLabel>
                            {readOnly ?
                             <FormControl
                              value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.UnderPerformance}
                              disabled={true}
                             />
                             :
                             <Field
                              name="UnderperformanceId"
                              label="Under Performance" placeholder="Select the Under performance value"
                              options={UNDER_PERFORMANCE}
                              component={RFReactSelect}
                             />
                             }
                             {/* <HelpBlock>Mandatory</HelpBlock>*/}
                             {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                          </FormGroup>
                         </Col>
                        </Row>
                        </div>
                        {/*/////////////////////////////////////////////////// */}
                        <div className="qos-constraint">
                          <h3><strong>Quality of Experience Weights</strong></h3>
                          <Row>
                          <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="businessEnablementId" style={{zIndex: "5"}}>
                            {readOnly ? <ControlLabel>Business Enablement</ControlLabel>:""}
                             {readOnly ?
                              <FormControl
                               value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoEWeights.business_enablement}
                               disabled={true}
                              />
                            :
                          <Field
                            name="businessEnablementId"
                            label = "Business Enablement" placeholder="Insert the bussiness Enabled value"
                            component={renderInputField}
                          />
                          }
                      {/* <HelpBlock>Mandatory</HelpBlock>*/}
                      {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="CompletenessId" style={{zIndex: "5"}}>
                        {readOnly ? <ControlLabel>Completeness</ControlLabel>:""}
                         {readOnly ?
                          <FormControl
                           value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoEWeights.completeness}
                           disabled={true}
                         />
                        :
                       <Field
                        name="CompletenessId"
                        label = "Completeness"  type="text"
                        placeholder="Insert the Completeness value"
                        component={renderInputField}
                     />
                     }
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                    </Col>
               </Row>
                   <Row>
                          <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="CorrectnessId" style={{zIndex: "5"}}>
                            {readOnly ? <ControlLabel>Correctness</ControlLabel>:""}
                             {readOnly ?
                              <FormControl
                               value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoEWeights.correctness}
                               disabled={true}
                              />
                            :
                          <Field
                            name="CorrectnessId"
                            label = "Correctness" placeholder="Insert the Correctness value"
                            component={renderInputField}
                          />
                          }
                      {/* <HelpBlock>Mandatory</HelpBlock>*/}
                      {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="EasyOfUseId" style={{zIndex: "5"}}>
                        {readOnly ? <ControlLabel>Ease Of Use</ControlLabel>:""}
                         {readOnly ?
                          <FormControl
                           value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoEWeights.ease_of_use}
                           disabled={true}
                         />
                        :
                       <Field
                        name="EasyOfUseId"
                        label = "Ease of Use"  type="text"
                        placeholder="Insert the Ease of Use value"
                        component={renderInputField}
                     />
                     }
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                    </Col>
               </Row>
              <Row>
                          <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="PrecisionId" style={{zIndex: "5"}}>
                            {readOnly ? <ControlLabel>Precision</ControlLabel>:""}
                             {readOnly ?
                              <FormControl
                               value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoEWeights.precision}
                               disabled={true}
                              />
                            :
                          <Field
                            name="PrecisionId"
                            label = "Precision" placeholder="Insert the Precision value"
                            component={renderInputField}
                          />
                          }
                      {/* <HelpBlock>Mandatory</HelpBlock>*/}
                      {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="RelevanceId" style={{zIndex: "5"}}>
                        {readOnly ? <ControlLabel>Relevance</ControlLabel>:""}
                         {readOnly ?
                          <FormControl
                           value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoEWeights.relevance}
                           disabled={true}
                         />
                        :
                       <Field
                        name="RelevanceId"
                        label = "Relevance"  type="text"
                        placeholder="Insert the Relevance value"
                        component={renderInputField}
                     />
                     }
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                    </Col>
                  </Row>
                    <Row>
                          <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="ResponseTimeId" style={{zIndex: "5"}}>
                            {readOnly ? <ControlLabel>Response Time</ControlLabel>:""}
                             {readOnly ?
                              <FormControl
                               value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoEWeights.response_time}
                               disabled={true}
                              />
                            :
                          <Field
                            name="ResponseTimeId"
                            label = "Response Time" placeholder="Insert the ResponseTime value"
                            component={renderInputField}
                          />
                          }
                      {/* <HelpBlock>Mandatory</HelpBlock>*/}
                      {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="ValueForMoneyId" style={{zIndex: "5"}}>
                        {readOnly ? <ControlLabel>Value For Money</ControlLabel>:""}
                         {readOnly ?
                          <FormControl
                           value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoEWeights.value_for_money}
                           disabled={true}
                         />
                        :
                       <Field
                        name="ValueForMoneyId"
                        label = "Value For Money"  type="text"
                        placeholder="Insert the Value For Money value"
                        component={renderInputField}
                     />
                     }
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                    </Col>
                   </Row>

                   </div>
                  <div className="qos-constraint">
                    <h3><strong>Quality of Service Weights</strong></h3>

                  <Row>
                          <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="QualityOfservicePercentageId" style={{zIndex: "5"}}>
                            {readOnly ? <ControlLabel>Quality Of Service %</ControlLabel>:""}
                             {readOnly ?
                              <FormControl
                               value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoSPercentage}
                               disabled={true}
                              />
                            :
                          <Field
                            name="QualityOfservicePercentageId"
                            label = "Quality Of Service %" placeholder="Insert the Quality Of Service % value"
                            component={renderInputField}
                          />
                          }
                      {/* <HelpBlock>Mandatory</HelpBlock>*/}
                      {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="QosAvailabilityId" style={{zIndex: "5"}}>
                        {readOnly ? <ControlLabel>Qos Availability</ControlLabel>:""}
                         {readOnly ?
                          <FormControl
                           value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoSWeights.availability}
                           disabled={true}
                         />
                        :
                       <Field
                        name="QosAvailabilityId"
                        label = "Qos Availability"  type="text"
                        placeholder="Insert the Qos Availability value"
                        component={renderInputField}
                     />
                     }
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                    </Col>
                   </Row>
                     <Row>
                          <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="QosPrecisionId" style={{zIndex: "5"}}>
                            {readOnly ? <ControlLabel>Qos Precision</ControlLabel>:""}
                             {readOnly ?
                              <FormControl
                               value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoSWeights.precision}
                               disabled={true}
                              />
                            :
                          <Field
                            name="QosPrecisionId"
                            label = "Qos Precision" placeholder="Insert the Qos Precision value"
                            component={renderInputField}
                          />
                          }
                      {/* <HelpBlock>Mandatory</HelpBlock>*/}
                      {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="QosResponseTimeId" style={{zIndex: "5"}}>
                        {readOnly ? <ControlLabel>Qos Response Time</ControlLabel>:""}
                         {readOnly ?
                          <FormControl
                           value={federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoSWeights.response_time}
                           disabled={true}
                         />
                        :
                       <Field
                        name="QosResponseTimeId"
                        label = "Qos Response Time"  type="text"
                        placeholder="Insert the Qos Response Time value"
                        component={renderInputField}
                     />
                     }
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                    </Col>
                   </Row>
                  </div>


                        {/*/////////////////////////////////////////////////////*/}
                         <div className="qos-constraint">
                           <h3><strong>Marketplace policy</strong></h3>
                           <Row>
                            <Col lg={6} md={6} sm={6} xs={6}>
                              <FormGroup controlId="ChargePolicy" style={{zIndex: "5"}}>
                                <ControlLabel>Charge Policy</ControlLabel>
                                  {readOnly ?
                                     <FormControl
                                      value={federation.smartContract.IoTFedsRules.FedMarketplace.ChargePolicy}
                                      disabled={true}
                                      />
                                     :
                                 <Field
                                   name="ChargePolicyId"
                                   label="ChargePolicy" placeholder="Select the Charge Policy"
                                   options={CHARGE_POLICY}
                                   component={RFReactSelect}
                                 />
                                 }
                             {/* <HelpBlock>Mandatory</HelpBlock>*/}
                             {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                       </FormGroup>
                      </Col>
                       <Col lg={6} md={6} sm={6} xs={6}>
                        <FormGroup controlId="FedProductId" style={{zIndex: "5"}}>
                           <ControlLabel>Federation Product</ControlLabel>
                            {readOnly ?
                              <FormControl
                               value={federation.smartContract.IoTFedsRules.FedMarketplace.FedProduct}
                               disabled={true}
                              />
                            :
                            <Field
                             name="FedProductId"
                             label="Federation Product" placeholder="Select the supported Federation Product"
                             options={FED_PRODUCT}
                             component={RFReactSelect}
                           />
                           }
                         {/* <HelpBlock>Mandatory</HelpBlock>*/}
                         {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                   </Col>

               </Row>

               <Row>
                 <Col lg={6} md={6} sm={6} xs={6}>
                   <FormGroup controlId="ProfitPolicyId" style={{zIndex: "5"}}>
                    <ControlLabel>Profit Policy</ControlLabel>
                      {readOnly ?
                        <FormControl
                         value={federation.smartContract.IoTFedsRules.FedMarketplace.ProfitPolicy}
                         disabled={true}
                        />
                        :
                       <Field
                         name="ProfitPolicyId"
                         label="Profit Policy" placeholder="Select the supported Profit Policy"
                         options={PROFIT_POLICY}
                         component={RFReactSelect}
                      />
                      }
                       {/* <HelpBlock>Mandatory</HelpBlock>*/}
                       {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                  </Col>

                 <Col lg={6} md={6} sm={6} xs={6}>
                   <FormGroup controlId="CoinId" style={{zIndex: "5"}}>
                     <ControlLabel>Coin</ControlLabel>
                     {readOnly ?
                        <FormControl
                         value={federation.smartContract.IoTFedsRules.FedMarketplace.Coin}
                         disabled={true}
                        />
                      :
                      <Field
                       name="CoinId"
                       label="Coin" placeholder="Select the supported Coin"
                       options={COIN}
                       component={RFReactSelect}
                      />
                    }
                     {/* <HelpBlock>Mandatory</HelpBlock>*/}
                     {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}

                  </FormGroup>
                </Col>
              </Row>


           </div>
            {/*//////////////////////////////////////////////////////*/}

            {/*///////////////////////////////////////////////////////*/}
             {readOnly?
               <h1></h1>
              :
             <Modal.Footer>
               <Button type="submit" bsStyle="info" { ...opts }>Submit changes</Button>
             </Modal.Footer>
             }
            </form>
           </Fragment>


             );

             }


             }


FederationRules = reduxForm({
    form: 'FederationRules'
  //  {/*validate*/}
})(FederationRules);

/*
export default FederationRegistrationModal = connect(mapStateToProps, {
    changeModalState,
    registerFederation,
    dismissAlert,
    removeErrors
})(withRouter(FederationRegistrationModal));
*/

export default FederationRules;