import React, {Component, Fragment} from "react";
import { Row, Col, Tab, Nav, NavItem } from "react-bootstrap";
import UserDetails from "./tabs/user-details-tab";
import ClientDetails from "./tabs/client-details-tab";
import PendingJoinDetails from "./tabs/pending-join-requests-tab";
import PlatformDetails from "./tabs/platforms-tab";
import SSPDetails from "./tabs/ssps-tab"
import InformationModels from "./tabs/information-models-tab";
import NavItemDropDown from "../admin-cpanel/nav-item-dropdown";
import FederationDetails from "./tabs/federations-tab";
import FederationMarketPlaceDetails from "./tabs/federated-marketplaces-tab";
import CreateProductsDetails from "./tabs/create-product-tab.js"
import ExchangeMarketPlaceDetails from "./tabs/exchanged-marketplaces-tab";
import ExchangeOffersDetails      from "./tabs/exchanged-offers-tab";
import FederationJoinDetails from "./tabs/federation-join-tab";
import ModifyFederationRulesDetails from "./tabs/modify-federation-rules-tab";
import FederationInvitationDetails from "./tabs/federation-invitations-tab";
import AuditingReceiptBuyerDetails from "./tabs/auditing-receipt-buyer-tab";
import AuditingReceiptSellerDetails from "./tabs/auditing-receipt-seller-tab";
import AuditingLogsDetails from   "./tabs/auditing-logs-tab";
import UserWalletDetails   from   "./tabs/user-wallet-tab";

import {connect} from "react-redux";
import {SERVICE_OWNER,USER} from "../../configuration/roles";
import _ from "lodash";
import MyMappings from "./tabs/my-mappings-tab";
import AllMappings from "./tabs/all-mappings-tab";
import { fetchJoinPendingRequests } from "../../actions/pending-join-request-actions";


class Main extends Component {
    constructor() {
        super();
        this.state = { hasFederationsDropDownActiveChild: false };
        this.activateFederationsChild    = this.activateFederationsChild.bind(this);
        this.activateMappingsChild       = this.activateMappingsChild.bind(this);
        this.activateIoTMarketPlaceChild = this.activateIoTMarketPlaceChild.bind(this);
        this.activateExchangeMarketPlaceChild     = this.activateExchangeMarketPlaceChild.bind(this);
        this.activateTransactionsMarketPlaceChild = this.activateTransactionsMarketPlaceChild.bind(this);

        this.profileDropDownList = {
         "user-details" : "User details",
         "user-wallet" :  "My Wallet"
        };

        this.ioTMarketPlaceDropDownList = {
         "fed-marketplaces" : "Search and Buy products",
         "create-product" : "Create Product"
        };

        this.exchangeMarketPlaceDropDownList = {
         "exchange-tokens-marketplace" : "Exchange Tokens",
         "exchange-offers" : "Proposals"
        };

        this.transactionsMarketPlaceDropDownList = {
         "auditing-receipt-buyer" :  "Audit receipt buyer",
         "auditing-receipt-seller" : "Audit receipt seller",
         "auditing-logs" : "Audit Logs"
        };

        this.federationDropDownList = {
            "federation-invitations" : "Federation Invitations",
            "federation-list" : "Federation List",
            "federation-join" : "Join to federation"//,
           // "modify-federation-rules" : "Modify Federation Rules"
        };

        this.mappingDropDownList = {
            "my-mappings" : "My Mappings",
            "all-mappings" : "All Mappings"
        };
    }

    handleSelect = () => {
        this.setState(_.mapValues(this.state, () => false));
    };

     handlePendingJoinRequestSelect = () => {
            this.setState(_.mapValues(this.state, () => false));
            this.props.fetchJoinPendingRequests();
     };

    activateFederationsChild = () => {
        this.setState({
            ..._.mapValues(this.state, () => false),
            hasFederationsDropDownActiveChild: true
        })
    };

    activateMappingsChild = () => {
        this.setState({
            ..._.mapValues(this.state, () => false),
            hasMappingsDropDownActiveChild: true
        })
    };

    activateIoTMarketPlaceChild = () => {
        this.setState({
            ..._.mapValues(this.state, () => false),
            hasIoTMarketPlaceDropDownActiveChild: true
        })
    };

     activateProfileChild = () => {
            this.setState({
                ..._.mapValues(this.state, () => false),
                hasProfileDropDownActiveChild: true
            })
        };

    activateExchangeMarketPlaceChild = () => {
            this.setState({
                ..._.mapValues(this.state, () => false),
                hasExchangeMarketPlaceDropDownActiveChild: true
            })
        };

    activateTransactionsMarketPlaceChild = () => {
            this.setState({
                ..._.mapValues(this.state, () => false),
                hasTransactionsMarketPlaceDropDownActiveChild: true
            })
        };

    navigation = (role) => {
      {/* role = SERVICE_OWNER; TODO mxar remove it*/}
        return role === SERVICE_OWNER ?
            <Nav bsStyle="pills" stacked className="sidebar panel-primary shadow">
               {/* <NavItem eventKey="user-details" onSelect={this.handleSelect}>
                   <strong> User Details </strong>
                </NavItem>*/}

                 <NavItemDropDown
                   itemId="user-profile-dropdown"
                   title="User Profile"
                   hasActiveChild = {this.state.hasProfileDropDownActiveChild}
                   activateChild  = {this.activateProfileChild}
                   dropDownList   = {this.profileDropDownList}
                 />

                 <NavItemDropDown
                    itemId="marketplace-dropdown"
                    title="IoT MarketPlace"
                    hasActiveChild = {this.state.hasIoTMarketPlaceDropDownActiveChild}
                    activateChild  = {this.activateIoTMarketPlaceChild}
                    dropDownList   = {this.ioTMarketPlaceDropDownList}

                />
                 <NavItemDropDown
                    itemId="exchange-marketplace-dropdown"
                    title="Exchange MarketPlace"
                    hasActiveChild = {this.state.hasExchangeMarketPlaceDropDownActiveChild}
                    activateChild  = {this.activateExchangeMarketPlaceChild}
                    dropDownList   = {this.exchangeMarketPlaceDropDownList}
                />

                <NavItemDropDown
                    itemId="transactions-marketplace-dropdown"
                    title="Transactions"
                    hasActiveChild = {this.state.hasTransactionsMarketPlaceDropDownActiveChild}
                    activateChild  = {this.activateTransactionsMarketPlaceChild}
                    dropDownList   = {this.transactionsMarketPlaceDropDownList}
                />
            </Nav>
             :
            <Nav bsStyle="pills" stacked className="sidebar panel-primary shadow">
              {/*  <NavItem eventKey="user-details" onSelect={this.handleSelect}>
                   <strong> User Details </strong>
                </NavItem>*/}

                 <NavItemDropDown
                   itemId="user-profile-dropdown"
                   title="User Profile"
                   hasActiveChild = {this.state.hasProfileDropDownActiveChild}
                   activateChild  = {this.activateProfileChild}
                   dropDownList   = {this.profileDropDownList}
                  />

                 <NavItemDropDown
                    itemId="marketplace-dropdown"
                    title="IoT MarketPlace"
                    hasActiveChild  = {this.state.hasIoTMarketPlaceDropDownActiveChild}
                    activateChild   = {this.activateIoTMarketPlaceChild}
                    dropDownList    = {this.ioTMarketPlaceDropDownList}
                />
                   <NavItemDropDown
                    itemId="exchange-marketplace-dropdown"
                    title="Exchange MarketPlace"
                    hasActiveChild  = {this.state.hasExchangeMarketPlaceDropDownActiveChild}
                    activateChild   = {this.activateExchangeMarketPlaceChild}
                    dropDownList    = {this.exchangeMarketPlaceDropDownList}
                />
                <NavItemDropDown
                    itemId="transactions-marketplace-dropdown"
                    title="Transactions"
                    hasActiveChild = {this.state.hasTransactionsMarketPlaceDropDownActiveChild}
                    activateChild  = {this.activateTransactionsMarketPlaceChild}
                    dropDownList   = {this.transactionsMarketPlaceDropDownList}
                />


            </Nav>
    };

    tabsContent = (role, username) => {
       {/*role = SERVICE_OWNER; TODO mxar remove it*/}
        return (
            <Tab.Content animation className="clearfix">
               {/*} <Tab.Pane eventKey="user-details">
                    <UserDetails bill={username}/>
                </Tab.Pane>*/}
                {
                    role === SERVICE_OWNER ?
                    <Fragment>
                        <Tab.Pane eventKey="iot-market-place">
                          <h1>IoT MarketPlace</h1>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fed-marketplaces">
                         <h1 style={{color: "#FFFFFF"}}></h1>
                         <FederationMarketPlaceDetails/>
                        </Tab.Pane>
                       {/* <Tab.Pane eventKey="global-marketplace"> */}
                        {/*  <h1  style={{color: "#FFFFFF"}}>Global MarketPlace</h1>*/}
                        {/* </Tab.Pane>*/}
                        <Tab.Pane eventKey="exchange-tokens-marketplace">
                         <h1  style={{color: "#FFFFFF"}}>Exchange MarketPlace</h1>
                          <ExchangeMarketPlaceDetails/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="exchange-offers">
                         <h1  style={{color: "#FFFFFF"}}>Proposals Page</h1>
                          <ExchangeOffersDetails/>
                        </Tab.Pane>

                        <Tab.Pane eventKey="create-product">
                         <CreateProductsDetails/>
                        </Tab.Pane>
                       <Tab.Pane eventKey="auditing-receipt-buyer">
                         <AuditingReceiptBuyerDetails/>
                        </Tab.Pane>
                         <Tab.Pane eventKey="auditing-receipt-seller">
                          <AuditingReceiptSellerDetails/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="auditing-logs">
                          <AuditingLogsDetails/>
                        </Tab.Pane>

                        <Tab.Pane eventKey="user-details">
                          <UserDetails bill={username}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="user-wallet">
                          <UserWalletDetails/>
                        </Tab.Pane>


                    </Fragment> :

                    <Fragment>
                        <Tab.Pane eventKey="iot-market-place">
                          <h1>IoT MarketPlace</h1>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fed-marketplaces">
                         <h1  style={{color: "#FFFFFF"}}></h1>
                         <FederationMarketPlaceDetails/>
                        </Tab.Pane>
                       {/* <Tab.Pane eventKey="global-marketplace">*/}
                       {/*  <h1  style={{color: "#FFFFFF"}}>Global MarketPlace</h1>*/}
                      {/*  </Tab.Pane>*/}
                        <Tab.Pane eventKey="exchange-tokens-marketplace">
                          <h1  style={{color: "#FFFFFF"}}>Exchange MarketPlace</h1>
                           <ExchangeMarketPlaceDetails/>
                         </Tab.Pane>
                         <Tab.Pane eventKey="exchange-offers">
                           <h1  style={{color: "#FFFFFF"}}>Proposals</h1>
                           <ExchangeOffersDetails/>
                         </Tab.Pane>
                        <Tab.Pane eventKey="create-product">
                         <CreateProductsDetails/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="auditing-receipt-buyer">
                         <AuditingReceiptBuyerDetails/>
                        </Tab.Pane>
                         <Tab.Pane eventKey="auditing-receipt-seller">
                          <AuditingReceiptSellerDetails/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="auditing-logs">
                          <AuditingLogsDetails/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="user-details">
                          <UserDetails bill={username}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="user-wallet">
                          <UserWalletDetails/>
                        </Tab.Pane>
                    </Fragment>

                }
            </Tab.Content>
        )
    };

    render() {
        /////////////////////////////////////////////
       {/*this.props.userDetails.role = SERVICE_OWNER;*/}
       {/*this.props.userDetails.username = "icom1";*/}
        //////////////////////REMOVE IT ////////////////////////////
        {/*this.props.userDetails.username  = "icom1";*/}
        {/*this.props.userDetails.password  = "icom";*/}
        {/*this.props.userDetails.role = SERVICE_OWNER;*/}

        const { role, username } = this.props.userDetails;

        return(
            <div className="main cpanel">
                <div className="container">
                    <Tab.Container id="tabbable-menu" defaultActiveKey="user-details">
                        <Row className="clearfix">
                            <Col lg={3} md={3} sm={3} xs={3}>
                                {this.navigation(role)}

                            </Col>
                            <Col lg={9} md={9} sm={9} xs={9}>
                                {this.tabsContent(role, username)}
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails
    }
}

export default connect(mapStateToProps,{fetchJoinPendingRequests})(Main);