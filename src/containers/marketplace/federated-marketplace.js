import React, { Component ,useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import VisibilitySensor from 'react-visibility-sensor';
import FederationMarketPlaceItem from "./federated-marketplace-item";
import FederationMarketPlaceProduct from "./federated-marketplace-product";

import { search } from "./utils";
import Scroll from './Scroll';
import {federatedMarketPlaceItemWidth,federatedMarketPlaceProductWidth,federatedMarketPlaceProductHeight,NOT_DEFINED_YET} from './marketPlaceDefinitions';
import {widthOfBorder,inputBorderColor1,labelColor1,IOTFEDS_MIN_REPUTATION,IOTFEDS_MAX_REPUTATION, IOTFEDS_LONGITUDE, IOTFEDS_LATITUDE, IOTFEDS_MAX_DISTANCE,IOTFEDS_SELLER_IDS,
  IOTFEDS_VERTICALS,IOTFEDS_RESOURCES,IOTFEDS_OBSERVED_PROPERTIES,IOTFEDS_PLATFORMS,IOTFEDS_DESCRIPTIONS,IOTFEDS_PRODUCT_NAMES,
  IOTFEDS_MIN_PRICE,IOTFEDS_MAX_PRICE,IOTFEDS_MAX_TRUST,IOTFEDS_MIN_TRUST,IOTFEDS_LOCATIONS,IOTFEDS_STREAMING} from './marketPlaceDefinitions';
import {
    fetchFederatedMarketPlaces,fetchProductsFromFederatedMarketPlace,searchProductsFromFederatedMarketPlace,checkFederatedMarketProductPrice,buyFederatedMarketPlaceProduct,
    resetMarketPlace,deleteProduct
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




class FederatedMarketPlace extends Component {

//----------------------------------------------------------------------------------------------------
  constructor(){
   super();

   console.log("############# constructor ##########################");
   this.state = {
       showFederatedMarketplaceProducts:false,
       federatedMarketPlaceName:"undefined",
       federatedMarketPlaceId:"undefined",

       //selected product configuration when the first time created
       productId:"",
       productName:"  ",
       productDetails:" ",
       productBoughtInfo:" ",
       productDescription:" ",
       productPrice:" ",                  // is going to be changed on check price the buyer and set to selectedProductToBuyPrice
       productTimeStampFrom:"00-00-00",   // is going to be changed from the buyer and set to selectedProductToBuyFrom
       productTimeStampTo:"00-00-00",     // is going to be changed from the buyer  and set to selectedProductToBuyFrom
       productStreamingAvailability:false,//is going to be changed from the buyer  and set to selectedProductForStreaming
       productFrequency:" ",              // is going to be changed from the buyer and set to selectedProductToBuyFrequency
       productNumberOfObservations: " ",  // is going to be changed from the buyer and set to selectedProductToBuyNumberOfObservations
       productSeller: "",
       productBuyer: "",

       productSelected:"", //is the product selected and changed the view on page

       //the product to be bought,and added in the path /product/buy
       selectedToBuyProductId: "",
       selectedProductNameToBuy: "",
       selectedProductToBuyPrice: "",
       selectedProductSeller: "",
       selectedProductBuyer: "",
       selectedProductToBuyFrom:"",
       selectedProductToBuyTo:"",
       selectedProductToBuyFrequency:"",
       selectedProductToBuyNumberOfObservations:"",
       selectedProductForStreaming:false,

       listOfProducts:[],
       loading: false,
       value: "",

       from:"",
       to:"",
       expirationOfStreaming:"",
       frequency:"",
       numberOfObservations:"",

       searchFederatedProductsRequest: {},
       //searching product criteria
       searchMinPrice:"",
       searchMaxPrice:"",
       searchMinTrust:"",
       searchMaxTrust:"",
       searchMinRep:"",
       searchMaxRep:"",
       searchLongitude:"",
       searchLatitude:"",
       searchMaxDistance:"",
       searchProductNames:"",
       searchSellerIds:"",
       searchResourceIds:"",
       searchDescriptions:"",
       searchLocations:"",
       searchPlatforms:"",
       searchObservationProperties:"",
       searchVerticals:"",
       searchStreaming:"true",


       calculatedProductPriceForObservations:0,
       calculatedProductPriceForStreaming:0,
       open: true,
       searchingMessage:""
     };
     this.handleFederatedMarketPlaceClick            = this.handleFederatedMarketPlaceClick.bind(this);
     this.handleFederatedMarketProductClick          = this.handleFederatedMarketProductClick.bind(this);
     this.handleFederatedMarketBuyProductClick       = this.handleFederatedMarketBuyProductClick.bind(this);
     this.handleSearchFederatedProducts              = this.handleSearchFederatedProducts.bind(this);
     this.handleFederatedMarketProductDeleteClick    = this.handleFederatedMarketProductDeleteClick.bind(this);
     this.togglePanel = this.togglePanel.bind(this);
  }//end
//----------------------------------------------------------------------------------------------------
resetPage( ){

  calculatedPriceForObservations = NOT_DEFINED_YET;
  calculatedPriceForStreaming    = NOT_DEFINED_YET;
  buttonIsPressed = false;
  this.resetStateVariables();

  this.setState({ showFederatedMarketplaceProducts: false });
  this.props.resetMarketPlace();
}//end
//----------------------------------------------------------------------------------------------------
 resetStateVariables = () => {
 this.setState({
       showFederatedMarketplaceProducts:false,
       federatedMarketPlaceName:"undefined",
       federatedMarketPlaceId:"undefined",

       //selected product configuration when the first time created
       productId:"",
       productName:"  ",
       productDetails:" ",
       productBoughtInfo: " ",
       productDescription:" ",
       productPrice:" ",                  // is going to be changed on check price the buyer and set to selectedProductToBuyPrice
       productTimeStampFrom:"00-00-00",   // is going to be changed from the buyer and set to selectedProductToBuyFrom
       productTimeStampTo:"00-00-00",     // is going to be changed from the buyer  and set to selectedProductToBuyFrom
       productStreamingAvailability:false,//is going to be changed from the buyer  and set to selectedProductForStreaming
       productFrequency:" ",              // is going to be changed from the buyer and set to selectedProductToBuyFrequency
       productNumberOfObservations: " ",  // is going to be changed from the buyer and set to selectedProductToBuyNumberOfObservations
       productSeller: "",
       productBuyer: "",

       productSelected:"", //is the product selected and changed the view on page

       //the product to be bought,and added in the path /product/buy
       selectedToBuyProductId: "",
       selectedProductNameToBuy: "",
       selectedProductToBuyPrice: "",
       selectedProductSeller: "",
       selectedProductBuyer: "",
       selectedProductToBuyFrom:"",
       selectedProductToBuyTo:"",
       selectedProductToBuyFrequency:"",
       selectedProductToBuyNumberOfObservations:"",
       selectedProductForStreaming:false,

       listOfProducts:[],
       loading: false,
       value: "",

       from:"",
       to:"",
       expirationOfStreaming:"",
       frequency:"",
       numberOfObservations:"",

       searchFederatedProductsRequest: {},
       //searching product criteria
       searchMinPrice:"",
       searchMaxPrice:"",
       searchMinTrust:"",
       searchMaxTrust:"",
       searchMinRep:"",
       searchMaxRep:"",
       searchLongitude:"",
       searchLatitude:"",
       searchMaxDistance:"",
       searchProductNames:"",
       searchSellerIds:"",
       searchResourceIds:"",
       searchDescriptions:"",
       searchLocations:"",
       searchPlatforms:"",
       searchObservationProperties:"",
       searchVerticals:"",
       searchStreaming:"true",


       calculatedProductPriceForObservations:0,
       calculatedProductPriceForStreaming:0,
       open: true,
       searchingMessage:""
     });
   };
//----------------------------------------------------------------------------------------------------
  togglePanel = () => {
        this.setState({...this.state, open : !this.state.open});
  };
//----------------------------------------------------------------------------------------------------
handleSearchFederatedProducts = (fedMarketplaceId,globalMarketplaceId,priceMin,priceMax,name,description,observedProperties,resources,platform,location,productTrustMin,productTrustMax,vertical)=>{
 this.props.searchProductsFromFederatedMarketPlace(fedMarketplaceId,globalMarketplaceId,priceMin,priceMax,name,description,observedProperties,resources,platform,location,productTrustMin,productTrustMax,vertical);
}//end
//----------------------------------------------------------------------------------------------------
 handleFederatedMarketPlaceClick = (id,name) => {
    //alert("Selected federated market place with id: " + id);
    this.setState({ showFederatedMarketplaceProducts: true });
    this.setState({ federatedMarketPlaceName: name });
    this.setState({ federatedMarketPlaceId:id });
    //alert(this.props.showFederatedMarketplaceProducts);
    //this.props.fetchProductsFromFederatedMarketPlace(id);
    console.log(this.props.federations);
 }
//----------------------------------------------------------------------------------------------------
  handleFederatedMarketProductDeleteClick = (id) =>{

  const { username } = this.props.userDetails;
  var password = this.props.federations.password;

  const credentials = {
            "clientId": "marketplaceClient",
            "password": password,
            "platformId": "SymbIoTe_Core_AAM",
            "username":   username
        };

   this.props.deleteProduct(id,credentials);
  }//end
//----------------------------------------------------------------------------------------------------
handleFederatedMarketProductClick = (id,name,description,details,price,from,to,streamingAvailability,frequency,vertical,maxNumberOfObservations,observedProperties,seller,boughtInfo) =>{
    this.setState({ showFederatedMarketplaceProducts: true });
    this.setState({ productName: name });
    this.setState({ productId:id });
    this.setState({ productDescription: description });
    this.setState({ productDetails:details });
    this.setState({ productBoughtInfo:boughtInfo});
    this.setState({ productPrice:price });
    this.setState({ productTimeStampFrom: from });
    this.setState({ productTimeStampTo:to });
    this.setState({ productStreamingAvailability:streamingAvailability });
    this.setState({ productSeller:seller });


    console.log("id = " + id);
    console.log("name = " +  name);
    console.log("description = "  + description);
    console.log("details = " + details);
    console.log("price = " + price);
    console.log("from = " + from);
    console.log("to = " + to);
    //console.log("streamingAvailability = " + streamingAvailability);
   // console.log("productSeller = " + productSeller);



    //reset
    //this.props.federations.calculatedProductPrice = null;
    calculatedPriceForObservations = NOT_DEFINED_YET;
    calculatedPriceForStreaming    = NOT_DEFINED_YET;
    buttonIsPressed                = false;
    this.setState({ productSelected:id });
}
//----------------------------------------------------------------------------------------------------
//dont use it
handleFederatedMarketBuyProductClick = (id,name,price,description,details) =>{
    //this.setState({ selectedToBuyProductId:id });
    //this.setState({ selectedProductNameToBuy:name });
    //this.setState({ selectedProductToBuyPrice:price });
    //this.setState({ selectedProductToBuyDetails:details });
    //this.setState({ selectedProductToBuyDescription:description });
}//end
//----------------------------------------------------------------------------------------------------
 componentDidMount() {
    this.props.fetchFederatedMarketPlaces();
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
  onFromDateChangeHandler = async e => {
    const dateParts = e.target.value.split('-');
    // Rearrange the parts in the desired order
    const rearrangedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;//`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    this.setState({ from: rearrangedDate });
  };
//--------------------------------------------------------------------------------------------------
onToDateChangeHandler = async e => {
    const dateParts = e.target.value.split('-');

    // Rearrange the parts in the desired order
    const rearrangedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;//`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    this.setState({ to: rearrangedDate });
  };
//--------------------------------------------------------------------------------------------------
onNumberOfObservationsChangeHandler = async e => {
 this.setState({ numberOfObservations: e.target.value });
};
//--------------------------------------------------------------------------------------------------
onExpirationStreamChangeHandler = async e => {
  const dateParts = e.target.value.split('-');

  // Rearrange the parts in the desired order
  const rearrangedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;//`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  this.setState({ expirationOfStreaming: rearrangedDate });
};
//--------------------------------------------------------------------------------------------------
onFrequencyChangeHandler = async e => {
  this.setState({ frequency: e.target.value });
};
//--------------------------------------------------------------------------------------------------
onSearchChangeHandler = async (e,code) => {

this.setState({ searchingMessage: " " });

if(code === IOTFEDS_STREAMING){
   this.setState({ searchStreaming: e.target.value });
   console.log("searchStreaming ",this.state.searchStreaming);
   return;
}

if(code === IOTFEDS_VERTICALS){
   this.setState({ searchVerticals: e.target.value });
   return;
}
if(code === IOTFEDS_RESOURCES){
     this.setState({ searchResourceIds: e.target.value });
     return;
}
if(code === IOTFEDS_OBSERVED_PROPERTIES){
       this.setState({ searchObservationProperties: e.target.value });
       return;
}
if(code === IOTFEDS_PLATFORMS){
  this.setState({ searchPlatforms: e.target.value });
 return;
}
if(code === IOTFEDS_DESCRIPTIONS){
   this.setState({ searchDescriptions: e.target.value });
   return;
}
if(code === IOTFEDS_PRODUCT_NAMES){
   this.setState({ searchProductNames: e.target.value });
   return;
}
if(code === IOTFEDS_MIN_PRICE){
   this.setState({ searchMinPrice: e.target.value });
   return;
}
if(code === IOTFEDS_MAX_PRICE){
   this.setState({ searchMaxPrice: e.target.value });
   return;
}

if(code === IOTFEDS_MIN_TRUST){
   this.setState({ searchMinTrust: e.target.value });
   return;
}
if(code === IOTFEDS_MAX_TRUST){
   this.setState({ searchMaxTrust: e.target.value });
   return;
}

if(code === IOTFEDS_LOCATIONS){
   this.setState({ searchLocations: e.target.value });
   return;
}


if(code === IOTFEDS_SELLER_IDS){
   this.setState({ searchSellerIds: e.target.value });
   return;
}


if(code === IOTFEDS_LATITUDE){
  this.setState({ searchLatitude: e.target.value });
   return;
}


if(code === IOTFEDS_LONGITUDE){
   this.setState({ searchLongitude: e.target.value });
   return;
}


if(code === IOTFEDS_MAX_DISTANCE){
   this.setState({ searchMaxDistance: e.target.value });
   return;
}

if(code === IOTFEDS_MIN_REPUTATION){
   this.setState({ searchMinRep: e.target.value });
   return;
}


if(code === IOTFEDS_MAX_REPUTATION){
   this.setState({ searchMaxRep: e.target.value });
   return;
}


};
//--------------------------------------------------------------------------------------------------
onShowMarketplacesHandler = async e => {
 this.resetPage();
};
//--------------------------------------------------------------------------------------------------
onSearchProductHandler = async e => {

//reset the searching message
this.setState({ searchingMessage: " " });

var searchVerticals;
if(this.state.searchVerticals.trim() ==="")
 searchVerticals =null;
else{
 searchVerticals = this.state.searchVerticals.split(',');
}
console.log("searchVerticals = " , searchVerticals);

var searchResourceIds;
if(this.state.searchResourceIds.trim() ==="")
 searchResourceIds =null;
 else{
 searchResourceIds =  this.state.searchResourceIds.split(',');
}
console.log("searchResourceIds = " , searchResourceIds);

var searchObservationProperties;
if(this.state.searchObservationProperties.trim() ==="")
 searchObservationProperties =null;
else{
 searchObservationProperties = this.state.searchObservationProperties.split(',');
}
console.log("searchObservationProperties = " , searchObservationProperties);

var searchPlatforms;
if(this.state.searchPlatforms.trim() =="")
 searchPlatforms =null;
else{
  searchPlatforms = this.state.searchPlatforms.split(',');
}
console.log("searchPlatforms = " , searchPlatforms);

var searchDescriptions;
if(this.state.searchDescriptions.trim() ==="")
 searchDescriptions =null;
else{
 searchDescriptions = this.state.searchDescriptions.split(',');
}
console.log("searchDescriptions = " , searchDescriptions);

var searchProductNames;
if(this.state.searchProductNames.trim() ==="")
 searchProductNames =null;
else{
 searchProductNames = this.state.searchProductNames.split(',');
}
console.log("searchProductNames =  " , searchProductNames);

var searchLocations;
if(this.state.searchLocations.trim() ==="")
 searchLocations =null;
else{
 searchLocations = this.state.searchLocations.split(',');
 }
console.log("searchLocations = " , searchLocations);

var searchSellerIds;
if(this.state.searchSellerIds.trim() ==="")
 searchSellerIds  = null;
 else{
  searchSellerIds = this.state.searchSellerIds.split(',');
}
console.log("searchSellerIds = " , searchSellerIds);

var searchLatitude;
if(this.state.searchLatitude ==="")
 searchLatitude  = null;
else
  searchLatitude =  Number(this.state.searchLatitude);
console.log("searchLatitude = " , searchLatitude);

var searchLongitude;
if(this.state.searchLongitude ==="")
 searchLongitude  = null;
else
 searchLongitude = Number(this.state.searchLongitude);
console.log("searchLongitude = " , searchLongitude);

var searchMaxDistance;
if(this.state.searchMaxDistance ==="")
 searchMaxDistance  = null;
else
 searchMaxDistance = Number(this.state.searchMaxDistance);
console.log("searchMaxDistance = " , searchMaxDistance);

var searchMinRep;
if(this.state.searchMinRep ==="")
 searchMinRep = null;
else
 searchMinRep  = Number(this.state.searchMinRep);
console.log("searchMinRep = " , searchMinRep);

var searchMaxRep;
if(this.state.searchMaxRep ==="")
 searchMaxRep  = null;
else
  searchMaxRep = Number(this.state.searchMaxRep);
console.log("searchMaxRep = " , searchMaxRep);

var searchMinPrice;
if(this.state.searchMinPrice ==="")
 searchMinPrice  = null;
else
 searchMinPrice = Number(this.state.searchMinPrice);
console.log("searchMinPrice = " , searchMinPrice);

var searchMaxPrice;
if(this.state.searchMaxPrice ==="")
 searchMaxPrice  = null;
else
 searchMaxPrice = Number(this.state.searchMaxPrice);
console.log("searchMaxPrice = " , searchMaxPrice);


var searchStreamingAvailability = true;

if(this.state.searchStreaming === "true")
 searchStreamingAvailability = true;
else
 searchStreamingAvailability = false;


if(searchMaxPrice === null && searchMinPrice === null && searchMaxRep === null && searchMinRep === null && searchMaxDistance === null && searchLongitude === null &&
  searchLatitude === null && searchSellerIds === null && searchLocations === null && searchProductNames === null && searchDescriptions == null &&
  searchPlatforms === null && searchObservationProperties === null && searchResourceIds === null && searchVerticals === null){
  this.setState({ searchingMessage: "No searching criteria found !!!" });
  return;
 }

var platformId = "SymbIoTe_Core_AAM";
var clientId   = "marketplaceClient";
//const { password, username } = this.props.userDetails;
var username = "marketplace";
var password = "marketplace";
this.props.searchProductsFromFederatedMarketPlace(this.state.federatedMarketPlaceName,
                                                   false,
                                                   searchSellerIds,
                                                   searchMinPrice,
                                                   searchMaxPrice,
                                                   searchProductNames,
                                                   searchDescriptions,
                                                   searchResourceIds,
                                                   searchMinRep,
                                                   searchMaxRep,
                                                   searchVerticals,
                                                   searchLocations,
                                                   searchStreamingAvailability,
                                                   username,password,clientId,platformId);


};
//--------------------------------------------------------------------------------------------------
//Note that since we selected the observation configuration the streaming is false.
onObservationsCheckPriceHandler = async e => {

    const { role, username } = this.props.userDetails;

   if(this.state.productId === ""){
      alert("No product selected");
      return;
   }

   if(this.state.numberOfObservations === ""){
      alert("Observation for product not defined");
      return;
   }
   if(this.state.to === ""){
     alert("Date to for product not defined");
     return;
   }
   if(this.state.from === ""){
     alert("Date from for product not defined");
     return;
   }
   ////////////////////////////////////////////
   //check if time frame is valid
 /*  var productFrom        = this.state.productTimeStampFrom;
   var productTimeStampTo = this.state.productTimeStampTo;

   var [day, month, year] = productFrom.split('-');

   // Create a new Date object with the rearranged parts
   var dateObject = new Date(`${month}/${day}/${year}`);

   // Get the epoch time (in milliseconds)
   const epochSpecifiedTimeFrom = dateObject.getTime();

   //calculate the specified to time
   var [day, month, year] = productTimeStampTo.split('-');

   // Create a new Date object with the rearranged parts
   var dateObject = new Date(`${month}/${day}/${year}`);

   // Get the epoch time (in milliseconds)
   const epochSpecifiedTimeTo = dateObject.getTime();

   //calculate the configured from buyer from time
   var [day, month, year] = this.state.from.split('-');

   // Create a new Date object with the rearranged parts
   var dateObject = new Date(`${month}/${day}/${year}`);

   // Get the epoch time (in milliseconds)
   const epochConfiguredTimeFrom = dateObject.getTime();

  //calculate the configured from buyer to time
   var [day, month, year] = this.state.to.split('-');

   // Create a new Date object with the rearranged parts
   var dateObject = new Date(`${month}/${day}/${year}`);

   // Get the epoch time (in milliseconds)
   const epochConfiguredTimeTo = dateObject.getTime();

  //validate from date epochConfiguredTimeFrom
  var isInRange = epochConfiguredTimeFrom >= epochSpecifiedTimeFrom && epochConfiguredTimeFrom <= epochSpecifiedTimeTo;

  if(isInRange === false){
   alert("Invalid value for date from");
   return;
  }

  //validate from date epochConfiguredTimeTo
  var isInRange = epochConfiguredTimeTo >= epochSpecifiedTimeFrom && epochConfiguredTimeTo <= epochSpecifiedTimeTo;

  if(isInRange === false){
   alert("Invalid value for date to");
   return;
  }

  //validate if from< to
   if(epochConfiguredTimeFrom > epochConfiguredTimeTo){
     alert("date from should be less than date to");
     return;
   }
*/
  ////////////////////////////////////////////
    // create the json message for check price to forward it to marketplace backend
    const jsonMessage = {
          "product_id": this.state.productId,
          "user_id": username,
          "marketplace": this.state.federatedMarketPlaceName,
          "access":   parseInt(this.state.numberOfObservations, 10),
          "streaming": false,
          "lp": this.state.from,
          "hp": this.state.to,
          "fp": "0",
      };

   console.log(jsonMessage);
   console.log("role = ",role);
   console.log("username = ",username);

   this.setState({ selectedProductForStreaming:false });
   this.props.checkFederatedMarketProductPrice(jsonMessage);
   buttonIsPressed = true;
 };
//--------------------------------------------------------------------------------------------------
//Note that since we selected the streaming configuration the streaming is true.
onStreamingCheckPriceHandler = async e => {
     const { role, username } = this.props.userDetails;

  if(this.state.productId === ""){
      alert("No product selected");
      return;
   }
   if(this.state.frequency === ""){
      alert("Frequency for product not defined");
      return;
   }
   if(this.state.expirationOfStreaming === ""){
     alert("Expiration date for product not defined");
     return;
   }

  ////////////////////////////////////////////
  //validate
 /* var productTimeStampTo = this.state.productTimeStampTo;

  var [day, month, year] = productTimeStampTo.split('-');

  // Create a new Date object with the rearranged parts
  var dateObject = new Date(`${month}/${day}/${year}`);

  // Get the epoch time (in milliseconds)
  const epochSpecifiedTimeTo = dateObject.getTime();

  //calculate the configured expiration time
  var [day, month, year] = this.state.expirationOfStreaming.split('-');

 // Create a new Date object with the rearranged parts
  var dateObject = new Date(`${month}/${day}/${year}`);

  // Get the epoch time (in milliseconds)
  const epochExpirationOfStreaming = dateObject.getTime();

  var isInRange = epochExpirationOfStreaming <= epochSpecifiedTimeTo;

  if(isInRange === false){
    alert("Invalid value for streaming expiration date");
    return;
  }
*/
  //////////////////////////////////////////
    // create the json message for check price to forward it to marketplace backend
    const jsonMessage = {
          "product_id": this.state.productId,
          "user_id": username,
          "marketplace": this.state.federatedMarketPlaceName,
          "access":  0,
          "streaming": true,
          "lp": "",
          "hp": this.state.expirationOfStreaming,
          "fp": this.state.frequency
      };

   console.log(jsonMessage);
   console.log("role = ",role);
   console.log("username = ",username);


   this.setState({ selectedProductForStreaming:true });
   this.props.checkFederatedMarketProductPrice(jsonMessage);
   buttonIsPressed = true;
};
//--------------------------------------------------------------------------------------------------
onObservationsBuyProductHandler = async e => {
///////////////////////// remove it/////////////

  const { role, username } = this.props.userDetails;
  //////////////////////////////////////////////
  if(this.state.productId === ""){
      alert("No product selected");
      return;
   }
  if(calculatedPriceForObservations === ""){
   alert("Price for product not defined");
   return;
   }
   if(this.state.numberOfObservations === ""){
      alert("Observation for product not defined");
      return;
   }
   if(this.state.to === ""){
     alert("Date to for product not defined");
     return;
   }
   if(this.state.from === ""){
     alert("Date from for product not defined");
     return;
   }
  ////////////////////////////////////////////

 ////////////////////////////////////////////
   //check if time frame is valid
  /* var productFrom        = this.state.productTimeStampFrom;
   var productTimeStampTo = this.state.productTimeStampTo;

   var [day, month, year] = productFrom.split('-');

   // Create a new Date object with the rearranged parts
   var dateObject = new Date(`${month}/${day}/${year}`);

   // Get the epoch time (in milliseconds)
   const epochSpecifiedTimeFrom = dateObject.getTime();

   //calculate the specified to time
   var [day, month, year] = productTimeStampTo.split('-');

   // Create a new Date object with the rearranged parts
   var dateObject = new Date(`${month}/${day}/${year}`);

   // Get the epoch time (in milliseconds)
   const epochSpecifiedTimeTo = dateObject.getTime();

   //calculate the configured from buyer from time
   var [day, month, year] = this.state.from.split('-');

   // Create a new Date object with the rearranged parts
   var dateObject = new Date(`${month}/${day}/${year}`);

   // Get the epoch time (in milliseconds)
   const epochConfiguredTimeFrom = dateObject.getTime();

  //calculate the configured from buyer to time
   var [day, month, year] = this.state.to.split('-');

   // Create a new Date object with the rearranged parts
   var dateObject = new Date(`${month}/${day}/${year}`);

   // Get the epoch time (in milliseconds)
   const epochConfiguredTimeTo = dateObject.getTime();

  //validate from date epochConfiguredTimeFrom
  var isInRange = epochConfiguredTimeFrom >= epochSpecifiedTimeFrom && epochConfiguredTimeFrom <= epochSpecifiedTimeTo;

  if(isInRange === false){
   alert("Invalid value for date from");
   return;
  }

  //validate from date epochConfiguredTimeTo
  var isInRange = epochConfiguredTimeTo >= epochSpecifiedTimeFrom && epochConfiguredTimeTo <= epochSpecifiedTimeTo;

  if(isInRange === false){
   alert("Invalid value for date to");
   return;
  }

 //validate if from< to
   if(epochConfiguredTimeFrom > epochConfiguredTimeTo){
     alert("date from should be less than date to");
     return;
   }
*/
  const jsonMessage = {
   "product_id": this.state.productId,
   "buyer": username,
   "seller": this.state.productSeller,
   "price": calculatedPriceForObservations,
   "marketplace": this.state.federatedMarketPlaceName,
   "streaming": false,
   "access": parseInt(this.state.numberOfObservations, 10),
   "hp":  this.state.to,
   "lp": this.state.from,
   "fp": ""
  };

  this.props.buyFederatedMarketPlaceProduct(jsonMessage);

};
//--------------------------------------------------------------------------------------------------
onStreamingBuyProductHandler = async e => {
  const { role, username } = this.props.userDetails;
   if(this.state.productId === ""){
      alert("No product selected");
      return;
   }
   if(this.state.frequency === ""){
       alert("Frequency for product not defined");
       return;
    }
    if(this.state.expirationOfStreaming === ""){
      alert("Expiration date for product not defined");
      return;
    }
    if(calculatedPriceForStreaming === ""){
      alert("Price for product not defined");
      return;
    }
 ////////////////////////////////////////////
  //validate
 /* var productTimeStampTo = this.state.productTimeStampTo;

  var [day, month, year] = productTimeStampTo.split('-');

  // Create a new Date object with the rearranged parts
  var dateObject = new Date(`${month}/${day}/${year}`);

  // Get the epoch time (in milliseconds)
  const epochSpecifiedTimeTo = dateObject.getTime();

  //calculate the configured expiration time
  var [day, month, year] = this.state.expirationOfStreaming.split('-');

 // Create a new Date object with the rearranged parts
  var dateObject = new Date(`${month}/${day}/${year}`);

  // Get the epoch time (in milliseconds)
  const epochExpirationOfStreaming = dateObject.getTime();

  var isInRange = epochExpirationOfStreaming <= epochSpecifiedTimeTo;

  if(isInRange === false){
    alert("Invalid value for streaming expiration date");
    return;
  }

*/
   const jsonMessage = {
    "product_id": this.state.productId,
    "buyer": username,
    "seller": this.state.productSeller,
    "price": calculatedPriceForStreaming,
    "marketplace": this.state.federatedMarketPlaceName,
    "streaming": true,
    "access": 0,
    "lp":  "",
    "hp": this.state.expirationOfStreaming,
    "fp": this.state.frequency
   };

   this.props.buyFederatedMarketPlaceProduct(jsonMessage);
};
//--------------------------------------------------------------------------------------------------
  get renderFederatedMarketplaceItems() {

   ///////////////////////////////////////////////////
   let federatedMarketPlaceItems = <div><h1 style={{color: "#FFFFFF"}}><strong> Marketplaces</strong></h1>  <h3 style={{color: "#FFFFFF"}}>No federated MarketPlaces found</h3></div>;
      // Manually adding the Global marketplace  FederationMarketPlaceItem
    let globalFederationMarketPlaceItem = (
       <FederationMarketPlaceItem
         id="global"
         name="global"
         handleFederatedMarketPlaceClick={this.handleFederatedMarketPlaceClick}
         itemWidth={federatedMarketPlaceItemWidth}
        />
    );


   ///////////////////////////////////////////////////

      if(this.state.showFederatedMarketplaceProducts == false){

       let federatedMarketPlaceItems = <div><h1 style={{color: "#FFFFFF"}}><strong>Marketplaces</strong></h1>  <h3 style={{color: "#FFFFFF"}}>No federated MarketPlaces found</h3></div>;

       if (this.props.federations.availableFederatedMarketPlaces) {

        {federatedMarketPlaceItems = _.map(this.props.federations.availableFederatedMarketPlaces, (member) =>
          <FederationMarketPlaceItem
            id={member}
            name={member}
            handleFederatedMarketPlaceClick = {this.handleFederatedMarketPlaceClick}
            itemWidth = {federatedMarketPlaceItemWidth}
          />
       )}
    }
     return (<div><h1 style={{color: "#FFFFFF"}}><strong>Marketplaces</strong></h1><div>{globalFederationMarketPlaceItem}{federatedMarketPlaceItems}</div></div>);

    // return (<div><h1 style={{color: "#FFFFFF"}}><strong>Federated Marketplaces</strong></h1>{federatedMarketPlaceItems}</div>);
    }
}//end
//-----------------------------------------------------------------------------------------------------------
get renderSearchForm(){
 return(

 <div className="qos-constraint" style={{color: "#f5f5f5" ,backgroundColor:"#ADD8E6",borderRadius: "8px",border: '1px solid #FFFFFF'}}>
 {/*****************************************************/}
 <div>
  <div className="form-group"  style={{width: "50%",float: "left",padding: "5px"}}>
        <label style={{color: labelColor1 , fontSize:"18px"}}>Product names</label>
        <input type="text" className="form-control" placeholder="Insert a list of product names comma separated" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_PRODUCT_NAMES)}/>
  </div>

    <div className="form-group"  style={{width: "50%",float: "left",padding: "5px"}}>
        <label style={{color: labelColor1, fontSize:"18px" }}>Resources</label>
        <input type="text" className="form-control" placeholder="Insert a list of observed resources comma separated" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_RESOURCES)}/>
    </div>
  </div>

    <div>
     <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
      <label style={{color: labelColor1, fontSize:"18px" }}>Verticals</label>
      <input type="text" className="form-control" placeholder="Insert a list of verticals comma separated" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_VERTICALS)}/>
     </div>
     <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
      <label style={{color: labelColor1, fontSize:"18px" }}>Descriptions</label>
      <input type="text" className="form-control" placeholder="Insert a list of descriptions comma separated" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_DESCRIPTIONS)}/>
     </div>
    </div>

  <div>
   <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
      <label style={{color: labelColor1, fontSize:"18px" }}>Sellers</label>
      <input type="text" className="form-control" placeholder="Insert a list of sellers comma separated" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_SELLER_IDS)}/>
    </div>
    <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
      <label style={{color: labelColor1, fontSize:"18px" }}>Locations</label>
      <input type="text" className="form-control" placeholder="Insert a list of locations comma separated" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_LOCATIONS)}/>
    </div>
  </div>
{/*****************************************************/}

     <Row>
      <Col lg={2} md={2} sm={2} xs={2}>
        <h4 style={{color: labelColor1}}> <strong>Min Price:</strong></h4>
      </Col>
      <Col lg={2} md={2} sm={2} xs={2}>
       <input style={{color: "#000000",marginTop:"10px",width:"100px",borderRadius: "4px",border: '1px solid #000000'}} type="number" name="minPrice" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_MIN_PRICE)}/>
      </Col>
      <Col lg={2} md={2} sm={2} xs={2}>
        <h4 style={{color: labelColor1 }}> <strong>Max Price:</strong></h4>
      </Col>
      <Col lg={2} md={2} sm={2} xs={2}>
       <input style={{color: "#000000",marginTop:"10px",width:"100px",borderRadius: "4px",border: '1px solid #000000'}} type="number" name="maxPrice" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_MAX_PRICE)}/>
      </Col>
     </Row>


     {/*****/}
      <Row>
      <Col lg={2} md={2} sm={2} xs={2}>
        <h4 style={{color: labelColor1,width:"150px" }}> <strong>Min Reputation:</strong></h4>
      </Col>
      <Col lg={2} md={2} sm={2} xs={2}>
       <input style={{color: "#000000",marginTop:"10px",width:"100px",borderRadius: "4px",border: '1px solid #000000'}} type="number" name="minTrust" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_MIN_REPUTATION)}/>
      </Col>
      <Col lg={2} md={2} sm={2} xs={2}>
        <h4 style={{color: labelColor1 ,width:"150px" }}> <strong>Max Reputation:</strong></h4>
      </Col>
      <Col lg={2} md={2} sm={2} xs={2}>
       <input style={{color: "#000000",marginTop:"10px",width:"100px",borderRadius: "4px",border: '1px solid #000000'}} type="number" name="maxTrust" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_MAX_REPUTATION)}/>
      </Col>

     </Row>
     {/*************************** Streaming availability starts ***********************/}
       <Row>
         <Col lg={2} md={2} sm={2} xs={2}>
           <h4 style={{color: labelColor1,width:"150px" }}> <strong>Streaming:</strong></h4>
         </Col>
         <Col lg={2} md={2} sm={2} xs={2}>
          <select
            style={{
             color: "#000000",
             marginTop: "10px",
             width: "100px",
             borderRadius: "4px",
             border: '1px solid #000000'
           }}
             name="minTrust"
             onChange={e => this.onSearchChangeHandler(e, IOTFEDS_STREAMING)}
           >
           <option value="true">Yes</option>
           <option value="false">No</option>
          </select>

         </Col>
      </Row>
     {/*************************** Streaming availability ends *************************/}

     {/*****/}

     {/******************/}
     {/*************************Location search parameters ***************************/}
     {/**/}
   {/*******************Location criteria started************************/}

   {/*******************Location criteria ended************************/}
    {/*************************Search product button and searching message **************************/}
     <Row style ={{marginTop:"10px"}}>
      <Button bsStyle="primary" style ={{float:"right",marginRight:"20px"}} onClick={e => this.onSearchProductHandler(e)}>
       <span className="glyphicon glyphicon-search"></span>
        &nbsp; Search Products
      </Button>
      <h4 style ={{float:"right",marginRight:"20px",color:"#FF0000" }}>{this.state.searchingMessage}</h4>

      <Button bsStyle="success" style ={{float:"left",marginLeft:"20px"}} onClick={e => this.onShowMarketplacesHandler(e)}>
        &nbsp; Show marketplaces
      </Button>
     </Row>


  </div>

 );

}//end
//-----------------------------------------------------------------------------------------------------------
    get renderFederatedMarketplaceProducts() {

      let products = <div></div>
      //<div><h1 style={{color: "#FFFFFF"}}><strong>Federated Marketplace</strong></h1>  <h3 style={{color: "#FFFFFF"}}>No federated MarketPlace products found</h3></div>;

      if(this.state.showFederatedMarketplaceProducts == true){

       if (this.props.federations.calculatedProductPrice){
        if((calculatedPriceForStreaming == NOT_DEFINED_YET) && (calculatedPriceForObservations == NOT_DEFINED_YET)){
          //This happens only on beginning or when selecting a new product
          calculatedPriceForStreaming    = this.state.productPrice;
          calculatedPriceForObservations = this.state.productPrice;
           if(buttonIsPressed == true){
             if(this.state.selectedProductForStreaming == true){
               calculatedPriceForStreaming    = this.props.federations.calculatedProductPrice;
             }else{
               calculatedPriceForObservations = this.props.federations.calculatedProductPrice;
             }
           }
        }else
        {
         if(this.state.selectedProductForStreaming == true){
          calculatedPriceForStreaming    = this.props.federations.calculatedProductPrice;
         }else{
          calculatedPriceForObservations = this.props.federations.calculatedProductPrice;
         }
        }
      }

       if (this.props.federations.availableFederatedMarketPlaceProducts) {//myAvailableExchangeTokens
              var myExchangeTokens = _.mapKeys(this.props.federations.myAvailableExchangeTokens, "productId");

              var productIdArray = Object.keys(myExchangeTokens);
              console.log("productIdArray = " ,productIdArray);

              {products = _.map(this.props.federations.availableFederatedMarketPlaceProducts, (member) =>
                <FederationMarketPlaceProduct
                  id    = {member.productId}
                  name  = {member.name===""?"-":member.name}
                  price = {0}
                  description = {member.description}
                  details     = {member.productDetails}
                  from        = {"00-00-0000"}
                  to          = {"00-00-0000"}
                  streamingAvailability   = {this.state.searchStreaming==="true"?true:false}
                  frequency               = {0}
                  maxNumberOfObservations = {0}
                  observedProperties      = {member.observationProperties}
                  vertical                = {member.vertical}
                  seller  = {member.seller}
                  buyer   = {this.props.userDetails.username}
                  boughtByMe      = {productIdArray.includes(member.productId)?"Bought by me":"Not bought by me"}
                  borderSize      = {member.productId===this.state.productSelected?20:0}
                  backgroundColor = {member.productId===this.state.productSelected?'#6495ED':'#FFFFFF'}
                  handleFederatedMarketProductClick        = {this.handleFederatedMarketProductClick}
                  handleFederatedMarketProductDeleteClick  = {this.handleFederatedMarketProductDeleteClick}
                  itemWidth  = {federatedMarketPlaceProductWidth }
                  itemHeight = {federatedMarketPlaceProductHeight}
                />
             )}
          }
           return (<div style={{backgroundColor:"#f5f5f5",color: "#FF0000",width: "100%",borderRadius: "8px",border: '2px solid #f5f5f5'}}>

           {/*--------------------Collapsible search products area start----------------------------*/}
             <Panel id="id" bsStyle="primary" className="federation-panel-entry"
               expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                  <Panel.Title componentClass="h3">
                   <span className="glyphicon glyphicon-search"></span>  <strong>&nbsp;&nbsp;Search Products in "{this.state.federatedMarketPlaceName}" Marketplace </strong>
                 </Panel.Title>
                   <Glyphicon glyph={this.state.open ? "minus" : "search"} className="pull-right" />
                    </Panel.Heading>
                      <Panel.Collapse>

                       <div>
                        {this.renderSearchForm}
                       </div>

                       </Panel.Collapse>
                    <Panel.Footer className="federation-info-footer">

                <span></span>
                <h1></h1>
               {/*<Button bsStyle="info"> */}
                {/* <span class="glyphicon glyphicon-search"></span>*/}
               {/*  &nbsp; Search Product*/}
               {/* </Button>*/}

                 </Panel.Footer>

                </Panel>
           {/*---------------------Collapsible search products area end--------------------------*/}
          {this.props.federations.availableFederatedMarketPlaceProducts && this.state.productId !== ""?
           <div>
           {/* Product info  start*/}
           <div style={{backgroundColor:"#f5f5f5",color: "#FF0000",width: "100%",borderRadius: "8px",border: '2px solid #f5f5f5'}}>

           {/***********6 6 6 ************/}
           <div className="qos-constraint" style={{color: "#f5f5f5" ,backgroundColor:"#ADD8E6",borderRadius: "8px",border: '1px solid #FFFFFF'}}>
           {/*<h1 style={{color: "#0000FF"}}><strong>Products of {this.state.federatedMarketPlaceName} MarketPlace</strong></h1>*/}
            <h3 style={{color: "#000000",fontFamily:"Trebuchet MS,bold"}}><strong>Product name: </strong>{this.state.productName}</h3>
            <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Seller: </strong>{this.state.productSeller}</h4>
            <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Details: </strong>{this.state.productDetails}</h4>
            <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Product Info: </strong>{this.state.productBoughtInfo}</h4>

            {this.state.productStreamingAvailability === true?<h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Streaming Availability: </strong>{"YES"}</h4>
            :<h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Streaming Availability: </strong>{"NO"}</h4>}

            <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Description:</strong> {this.state.productDescription}</h4>
            <h4 style={{color: "#000000",fontFamily:"Trebuchet MS",visibility: "hidden" }}><strong>Min Price:</strong> {this.state.productPrice} FedCoins</h4>
           <Row>
           </Row>
           {/***************Configure Product for observations starts *********************/}
           <div className="qos-constraint" style={{backgroundColor:"#f5f5f5"}}>
            <h3 style={{color: "#0000FF"}}><strong>Configure Product for observations:</strong></h3>

            {/****************Time stamps configuration start *******************/}
             <Row>
              <Col lg={4} md={4} sm={4} xs={2}>
              <h4 style={{color: "#000000",fontFamily:"Trebuchet MS" }}> <strong>From :</strong></h4>
               </Col>
              <Col lg={4} md={4} sm={4} xs={4}>
                <input style={{color: "#000000",marginTop:"10px"}} type="string" name="fromdate" onChange={e => this.onFromDateChangeHandler(e)}/>
              </Col>
             </Row>
             <Row>
             <Col lg={4} md={4} sm={4} xs={4}>
               <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}> <strong>To:</strong></h4>
              </Col>
              <Col lg={4} md={4} sm={4} xs={4}>
                <input style={{color: "#000000",marginTop:"10px"}} type="string" name="todate" onChange={e => this.onToDateChangeHandler(e)}/>
              </Col>
            </Row>
            {/****************Time stamps configuration end *******************/}

            {/****************Number of observations start ********************/}
            <Row>
             <Col lg={4} md={4} sm={4} xs={2}>
              <h4 style={{color: "#000000",fontFamily:"Trebuchet MS" }}> <strong>Number of Observations:</strong></h4>
             </Col>
             <Col lg={4} md={4} sm={4} xs={4}>
               <input style={{color: "#000000",marginTop:"10px"}} type="number" name="observation" onChange={e => this.onNumberOfObservationsChangeHandler(e)}/>
             </Col>
            </Row>
            {/****************Number of observations end **********************/}

           {/****************Calculated price for observation start ********************/}
            <Row>
             <Col lg={4} md={4} sm={4} xs={2}>
              <h4 style={{color: "#000000",fontFamily:"Trebuchet MS" }}> <strong>Calculated Price:</strong></h4>
             </Col>
             <Col lg={4} md={4} sm={4} xs={4}>

             {this.props.federations.calculatedProductPrice?
                 <h4 style={{color: "#000000",fontFamily:"Trebuchet MS" }}> <strong> {calculatedPriceForObservations==="0"?"-":calculatedPriceForObservations} FedCoins</strong></h4>
               : <h4 style={{color: "#000000",fontFamily:"Trebuchet MS" }}> <strong> {this.state.productPrice==="0"?"-":this.state.productPrice} FedCoins </strong> </h4>}
             </Col>
            </Row>
            {/****************Calculated price for observation end **********************/}

            {/****************Buttons  observation configuration start *******************************/}
            <div className="qos-constraint" style={{backgroundColor:"#f5f5f5"}}>
             <Row>
               <div>
                <button style={{backgroundColor:"#27ae60", color: "#FFFFFF",width: "100px",height: "30px",borderRadius: "8px",border: '2px solid #27ae60',float: "right" ,marginRight:'10px',marginLeft:'10px'}} onClick={e => this.onObservationsBuyProductHandler(e)}> Buy Product </button>
               </div>
               <div>
                 <button style={{backgroundColor:"#27ae60", color: "#FFFFFF",width: "100px",height: "30px",borderRadius: "8px",border: '2px solid #27ae60',float: "right"}} onClick={e => this.onObservationsCheckPriceHandler(e)}> Check Price </button>
               </div>
              </Row>
            </div>
            {/**************** Buttons for observation configuration end ***************************/}
            {/**************** Configure Product for observations ends *******************************************************/}
            </div>

            {/***************Configure Product for data stream starts **********************************************************************/}
             {this.state.productStreamingAvailability === true?
             <div className="qos-constraint" style={{backgroundColor:"#f5f5f5"}}>
                <h3 style={{color: "#0000FF"}}><strong>Configure Product for data stream:</strong></h3>

              <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
               <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}> <strong>Stream expiration :</strong></h4>
               </Col>
               <Col lg={6} md={6} sm={6} xs={6}>
                <input style={{color: "#000000",fontFamily:"Trebuchet MS",marginTop:"10px"}} type="string" name="todateforstream" onChange={e => this.onExpirationStreamChangeHandler(e)}/>
               </Col>
             </Row>

             <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
               <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}> <strong>Frequency:</strong></h4>
               </Col>
               <Col lg={6} md={6} sm={6} xs={6}>
                <input style={{color: "#000000",fontFamily:"Trebuchet MS",marginTop:"10px"}} type="number" name="frequency" onChange={e => this.onFrequencyChangeHandler(e)}/>
               </Col>
             </Row>

           {/****************Calculated price for streaming start ********************/}
            <Row>
             <Col lg={4} md={4} sm={4} xs={2}>
              <h4 style={{color: "#000000",fontFamily:"Trebuchet MS" }}> <strong>Calculated Price:</strong></h4>
             </Col>
             <Col lg={4} md={4} sm={4} xs={4}>

             {this.props.federations.calculatedProductPrice?
                 <h4 style={{color: "#000000",fontFamily:"Trebuchet MS" }}> <strong> {calculatedPriceForStreaming==="0"?"-":calculatedPriceForStreaming} FedCoins</strong></h4>
               : <h4 style={{color: "#000000",fontFamily:"Trebuchet MS" }}> <strong> {this.state.productPrice==="0"?"-":this.state.productPrice} FedCoins </strong> </h4>}
             </Col>
            </Row>
            {/****************Calculated price for streaming end **********************/}


             {/****************Buttons for data stream configuration start ************************************/}
            <div className="qos-constraint" style={{backgroundColor:"#f5f5f5"}}>
             <Row>
               <div>
                <button style={{backgroundColor:"#27ae60", color: "#FFFFFF",width: "100px",height: "30px",borderRadius: "8px",border: '2px solid #27ae60',float: "right" ,marginRight:'10px',marginLeft:'10px'}} onClick={e => this.onStreamingBuyProductHandler(e)}> Buy Product </button>
               </div>
               <div>
                 <button style={{backgroundColor:"#27ae60", color: "#FFFFFF",width: "100px",height: "30px",borderRadius: "8px",border: '2px solid #27ae60',float: "right"}} onClick={e => this.onStreamingCheckPriceHandler(e)}> Check Price </button>
               </div>
              </Row>
            </div>
            {/**************** Buttons for data stream configuration end *****************************************/}

             </div>:<h4></h4>}
            {/***************Configure Product for data stream  ends ***************************************************************/}

           </div>
           {/*********************************************************************************/}
           </div> {/* Product info  end*/}


          </div>
            :""}
           {products}

           </div>);
      }

    }//end
//-------------------------------------------------------------------------------
   onChange = (isVisible) => {
      if (isVisible) {
        // Component became visible
        console.log('Component is now visible');


        //this.setState({ showFederatedMarketplaceProducts: false });
        //alert('Component is now visible');
      }
    }//end
//-------------------------------------------------------------------------------
  render() {
    const { availableFederatedMarketPlaces,availableFederatedMarketPlaceProducts,calculatedProductPrice,fetching_error,successfulMessage } = this.props.federations;

    return (
     <VisibilitySensor onChange={this.onChange}>

      <div className="container-fluid movie-app">

       <FieldError error={fetching_error}/>
       <FieldSuccess message={successfulMessage}/>
        <div className='row'>
         {this.renderFederatedMarketplaceItems}
        </div>
        <div className='row'>
         {this.renderFederatedMarketplaceProducts}
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
    fetchProductsFromFederatedMarketPlace,
    searchProductsFromFederatedMarketPlace,
    checkFederatedMarketProductPrice,
    buyFederatedMarketPlaceProduct,
    resetMarketPlace,
    dismissAlert,
    activateFederationDeleteModal,
    deactivateFederationDeleteModal,
    deleteProduct,
})(withRouter(FederatedMarketPlace));



