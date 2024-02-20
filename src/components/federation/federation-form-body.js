import React, { Fragment } from "react";
import { Field, FieldArray } from "redux-form";
import { Button, FormGroup, FormControl, ControlLabel, Row, Col, HelpBlock, InputGroup, Glyphicon } from "react-bootstrap";
import QoSConstraint from "../../components/federation/qos-constraint";
import { FieldError } from "../../helpers/errors";
import { getValidationState } from "../../validation/helpers";
import { FEDERATION_VISIBILITY_TYPES } from "../../configuration";
import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";
import { renderPlatforms } from "../../helpers/render-platformId-fields";
import { renderBgov } from "../../helpers/render-bgov-fields";



import  FederationRules  from "./federation-rules";
import { RULE_TYPES,DATA_AVAILABILITY,SERVICE_TYPES,SUPPORTED_ONTOLOGIES,BOARD_GOV,PROPOSALS,APPROVAL_PERCENT,VOTE_RULES_BASE,UNDER_PERFORMANCE,CHARGE_POLICY,FED_PRODUCT,PROFIT_POLICY,COIN   } from "../../configuration/index";


const FederationFormBody = ({ federations, informationModels, isActive }) => {
    return (
        <Fragment>
            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <Field
                        name="id" type="text" maxLength={30}
                        label="Federation Id" placeholder="Enter the federation id"
                        helpMessage={"From 4 to 30 characters. Include only letters, digits, '-' and '_'. You can " +
                        "leave it empty for autogeneration"}
                        errorField={federations.id_error}
                        component={renderInputField}
                    />
                </Col>

                <Col lg={6} md={6} sm={6} xs={6}>
                    <Field
                        name="name" type="text" maxLength={30}
                        label="Federation Name" placeholder="Enter the federation name"
                        helpMessage={"From 3 to 30 characters"}
                        errorField={federations.name_error}
                        component={renderInputField}
                    />
                </Col>


            </Row>

            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <FormGroup controlId="informationModel" style={{zIndex: "5"}}>
                        <ControlLabel>Information Model</ControlLabel>
                        <Field
                            name="informationModel" options={informationModels}
                            placeholder="Information Model" subElement={true}
                            component={RFReactSelect}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Select the federation information model</HelpBlock>
                        <FieldError error={federations.informationModel_id_error} />
                    </FormGroup>
                </Col>



                <Col lg={6} md={6} sm={6} xs={6}>
                    <FormGroup controlId="public" style={{zIndex: "5"}}>
                        <ControlLabel>Public</ControlLabel>
                        <Field
                            name="public" options={FEDERATION_VISIBILITY_TYPES}
                            clearable={false} searchable={false}
                            component={RFReactSelect}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Has the federation public visibility?</HelpBlock>
                        <FieldError error={federations.public_error} />
                    </FormGroup>
                </Col>
            </Row>



            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <FieldArray
                        name="members" maxLength={30} label="Federation Members"
                        placeholder="Enter the organization"
                        helpMessage={"From 4 to 30 characters. Include only letters, digits, '-' and '_'"}
                        errorField={federations.members_id_error}
                        isActive={isActive}
                        component={renderPlatforms}
                    />
                    <FieldError error={federations.members_error} />
                </Col>
            </Row>



            <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <FieldArray
                        name="slaConstraints" maxLength={30} label="QoS Constraints"
                        federations={federations}
                        isActive={isActive}
                        errorField={federations.slaConstraints_error}
                        component={renderQoSConstraints}
                    />
                </Col>
            </Row>
                  <div className="qos-constraint">
                           <h3><strong>Federation rule types</strong></h3>
                             <Row>
                              <Col lg={6} md={6} sm={6} xs={6}>
                                <FormGroup controlId="regRuleTypeId" style={{zIndex: "5"}} >

                                  <ControlLabel>Rule Type</ControlLabel>

                                    <Field
                                       name="regRuleTypeId"
                                       placeholder="Select the type of rules"
                                       options={RULE_TYPES}
                                       component={RFReactSelect}
                                     />

                                  {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                  {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                              </Col>

                              <Col lg={6} md={6} sm={6} xs={6}>
                                 <FormGroup controlId="regDataAvailabilityId" style={{zIndex: "5"}}>
                                    <ControlLabel>Data Availability</ControlLabel>
                                     <Field
                                       name="regDataAvailabilityId"
                                       placeholder="Select the data availability"
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
                                  <FormGroup controlId="regServiceTypeId" style={{zIndex: "5"}}>
                                    {/*<ControlLabel>Service Type</ControlLabel>*/}

                                    <Field
                                      name="regServiceTypeId"
                                      label = "Service Type" placeholder="Insert the type of service"
                                      //{/*options={SERVICE_TYPES}*/}
                                      component={renderInputField}
                                    />

                                   {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                   {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                                   </Col>

                                  <Col lg={6} md={6} sm={6} xs={6}>
                                   <FormGroup controlId="regSupportedOntologiesId" style={{zIndex: "5"}}>
                                    {/* <ControlLabel>Supported Ontologies</ControlLabel>*/}
                                       <Field
                                         name="regSupportedOntologiesId"
                                         label = "Supported Ontologies" placeholder="Insert the  ontology"
                                         //{/*options={SUPPORTED_ONTOLOGIES}*/}
                                         component={renderInputField}
                                       />
                                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                 </FormGroup>
                                  </Col>

                                 </Row>
                                </div>

                                <div className="qos-constraint">
                                <h3><strong>Federation government rules </strong></h3>

                                <Row>
                                  <Col lg={12} md={12} sm={12} xs={12}>
                                  {/* <FormGroup controlId="regBoardGovId" style={{zIndex: "5"}}>*/}
                                       <FieldArray
                                         name="regBoardGovId" maxLength={30} label="Board government"
                                         placeholder="Add the board government"
                                         helpMessage={"From 4 to 30 characters. Include only letters, digits, '-' and '_'"}
                                         errorField={federations.members_id_error}
                                         isActive={isActive}
                                         component={renderBgov}
                                      />

                                  {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                  {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                               {/* </FormGroup>*/}
                               </Col>
                               </Row>

                                <Row>
                                  <Col lg={12} md={12} sm={12} xs={12}>
                                  {/* <FormGroup controlId="regBoardGovId" style={{zIndex: "5"}}>*/}
                                       <FieldArray
                                         name="regproposalsId" maxLength={30} label="Insert the supported proposals"
                                         placeholder="Add the proposal"
                                         helpMessage={"From 4 to 30 characters. Include only letters, digits, '-' and '_'"}
                                         errorField={federations.members_id_error}
                                         isActive={isActive}
                                         component={renderBgov}
                                      />

                                  {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                  {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                               {/* </FormGroup>*/}
                               </Col>
                               </Row>



                                <Row>
                                 <Col lg={4} md={4} sm={4} xs={4}>
                                  <FormGroup controlId="regvoteRulesBaseId" style={{zIndex: "5"}}>
                                  <ControlLabel>Vote Rules Base</ControlLabel>
                                   <Field
                                     name="regvoteRulesBaseId"
                                     placeholder="Select the vote rules base"
                                     options={VOTE_RULES_BASE}
                                     component={RFReactSelect}
                                   />
                                   {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                   {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                  </FormGroup>
                                 </Col>





                                <Col lg={4} md={4} sm={4} xs={4}>
                                 <FormGroup controlId="regTokensId" style={{zIndex: "5"}}>
                                 {/*<ControlLabel>Tokens</ControlLabel>*/}
                                  <Field
                                   name="regTokensId" type="text"
                                   label = "Tokens"  placeholder="Insert the token"
                                   component={renderInputField}
                                 />

                                {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                               </FormGroup>
                              </Col>

                              <Col lg={4} md={4} sm={4} xs={4}>
                               <FormGroup controlId="regapprovalPercentId" style={{zIndex: "5"}}>
                                 <ControlLabel>Vote Rules Approval %</ControlLabel>
                                  <Field
                                    name="regapprovalPercentId"
                                    placeholder="Select the approval percent"
                                    options={APPROVAL_PERCENT}
                                    component={RFReactSelect}
                                  />
                               {/* <HelpBlock>Mandatory</HelpBlock>*/}
                               {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}

                               </FormGroup>
                                  </Col>



                               </Row>

                               <Row>

                                </Row>
                              </div>

                             <div className="qos-constraint">
                              <h3><strong>Quality assurance</strong></h3>
                           <Row>
                          <Col lg={6} md={6} sm={6} xs={6}>
                            <FormGroup controlId="regQosPercentageId" style={{zIndex: "5"}}>
                             {/*<ControlLabel>Qos %</ControlLabel>*/}
                               <Field
                                 name="regQosPercentageId" type="text"
                                 label = "Qos %" placeholder="Insert the qos %"
                                 component={renderInputField}
                               />
                            {/* <HelpBlock>Mandatory</HelpBlock>*/}
                            {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                        </FormGroup>
                        </Col>

                        <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="regreputationPercentId" style={{zIndex: "5"}}>
                            {/*<ControlLabel>Reputation %</ControlLabel>*/}
                          <Field
                            name="regreputationPercentId"
                            label = "Reputation %" placeholder="Insert the reputation %"
                            component={renderInputField}
                          />
                      {/* <HelpBlock>Mandatory</HelpBlock>*/}
                      {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="regMinValueFedId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Min Number of Federations</ControlLabel>*/}
                       <Field
                        name="regMinValueFedId"
                        label = "Min Number of Federations" type="text"
                        placeholder="Insert the minimum value fed"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                       </Col>

                        <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="regUnderperformanceId" style={{zIndex: "5"}}>
                            <ControlLabel>Under Performance</ControlLabel>
                             <Field
                              name="regUnderperformanceId"
                              placeholder="Select the Under performance value"
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
                           <h3><strong>Marketplace policy</strong></h3>
                           <Row>
                            <Col lg={6} md={6} sm={6} xs={6}>
                              <FormGroup controlId="regChargePolicyId" style={{zIndex: "5"}}>
                                <ControlLabel>Charge Policy</ControlLabel>
                                 <Field
                                   name="regChargePolicyId"
                                   placeholder="Select the Charge Policy"
                                   options={CHARGE_POLICY}
                                   component={RFReactSelect}
                                 />
                             {/* <HelpBlock>Mandatory</HelpBlock>*/}
                             {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                       </FormGroup>
                      </Col>
                       <Col lg={6} md={6} sm={6} xs={6}>
                        <FormGroup controlId="regFedProductId" style={{zIndex: "5"}}>
                           <ControlLabel>Federation Product</ControlLabel>
                            <Field
                             name="regFedProductId"
                             placeholder="Select the supported Federation Product"
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
                   <FormGroup controlId="regProfitPolicyId" style={{zIndex: "5"}}>
                    <ControlLabel>Profit Policy</ControlLabel>
                       <Field
                         name="regProfitPolicyId"
                         placeholder="Select the supported Profit Policy"
                         options={PROFIT_POLICY}
                         component={RFReactSelect}
                      />
                       {/* <HelpBlock>Mandatory</HelpBlock>*/}
                       {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                  </Col>

                 <Col lg={6} md={6} sm={6} xs={6}>
                   <FormGroup controlId="regCoinId" style={{zIndex: "5"}}>
                     <ControlLabel>Coin</ControlLabel>
                      <Field
                       name="regCoinId"
                       placeholder="Select the supported Coin"
                       options={COIN}
                       component={RFReactSelect}
                      />
                     {/* <HelpBlock>Mandatory</HelpBlock>*/}
                     {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}

                  </FormGroup>
                </Col>
              </Row>


           </div>
           {/*//////////////////////////////*/}
            <div className="qos-constraint">
              <h3><strong>Quality of Experience Weights</strong></h3>
                  <Row>
                   <Col lg={6} md={6} sm={6} xs={6}>
                    <FormGroup controlId="regBusinessEnablementId" style={{zIndex: "5"}}>
                     {/*<ControlLabel>Enablement</ControlLabel>*/}
                       <Field
                        name="regBusinessEnablementId" type="text"
                        label = "Business Enablement" placeholder="Insert the business enablement "
                        component={renderInputField}
                       />
                     {/* <HelpBlock>Mandatory</HelpBlock>*/}
                     {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="regCompletenessId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>CompletenessI</ControlLabel>*/}
                       <Field
                        name="regCompletenessId"
                        label = "Completeness" placeholder="Insert the Completeness"
                        component={renderInputField}
                       />
                       {/* <HelpBlock>Mandatory</HelpBlock>*/}
                      {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                    </Col>
                    </Row>

                    <Row>
                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="regCorrectnessId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Correctness</ControlLabel>*/}
                       <Field
                        name="regCorrectnessId"
                        label = "Correctness" type="text"
                        placeholder="Insert the Correctness value"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                   </Col>
                   <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="regEasyOfUseId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Easy of Use</ControlLabel>*/}
                       <Field
                        name="regEasyOfUseId"
                        label = "Easy of Use" type="text"
                        placeholder="Insert the Easy of Use value"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                   </Col>
                   </Row>

                   <Row>
                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="regPrecisionId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Precision</ControlLabel>*/}
                       <Field
                        name="regPrecisionId"
                        label = "Precision" type="text"
                        placeholder="Insert the Precision value"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                   </Col>
                   <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="regRelevanceId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Relevance</ControlLabel>*/}
                       <Field
                        name="regRelevanceId"
                        label = "Relevance" type="text"
                        placeholder="Insert the Relevance value"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                   </Col>
                   </Row>

                   <Row>
                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="regResponseTimeId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Response Time</ControlLabel>*/}
                       <Field
                        name="regResponseTimeId"
                        label = "Response Time" type="text"
                        placeholder="Insert the Response Time  value"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                   </Col>
                   <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="regValueForMoneyId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Relevance</ControlLabel>*/}
                       <Field
                        name="regValueForMoneyId"
                        label = "Value for Money" type="text"
                        placeholder="Insert the Value for Money value"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                   </Col>
                   </Row>

            </div>
              <div className="qos-constraint">
                <h3><strong>Quality Of Service parameters</strong></h3>
                     <Row>
                       <Col lg={6} md={6} sm={6} xs={6}>
                        <FormGroup controlId="regQualityOfservicePercentageId" style={{zIndex: "5"}}>
                         {/*<ControlLabel>Response Time</ControlLabel>*/}
                         <Field
                          name="regQualityOfservicePercentageId"
                          label = "Quality Of Service Percentage " type="text"
                          placeholder="Insert the Quality of Service Percentage"
                          component={renderInputField}
                         />
                         {/* <HelpBlock>Mandatory</HelpBlock>*/}
                         {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                        </FormGroup>
                       </Col>
                      </Row>
                       <h4>Quality of Service Weights</h4>
                      <Row>

                       <Col lg={4} md={4} sm={4} xs={4}>
                        <FormGroup controlId="regQosAvailabilityId" style={{zIndex: "5"}}>
                         {/*<ControlLabel>Response Time</ControlLabel>*/}
                         <Field
                          name="regQosAvailabilityId"
                          label = "Availability" type="text"
                          placeholder="Insert Availability weight"
                          component={renderInputField}
                         />
                         {/* <HelpBlock>Mandatory</HelpBlock>*/}
                         {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                        </FormGroup>
                       </Col>
                       <Col lg={4} md={4} sm={4} xs={4}>
                        <FormGroup controlId="regQosPrecisionId" style={{zIndex: "5"}}>
                         {/*<ControlLabel>Response Time</ControlLabel>*/}
                         <Field
                          name="regQosPrecisionId"
                          label = "Precision" type="text"
                          placeholder="Insert Precision weight"
                          component={renderInputField}
                         />
                         {/* <HelpBlock>Mandatory</HelpBlock>*/}
                         {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                        </FormGroup>
                       </Col>
                        <Col lg={4} md={4} sm={4} xs={4}>
                        <FormGroup controlId="regQosResponseTimeId" style={{zIndex: "5"}}>
                         {/*<ControlLabel>Response Time</ControlLabel>*/}
                         <Field
                          name="regQosResponseTimeId"
                          label = "Response Time" type="text"
                          placeholder="Insert Response Time"
                          component={renderInputField}
                         />
                         {/* <HelpBlock>Mandatory</HelpBlock>*/}
                         {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                        </FormGroup>
                       </Col>
                      </Row>

              </div>
           {/*//////////////////////////////*/}
        </Fragment>
    );
};

const renderInputField = (field) => {
    const { input, type, placeholder, componentClass, rows, subElement, errorField,
        label, helpMessage, maxLength, meta : { touched, invalid, error } } = field;
    const validationState = getValidationState(input.value, touched, invalid);

    return (
        <FormGroup controlId={input.name} validationState={validationState}>
            {label ? <ControlLabel>{label}</ControlLabel> : ""}
            <FormControl
                { ...input } componentClass={componentClass} rows={rows}
                type={type} placeholder={placeholder} maxLength={maxLength} />
            <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
            <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
            <FieldError error={errorField} />
        </FormGroup>
    );
};

const renderQoSConstraints = ({ fields, label, errorField, federations }) => {

    return(
        <FormGroup id="qos-constraint-group">

            <ControlLabel id="qos-constraint-label">{label}</ControlLabel>
            <InputGroup.Button id="qos-constraint-add-btn" className="dynamic-input-group">
                <Button
                    bsStyle="primary"
                    bsSize="xsmall"
                    className="dynamic-input-group-btn"
                    type="button"
                    onClick={() => fields.push({})}
                >
                    <Glyphicon glyph="plus"/>
                </Button>
            </InputGroup.Button>

            <ul style={{listStyle: "none", paddingLeft: 0}}>
                {fields.map((member, index) => (
                    <li key={index}>
                        <QoSConstraint
                            member={member}
                            index={index}
                            federations={federations}
                            errorField={errorField}
                            onDelete={ () => {fields.remove(index)} }
                        />
                    </li>
                ))}
            </ul>
        </FormGroup>

    )
};

export default FederationFormBody;

