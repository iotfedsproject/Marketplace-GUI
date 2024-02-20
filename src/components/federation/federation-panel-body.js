import React from "react";
import { Panel, Row, Col, FormGroup, FormControl, ControlLabel, Button, Glyphicon } from "react-bootstrap";
import _ from "lodash";
import Select from "react-select";
import { COMPARATOR, QOS_METRICS, FEDERATION_VISIBILITY_TYPES} from "../../configuration";

import  FederationRules  from "./federation-rules";


const FederationPanelBody = ({ federation, userPlatforms, availableInfoModels, onOpenLeaveModal,onOpenLeaveWithVoteModal, isAdmin }) => {

    const notSpecified = "NOT_SPECIFIED";
    const informationModelId = federation.informationModel ? federation.informationModel.id : notSpecified;
    const informationModelOptions = availableInfoModels[informationModelId] ? [{
        label : availableInfoModels[informationModelId].name,
        value : informationModelId
    }] :
        [{
        label: "Not Specified",
        value: notSpecified
    }];
    userPlatforms = userPlatforms ? userPlatforms : {};

    const leaveButton = (ownsPlatform, platformId, width) => {
        return(
            isAdmin || ownsPlatform ?
                <Col lg={12 - width} md={12 - width} sm={12 - width} xs={12 - width}
                     style={{paddingTop: "1px"}}>
                    <Button bsStyle="danger" size="lg"
                            onClick={() => {
                                onOpenLeaveModal(federation.id, platformId)
                            }}
                    >
                       Remove member from federation
                    </Button>
                </Col>
                : <Col lg={12 - width} md={12 - width} sm={12 - width} xs={12 - width}
                   style={{paddingTop: "1px"}}>
                    <Button bsStyle="danger" size="lg"
                      onClick={() => {
                         onOpenLeaveWithVoteModal(federation.id, platformId)
                       }}
                      >
                      Activate Vote to remove member
                      {/*<Glyphicon glyph="minus" />*/}
                      </Button>
                    </Col>
        )
    };

    const RenderInputField = (props) => {
        const { value, label, type, ownsPlatform, isFederatedPlatformId, isPlatformIdField } = props;

        //const width = isFederatedPlatformId ? 10 : 12;
        const width = 10;

        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <Row>
                    <Col lg={width} md={width} sm={width} xs={width}>
                        <FormControl
                            type={type}
                            value={value}
                            disabled={true} />
                    </Col>
                    {isPlatformIdField ? leaveButton(ownsPlatform, value, width) : ""}
                </Row>
            </FormGroup>
        );
    };

    const ownsPlatform = (platformId, userPlatforms) => {
        if (!userPlatforms) {
            // is admin
            return true;
        }
        return _.keysIn(userPlatforms).indexOf(platformId) > -1
    };

    const RenderQoSConstraint = (qosConstraintObject) => {
        const { qosConstraint } = qosConstraintObject;

        return (
            <div className="qos-constraint">
                <Row>
                    <Col xs={10} sm={10} md={10} lg={10}>
                        <Row>
                            <Col xs={12} sm={6} md={4} lg={4}>
                                <ControlLabel>Metric</ControlLabel>
                                <FormGroup controlId="metric">
                                    <Select
                                        options={QOS_METRICS}
                                        value={qosConstraint.metric}
                                        disabled={true}
                                    />
                                </FormGroup>
                            </Col>

                            <Col xs={12} sm={6} md={4} lg={4}>
                                <ControlLabel>Comparator</ControlLabel>
                                <FormGroup controlId="comparator">
                                    <Select
                                        options={COMPARATOR}
                                        value={qosConstraint.comparator}
                                        disabled={true}
                                    />
                                </FormGroup>
                            </Col>

                            <Col xs={12} sm={12} md={4} lg={4}>
                                <ControlLabel>Threshold</ControlLabel>
                                <FormControl
                                    value={qosConstraint.threshold}
                                    disabled={true}
                                />
                            </Col>

                        </Row>
                        <Row>
                            { qosConstraint.duration ?
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <ControlLabel>Duration</ControlLabel>
                                    <FormControl
                                        value={qosConstraint.duration}
                                        disabled={true}
                                    />
                                </Col> :
                                ""}

                            { qosConstraint.resourceType ?
                                <Col xs={12} sm={6} md={6} lg={6}>
                                    <ControlLabel>Resource Type</ControlLabel>
                                    <FormControl
                                        value={qosConstraint.resourceType}
                                        disabled={true}
                                    />
                                </Col> :
                                ""}
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    };

    const displayFederationRules = (federation) => {
     if(federation){
      return (
        <FederationRules/>
      );

     }


    };

    const displayQoSConstraints = (qosConstraints) => {
    console.log("xxxxxxxxxxxxxxxxxxxxxx displayQoSConstraints XXXXXXXXXXXXX");
        if (qosConstraints){
            return (

                <Col lg={12} md={12} sm={12} xs={12}>
                    <ControlLabel>QoS Constraints</ControlLabel>

                    {
                        qosConstraints.map((qosConstraint, index) => {
                            return (
                                <RenderQoSConstraint
                                    qosConstraint={qosConstraint}
                                    key={index}
                                />);
                        })
                    }

                    {/*<h1> federation name {federation.name}</h1>*/}

                    <FederationRules
                     federation={federation}
                     ioTFedsRules = {federation.smartContract.IoTFedsRules}
                     readOnly = {true}
                     title = "Federation Rules"
                     //title= "Update Federation Rules"}
                     readValuesFromBackend = {true}

                    />
                </Col>);
                }else{
                 return (
                 <Col lg={12} md={12} sm={12} xs={12}>
                 <FederationRules
                     federation={federation}
                     ioTFedsRules = {federation.smartContract.IoTFedsRules}
                     readOnly = {true}
                     title = "Federation Rules"
                     //title= "Update Federation Rules"}
                     readValuesFromBackend = {true}

                    />
                </Col>);


                }
    };

    return(
        <Panel.Body>
            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <RenderInputField
                        value={federation.id}
                        label="Federation Id"
                        type="text"
                    />
                </Col>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <RenderInputField
                        value={federation.name}
                        label="Federation Name"
                        type="text"
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={6} md={6} sm={6} xs={6}>
                    <FormGroup controlId="informationModel">
                        <ControlLabel>Information Model</ControlLabel>
                        <Select
                            options={informationModelOptions}
                            value={informationModelOptions[0].value}
                            disabled={true} />
                    </FormGroup>
                </Col>

                <Col lg={6} md={6} sm={6} xs={6}>
                    <FormGroup controlId="public">
                        <ControlLabel>Public</ControlLabel>
                        <Select
                            options={FEDERATION_VISIBILITY_TYPES}
                            value={federation.public}
                            disabled={true} />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col lg={9} md={9} sm={9} xs={9}>
                    <ControlLabel>Federation Members</ControlLabel>
                    {federation.members.map(member =>
                        <RenderInputField
                            value={member.platformId}
                            key={member.platformId}
                            type="text"
                            isPlatformIdField={true}
                            isFederatedPlatformId={true}
                            ownsPlatform={ownsPlatform(member.platformId, userPlatforms)}
                        />
                    )}
                </Col>
            </Row>

            <Row>
                {displayQoSConstraints (federation.slaConstraints)}
                {/*displayFederationRules(federation)*/}
            </Row>




        </Panel.Body>

    );
};

export default FederationPanelBody;