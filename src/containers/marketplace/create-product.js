import React, { Component ,useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import VisibilitySensor from 'react-visibility-sensor';
import FederationMarketPlaceItem from "./federated-marketplace-item";
import FederationMarketPlaceResource from "./federated-marketplace-resource";
import FederationMarketPlaceResourceInBasket from "./federated-marketplace-resource-in-basket.js"

import { search } from "./utils";
import Scroll from './Scroll';
import {federatedMarketPlaceItemWidth,federatedMarketPlaceResourceWidth,federatedMarketPlaceResourceHeight,NOT_DEFINED_YET} from './marketPlaceDefinitions';
import {widthOfBorder,inputBorderColor1,labelColor1,IOTFEDS_MIN_REPUTATION,IOTFEDS_MAX_REPUTATION, IOTFEDS_LONGITUDE, IOTFEDS_LATITUDE, IOTFEDS_MAX_DISTANCE,IOTFEDS_SELLER_IDS, IOTFEDS_VERTICALS,IOTFEDS_RECOURCE_NAMES,IOTFEDS_RESOURCE_OBSERVED_PROPERTIES,
IOTFEDS_RESOURCE_DESCRIPTIONS,IOTFEDS_RESOURCE_ADAPTIVE_TRUST,IOTFEDS_RESOURCE_FEDERATION,IOTFEDS_RESOURCE_RESOURCE_TRUST,IOTFEDS_PLATFORM_ID,
IOTFEDS_RESOURCE_RESOURCE_TYPE,IOTFEDS_RESOURCE_NAMES,IOTFEDS_RESOURCE_IDS,IOTFEDS_MIN_PRICE,IOTFEDS_MAX_PRICE,IOTFEDS_MAX_TRUST,IOTFEDS_MIN_TRUST,IOTFEDS_LOCATIONS,
IOTFEDS_NAME_OF_PRODUCT,IOTFEDS_DETAILS_OF_PRODUCT,IOTFEDS_DESCRIPTIONS_OF_PRODUCT,IOTFEDS_VERTICALS_OF_PRODUCT,IOTFEDS_PLATFORM_NAMES
} from './marketPlaceDefinitions';


import {
    searchResourcesFromFederatedMarketPlace,fetchFederatedMarketPlaces,fetchResourcesFromFederatedMarketplace,searchProductsFromFederatedMarketPlace,
    checkFederatedMarketProductPrice,createNewProduct,resetCreateProduct
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

var PASSWORD = "UNDEFINED";


class CreateProduct extends Component {
//----------------------------------------------------------------------------------------------------
  constructor(){
   super();

   console.log("############# constructor ##########################");
   this.state = {
       showFederatedMarketplaceResources:false,
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
       searchingMessage:"",
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
       searchPlatformNames:"",

       //created product definitions
       productName:"",
       productDetails:{},
       productDescriptions:"",
       productVerticals:""
    };

     this.handleFederatedMarketPlaceClick                    = this.handleFederatedMarketPlaceClick.bind(this);
     this.handleFederatedMarketResourceSelectClick           = this.handleFederatedMarketResourceSelectClick.bind(this);
     this.handleSearchFederatedProducts                      = this.handleSearchFederatedProducts.bind(this);
     this.handleFederatedMarketResourceAddToProductClick     = this.handleFederatedMarketResourceAddToProductClick.bind(this);
     this.handleFederatedMarketResourceRemoveFromBasketClick = this.handleFederatedMarketResourceRemoveFromBasketClick.bind(this);
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
handleSearchFederatedProducts = (fedMarketplaceId,globalMarketplaceId,priceMin,priceMax,name,description,observedProperties,resources,platform,location,productTrustMin,productTrustMax,vertical)=>{
 this.props.searchProductsFromFederatedMarketPlace(fedMarketplaceId,globalMarketplaceId,priceMin,priceMax,name,description,observedProperties,resources,platform,location,productTrustMin,productTrustMax,vertical);
}//end
//----------------------------------------------------------------------------------------------------
handleFederatedMarketResourceRemoveFromBasketClick = (id,resource) =>{
 console.log("handleFederatedMarketResourceRemoveFromBasketClick");
 console.log(resource.name);
 console.log(resource.id);


 var removed = listOfResourcesInProduct.filter((resource) => resource.id !== id);
 listOfResourcesInProduct = removed;
 console.log(listOfResourcesInProduct.length);
 console.log(removed.length);
 var price = Number(this.state.totalPrice) - Number(resource.price);
 this.setState({totalPrice:price});

if(listOfResourcesInProduct.length === 0){
 CREATED_PRODUCT_DATE_FROM = "";
 CREATED_PRODUCT_DATE_TO = "";
 createdProductFrequency = "";
 createdProductStreamingAvailability = false;
 return;
}


 // calculate now the CREATED_PRODUCT_DATE_FROM and CREATED_PRODUCT_DATE_TO

 //var fromArray = listOfResourcesInProduct.map(resource)
//createdProductFrequency var maxTo = Math.max(...listOfResourcesInProduct.map(r => r.MeasureDate));

var fromDateArray =  listOfResourcesInProduct.map((resource) => (resource.from));
console.log("fromDateArray = " , fromDateArray);

var fromArray     =  listOfResourcesInProduct.map((resource) => (new Date(resource.from).getTime()));
console.log("fromArray = " , fromArray);

var max = Math.max(...fromArray);
console.log("max = ", max);
var index = fromArray.indexOf(max);
console.log(index);

/////////////////////////////////////////////
var date = new Date(fromDateArray[index] * 1000); // JavaScript Date object works with milliseconds, so multiply by 1000

  // Extract date components
  var year    = date.getFullYear();
  var month   = date.getMonth() + 1; // Months are zero-based, so add 1
  var day     = date.getDate();
  var hours   = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // Format the date
  var formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  var formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

////////////////////////////////////////////

CREATED_PRODUCT_DATE_FROM = fromDateArray[index];//formattedDate + " " + formattedTime;//
console.log("CREATED_PRODUCT_DATE_FROM = " + CREATED_PRODUCT_DATE_FROM);

var toDateArray =  listOfResourcesInProduct.map((resource) => (resource.to));
console.log("toDateArray = " , toDateArray);

var toArray =  listOfResourcesInProduct.map((resource) => (new Date(resource.to).getTime()));
console.log("toArray = " , toArray);
var min = Math.min(...toArray);
console.log("min = ", min);
index = toArray.indexOf(min);
console.log(index);

/////////////////////////////////////////////
 date = new Date(toDateArray[index] * 1000); // JavaScript Date object works with milliseconds, so multiply by 1000

  // Extract date components
   year    = date.getFullYear();
   month   = date.getMonth() + 1; // Months are zero-based, so add 1
   day     = date.getDate();
   hours   = date.getHours();
   minutes = date.getMinutes();
   seconds = date.getSeconds();

  // Format the date
   formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
   formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

////////////////////////////////////////////

CREATED_PRODUCT_DATE_TO = toDateArray[index];//formattedDate + " " + formattedTime;//
console.log("CREATED_PRODUCT_DATE_TO = " + CREATED_PRODUCT_DATE_TO);

//calculate the product frequency
var frequencyArray =  listOfResourcesInProduct.map((resource) => (resource.frequency));
console.log("frequencyArray = " , frequencyArray);
createdProductFrequency = Math.min(...listOfResourcesInProduct.map(r => r.frequency));
console.log("createdProductFrequency = " , createdProductFrequency);

// var maxTo = Math.max(...listOfResourcesInProduct.map(r => r.createdProductFrequency));


}//end
//----------------------------------------------------------------------------------------------------
handleFederatedMarketResourceAddToProductClick = (resource) =>{
 console.log("handleFederatedMarketResourceAddToProductClick");
 console.log("resource.id = " + resource.id);
 console.log("resource.name = " + resource.name);
 console.log("resource.price = " + resource.price);
 console.log("resource.details = " + resource.details);
 console.log("resource.description = " + resource.description);
 console.log("resource.from = " + resource.from);
 console.log("resource.to = "   + resource.to);

 console.log(listOfResourcesInProduct.length);

 //CHECK FIRST IF THE RESOURCE ALREADY EXISTS IN THE PRODUCT
 var array = listOfResourcesInProduct.filter((r) => r.id === resource.id);
 if(array.length > 0){
  alert("The Resource " + resource.name + " already exists in the product.");
  return;
 }



 //Update the  from and to dates of the product

 //var time_st = moment.unix(resource.from).format("DD-MM-YYYY");
 if(listOfResourcesInProduct.length === 0){
   CREATED_PRODUCT_DATE_FROM = resource.from;
   CREATED_PRODUCT_DATE_TO   = resource.to;
   createdProductFrequency   = resource.frequency;
   createdProductStreamingAvailability = false;
   console.log("CREATED_PRODUCT_DATE_FROM = ", CREATED_PRODUCT_DATE_FROM);
   console.log("CREATED_PRODUCT_DATE_TO = ",   CREATED_PRODUCT_DATE_TO);
}else{
 //calculate new product from.Note that is in format MM-DD-YYYY !!!!
 var currentFrom = new Date(CREATED_PRODUCT_DATE_FROM).getTime();
 var newFrom     = new Date(resource.from).getTime();

  //calculate new product to. Note that is in format MM-DD-YYYY !!!!
 var currentTo = new Date(CREATED_PRODUCT_DATE_TO).getTime();
 var newTo     = new Date(resource.to).getTime();

  if(newFrom > currentTo){
    console.log("newFrom =  ", newFrom);
    console.log("currentTo =  ", currentTo);
    alert("No Overlap time frame found");
    return;
  }

  if(newTo < currentFrom){
    alert("No Overlap time frame found");
    console.log("newTo =  ", newTo);
    console.log("currentFrom =  ", currentFrom);
    return;
  }

  if(newFrom > currentFrom && newTo < currentTo){
     console.log("newFrom >= currentFrom && newTop <= currentTop");
     CREATED_PRODUCT_DATE_FROM = resource.from;
     CREATED_PRODUCT_DATE_TO   = resource.to;
  }

  if(newFrom > currentFrom && newTo > currentTo){
      console.log("newFrom >= currentFrom && newTop <= currentTop");
      CREATED_PRODUCT_DATE_FROM = resource.from;
  }

  if(newFrom < currentFrom && newTo <= currentTo){
        console.log("newFrom >= currentFrom && newTop <= currentTop");
        CREATED_PRODUCT_DATE_TO   = resource.to;
  }


}

 //Add now the resource to product
 var joined = listOfResourcesInProduct.concat(resource);
 //this.setState({ listOfResourcesInProduct: joined });
 listOfResourcesInProduct = joined;

 console.log("listOfResourcesInProduct.length = ", listOfResourcesInProduct.length);

 //Update the total price
 var price = Number(this.state.totalPrice) + Number(resource.price);
 this.setState({totalPrice:price});


console.log("CREATED_PRODUCT_DATE_FROM = ", CREATED_PRODUCT_DATE_FROM);
console.log("CREATED_PRODUCT_DATE_TO = ",  CREATED_PRODUCT_DATE_TO);
console.log(listOfResourcesInProduct.length);

//calculate the product frequency
var frequencyArray =  listOfResourcesInProduct.map((resource) => (resource.frequency));
console.log("frequencyArray = " , frequencyArray);
createdProductFrequency = Math.min(...listOfResourcesInProduct.map(r => r.frequency));
console.log("createdProductFrequency = " , createdProductFrequency);

}//end
//----------------------------------------------------------------------------------------------------
 handleFederatedMarketPlaceClick = (id,name) => {
    //alert("Selected federated market place with id: " + id);
    this.setState({ showFederatedMarketplaceResources: true });
    this.setState({ federatedMarketPlaceName: name });
    this.setState({ federatedMarketPlaceId:id });
    //alert(this.props.showFederatedMarketplaceProducts);
    //this.props.fetchResourcesFromFederatedMarketplace(id);
    console.log(this.props.federations);
 }
//----------------------------------------------------------------------------------------------------
handleFederatedMarketResourceSelectClick = (id,name,observations,description,details,price,from,to,streamingAvailability,location,frequency,numberOfObservations) =>{
    RESOURCE_OBSERVATIONS = observations;
    console.log("RESOURCE_OBSERVATIONS = " + RESOURCE_OBSERVATIONS);

    this.setState({ showFederatedMarketplaceResources: true });
    this.setState({ resourceName: name });
    this.setState({ resourceObservations: observations });
    this.setState({ resourceId:id });
    this.setState({ resourceDescription: description });
    this.setState({ resourceDetails:details });
    this.setState({ resourcePrice:price });
    this.setState({ resourceTimeStampFrom: from });
    this.setState({ resourceTimeStampTo:to });
    this.setState({ resourceStreamingAvailability:streamingAvailability });
    this.setState({ resourceLocation:location });
    this.setState({ resourceFrequency:frequency });
    this.setState({ resourceNumOfObservations:numberOfObservations });
    console.log("resourceObservations = " + this.state.resourceObservations);
    //reset
    //this.props.federations.calculatedProductPrice = null;
    calculatedPriceForObservations = NOT_DEFINED_YET;
    calculatedPriceForStreaming    = NOT_DEFINED_YET;
    buttonIsPressed                = false;
    this.setState({ resourceSelected:id });
}//end
//----------------------------------------------------------------------------------------------------
 componentDidMount() {
    this.props.fetchFederatedMarketPlaces();
 }
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
onSearchChangeHandler = async (e,code) => {

this.setState({ searchingMessage: " " });


if(code === IOTFEDS_NAME_OF_PRODUCT){
   this.setState({ productName: e.target.value });
   return;
}

if(code === IOTFEDS_DETAILS_OF_PRODUCT){
  // this.setState({ productDetails: e.target.value });
   return;
}

if(code === IOTFEDS_DESCRIPTIONS_OF_PRODUCT){
   this.setState({ productDescriptions: e.target.value });
   return;
}


if(code === IOTFEDS_VERTICALS_OF_PRODUCT){
   this.setState({ productVerticals: e.target.value });
   return;
}


if(code === IOTFEDS_RESOURCE_ADAPTIVE_TRUST){//Not used
   this.setState({ searchAdaptiveTrust: e.target.value });
   return;
}
//if(code === IOTFEDS_RESOURCE_DESCRIPTIONS){//2
 //  this.setState({ searchDescriptions: e.target.value });
//   return;
//}

if(code === IOTFEDS_PLATFORM_NAMES){//2
   this.setState({ searchPlatformNames: e.target.value });
   return;
}

if(code === IOTFEDS_RESOURCE_OBSERVED_PROPERTIES){//3
       this.setState({ searchObservationProperties: e.target.value });
       return;
}

if(code === IOTFEDS_RESOURCE_FEDERATION){//4
   this.setState({ searchFederations: e.target.value });
   return;
}

if(code === IOTFEDS_RESOURCE_RESOURCE_TRUST){//5
   this.setState({ searchResourceTrust: e.target.value });
   return;
}


if(code === IOTFEDS_RESOURCE_RESOURCE_TYPE){//6
   this.setState({ searchResourceType: e.target.value });
   return;
}

if(code === IOTFEDS_RESOURCE_NAMES){//7
   this.setState({ searchResourceNames: e.target.value });
   return;
}

if(code === IOTFEDS_RESOURCE_IDS){//8
   this.setState({ searchResourceIds: e.target.value });
   return;
}

if(code === IOTFEDS_MIN_PRICE){//9
   this.setState({ searchMinPrice: e.target.value });
   return;
}

if(code === IOTFEDS_MAX_PRICE){//10
   this.setState({ searchMaxPrice: e.target.value });
   return;
}


if(code === IOTFEDS_MIN_TRUST){//11
   this.setState({ searchMinTrust: e.target.value });
   return;
}


if(code === IOTFEDS_MAX_TRUST){//12
   this.setState({ searchMaxTrust: e.target.value });
   return;
}

if(code === IOTFEDS_LOCATIONS){//13
   this.setState({ searchLocations: e.target.value });
   return;
}


if(code === IOTFEDS_LATITUDE){//14
  this.setState({ searchLatitude: e.target.value });
   return;
}


if(code === IOTFEDS_LONGITUDE){//15
   this.setState({ searchLongitude: e.target.value });
   return;
}


if(code === IOTFEDS_MAX_DISTANCE){//16
   this.setState({ searchMaxDistance: e.target.value });
   return;
}

if(code === IOTFEDS_MIN_REPUTATION){//17
   this.setState({ searchMinRep: e.target.value });
   return;
}


if(code === IOTFEDS_MAX_REPUTATION){//18
   this.setState({ searchMaxRep: e.target.value });
   return;
}

if(code === IOTFEDS_PLATFORM_ID){//19
   this.setState({ searchPlatformId: e.target.value });
   return;
}


};
//--------------------------------------------------------------------------------------------------
resetStateVariables = () => {
 this.setState({
       showFederatedMarketplaceResources:false,
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
       searchingMessage:"",
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
       productDetails:{},
       productDescriptions:"",
       productVerticals:""
     });
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
 this.resetStateVariables();
 this.setState({ showFederatedMarketplaceResources: false });
 this.props.resetCreateProduct();
};
//--------------------------------------------------------------------------------------------------
onSearchResourcesHandler = async e => {

//reset the searching message
this.setState({ searchingMessage: " " });

//////////////////////////////////////////////////////
var searchAdaptiveTrust;

if(this.state.searchAdaptiveTrust ==="")
 searchAdaptiveTrust =null;
else{
 searchAdaptiveTrust = Number(this.state.searchAdaptiveTrust);
}
console.log("searchAdaptiveTrust = " , searchAdaptiveTrust);

var searchPlatformNames;
if(this.state.searchPlatformNames.trim() ==="")
 searchPlatformNames =null;
else{
 searchPlatformNames = this.state.searchPlatformNames.trim();//split(',');
}
console.log("searchPlatformNames = " , searchPlatformNames);

var searchObservationProperties;
if(this.state.searchObservationProperties.trim() ==="")
 searchObservationProperties =null;
else{
 searchObservationProperties = this.state.searchObservationProperties.split(',');
}
console.log("searchObservationProperties = " , searchObservationProperties);

var searchFederations;
if(this.state.searchFederations.trim() ==="")
 searchFederations =null;
else{
 searchFederations = this.state.searchFederations.split(',');
}
console.log("searchFederations = " , searchFederations);

var searchResourceTrust;
if(this.state.searchResourceTrust ==="")
 searchResourceTrust =null;
else{
 searchResourceTrust = Number(this.state.searchResourceTrust);
}
console.log("searchResourceTrust = " , searchResourceTrust);

var searchResourceType;
if(this.state.searchResourceType.trim() ==="")
 searchResourceType = null;
else{
 searchResourceType = this.state.searchResourceType.trim();
}
console.log("searchResourceType = " , searchResourceType);

var searchResourceNames;
if(this.state.searchResourceNames.trim() ==="")
 searchResourceNames = null;
else{
 searchResourceNames = this.state.searchResourceNames.trim();//split(',');
}
console.log("searchResourceNames = " , searchResourceNames);

var searchResourceIds;
if(this.state.searchResourceIds.trim() ==="")
 searchResourceIds = null;
else{
 searchResourceIds = this.state.searchResourceIds.trim();//split(',');
}
console.log("searchResourceIds = " , searchResourceIds);

var searchMinPrice;
if(this.state.searchMinPrice ==="")
 searchMinPrice =null;
else{
 searchMinPrice = Number(this.state.searchMinPrice);
}
console.log("searchMinPrice = " , searchMinPrice);

var searchMaxPrice;
if(this.state.searchMaxPrice ==="")
 searchMaxPrice =null;
else{
 searchMaxPrice = Number(this.state.searchMaxPrice);
}
console.log("searchMaxPrice = " , searchMaxPrice);

var searchMinTrust;
if(this.state.searchMinTrust ==="")
 searchMinTrust = null;
else{
 searchMinTrust = Number(this.state.searchMinTrust);
}
console.log("searchMinTrust = " , searchMinTrust);

var searchMaxTrust;
if(this.state.searchMaxTrust ==="")
 searchMaxTrust = null;
else{
 searchMaxTrust = Number(this.state.searchMaxTrust);
}
console.log("searchMaxTrust = " , searchMaxTrust);

var searchLocations;
if(this.state.searchLocations.trim() ==="")
 searchLocations = null;
else{
 searchLocations = this.state.searchLocations.trim();//split(',');
}
console.log("searchLocations = " , searchLocations);

var searchLatitude;
if(this.state.searchLatitude ==="")
 searchLatitude = null;
else{
 searchLatitude = Number(this.state.searchLatitude);
}
console.log("searchLatitude = " , searchLatitude);

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


//The searchFederations is actually equal to selected federation
searchFederations = this.state.federatedMarketPlaceName;



//The search critera include at least the searcFederations
if(searchMaxPrice === null && searchMinPrice === null && searchMaxRep === null && searchMinRep === null && searchFederations == null && searchMaxDistance === null && searchLongitude === null &&
  searchLatitude === null  && searchLocations === null  && searchPlatformNames === null &&
  searchAdaptiveTrust === null && searchObservationProperties === null && searchResourceIds === null  &&
  searchResourceTrust === null && searchMaxTrust === null && searchMinTrust === null && searchResourceType === null && searchResourceNames === null){
  this.setState({ searchingMessage: "No searching criteria found !!!" });
  return;
 }

 var platformId = this.state.searchPlatformId;
 if(platformId === ""){
  this.setState({ searchingMessage: "Platform Id is mandatory !!!" });
  return;
 }
 var clientId   = "marketplaceClientId";
 var sort       = "descending";
 //const { password, username , ...restFields } = this.props.userDetails;
// console.log('Rest of the fields:', restFields);

//const { password, username } = this.props.userDetails;

var password = this.props.federations.password;
var username = this.props.userDetails.username;
console.log("password1 = "  + password);
console.log("username = "   + username);

 this.props.searchResourcesFromFederatedMarketPlace(searchFederations,
                                                   platformId,
                                                   clientId,
                                                   username,
                                                   password,
                                                   searchMinTrust,
                                                   searchMaxTrust,
                                                   searchResourceNames,
                                                   searchResourceType,
                                                   searchMinPrice,
                                                   searchMaxPrice,
                                                   searchResourceTrust,
                                                   searchAdaptiveTrust,
                                                   searchPlatformNames,
                                                   searchObservationProperties,
                                                   searchResourceIds,
                                                   searchLocations,
                                                   searchMinRep,
                                                   searchMaxRep,
                                                   searchLongitude,
                                                   searchLatitude,
                                                   searchMaxDistance,
                                                   sort);
};
//--------------------------------------------------------------------------------------------------
//Note that since we selected the observation configuration the streaming is false.
onAddToProductHandler = async e => {

    const { role, username } = this.props.userDetails;

    // create the json message for check price to forward it to marketplace backend
    const jsonMessage = {
          "product_id": this.state.resourceId,
          "user_id": username,
          "marketplace": this.state.federatedMarketPlaceName,
          "access":   parseInt(this.state.numberOfObservations, 10),
          "streaming": false,
          "data_from": this.state.from,
          "data_until": this.state.to,
          "frequency": 0,
      };

   console.log(jsonMessage);
   console.log("role = ",role);
   console.log("username = ",username);

   //this.setState({ selectedProductForStreaming:false });
   //this.props.checkFederatedMarketProductPrice(jsonMessage);
   buttonIsPressed = true;
 };
//--------------------------------------------------------------------------------------------------
onRemoveFromProductHandler  = async e => {


}//end
//--------------------------------------------------------------------------------------------------
//Note that since we selected the streaming configuration the streaming is true.
onStreamingCheckPriceHandler = async e => {
     const { role, username } = this.props.userDetails;
    // create the json message for check price to forward it to marketplace backend
    const jsonMessage = {
          "product_id": this.state.resourceId,
          "user_id": username,
          "marketplace": this.state.federatedMarketPlaceName,
          "access":  parseInt(this.state.numberOfObservations, 10),
          "streaming": true,
          "data_from": this.state.from,
          "data_until": this.state.expirationOfStreaming,
          "frequency": this.state.frequency
      };

   console.log(jsonMessage);
   console.log("role = ",role);
   console.log("username = ",username);


   this.setState({ selectedProductForStreaming:true });
   this.props.checkFederatedMarketProductPrice(jsonMessage);
   buttonIsPressed = true;
};
//--------------------------------------------------------------------------------------------------
onCreateProductHandler = async e => {


//const { role, username ,password} = this.props.userDetails;
console.log("xxx role = " + this.props.userDetails.role);
console.log("xxx username = " + this.props.userDetails.username);
console.log("xxx password = " + this.props.userDetails.password);


if(listOfResourcesInProduct.length === 0){
 alert("No resources added");
 return;
}



  let formData = new FormData();
 // formData.append('federationId', "\"["temp", "humidity"]\"");

  formData.append('globalMarketplaceId', "globalMarketplaceId");

  var object = {};
  formData.forEach((value, key) => object[key] = value);
  var json = JSON.stringify(object);

  var dateTimeFrom     = "11-07-2023";
  var dateTimeTo       = "23-10-2023";
  var fedMarketplaceId = this.state.federatedMarketPlaceName;
  var globalMarketplaceId = false;
  var resourceIds        = listOfResourcesInProduct.map(resource => resource.id);
  var observedProperties = listOfResourcesInProduct.map(resource => resource.observedProperties);
  observedProperties= [].concat(...listOfResourcesInProduct.map(resource => resource.observedProperties));
  var price  = 0;
  var access = 5;
  var frequency = 5;
  const { role, username } = this.props.userDetails;
  var sellerId = username;
  var supportStream = false;

  console.log("resourceIds = " + resourceIds);
  console.log("observedProperties = " + observedProperties);

  var productDetails = this.state.productDetails
  var name           = this.state.productName;

  var temp;

  var verticals = [];
  temp = this.state.productVerticals.trim();
  if(temp === "")
   verticals = [];
  else
   verticals   = this.state.productVerticals.split(',');

  var description = [];
  temp = this.state.productDescriptions.trim();
  if(temp ==="")
    description = [];
  else
    description = this.state.productDescriptions.split(',');


 /* const jsonData ={
        "dateTimeFrom": dateTimeFrom,
        "dateTimeTo": dateTimeTo,
        "description": description,
        "federationId": fedMarketplaceId,
        "globalMarketplaceId": globalMarketplaceId,
        "name": name,
        "resourceIds": resourceIds,
        "observedProperties": observedProperties,
        "price": price,
        "access": access,
        "frequency": frequency,
        "productDetails": productDetails,
        "sellerId": sellerId,
        "supportStream": supportStream,
        "verticals": verticals
     }*/

     const jsonData ={
             //"dateTimeFrom": dateTimeFrom,
            // "dateTimeTo": dateTimeTo,
             "description": description,
             "fedMarketplaceId": fedMarketplaceId,
             "globalMarketplaceId": globalMarketplaceId,
             "name": name,
             "resourceIds": resourceIds,
            // "observedProperties": observedProperties,
            // "price": price,
             //"access": access,
            // "frequency": frequency,
             "productDetails": productDetails,
             "sellerId": sellerId,
             //"supportStream": supportStream,
             "vertical": verticals
          }


     console.log("jsonData = " + jsonData);
     this.props.createNewProduct(jsonData);



};
//--------------------------------------------------------------------------------------------------
  get renderFederatedMarketplaceItems() {

      if(this.state.showFederatedMarketplaceResources == false){

       let federatedMarketPlaceItems = <div><h1 style={{color: "#FFFFFF"}}><strong>Federated Marketplaces</strong></h1>  <h3 style={{color: "#FFFFFF"}}>No federated MarketPlaces found</h3></div>;

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
     return (<div><h1 style={{color: "#FFFFFF"}}><strong>Federated Marketplaces</strong></h1>{federatedMarketPlaceItems}</div>);
    }
}//end
//-----------------------------------------------------------------------------------------------------------
get renderProductSettingsForm(){

return(
      <div className="qos-constraint" style={{backgroundColor:"#f5f5f5"}}>
                 {/* <h3 style={{color: "#0000FF"}}><strong>Created Product Specifications</strong></h3>*/}

                  {/****************Time stamps specification start *******************/}
                   <Row>
                    <Col lg={2} md={2} sm={2} xs={2}>
                    <h4 style={{color: "#000000" }}> <strong>Valid from:</strong></h4>
                     </Col>
                    <Col lg={2} md={2} sm={2} xs={2}>
                      <h4 style={{color: "#0000FF" }}> <strong>{CREATED_PRODUCT_DATE_FROM}</strong></h4>
                    </Col>

                   <Col lg={2} md={2} sm={2} xs={2}>
                     <h4 style={{color: "#000000"}}> <strong>Valid till :</strong></h4>
                    </Col>
                    <Col lg={2} md={2} sm={2} xs={2}>
                      <h4 style={{color: "#0000FF" }}> <strong>{CREATED_PRODUCT_DATE_TO}</strong></h4>
                    </Col>
                  </Row>
                  {/**************** Time stamps specification end *******************/}

                  {/**************** Frequency starts ********************************/}
                  <Row>
                    <Col lg={2} md={2} sm={2} xs={2}>
                     <h4 style={{color: "#000000" }}> <strong>Frequency:</strong></h4>
                    </Col>
                    <Col lg={2} md={2} sm={2} xs={2}>
                      <h4 style={{color: "#0000FF" }}> <strong>{createdProductFrequency}</strong></h4>
                    </Col>

                 {/****************Frequency ends ************************************************/}
                 {/****************Calculated price for created product start ********************/}

                   <Col lg={2} md={2} sm={2} xs={2}>
                    <h4 style={{color: "#000000" }}> <strong>Price:</strong></h4>
                   </Col>
                   <Col lg={2} md={2} sm={2} xs={2}>
                    <h4 style={{color: "#0000FF" }}> <strong>{this.state.totalPrice}</strong></h4>
                   </Col>
                  </Row>
                 {/****************Calculated price for created product end ********************/}
          </div>


);


}
//-----------------------------------------------------------------------------------------------------------
get renderFederatedResourceSearchForm(){
 return(
 <div className="qos-constraint" style={{color: "#f5f5f5" ,backgroundColor:"#ADD8E6",borderRadius: "8px",border: '1px solid #FFFFFF'}}>

 {/*****************************************************/}
 <div>
    <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
        <label style={{color: labelColor1, fontSize:"18px" }}>Observed properties</label>
        <input type="text" className="form-control" placeholder="Insert a list of observed properties comma separated" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_RESOURCE_OBSERVED_PROPERTIES)}/>
   </div>
 <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
       <label style={{color: labelColor1, fontSize:"18px" }}>Platform Name</label>
       <input type="text" className="form-control" placeholder="Insert the platform name " onChange={e => this.onSearchChangeHandler(e,IOTFEDS_PLATFORM_NAMES)}/>
     </div>
 </div>

<div>
    <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
      <label style={{color: labelColor1, fontSize:"18px" }}>Resource Name</label>
       <input type="text" className="form-control" placeholder="Insert the resource name" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_RESOURCE_NAMES)}/>
     </div>
     <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
      <label style={{color: labelColor1, fontSize:"18px" }}>Resource Id</label>
       <input type="text" className="form-control" placeholder="Insert the resource id" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_RESOURCE_IDS)}/>
     </div>
</div>

 <div>
   <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
       <label style={{color: labelColor1, fontSize:"18px" }}>Resource Type</label>
       <input type="text" className="form-control" placeholder="Insert the resource type" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_RESOURCE_RESOURCE_TYPE)}/>
   </div>
    <div className="form-group" style={{width: "50%",float: "left",padding: "5px"}}>
      <label style={{color: labelColor1, fontSize:"18px" }}>Platform Id</label>
      <input type="text" className="form-control" placeholder="Insert the platform Id" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_PLATFORM_ID)}/>
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
   {/*   <Row> */}
   {/*  <Col lg={2} md={2} sm={2} xs={2}>*/}
      {/*   <h4 style={{color: labelColor1 }}> <strong>Adaptive Trust:</strong></h4>*/}
    {/*   </Col>*/}
   {/*    <Col lg={2} md={2} sm={2} xs={2}>*/}
    {/*    <input style={{color: "#000000",marginTop:"10px",width:"100px",borderRadius: "4px",border: '1px solid #000000'}} type="number" name="maxPrice" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_RESOURCE_ADAPTIVE_TRUST)}/>*/}
   {/*    </Col>*/}

    {/*   <Col lg={2} md={2} sm={2} xs={2}>*/}
  {/*       <h4 style={{color: labelColor1 }}> <strong>Resource Trust:</strong></h4>*/}
    {/*   </Col>*/}
   {/*    <Col lg={2} md={2} sm={2} xs={2}>*/}
   {/*     <input style={{color: "#000000",marginTop:"10px",width:"100px",borderRadius: "4px",border: '1px solid #000000'}} type="number" name="maxPrice" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_RESOURCE_RESOURCE_TRUST)}/>*/}
   {/*    </Col>*/}
    {/*  </Row>*/}

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

     {/*****/}

     {/******************/}
     {/*************************Location search parameters ***************************/}
     {/**/}
    <h3 style={{color: "#000000" }}><strong>Location search criteria</strong></h3>
     <div className="panel panel-default" style={{color: "#f5f5f5" ,backgroundColor:"#ffffff00",borderRadius: "8px",border: '1px solid #FFFFFF'}}>

     <Row>
      <Col lg={2} md={2} sm={2} xs={2}>
        <h4 style={{color: labelColor1,marginLeft:"5px" }}> <strong>Location:</strong></h4>
      </Col>
      <Col lg={2} md={2} sm={2} xs={2}>
       <input style={{color: "#000000",marginTop:"10px",width:"800px",height:"30px",borderRadius: "4px",border: '1px solid #000000'}} placeholder="Insert the  location of the resource" type="text" name="locations" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_LOCATIONS)}/>
      </Col>
      </Row>

      <h4 style={{color: "#000000",marginLeft:"6px",marginTop:"20px"}}><strong> Searching area, specify coordinates and radius</strong></h4>
      <div className="panel panel-default" style={{color: "#f5f5f5" ,backgroundColor:"#ffffff00",borderRadius: "8px",border: '2px solid #FFFFFF',marginLeft:"5px",marginRight:"5px"}}>
       <Row>
       <Col lg={4} md={4} sm={4} xs={4}>
         <h4 style={{color: labelColor1,marginLeft:"5px" }}> <strong>Longitude</strong></h4></Col>
        <Col lg={4} md={4} sm={4} xs={4}>
         <h4 style={{color: labelColor1 }}> <strong>Latitude</strong></h4></Col>
        <Col lg={4} md={4} sm={4} xs={4}>
         <h4 style={{color: labelColor1 }}> <strong>Maximum distance</strong></h4> </Col>
       </Row>

     <Row>
      <Col lg={4} md={4} sm={4} xs={4}>
       <input style={{color: "#000000",marginTop:"2px",width:"200px",height:"30px",marginLeft:"5px",borderRadius: "4px",border: '1px solid #000000'}} placeholder="longitude of point of interest" type="text" name="longitude" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_LONGITUDE)}/>
      </Col>
       <Col lg={4} md={4} sm={4} xs={4}>
       <input style={{color: "#000000",marginTop:"2px",marginBottom:"30px",width:"200px",height:"30px",borderRadius: "4px",border: '1px solid #000000'}} placeholder="latitude  of point of interest" type="text" name="latitude" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_LATITUDE)}/>
       </Col>
      <Col lg={4} md={4} sm={4} xs={4}>
        <input style={{color: "#000000",marginTop:"2px",width:"200px",height:"30px",borderRadius: "4px",border: '1px solid #000000'}} placeholder="max distance from point of interest  " type="text" name="max_distance" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_MAX_DISTANCE)}/>
      </Col>

     </Row></div>
   </div>
    {/*************************Search L2 resources button and searching message **************************/}
     <Row>
      <Button bsStyle="primary" style ={{float:"right",marginRight:"20px"}} onClick={e => this.onSearchResourcesHandler(e)}>
       <span className="glyphicon glyphicon-search"></span>
        &nbsp; Search Resources
      </Button>
      <h4 style ={{float:"right",marginRight:"20px",color:"#FF0000"}}>{this.state.searchingMessage}</h4>
      <Button bsStyle="success" style ={{float:"left",marginLeft:"20px"}} onClick={e => this.onShowMarketplacesHandler(e)}>
        &nbsp; Show marketplaces
      </Button>
     </Row>
  </div>

 );

}//end
//-----------------------------------------------------------------------------------------------------------
    get renderFederatedMarketplaceResources() {

      //let products = <div><h1 style={{color: "#FFFFFF"}}><strong>Federated Marketplace</strong></h1>  <h3 style={{color: "#FFFFFF"}}>No federated MarketPlace products found</h3></div>;
      let products = <div></div>
      if(this.state.showFederatedMarketplaceResources == true){
       if (this.props.federations.calculatedProductPrice){
        if((calculatedPriceForStreaming == NOT_DEFINED_YET) && (calculatedPriceForObservations == NOT_DEFINED_YET)){
          //This happens only on beginning or when selecting a new product
          calculatedPriceForStreaming    = this.state.resourcePrice;
          calculatedPriceForObservations = this.state.resourcePrice;
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


       if (this.props.federations.searchedFederatedMarketPlaceL2Resources) {

                    {products = _.map(this.props.federations.searchedFederatedMarketPlaceL2Resources, (member) =>
                      <FederationMarketPlaceResource
                        id        = {member.resourceId}
                        name      = {member.name}
                        price     = {member.price}
                        from      = {member.lr}
                        to        = {member.hr}
                        frequency = {member.fr}
                        observations = {member.observedProperties}
                        description  = {member.description}
                        location     = {member.locationName}
                        borderSize   = {member.resourceId===this.state.resourceSelected?20:0}
                        observedProperties = {member.observedProperties}
                        backgroundColor = {member.resourceId===this.state.resourceSelected?'#6495ED':'#FFFFFF'}
                        handleFederatedMarketResourceSelectClick       = {this.handleFederatedMarketResourceSelectClick}
                        handleFederatedMarketResourceAddToProductClick = {this.handleFederatedMarketResourceAddToProductClick}
                        itemWidth  = {federatedMarketPlaceResourceWidth }
                        itemHeight = {federatedMarketPlaceResourceHeight}
                      />
                   )}
                }


           return (<div style={{backgroundColor:"#ADD8E6",color: "#FF0000",width: "100%",borderRadius: "8px",border: '2px solid #f5f5f5'}}>

           {/*--------------------Collapsible search federated resources area start----------------------------*/}
             <Panel id="id" bsStyle="primary" className="federation-panel-entry"
               expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                  <Panel.Title componentClass="h3">
                   <span className="glyphicon glyphicon-search"></span>  <strong>&nbsp;&nbsp;Search Federated Resources in "{this.state.federatedMarketPlaceName}"  Marketplace </strong>
                 </Panel.Title>
                   <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                    </Panel.Heading>
                      <Panel.Collapse>

                       <div>
                        {this.renderFederatedResourceSearchForm}
                       </div>

                       </Panel.Collapse>
                    <Panel.Footer className="federation-info-footer">

                <span></span>
                <h1></h1>


                 </Panel.Footer>

                </Panel>
           {/*---------------------Collapsible search federated resources area end--------------------------*/}

  {/*--------------------Collapsible product settings area start----------------------------*/}
                        <Panel id="id" bsStyle="primary" className="federation-panel-entry"
                          expanded={this.state.openConfigurationSettingsPanel} onToggle={() => {}}>
                           <Panel.Heading onClick={this.toggleConfigureProductPanel}>
                             <Panel.Title componentClass="h3">
                              <span className="glyphicon glyphicon-cog"></span>  <strong>&nbsp;&nbsp;Created Product Specifications</strong>
                            </Panel.Title>
                              <Glyphicon glyph={this.state.openConfigurationSettingsPanel ? "minus" : "plus"} className="pull-right" />
                               </Panel.Heading>
                                 <Panel.Collapse>
                                  <div>
                                   {this.renderProductSettingsForm}
                                  </div>
                                  </Panel.Collapse>


                           </Panel>
            {/*---------------------Collapsible product settings area end--------------------------*/}

           {this.props.federations.searchedFederatedMarketPlaceL2Resources && this.state.resourceId !== ""?
           <div>
           {/* Resource info  start*/}
           <div style={{backgroundColor:"#ADD8E6",color: "#FF0000",width: "100%",borderRadius: "8px",border: '2px solid #f5f5f5'}}>

           <div className="qos-constraint" style={{color: "#f5f5f5" ,backgroundColor:"#ADD8E6"}}>
            <h3 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Resource name: </strong>{this.state.resourceName}</h3>
            <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Measures: </strong>{RESOURCE_OBSERVATIONS}</h4>

            <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Description:</strong> {this.state.resourceDescription}</h4>
            <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Valid date from:</strong> {this.state.resourceTimeStampFrom} <span></span> <strong> to:</strong> {this.state.resourceTimeStampTo}</h4>
           {/* <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Valid date to:</strong> {this.state.resourceTimeStampTo}</h4>*/}
            <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Location:</strong> {this.state.resourceLocation}</h4>
            <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Frequency:</strong> {this.state.resourceFrequency}</h4>
            {/*<h4 style={{color: "#000000"}}><strong>Max number of Observations:</strong> {this.state.resourceNumOfObservations}</h4>*/}
            <h4 style={{color: "#000000",fontFamily:"Trebuchet MS"}}><strong>Price:</strong> {this.state.resourcePrice} FedCoins</h4>
           <Row>
           </Row>
           {/*************** List of Resources starts *********************/}
           <div className="qos-constraint" style={{backgroundColor:"#ADD8E6"}}>
            <h3 style={{color: "#0000FF"}}><strong>List of product resources:</strong></h3>
            {/*************** List of resource products start *******************/}
            <div className="container-fluid movie-app">

             {listOfResourcesInProduct.length >0?

             listOfResourcesInProduct.map((resource) => (
                         <FederationMarketPlaceResourceInBasket
                          id    = {resource.id}
                          name  = {resource.name}
                          price = {resource.price}
                          handleFederatedMarketResourceRemoveFromBasketClick = {this.handleFederatedMarketResourceRemoveFromBasketClick} />
                       ))

                :""}


            </div>

            {/*************** List of resource products end *********************/}
            {/****************Buttons for product creation  start *******************************/}

            <div className="qos-constraint" style={{backgroundColor:"#ADD8E6"}}>
             <Row>
               <div style={{ display: 'flex', alignItems: 'center' }}>
                 <input style={{ marginRight: '20px' }} type="text" className="form-control" placeholder="Insert the name of the product" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_NAME_OF_PRODUCT)}/>
                 <input style={{ marginLeft: '20px' }}  type="text" className="form-control" placeholder="Insert the product details" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_DETAILS_OF_PRODUCT)}/>
               </div>

             {/* REMOVED <div>
                 <h4 style={{color: "#000000",width: "500px",height: "30px",float: "left" ,marginRight:'10px'}}><strong>Total Price: </strong>{this.state.totalPrice} FedCoins</h4>
               </div>*/}
            </Row>
            <Row>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <input style={{ marginRight: '20px',marginTop: '10px' }} type="text" className="form-control" placeholder="Insert the descriptions comma separated" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_DESCRIPTIONS_OF_PRODUCT)}/>
               <input style={{ marginLeft: '20px' ,marginTop: '10px' }}  type="text" className="form-control" placeholder="Insert the verticals of the product comma separated" onChange={e => this.onSearchChangeHandler(e,IOTFEDS_VERTICALS_OF_PRODUCT)}/>
             </div>

             {/* REMOVED <div>
                 <h4 style={{color: "#000000",width: "500px",height: "30px",float: "left" ,marginRight:'10px'}}><strong>Total Price: </strong>{this.state.totalPrice} FedCoins</h4>
               </div>*/}
            </Row>
            </div>
            <div className="qos-constraint" style={{backgroundColor:"#ADD8E6"}}>
              <Row>
               <div>
                 <button style={{backgroundColor:"#27ae60", color: "#FFFFFF",width: "160px",height: "30px",borderRadius: "8px",border: '2px solid #27ae60',float: "right" ,marginRight:'5px',marginLeft:'10px'}} onClick={e => this.onCreateProductHandler(e)}> Create Product </button>
               </div>

             {/* REMOVED <div>
                 <h4 style={{color: "#000000",width: "500px",height: "30px",float: "left" ,marginRight:'10px'}}><strong>Total Price: </strong>{this.state.totalPrice} FedCoins</h4>
               </div>*/}
            </Row>

           </div>
            {/**************** Buttons for product creation end *********************************************/}
            {/**************** List of Resources ends *******************************************************/}
            </div>


           </div>
           </div> {/* Resource info  end*/}


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
        //this.setState({ showFederatedMarketplaceResources: false });
        //alert('Component is now visible');
      }
    }//end
//-------------------------------------------------------------------------------
  render() {//NOTE: searchedFederatedMarketPlaceL2Resources will replace availableFederatedMarketPlaceResources
    const { searchedFederatedMarketPlaceL2Resources,availableFederatedMarketPlaces,calculatedProductPrice,fetching_error,successfulProductMessage } = this.props.federations;

    return (
     <VisibilitySensor onChange={this.onChange}>

      <div className="container-fluid movie-app">
       <FieldError error={fetching_error}/>
       <FieldSuccess message={successfulProductMessage}/>
        <div className='row'>
         {this.renderFederatedMarketplaceItems}
        </div>
        <div className='row'>
         {this.renderFederatedMarketplaceResources}
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
        //userLoginState: state.userLoginState

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
    deactivateFederationDeleteModal
})(withRouter(CreateProduct));



