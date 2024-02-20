import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import FederationPanelBody from "./federation-panel-body";
import  FederationRules  from "./federation-rules";

import RFReactSelect from "../../helpers/redux-form-react-selector-integrator";
import { reduxForm ,Field, FieldArray } from "redux-form";
import { Modal,Row, Col,FormGroup,FormControl, HelpBlock,FieldError,ControlLabel } from "react-bootstrap";
import { RULE_TYPES,DATA_AVAILABILITY,SERVICE_TYPES,SUPPORTED_ONTOLOGIES,BOARD_GOV,PROPOSALS,APPROVAL_PERCENT,VOTE_RULES_BASE,UNDER_PERFORMANCE,CHARGE_POLICY,FED_PRODUCT,PROFIT_POLICY,COIN   } from "../../configuration/index";



export default class CollapsibleFederationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            federation: props.federation,
            userPlatforms: props.userPlatforms
        };

        this.togglePanel = this.togglePanel.bind(this);
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleOpenInviteModal = this.handleOpenInviteModal.bind(this);
        this.handleChangeFederationRulesModal = this.handleChangeFederationRulesModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.federation !== this.state.federation || nextProps.userPlatforms !== this.state.userPlatforms)
            this.setState({
                    ...this.state,
                federation : nextProps.federation,
                userPlatforms : nextProps.userPlatforms
            });
    }

    togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
    };

    handleOpenDeleteModal = () => {
        this.props.openDeleteModal(this.props.federation.id);
    };

    handleOpenInviteModal = () => {
        this.props.openInviteModal(this.props.federation.id);
    };

    handleChangeFederationRulesModal = () => {
         console.log("handleChangeFederationRulesModal");
         console.log(this.props.federation.id);
         console.log(this.props.federation.smartContract.IoTFedsRules.FedGov.BoardGov);
         this.props.openChangeFederationRulesModal(
         this.props.federation.id,
         this.props.federation,
         this.props.federation.smartContract.IoTFedsRules.FedTypeRules,
         this.props.federation.smartContract.IoTFedsRules.FedGov.BoardGov,
         this.props.federation.smartContract.IoTFedsRules.FedGov.Proposals,
         this.props.federation.smartContract.IoTFedsRules.FedGov.VoteRules,
         this.props.federation.smartContract.IoTFedsRules.FedGov.VoteRules.Type,
         this.props.federation.smartContract.IoTFedsRules.QualityAssuranceMetrics,
         /////this.props.federation.smartContract.IoTFedsRules.QualityAssuranceMetrics,
         this.props.federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.Quality,
         this.props.federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoEWeights,
         this.props.federation.smartContract.IoTFedsRules.QualityAssuranceMetrics.QoSWeights,
         this.props.federation.smartContract.IoTFedsRules.FedMarketplace);
            //this.props.openInviteModal(this.props.federation.id);
            //{this.open.bind(this)}
    };

    render() {
        const { federation, userPlatforms } = this.state;
        const { isAdmin } = this.props;

        return(
            <Panel id="id" bsStyle="primary" className="federation-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                        {federation.name}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>
                <Panel.Collapse>
                    <FederationPanelBody
                        federation={federation}
                        userPlatforms={userPlatforms}
                        availableInfoModels={this.props.informationModels.availableInfoModels}
                        isAdmin={isAdmin}
                        onOpenLeaveModal         = {this.props.openLeaveModal}
                        onOpenLeaveWithVoteModal = {this.props.openLeaveWithVoteModal}
                    />

                </Panel.Collapse>
                <Panel.Footer className="federation-info-footer">
                    <Button
                        bsStyle="info"
                        onClick={this.handleOpenInviteModal}>
                        Invite
                    </Button>
                    <span></span>
                <h1></h1>
                <Button
                 // {/*  className="registration-btn"*/}
                    bsStyle="info"
                    onClick={this.handleChangeFederationRulesModal}>
                    Change Federation Rules
                </Button>
                    {!isAdmin && federation.members.length !== 1 ? "" :
                        <Button
                            className="panel-footer-btn"
                            bsStyle="warning"
                            onClick={this.handleOpenDeleteModal}>
                            Delete
                        </Button>
                    }
                </Panel.Footer>

            </Panel>
        );
    }
}