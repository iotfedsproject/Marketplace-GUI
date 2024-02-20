import React, { Component ,useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import VisibilitySensor from 'react-visibility-sensor';
import FederationMarketPlaceItem from "./federated-marketplace-item";
import FederationMarketPlaceResource from "./federated-marketplace-resource";
import FederationMarketPlaceResourceInBasket from "./federated-marketplace-resource-in-basket.js"

import MyToken from "./my-token.js"
import OthersExchangeToken from "./others-exchanged-token.js"

import { search } from "./utils";
import Scroll from './Scroll';
import {federatedMarketPlaceItemWidth,federatedMarketPlaceResourceWidth,federatedMarketPlaceResourceHeight,NOT_DEFINED_YET} from './marketPlaceDefinitions';
import {widthOfBorder,inputBorderColor1,labelColor1,IOTFEDS_MIN_REPUTATION,IOTFEDS_MAX_REPUTATION, IOTFEDS_LONGITUDE, IOTFEDS_LATITUDE, IOTFEDS_MAX_DISTANCE,IOTFEDS_SELLER_IDS, IOTFEDS_VERTICALS,IOTFEDS_RECOURCE_NAMES,IOTFEDS_RESOURCE_OBSERVED_PROPERTIES,
IOTFEDS_RESOURCE_DESCRIPTIONS,IOTFEDS_RESOURCE_ADAPTIVE_TRUST,IOTFEDS_RESOURCE_FEDERATION,IOTFEDS_RESOURCE_RESOURCE_TRUST,IOTFEDS_PLATFORM_ID,
IOTFEDS_RESOURCE_RESOURCE_TYPE,IOTFEDS_RESOURCE_NAMES,IOTFEDS_RESOURCE_IDS,IOTFEDS_MIN_PRICE,IOTFEDS_MAX_PRICE,IOTFEDS_MAX_TRUST,IOTFEDS_MIN_TRUST,IOTFEDS_LOCATIONS,
IOTFEDS_NAME_OF_PRODUCT,IOTFEDS_DETAILS_OF_PRODUCT,IOTFEDS_DESCRIPTIONS_OF_PRODUCT,IOTFEDS_VERTICALS_OF_PRODUCT
} from './marketPlaceDefinitions';


import {
    removeTokenFromExchange,makeExchangeableToken,searchAllExchangeTokens, searchMyExchangeTokens, getBalance, searchOthersExchangeTokens,searchResourcesFromFederatedMarketPlace,fetchFederatedMarketPlaces,fetchResourcesFromFederatedMarketplace,searchProductsFromFederatedMarketPlace,
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

const imagePath = "/assets/img/fedcoin.png";

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



class UserWalletPage extends Component {
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

     ////////
     this.searchMyExchangeTokens                             = this.searchMyExchangeTokens.bind(this);
     this.searchOthersExchangeTokens                         = this.searchOthersExchangeTokens.bind(this);
     this.searchAllExchangeTokens                            = this.searchAllExchangeTokens.bind(this);
     this.handleMyExchangeTokenButtonPressed                 = this.handleMyExchangeTokenButtonPressed.bind(this);
     this.handleOthersExchangeTokenButtonPressed             = this.handleOthersExchangeTokenButtonPressed.bind(this);
     this.handleExchange                                     = this.handleExchange.bind(this);
     this.handleMakeExchangeTokenButtonPressed               = this.handleMakeExchangeTokenButtonPressed.bind(this);
     //this.makeExchangeableToken                              = this.makeExchangeableToken.bind(this);
     this.handleRemoveTokenFromExchangeButtonPressed         = this.handleRemoveTokenFromExchangeButtonPressed.bind(this);

     this.handleRefreshMyWalletPage                          = this.handleRefreshMyWalletPage.bind(this);


     ///////

     this.handleFederatedMarketPlaceClick                    = this.handleFederatedMarketPlaceClick.bind(this);
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
//makeExchangeableToken = (userId,productId) =>{
// this.props.makeExchangeableToken(userId,productId);
//}//end
//----------------------------------------------------------------------------------------------------
searchOthersExchangeTokens = () =>{
 this.props.searchOthersExchangeTokens();
}//end
//----------------------------------------------------------------------------------------------------
handleExchange = () =>{
      const jsonMessage = {
          "productId": myProductId,
          "targetProductId": targetProductId,
          "targetUser": targetUserId,
          "userId":   myUserId
      };

this.props.exchangeTokens(jsonMessage);
      //alert(jsonMessage.productId);
     //  alert(jsonMessage.targetProductId);
      //  alert(jsonMessage.targetUser);
       //  alert(jsonMessage.userId);
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
 //marketplace = props.marketplace
 this.props.removeTokenFromExchange(myUserId,myProductId,props.marketplace);
 this.props.searchMyExchangeTokens(this.props.userDetails.username);
}//end
//----------------------------------------------------------------------------------------------------
handleMakeExchangeTokenButtonPressed = (props) => {
 myProductId = props.product;
 myUserId    = props.owner;
 //marketplace = props.marketplace
 this.props.makeExchangeableToken(myUserId,myProductId,props.marketplace);
 this.props.searchMyExchangeTokens(this.props.userDetails.username);
}//end
//----------------------------------------------------------------------------------------------------
 handleFederatedMarketPlaceClick = (id,name) => {
    this.setState({ showExchangeTokens: true });
    this.setState({ federatedMarketPlaceName: name });
    this.setState({ federatedMarketPlaceId:id });
    this.props.searchAllExchangeTokens(id);
    console.log(this.props.federations);
 }
//----------------------------------------------------------------------------------------------------
handleRefreshMyWalletPage(){
 this.props.getBalance();
 const { username } = this.props.userDetails;
 console.log('www Username:', username);
 this.props.searchMyExchangeTokens(this.props.userDetails.username);
}//end
//----------------------------------------------------------------------------------------------------
 componentDidMount() {
    this.props.getBalance();
 }//end
 //----------------------------------------------------------------------------------------------------
 componentDidUpdate(prevProps) {

       if (
         prevProps.userDetails &&
         prevProps.userDetails.username !== undefined &&
         this.props.userDetails &&
         this.props.userDetails.username !== undefined &&
         prevProps.userDetails.username !== this.props.userDetails.username
       ) {
         const { username } = this.props.userDetails;
         console.log('www Username:', username);
         this.props.searchMyExchangeTokens(this.props.userDetails.username);
       }
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
//-----------------------------------------------------------------------------------------------------------
get renderMyBalance(){

  if (this.props.federations.availableBalance){
    return (
    <div>
     <img className="br-100 h4 w4 dib"   src={process.env.PUBLIC_URL + imagePath} />
     <h4 style={{color: "#FFFFFF"}}><strong>Balance in Fed Coins : </strong> {this.props.federations.availableBalance}</h4>
    </div>);
  }

}//end
//-----------------------------------------------------------------------------------------------------------
get renderMyTokens(){
//if(this.state.showExchangeTokens == true){
   if (this.props.federations.myAvailableExchangeTokens){

    let myExchangeTokens = <div> <h3 style={{color: "#FFFFFF"}}>No tokens found in my wallet</h3></div>;
    const { username } = this.props.userDetails;
    //const filteredData = _.filter(this.props.federations.myAvailableExchangeTokens, { owner: username });

    {myExchangeTokens = _.map(this.props.federations.myAvailableExchangeTokens, (member,index) =>
      <MyToken
       key     = {index}
       owner   = {member.owner}
       product = {member.productId}
       from    = {member.dataAvailableFrom}
       to      = {member.dataAvailableUntil}
       toBeExchanged = {member.toBeExchanged}
       accessTimes   = {member.accessTimes}
       marketplace   = {member.marketplaceId}
       handleButtonPressed = {this.handleMyExchangeTokenButtonPressed}
       handleMakeExchangeTokenButtonPressed        = {this.handleMakeExchangeTokenButtonPressed}
       handleRemoveTokenFromExchangeButtonPressed  = {this.handleRemoveTokenFromExchangeButtonPressed}
       itemWidth                                   = {federatedMarketPlaceItemWidth}
       index = {index}
       backgroundColor = {index===this.state.myTokenToBeExchangedIndex?'#6495ED':'#FFFFFF'}

      />
    )}
    return (<div><h4 style={{color: "#FFFFFF"}}><strong>My tokens in wallet</strong></h4>{myExchangeTokens}</div>);
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
    const { myAvailableExchangeTokens,fetching_my_tokens_error,successfulMyTokensMessage,balance_error_message } = this.props.federations;

    return (
     <VisibilitySensor onChange={this.onChange}>
      <div className="container-fluid movie-app">
       <FieldError error={fetching_my_tokens_error}/>
       <FieldSuccess message={successfulMyTokensMessage}/>:
       <FieldError error={balance_error_message}/>
        <div className='row'>
         <h1 style={{color: '#FFFFFF'}}><strong> My Wallet </strong> </h1>
         </div>

        <Button bsStyle="info" style ={{float:"right",marginLeft:"20px"}} onClick={e => this.handleRefreshMyWalletPage(e)}>
         <span className="glyphicon glyphicon-refresh"></span>
          &nbsp; Refresh my wallet page
        </Button>

        <div className='row'>
         {this.renderMyBalance}
        </div>
        <div className='row'>
         {this.renderMyTokens}
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
    fetchFederatedMarketPlaces,
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
    getBalance,
    searchOthersExchangeTokens,
    searchAllExchangeTokens,
    makeExchangeableToken,
    removeTokenFromExchange,
    exchangeTokens
})(withRouter(UserWalletPage));



