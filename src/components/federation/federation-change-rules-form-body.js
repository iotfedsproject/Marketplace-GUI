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



//import  FederationRules  from "./federation-rules";
import { RULE_TYPES,DATA_AVAILABILITY,SERVICE_TYPES,SUPPORTED_ONTOLOGIES,BOARD_GOV,PROPOSALS,APPROVAL_PERCENT,VOTE_RULES_BASE,UNDER_PERFORMANCE,CHARGE_POLICY,FED_PRODUCT,PROFIT_POLICY,COIN   } from "../../configuration/index";


const FederationChangeRulesFormBody = ({ federations, federation, isActive }) => {




    return (
        <Fragment>
                  <div className="qos-constraint">
                           <h3><strong>Federation rule types</strong></h3>
                             <Row>
                              <Col lg={6} md={6} sm={6} xs={6}>
                                <FormGroup controlId="changeRuleTypeId" style={{zIndex: "5"}} >
                                  <ControlLabel>Rule Type</ControlLabel>

                                    <Field
                                       name="changeRuleTypeId"
                                       placeholder="Select the type of rules"
                                       options={RULE_TYPES}
                                       component={RFReactSelect}
                                     />

                                  {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                  {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                              </Col>

                              <Col lg={6} md={6} sm={6} xs={6}>
                                 <FormGroup controlId="changeDataAvailabilityId" style={{zIndex: "5"}}>
                                    <ControlLabel>Data Availability</ControlLabel>
                                     <Field
                                       name="changeDataAvailabilityId"
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
                                  <FormGroup controlId="changeServiceTypeId" style={{zIndex: "5"}}>
                                    {/*<ControlLabel>Service Type</ControlLabel>*/}
                                    <Field
                                      name="changeServiceTypeId"
                                      label = "Service Type" placeholder="Insert the type of service"
                                      //{/*options={SERVICE_TYPES}*/}
                                      //value1 = "jhhajshaj"
                                      component={renderInputField}
                                    />

                                   {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                   {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                </FormGroup>
                                   </Col>

                                  <Col lg={6} md={6} sm={6} xs={6}>
                                   <FormGroup controlId="changeSupportedOntologiesId" style={{zIndex: "5"}}>
                                    {/* <ControlLabel>Supported Ontologies</ControlLabel>*/}
                                       <Field
                                         name="changeSupportedOntologiesId"
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
                                         name="changeBoardGovId" maxLength={30} label="Board government"
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
                                         name="changeproposalsId" maxLength={30} label="Insert the supported proposals"
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
                                 <Col lg={6} md={6} sm={6} xs={6}>
                                  <FormGroup controlId="changevoteRulesBaseId" style={{zIndex: "5"}}>
                                  <ControlLabel>Vote Rules Base</ControlLabel>
                                   <Field
                                     name="changevoteRulesBaseId"
                                     placeholder="Select the vote rules base"
                                     options={VOTE_RULES_BASE}
                                     component={RFReactSelect}
                                   />
                                   {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                   {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                                  </FormGroup>
                                 </Col>


                               </Row>

                               <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                 <FormGroup controlId="changeTokensId" style={{zIndex: "5"}}>
                                 {/*<ControlLabel>Tokens</ControlLabel>*/}
                                  <Field
                                   name="changeTokensId" type="text"
                                   label = "Tokens"  placeholder="Insert the token"
                                   component={renderInputField}
                                 />

                                {/* <HelpBlock>Mandatory</HelpBlock>*/}
                                {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                               </FormGroup>
                              </Col>

                              <Col lg={6} md={6} sm={6} xs={6}>
                               <FormGroup controlId="changeapprovalPercentId" style={{zIndex: "5"}}>
                                 <ControlLabel>Vote Rules Approval %</ControlLabel>
                                  <Field
                                    name="changeapprovalPercentId"
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
                            <FormGroup controlId="changeQosPercentageId" style={{zIndex: "5"}}>
                             {/*<ControlLabel>Qos %</ControlLabel>*/}
                               <Field
                                 name="changeQosPercentageId" type="text"
                                 label = "Qos %" placeholder="Insert the qos %"
                                 component={renderInputField}
                               />
                            {/* <HelpBlock>Mandatory</HelpBlock>*/}
                            {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                        </FormGroup>
                        </Col>

                        <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="changereputationPercentId" style={{zIndex: "5"}}>
                            {/*<ControlLabel>Reputation %</ControlLabel>*/}
                          <Field
                            name="changereputationPercentId"
                            label = "Reputation %" placeholder="Insert the reputation %"
                            component={renderInputField}
                          />
                      {/* <HelpBlock>Mandatory</HelpBlock>*/}
                      {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="changeMinValueFedId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Min Number of Federations</ControlLabel>*/}
                       <Field
                        name="changeMinValueFedId"
                        label = "Min Number of Federations" type="text"
                        placeholder="Insert the minimum value fed"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                       </Col>

                        <Col lg={6} md={6} sm={6} xs={6}>
                          <FormGroup controlId="changeUnderperformanceId" style={{zIndex: "5"}}>
                            <ControlLabel>Under Performance</ControlLabel>
                             <Field
                              name="changeUnderperformanceId"
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
                              <FormGroup controlId="changeChargePolicyId" style={{zIndex: "5"}}>
                                <ControlLabel>Charge Policy</ControlLabel>
                                 <Field
                                   name="changeChargePolicyId"
                                   placeholder="Select the Charge Policy"
                                   options={CHARGE_POLICY}
                                   component={RFReactSelect}
                                 />
                             {/* <HelpBlock>Mandatory</HelpBlock>*/}
                             {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                       </FormGroup>
                      </Col>
                       <Col lg={6} md={6} sm={6} xs={6}>
                        <FormGroup controlId="changeFedProductId" style={{zIndex: "5"}}>
                           <ControlLabel>Federation Product</ControlLabel>
                            <Field
                             name="changeFedProductId"
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
                   <FormGroup controlId="changeProfitPolicyId" style={{zIndex: "5"}}>
                    <ControlLabel>Profit Policy</ControlLabel>
                       <Field
                         name="changeProfitPolicyId"
                         placeholder="Select the supported Profit Policy"
                         options={PROFIT_POLICY}
                         component={RFReactSelect}
                      />
                       {/* <HelpBlock>Mandatory</HelpBlock>*/}
                       {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                  </Col>

                 <Col lg={6} md={6} sm={6} xs={6}>
                   <FormGroup controlId="changeCoinId" style={{zIndex: "5"}}>
                     <ControlLabel>Coin</ControlLabel>
                      <Field
                       name="changeCoinId"
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

           {/*///////////////////////////////////////////////////////////////////////////////*/}
             <div className="qos-constraint">
              <h3><strong>Quality of Experience Weights</strong></h3>
                  <Row>
                   <Col lg={6} md={6} sm={6} xs={6}>
                    <FormGroup controlId="changeBusinessEnablementId" style={{zIndex: "5"}}>
                     {/*<ControlLabel>Enablement</ControlLabel>*/}
                       <Field
                        name="changeBusinessEnablementId" type="text"
                        label = "Business Enablement" placeholder="Insert the business enablement "
                        component={renderInputField}
                       />
                     {/* <HelpBlock>Mandatory</HelpBlock>*/}
                     {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                     </FormGroup>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="changeCompletenessId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>CompletenessI</ControlLabel>*/}
                       <Field
                        name="changeCompletenessId"
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
                     <FormGroup controlId="changeCorrectnessId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Correctness</ControlLabel>*/}
                       <Field
                        name="changeCorrectnessId"
                        label = "Correctness" type="text"
                        placeholder="Insert the Correctness value"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                   </Col>
                   <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="changeEasyOfUseId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Easy of Use</ControlLabel>*/}
                       <Field
                        name="changeEasyOfUseId"
                        label = "Ease of Use" type="text"
                        placeholder="Insert the Ease of Use value"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                   </Col>
                   </Row>

                   <Row>
                    <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="changePrecisionId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Precision</ControlLabel>*/}
                       <Field
                        name="changePrecisionId"
                        label = "Precision" type="text"
                        placeholder="Insert the Precision value"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                   </Col>
                   <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="changeRelevanceId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Relevance</ControlLabel>*/}
                       <Field
                        name="changeRelevanceId"
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
                     <FormGroup controlId="changeResponseTimeId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Response Time</ControlLabel>*/}
                       <Field
                        name="changeResponseTimeId"
                        label = "Response Time" type="text"
                        placeholder="Insert the Response Time  value"
                        component={renderInputField}
                     />
                    {/* <HelpBlock>Mandatory</HelpBlock>*/}
                    {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                    </FormGroup>
                   </Col>
                   <Col lg={6} md={6} sm={6} xs={6}>
                     <FormGroup controlId="changeValueForMoneyId" style={{zIndex: "5"}}>
                      {/*<ControlLabel>Relevance</ControlLabel>*/}
                       <Field
                        name="changeValueForMoneyId"
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
                        <FormGroup controlId="changeQualityOfservicePercentageId" style={{zIndex: "5"}}>
                         {/*<ControlLabel>Response Time</ControlLabel>*/}
                         <Field
                          name="changeQualityOfservicePercentageId"
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
                        <FormGroup controlId="changeQosAvailabilityId" style={{zIndex: "5"}}>
                         {/*<ControlLabel>Response Time</ControlLabel>*/}
                         <Field
                          name="changeQosAvailabilityId"
                          label = "Availability" type="text"
                          placeholder="Insert Availability weight"
                          component={renderInputField}
                         />
                         {/* <HelpBlock>Mandatory</HelpBlock>*/}
                         {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                        </FormGroup>
                       </Col>
                       <Col lg={4} md={4} sm={4} xs={4}>
                        <FormGroup controlId="changeQosPrecisionId" style={{zIndex: "5"}}>
                         {/*<ControlLabel>Response Time</ControlLabel>*/}
                         <Field
                          name="changeQosPrecisionId"
                          label = "Precision" type="text"
                          placeholder="Insert Precision weight"
                          component={renderInputField}
                         />
                         {/* <HelpBlock>Mandatory</HelpBlock>*/}
                         {/*<FieldError error={slaConstraints_comparator_error ? slaConstraints_comparator_error[index] : ""} />*/}
                        </FormGroup>
                       </Col>
                        <Col lg={4} md={4} sm={4} xs={4}>
                        <FormGroup controlId="changeQosResponseTimeId" style={{zIndex: "5"}}>
                         {/*<ControlLabel>Response Time</ControlLabel>*/}
                         <Field
                          name="changeQosResponseTimeId"
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
           {/*///////////////////////////////////////////////////////////////////////////////*/}
        </Fragment>
    );
};

const renderInputField = (field) => {
    const { input, type, placeholder, componentClass, rows, subElement, errorField,
        label, helpMessage, maxLength, meta : { touched, invalid, error }} = field;
    const validationState = getValidationState(input.value, touched, invalid);
    return (
        <FormGroup controlId={input.name} validationState={validationState}>
            {label ? <ControlLabel>{label}</ControlLabel> : ""}
            <FormControl
                { ...input } componentClass={componentClass} rows={rows}
                type={type} placeholder={placeholder} maxLength={maxLength}  />
            <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
            <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
            <FieldError error={errorField} />
        </FormGroup>
    );
};
//to line 65
const testrenderInputField = (field) => {
    const { input, type, placeholder, componentClass, rows, subElement, errorField,
        label, helpMessage, maxLength, meta : { touched, invalid, error } ,value1} = field;
    const validationState = getValidationState(input.value, touched, invalid);
    console.log("qqqqqqqqqqqqqqqqqqqqqqq");
    console.log(input.value);
    console.log({value1});
    console.log({ ...input });
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkk");


    return (

        <FormGroup controlId={input.name} validationState={validationState}>
            {label ? <ControlLabel>{label}</ControlLabel> : ""}
            <FormControl
                { ...input } componentClass={componentClass} rows={rows}
                type={type} placeholder={placeholder} maxLength={maxLength} value = {value1}/>
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

export default FederationChangeRulesFormBody;

