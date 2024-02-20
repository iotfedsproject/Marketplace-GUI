import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { reduxForm ,Field, FieldArray } from "redux-form";
import { Modal, Button,Row, Col,FormGroup,FormControl, HelpBlock,FieldError,ControlLabel } from "react-bootstrap";

import _ from "lodash";
import { ADMIN_LOGIN_MODAL, FEDERATION_REGISTRATION_MODAL } from "../../reducers/modal/modal-reducer";
//import { getFederationRegistrationValidity } from "../../selectors";
//import { AlertDismissable } from "../../helpers/errors";
//import FederationFormBody from "../../components/federation/federation-form-body";
//import { registerFederation } from "../../actions/federation-actions";
//import {
 //   validateName, validatePlatformIds, validateQoSConstraints
//} from "../../validation/federation-registration-validation";
//import { validateInformationModel } from "../../validation/platform-registration-validation";
//import { isNotEmpty, validateId } from "../../validation/helpers";
import {renderInputField} from "../../helpers/render-input";

import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";

//import {
  //  changeModalState, dismissAlert, removeErrors,
    //DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT, DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT,
    //REMOVE_FEDERATION_REGISTRATION_ERRORS
//} from "../../actions/index";
import { ROOT_URL } from "../../configuration";
//import { Federation, FederationMember, InformationModel } from "../../helpers/object-definitions";

import { RULE_TYPES,DATA_AVAILABILITY,SERVICE_TYPES,SUPPORTED_ONTOLOGIES,BOARD_GOV,PROPOSALS,APPROVAL_PERCENT,VOTE_RULES_BASE,UNDER_PERFORMANCE,CHARGE_POLICY,FED_PRODUCT,PROFIT_POLICY,COIN   } from "../../configuration/index";
import Select from "react-select";

const FederationRules = () => {

         return(
          <Fragment>

                           <div className="qos-constraint">
                             <Row>
                              <Col lg={6} md={6} sm={6} xs={6}>
                                <FormGroup controlId="RuleTypeId" style={{zIndex: "5"}}>
                                  <ControlLabel>Rule Type</ControlLabel>
                                    <Select
                                       name="RuleTypeId"
                                       label="Rule Type" placeholder="Select the type of rules"
                                       options={RULE_TYPES}
                                       component={RFReactSelect}
                                     />
                                  {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                  {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                              </Col>

                              <Col lg={6} md={6} sm={6} xs={6}>
                                 <FormGroup controlId="DataAvailabilityId" style={{zIndex: "5"}}>
                                    <ControlLabel>Data Availability</ControlLabel>
                                      <Select
                                       name="DataAvailabilityId"
                                       label="Data Availability" placeholder="Select the data availability"
                                       options={DATA_AVAILABILITY}
                                       component={RFReactSelect}
                                       />
                                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                               </Col>
                              </Row>

                              <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                  <FormGroup controlId="ServiceTypeId" style={{zIndex: "5"}}>
                                    <ControlLabel>Service Type</ControlLabel>
                                      <Select
                                         name="ServiceTypeId"
                                         label="Service Type" placeholder="Select the type of service"
                                         options={SERVICE_TYPES}
                                         component={RFReactSelect}
                                       />
                                   {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                   {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                                   </Col>

                                  <Col lg={6} md={6} sm={6} xs={6}>
                                   <FormGroup controlId="SupportedOntologiesId" style={{zIndex: "5"}}>
                                     <ControlLabel>Supported Ontologies</ControlLabel>
                                        <Select
                                           name="SupportedOntologiesId"
                                           label="Supported  Ontologies" placeholder="Select the supported ontology"
                                           options={SUPPORTED_ONTOLOGIES}
                                           component={RFReactSelect}
                                       />
                                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                 </FormGroup>
                                  </Col>

                                 </Row>
                                </div>
                                <div className="qos-constraint">
                                 <Row>
                                  <Col lg={6} md={6} sm={6} xs={6}>
                                   <FormGroup controlId="BoardGovId" style={{zIndex: "5"}}>
                                     <ControlLabel>Board Gov</ControlLabel>
                                      <Select
                                       name="BoardGovId"
                                       label="Board Gov" placeholder="Select the boardgov"
                                       options={BOARD_GOV}
                                       component={RFReactSelect}
                                      />
                                  {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                  {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                               </Col>

                               <Col lg={6} md={6} sm={6} xs={6}>
                                  <FormGroup controlId="proposalsId" style={{zIndex: "5"}}>
                                    <ControlLabel>Proposals</ControlLabel>
                                     <Select
                                       name="proposalsId"
                                       label="Proposals" placeholder="Select the supported proposal"
                                       options={PROPOSALS}
                                       component={RFReactSelect}
                                  />
                                {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                               </FormGroup>
                               </Col>

                               </Row>

                               <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                {/* <FormGroup controlId="TokensId" style={{zIndex: "5"}}>*/}
                                 <ControlLabel>Threshold</ControlLabel>
                                                                 <FormControl
                                                                     value={0}
                                                                     disabled={true}
                                                                 />
                                {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                              {/* </FormGroup>*/}
                              </Col>

                              <Col lg={6} md={6} sm={6} xs={6}>
                               <FormGroup controlId="approvalPercentId" style={{zIndex: "5"}}>
                                 <ControlLabel>Vote Rules Approval %</ControlLabel>
                                  <Select
                                    name="approvalPercentId"
                                    label="ApprovalPercent" placeholder="Select the approval percent"
                                    options={APPROVAL_PERCENT}
                                    component={RFReactSelect}
                                  />
                               {/* <HelpBlock>Mandatory</HelpBlock>*/}
                               {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}

                               </FormGroup>
                                  </Col>
                               </Row>

                               <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                 <FormGroup controlId="voteRulesBaseId" style={{zIndex: "5"}}>
                                 <ControlLabel>Vote Rules Base</ControlLabel>
                                  <Select
                                    name="voteRulesBaseId"
                                    label="voteRulesBase" placeholder="Select the vote rules base"
                                    options={VOTE_RULES_BASE}
                                    component={RFReactSelect}
                                  />
                                  {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                  {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                 </FormGroup>
                                 </Col>
                                </Row>
                              </div>
                              <div className="qos-constraint">
                           <Row>

                          <Col lg={6} md={6} sm={6} xs={6}>
                            <FormGroup controlId="QosPercentage" style={{zIndex: "5"}}>
                               <Select
                                 name="QosPercentageId" type="text"
                                 label="Qos Percentage" placeholder="Insert the qos %"
                                 component={renderInputField}
                               />
                            {/* <HelpBlock>Mandatory</HelpBlock>*/}
                            {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                        </FormGroup>
                        </Col>

                        <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="reputationPercentId" style={{zIndex: "5"}}>
                             <Select
                               name="reputationPercentId"
                               label="Reputation Percentage" placeholder="Insert the reputation %"
                               component={renderInputField}
                          />
                      {/* <HelpBlock>Mandatory</HelpBlock>*/}
                      {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="MinValueFedId" style={{zIndex: "5"}}>
                       <Select
                        name="MinValueFedId" type="text"
                        label="Min Value Fed" placeholder="Insert the minimum value fed"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                       </Col>

                        <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="UnderperformanceId" style={{zIndex: "5"}}>
                            <ControlLabel>Under Performance</ControlLabel>
                               <Select
                                 name="UnderperformanceId"
                                 label="underperformance" placeholder="Select the Under performance value"
                                 options={UNDER_PERFORMANCE}
                                 component={RFReactSelect}
                             />
                             {/* <HelpBlock>Mandatory</HelpBlock>*/}
                             {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                          </FormGroup>
                         </Col>
                        </Row>
                        </div>

                         <div className="qos-constraint">
                           <Row>
                            <Col lg={6} md={6} sm={6} xs={6}>
                              <FormGroup controlId="ChargePolicy" style={{zIndex: "5"}}>
                                <ControlLabel>Charge Policy</ControlLabel>
                                 <Select
                                   name="ChargePolicyId"
                                   label="ChargePolicy" placeholder="Select the Charge Policy"
                                   options={CHARGE_POLICY}
                                   component={RFReactSelect}
                                 />
                             {/* <HelpBlock>Mandatory</HelpBlock>*/}
                             {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                       </FormGroup>
                      </Col>
                       <Col lg={6} md={6} sm={6} xs={6}>
                        <FormGroup controlId="FedProductId" style={{zIndex: "5"}}>
                           <ControlLabel>Federation Product</ControlLabel>
                            <Select
                             name="FedProductId"
                             label="Federation Product" placeholder="Select the supported Federation Product"
                             options={FED_PRODUCT}
                             component={RFReactSelect}
                           />
                         {/* <HelpBlock>Mandatory</HelpBlock>*/}
                         {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                   </Col>

               </Row>

               <Row>
                 <Col lg={6} md={6} sm={6} xs={6}>
                   <FormGroup controlId="ProfitPolicyId" style={{zIndex: "5"}}>
                    <ControlLabel>Profit Policy</ControlLabel>
                       <Select
                         name="ProfitPolicyId"
                         label="Profit Policy" placeholder="Select the supported Profit Policy"
                         options={PROFIT_POLICY}
                         component={RFReactSelect}
                      />
                       {/* <HelpBlock>Mandatory</HelpBlock>*/}
                       {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                  </Col>

                 <Col lg={6} md={6} sm={6} xs={6}>
                   <FormGroup controlId="CoinId" style={{zIndex: "5"}}>
                     <ControlLabel>Coin</ControlLabel>
                        <Select
                          name="CoinId"
                          label="Coin" placeholder="Select the supported Coin"
                          options={COIN}
                          component={RFReactSelect}
                       />
                     {/* <HelpBlock>Mandatory</HelpBlock>*/}
                     {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}

                  </FormGroup>
                </Col>
              </Row>


           </div>



   </Fragment>
             );

};



export default FederationRules;