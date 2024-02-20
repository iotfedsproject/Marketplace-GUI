import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import FederationJoinPanelBody from "./federation-join-panel-body";

export default class CollapsibleFederationJoinPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            federation: props.federation,
            userPlatforms: props.userPlatforms
        };

        this.togglePanel = this.togglePanel.bind(this);
       // this.handleOpenDeleteModal    = this.handleOpenDeleteModal.bind(this);
       // this.handleOpenInviteModal    = this.handleOpenInviteModal.bind(this);
        this.handleOpenFederationJoin = this.handleOpenFederationJoin.bind(this);
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

    handleOpenFederationJoin = () => {
       this.props.openFederationJoinModal(this.props.federation.id);
    };

   // handleOpenDeleteModal = () => {
      //  this.props.openDeleteModal(this.props.federation.id);
 //   };

  //  handleOpenInviteModal = () => {
       // this.props.openInviteModal(this.props.federation.id);
  //  };

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
                    <FederationJoinPanelBody
                        federation={federation}
                        userPlatforms={userPlatforms}
                        availableInfoModels={this.props.informationModels.availableInfoModels}
                        isAdmin={isAdmin}
                       // onOpenLeaveModal={this.props.openLeaveModal}
                    />
                </Panel.Collapse>
                <Panel.Footer className="federation-info-footer">
                  {/*  <Button
                        bsStyle="info"
                        onClick={this.handleOpenInviteModal}>
                        Invite
                    </Button>*/}
                  {/*  {!isAdmin && federation.members.length !== 1 ? "" : */}
                        <Button
                            className="panel-footer-btn"
                            bsStyle="info"
                            onClick={this.handleOpenFederationJoin}>
                            Join
                        </Button>
                   {/* } */}
                </Panel.Footer>
            </Panel>
        );
    }
}