import React, { Component } from "react";
import { Panel, Glyphicon, Button } from "react-bootstrap";
import ClientPanelBody from "./client-panel-pending-join-requests-body";

import {
    ACTIVATE_CLIENT_DELETE_MODAL
} from "../../actions";

export default class CollapsiblePendingJoinRequestsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            details : props.details
        };

        this.togglePanel = this.togglePanel.bind(this);
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.details !== this.state.details)
            this.setState({
                open : this.state.open,
                details : nextProps.details
            });
    }

    togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
    };

    handleOpenDeleteModal = () => {
        this.props.openModal(ACTIVATE_CLIENT_DELETE_MODAL, this.props.federationName);
    };

    render() {
        const { details } = this.state;
        const { id } = this.props;{/*Replace the id with federationID if needed*/}

        return(
            <Panel id="id" bsStyle="primary" className="client-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>

                <Panel.Heading onClick={this.togglePanel}>

                    <Panel.Title componentClass="h3">
                       {this.props.federationName}
                    </Panel.Title>

                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>

                <Panel.Collapse>
                    <ClientPanelBody
                        details={details}
                    />

                </Panel.Collapse>
                <Panel.Footer className="client-info-footer">
                                <h3>{"Voting state for action " + this.props.voteAction}</h3>
                                <h3><strong>{this.props.votingState}</strong></h3>
                 {/*this.props.showButton === "true"?
                    <Button
                        className="panel-footer-btn"
                        bsStyle="warning"
                        onClick={this.handleOpenDeleteModal}>
                        Cancel your request to join
                    </Button>:<Button
                           className="panel-footer-btn"
                           bsStyle="warning"
                           onClick={this.handleOpenDeleteModal} disabled>
                           Cancel your request to join
                    </Button>*/
                  }

                </Panel.Footer>
            </Panel>
        );
    }
}