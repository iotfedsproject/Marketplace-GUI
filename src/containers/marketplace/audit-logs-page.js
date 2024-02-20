import React, { Component ,useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import VisibilitySensor from 'react-visibility-sensor';
import FederationMarketPlaceItem from "./federated-marketplace-item";
import FederationMarketPlaceResource from "./federated-marketplace-resource";
import FederationMarketPlaceResourceInBasket from "./federated-marketplace-resource-in-basket.js"

import AccessLogsItem from "./access-logs-item.js"
import OthersExchangeToken from "./others-exchanged-token.js"

import { search } from "./utils";
import Scroll from './Scroll';
import {federatedMarketPlaceItemWidth,federatedMarketPlaceResourceWidth,federatedMarketPlaceResourceHeight,NOT_DEFINED_YET} from './marketPlaceDefinitions';
import {widthOfBorder,inputBorderColor1,labelColor1,IOTFEDS_PRODUCT_PURCHASED_FROM, IOTFEDS_PRODUCT_PURCHASED_TO, IOTFEDS_PRODUCT_ID
} from './marketPlaceDefinitions';


import {
    auditAccessLogVerify,auditAccessLogs,removeTokenFromExchange,makeExchangeableToken,searchAllExchangeTokens, searchMyExchangeTokens, searchOthersExchangeTokens,searchResourcesFromFederatedMarketPlace,fetchResourcesFromFederatedMarketplace,searchProductsFromFederatedMarketPlace,
    checkFederatedMarketProductPrice,createNewProduct,resetCreateProduct,exchangeTokens
} from "../../actions/federation-actions";

import { Panel, Glyphicon,Modal, Button,Row, Col,FormGroup,FormControl, HelpBlock ,ControlLabel } from "react-bootstrap";

import styles from './styles/styleCart.css';
import { createSelector } from "reselect";
import { getUserName } from "../../selectors";
import { FieldError, AlertDismissable,FieldSuccess } from "../../helpers/errors";


import {
    changeModalState,
    dismissAlert,
    DISMISS_FEDERATION_DELETION_SUCCESS_ALERT,
    DISMISS_FEDERATION_DELETION_ERROR_ALERT,
    DISMISS_FEDERATION_LEAVE_SUCCESS_ALERT,
    DISMISS_FEDERATION_LEAVE_ERROR_ALERT,
    DISMISS_FEDERATION_INVITATION_SUCCESS_ALERT,
    DISMISS_FEDERATION_CHANGE_RULES_SUCCESS_ALERT
} from "../../actions";

import {
    activateFederationDeleteModal, deactivateFederationDeleteModal,
} from "../../actions/federation-actions";

axios.defaults.withCredentials = true;

const headers = {
    'X-Requested-With': 'XMLHttpRequest'
};
const ROOT_URL = "/marketplace";
var calculatedPriceForObservations = NOT_DEFINED_YET;
var calculatedPriceForStreaming    = NOT_DEFINED_YET;
var buttonIsPressed = false;

////// DONT USE state variables in handlers because are asynchronous ///

var CREATED_PRODUCT_DATE_FROM = "";
var CREATED_PRODUCT_DATE_TO   = "";
var listOfResourcesInProduct  = [];
var createdProductFrequency   = "";
var createdProductStreamingAvailability = false;
var RESOURCE_OBSERVATIONS =[];

var myProductId     = "";
var targetProductId = "";
var myUserId        = "";
var targetUserId    = "";
var canExchangeTokens = false;

var PURCHASED_PRODUCT_ID         = "";
var PURCHASED_PRODUCT_DATE_FROM  = "";
var PURCHASED_PRODUCT_DATE_TO    = "";



class AuditLogsPage extends Component {
//----------------------------------------------------------------------------------------------------
  constructor(){
   super();

   console.log("############# constructor ##########################");
   this.state = {
       showExchangeTokens:false,
       federatedMarketPlaceName:"undefined",
       federatedMarketPlaceId:"undefined",

       //The selected resource
       resourceId:"",
       resourceName:"  ",
       resourceDetails:" ",
       resourceDescription:" ",
       resourcePrice:" ",
       resourceTimeStampFrom:"00-00-00",
       resourceTimeStampTo:"00-00-00",
       resourceStreamingAvailability:false,
       resourceLocation:"",
       resourceFrequency:"",
       resourceNumOfObservations:"",
       resourceObservations:"",

       createdProductStreamingAvailability:false,
       createdProductFromNumberDate:0,
       createdProductToNumberDate:0,

       productFrequency:" ",
       productNumberOfObservations: " ",
       listOfProducts:[],
       loading: false,
       value: "",
       selectedToBuyProductId: "",
       selectedProductNameToBuy: "",
       selectedProductToBuyPrice: "",
       selectedProductToBuyDetails: "",
       selectedProductToBuyDescription: "",

       selectedProductToBuyFrom:"",
       selectedProductToBuyTo:"",
       selectedProductToBuyFrequency:"",
       selectedProductToBuyNumberOfObservations:"",

       from:"",
       to:"",
       expirationOfStreaming:"",
       frequency:"",
       numberOfObservations:1,

       searchFederatedProductsRequest: {},

       searchSellerIds:"",

       selectedProductForStreaming:false,
       calculatedProductPriceForObservations:0,
       calculatedProductPriceForStreaming:0,
       open: true,
       openConfigurationSettingsPanel: false,
       listOfResourcesFromDate:[],
       listOfResourcesToDate:[],
       totalPrice:0,
       resourceSelected:0,

       searchAdaptiveTrust:"",
       searchFederations:"",
       searchObservationProperties:"",
       searchDescriptions:"",
       searchResourceTrust:"",
       searchResourceType:"",
       searchResourceNames:"",
       searchMinPrice:"",
       searchMaxPrice:"",
       searchMinTrust:"",
       searchMaxTrust:"",
       searchMinRep:"",
       searchMaxRep:"",
       searchLongitude:"",
       searchLatitude:"",
       searchMaxDistance:"",
       searchResourceIds:"",
       searchPlatformId:"",
       searchLocations:"",

       //created product definitions
       productName:"",
       productDetails:"",
       productDescriptions:"",
       productVerticals:"",

       //exchange marketplace
       myTokenToBeExchangedIndex:-1,
       othersTokenToBeExchangedIndex:-1,

    };


     this.searchMyExchangeTokens                             = this.searchMyExchangeTokens.bind(this);
     this.searchOthersExchangeTokens                         = this.searchOthersExchangeTokens.bind(this);
     this.searchAllExchangeTokens                            = this.searchAllExchangeTokens.bind(this);
     this.handleMyExchangeTokenButtonPressed                 = this.handleMyExchangeTokenButtonPressed.bind(this);
     this.handleOthersExchangeTokenButtonPressed             = this.handleOthersExchangeTokenButtonPressed.bind(this);
     //////
     this.handleSearchAccessLogs                             = this.handleSearchAccessLogs.bind(this);
     this.handleVerifyButtonPressed                          = this.handleVerifyButtonPressed.bind(this);
     ////
     this.handleRemoveTokenFromExchangeButtonPressed         = this.handleRemoveTokenFromExchangeButtonPressed.bind(this);



     this.togglePanel = this.togglePanel.bind(this);
     this.toggleConfigureProductPanel = this.toggleConfigureProductPanel.bind(this);
  }
//----------------------------------------------------------------------------------------------------
  togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
  };
//----------------------------------------------------------------------------------------------------
  toggleConfigureProductPanel = () => {
        this.setState({...this.state, openConfigurationSettingsPanel : !this.state.openConfigurationSettingsPanel});
  };
//----------------------------------------------------------------------------------------------------
searchMyExchangeTokens = () =>{
 this.props.searchMyExchangeTokens();
}//end
//----------------------------------------------------------------------------------------------------
searchAllExchangeTokens = (id) =>{
 this.props.searchAllExchangeTokens(id);
}//end
//----------------------------------------------------------------------------------------------------
searchOthersExchangeTokens = () =>{
 this.props.searchOthersExchangeTokens();
}//end
//----------------------------------------------------------------------------------------------------
handleSearchAccessLogs = () =>{
 const jsonRequestData = { "product_id": PURCHASED_PRODUCT_ID,"fromDate": PURCHASED_PRODUCT_DATE_FROM,"toDate": PURCHASED_PRODUCT_DATE_TO};
 this.props.auditAccessLogs(jsonRequestData);
}//end
//----------------------------------------------------------------------------------------------------
handleMyExchangeTokenButtonPressed = (props) => {
 this.setState({ myTokenToBeExchangedIndex:props.index });//perhaps must be global var
 myProductId = props.product;
 myUserId    = props.owner;

 this.state.othersTokenToBeExchangedIndex===-1?canExchangeTokens=false:canExchangeTokens=true;
}//end
//----------------------------------------------------------------------------------------------------
handleOthersExchangeTokenButtonPressed = (props) => {
 this.setState({ othersTokenToBeExchangedIndex:props.index });//perhaps must be global var
 targetProductId = props.product;
 targetUserId    = props.owner;

 this.state.myTokenToBeExchangedIndex===-1?canExchangeTokens=false:canExchangeTokens=true;

}//end
//----------------------------------------------------------------------------------------------------
handleRemoveTokenFromExchangeButtonPressed = (props) => {
 myProductId = props.product;
 myUserId    = props.owner;
 this.props.removeTokenFromExchange(myUserId,myProductId);
}//end
//----------------------------------------------------------------------------------------------------
 handleVerifyButtonPressed= (props) => {
 const { username } = this.props.userDetails;

 const jsonRequestData = {
    "logs": {
            "TransactionID": props.transactionId,
            "User": props.user,
            "ProductID": props.productId,
            "DateAccessed": props.dateAccess
        },
    "user_id":username
 };
  this.props.auditAccessLogVerify(jsonRequestData);
 }//end
//----------------------------------------------------------------------------------------------------
 componentDidMount() {
 }//end
 //----------------------------------------------------------------------------------------------------
  search = async val => {
    this.setState({ loading: true });
    const results = await search(
    `${ROOT_URL}/user/cpanel/getMovies`
      //`https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );
    //const movies = results;
    this.setState({ results, loading: false });
  };
/////////////////////////// Setting from,to,numberOfObservations, expirationOfStreaming variables //////////////////////////
//--------------------------------------------------------------------------------------------------
onExpirationStreamChangeHandler = async e => {
  this.setState({ expirationOfStreaming: e.target.value });
};
//--------------------------------------------------------------------------------------------------
onFrequencyChangeHandler = async e => {
  this.setState({ frequency: e.target.value });
};

//--------------------------------------------------------------------------------------------------
resetStateVariables = () => {
 this.setState({

       federatedMarketPlaceName:"undefined",
       federatedMarketPlaceId:"undefined",

       //The selected resource
       resourceId:"",
       resourceName:"  ",
       resourceDetails:" ",
       resourceDescription:" ",
       resourcePrice:" ",
       resourceTimeStampFrom:"00-00-00",
       resourceTimeStampTo:"00-00-00",
       resourceStreamingAvailability:false,
       resourceLocation:"",
       resourceFrequency:"",
       resourceNumOfObservations:"",
       resourceObservations:"",

       createdProductStreamingAvailability:false,
       createdProductFromNumberDate:0,
       createdProductToNumberDate:0,

       productFrequency:" ",
       productNumberOfObservations: " ",
       listOfProducts:[],
       loading: false,
       value: "",
       selectedToBuyProductId: "",
       selectedProductNameToBuy: "",
       selectedProductToBuyPrice: "",
       selectedProductToBuyDetails: "",
       selectedProductToBuyDescription: "",

       selectedProductToBuyFrom:"",
       selectedProductToBuyTo:"",
       selectedProductToBuyFrequency:"",
       selectedProductToBuyNumberOfObservations:"",

       from:"",
       to:"",
       expirationOfStreaming:"",
       frequency:"",
       numberOfObservations:1,

       searchFederatedProductsRequest: {},

       searchSellerIds:"",

       selectedProductForStreaming:false,
       calculatedProductPriceForObservations:0,
       calculatedProductPriceForStreaming:0,
       open: true,
       openConfigurationSettingsPanel: false,
       listOfResourcesFromDate:[],
       listOfResourcesToDate:[],
       totalPrice:0,
       resourceSelected:0,

       searchAdaptiveTrust:"",
       searchFederations:"",
       searchObservationProperties:"",
       searchDescriptions:"",
       searchResourceTrust:"",
       searchResourceType:"",
       searchResourceNames:"",
       searchMinPrice:"",
       searchMaxPrice:"",
       searchMinTrust:"",
       searchMaxTrust:"",
       searchMinRep:"",
       searchMaxRep:"",
       searchLongitude:"",
       searchLatitude:"",
       searchMaxDistance:"",
       searchResourceIds:"",
       searchPlatformId:"",
       searchLocations:"",

       //created product definitions
       productName:"",
       productDetails:"",
       productDescriptions:"",
       productVerticals:"",

       //exchange marketplace
       myTokenToBeExchangedIndex:-1,
       othersTokenToBeExchangedIndex:-1,
       showExchangeTokens:false

     });

     myProductId     = "";
     targetProductId = "";
     myUserId        = "";
     targetUserId    = "";
     canExchangeTokens = false;


   };
//--------------------------------------------------------------------------------------------------
onShowMarketplacesHandler = async e => {

 calculatedPriceForObservations = NOT_DEFINED_YET;
 calculatedPriceForStreaming    = NOT_DEFINED_YET;
 buttonIsPressed = false;

////// DONT USE state variables in handlers because are asynchronous ///

 CREATED_PRODUCT_DATE_FROM = "";
 CREATED_PRODUCT_DATE_TO   = "";
 listOfResourcesInProduct  = [];
 createdProductFrequency   = "";
 createdProductStreamingAvailability = false;
 RESOURCE_OBSERVATIONS =[];
 canExchangeTokens = false;
 this.resetStateVariables();
 this.setState({ showExchangeTokens: false });
 this.props.resetCreateProduct();
};
//--------------------------------------------------------------------------------------------------
onSearchChangeHandler = async (e,code) => {

if(code === IOTFEDS_PRODUCT_PURCHASED_FROM){
   PURCHASED_PRODUCT_DATE_FROM = e.target.value;
   return;
}

if(code === IOTFEDS_PRODUCT_PURCHASED_TO){
   PURCHASED_PRODUCT_DATE_TO = e.target.value;
   return;
}

if(code === IOTFEDS_PRODUCT_ID){
   PURCHASED_PRODUCT_ID = e.target.value;
   return;
}
}//end
//-----------------------------------------------------------------------------------------------------------
get renderAccessLogsItems(){
   if (this.props.federations.availableAccessLogs){

    let ReceiptsOfPurchasedProducts = <div><h1 style={{color: "#FFFFFF"}}><strong>List of access logs</strong></h1>  <h3 style={{color: "#FFFFFF"}}>No access logs found</h3></div>;
    const { username } = this.props.userDetails;
    const filteredData = _.filter(this.props.federations.availableAccessLogs, { User: username });
    var sizeOfReceiptBuyerItems = Object.keys(filteredData).length;

    {ReceiptsOfPurchasedProducts= _.map(filteredData, (member) =>
      <AccessLogsItem
       transactionId   = {member.TransactionID}
       user            = {member.User}
       productId       = {member.ProductID}
       dateAccessed    = {member.DateAccessed}
       itemWidth       = {federatedMarketPlaceItemWidth}
       handleVerifyButtonPressed = {this.handleVerifyButtonPressed}

       backgroundColor = '#FFFFFF'
      />
    )}
    return (<div><h2 style={{color: "#FFFFFF",marginTop: '200px'}}><strong>Found {sizeOfReceiptBuyerItems} access logs</strong></h2>{ReceiptsOfPurchasedProducts}</div>);
   }
//}
}//end
//-------------------------------------------------------------------------------
   onChange = (isVisible) => {
      if (isVisible) {
        // Component became visible
        console.log('Component is now visible');
        //this.setState({ showExchangeTokens: false });
        //alert('Component is now visible');
      }
    }//end
//-------------------------------------------------------------------------------
  render() {
    const { audit_access_logs_error_message, auditAccessLogsMessage } = this.props.federations;

    return (
     <VisibilitySensor onChange={this.onChange}>
      <div className="container-fluid movie-app">
       <FieldError error={audit_access_logs_error_message}/>
       <FieldSuccess message={auditAccessLogsMessage}/>


        {/*****************************************************/}
        <h1 style={{color: '#FFFFFF'}}><strong>Access logs page</strong></h1>
        <div>
           <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
               <label style={{color: labelColor1, fontSize:"18px" }}>Product Id</label>
               <input type="text" className="form-control" placeholder="Insert the product id" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_PRODUCT_ID)}/>
          </div>
        <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
              <label style={{color: labelColor1, fontSize:"18px" }}>Product date bought from:</label>
              <input type="text" className="form-control" placeholder="Insert date bought from " onChange={e => this.onSearchChangeHandler(e,IOTFEDS_PRODUCT_PURCHASED_FROM)}/>
            </div>
        </div>

       <div>
           <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
             <label style={{color: labelColor1, fontSize:"18px" }}>Product date bought to:</label>
              <input type="text" className="form-control" placeholder="Insert date bought to " onChange={e => this.onSearchChangeHandler(e,IOTFEDS_PRODUCT_PURCHASED_TO)}/>
            </div>

       </div>


       {/******************************************/}
             <Button bsStyle="primary" style ={{float:"right",marginRight:"20px",marginTop:"40px"}} onClick={e => this.handleSearchAccessLogs(e)}>
                       <span className="glyphicon glyphicon-search"></span>
                        &nbsp; Search
                       </Button>
       <div>
        <div className='row'>
         {this.renderAccessLogsItems}
        </div>
       </div>

       </div>
      </VisibilitySensor>
    );
  }
}//end
//------------------------------------------------------------------------------
function mapStateToProps(state) {
    console.log("from federated marketplace:");
    console.log(state.federations);

    return {
        federations: state.federations,
        userDetails: state.userDetails

    };
}

export default connect(mapStateToProps, {
    fetchResourcesFromFederatedMarketplace,
    searchProductsFromFederatedMarketPlace,
    checkFederatedMarketProductPrice,
    searchResourcesFromFederatedMarketPlace,
    createNewProduct,
    resetCreateProduct,
    dismissAlert,
    activateFederationDeleteModal,
    deactivateFederationDeleteModal,
    searchMyExchangeTokens,
    searchOthersExchangeTokens,
    searchAllExchangeTokens,
    makeExchangeableToken,
    removeTokenFromExchange,
    auditAccessLogs,
    auditAccessLogVerify,
    exchangeTokens
})(withRouter(AuditLogsPage));



