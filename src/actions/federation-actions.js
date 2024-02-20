import axios from "axios";
import { ROOT_URL,EXCHANGE_ROOT_URL } from "../configuration";
import {
    headers, FETCH_FEDERATIONS, REGISTER_FEDERATION, DELETE_FEDERATION, LEAVE_FEDERATION,CHANGE_FEDERATION_RULES,
    ACTIVATE_FEDERATION_DELETE_MODAL, DEACTIVATE_FEDERATION_DELETE_MODAL,
    ACTIVATE_FEDERATION_LEAVE_MODAL, DEACTIVATE_FEDERATION_LEAVE_MODAL,
    ACTIVATE_FEDERATION_INVITE_MODAL, DEACTIVATE_FEDERATION_INVITE_MODAL,
    ACTIVATE_HANDLE_FEDERATION_INVITATION_MODAL, DEACTIVATE_HANDLE_FEDERATION_INVITATION_MODAL,
    INVITE_TO_FEDERATION, HANDLE_INVITATION,ACTIVATE_FEDERATION_JOIN_MODAL,DEACTIVATE_FEDERATION_JOIN_MODAL,JOIN_FEDERATION,
    ACTIVATE_FEDERATION_CHANGE_RULES_MODAL,DEACTIVATE_FEDERATION_CHANGE_RULES_MODAL,ACTIVATE_HANDLE_FEDERATION_CHANGE_RULES_MODAL,
    DEACTIVATE_HANDLE_FEDERATION_CHANGE_RULES_MODAL,ACTIVATE_FEDERATION_LEAVE_WITH_VOTE_MODAL,DEACTIVATE_FEDERATION_LEAVE_WITH_VOTE_MODAL,
    LEAVE_FEDERATION_WITH_VOTE,FETCH_FEDERATED_MARKETPLACES,FETCH_FEDERATED_MARKETPLACE_PRODUCTS,SEARCH_FEDERATED_MARKETPLACE_PRODUCTS,
    CHECK_FEDERATED_MARKETPLACE_PRODUCT_PRICE,FETCH_FEDERATED_MARKETPLACE_RESOURCES,SEARCH_FEDERATED_MARKETPLACE_RESOURCES_L2,
    CREATE_FEDERATED_MARKETPLACE_PRODUCT,BUY_FEDERATED_MARKETPLACE_PRODUCT,RESET_MARKETPLACE_STATE,RESET_CREATE_PRODUCT_STATE,
    FETCH_MY_EXCHANGE_TOKENS,FETCH_OTHERS_EXCHANGE_TOKENS,IOTFEDS_SET_PASSWORD,FETCH_ALL_EXCHANGE_TOKENS,EXCHANGE_TOKENS,GET_EXCHANGE_OFFERS,
    ACCEPT_EXCHANGE_OFFER,CANCEL_EXCHANGE_OFFER,DECLINE_EXCHANGE_OFFER,MAKE_EXCHANGEABLE_TOKEN,REMOVE_TOKEN_FROM_EXCHANGE,DELETE_PRODUCT,
    AUDIT_RECEIPT_BUYER,AUDIT_RECEIPT_SELLER,AUDIT_VERIFY_RECEIPT_SELL,AUDIT_VERIFY_RECEIPT_BUY,AUDIT_VERIFY_ACCESS_LOG,AUDIT_ACCESS_LOGS,GET_BALANCE
 } from "./index";

axios.defaults.withCredentials = true;

export function setIotFedsPassword(password){
console.log("setIotFedsPassword password1 = "+ password);
 return {
        type: IOTFEDS_SET_PASSWORD,
        payload: password
    };
}

export function resetMarketPlace(){
 return {
        type: RESET_MARKETPLACE_STATE,
        payload: ""
    };
}//end
//----------------------------------------------------------------------------------------------------
export function getBalance(){
 const url = `${ROOT_URL}/user/cpanel/get_balance`;
 const customHeaders = {...headers, ['Content-Type']: 'application/text; charset=UTF-8'};
 console.log("getBalance: ");

     const config = {
         url: url,
         method: 'get',
         headers: customHeaders
     };

     const request = axios.request(config);

     return {
         type: GET_BALANCE,
         payload: request
     };
}//end
//----------------------------------------------------------------------------------------------------
export function auditReceiptBuyerVerify(jsonData){
 const url = `${ROOT_URL}/auditing/verify_receipt`;
 const customHeaders = {...headers, ['Content-Type']: 'application/text; charset=UTF-8'};
 console.log("auditReceiptBuyerVerify: " + jsonData);

     const config = {
         url: url,
         method: 'post',
         data: jsonData,
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: AUDIT_VERIFY_RECEIPT_BUY,
         payload: request
     };
}//end
//----------------------------------------------------------------------------------------------------
export function auditReceiptSellerVerify(jsonData){
 const url = `${ROOT_URL}/auditing/verify_receipt`;
 const customHeaders = {...headers, ['Content-Type']: 'application/text; charset=UTF-8'};
 console.log("auditReceiptSellerVerify: " + jsonData);

     const config = {
         url: url,
         method: 'post',
         data: jsonData,
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: AUDIT_VERIFY_RECEIPT_SELL,
         payload: request
     };
}//end
//----------------------------------------------------------------------------------------------------
export function auditAccessLogVerify(jsonData){
 const url = `${ROOT_URL}/auditing/verify_access_log`;
 const customHeaders = {...headers, ['Content-Type']: 'application/text; charset=UTF-8'};
 console.log("auditAccessLogVerify: " + jsonData);

     const config = {
         url: url,
         method: 'post',
         data: jsonData,
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: AUDIT_VERIFY_ACCESS_LOG,
         payload: request
     };
}//end
//----------------------------------------------------------------------------------------------------
export function resetCreateProduct(){
 return {
        type: RESET_CREATE_PRODUCT_STATE,
        payload: ""
    };
}//end
//----------------------------------------------------------------------------------------------------
export function auditAccessLogs(jsonData){
 const url = `${ROOT_URL}/auditing/logs`;
 const customHeaders = {...headers, ['Content-Type']: 'application/text; charset=UTF-8'};
 console.log("auditAccessLogs: " + jsonData);

     const config = {
         url: url,
         method: 'post',
         data: jsonData,
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: AUDIT_ACCESS_LOGS,
         payload: request
     };
}//end
//----------------------------------------------------------------------------------------------------
export function auditReceiptBuyer(jsonData){
 const url = `${ROOT_URL}/auditing/receipt_buyer`;
 const customHeaders = {...headers, ['Content-Type']: 'application/text; charset=UTF-8'};
 console.log("auditReceiptBuyer: " + jsonData);

     const config = {
         url: url,
         method: 'post',
         data: jsonData,
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: AUDIT_RECEIPT_BUYER,
         payload: request
     };
}//end
//----------------------------------------------------------------------------------------------------
export function auditReceiptSeller(jsonData){
 const url = `${ROOT_URL}/auditing/receipt_seller`;
 const customHeaders = {...headers, ['Content-Type']: 'application/text; charset=UTF-8'};
 console.log("auditReceiptSeller");

     const config = {
         url: url,
         method: 'post',
         data: jsonData,
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: AUDIT_RECEIPT_SELLER,
         payload: request
     };
}
//----------------------------------------------------------------------------------------------------
export function acceptExchangeOffer(offerId){ //ok
 const url = `${EXCHANGE_ROOT_URL}/${offerId}/accept`;
     const customHeaders = {...headers, ['Content-Type']: 'application/text; charset=UTF-8'};
     console.log("acceptExchangeOffers");

     const config = {
         url: url,
         method: 'post',
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: ACCEPT_EXCHANGE_OFFER,
         payload: request
     };

 }//end
 //----------------------------------------------------------------------------------------------------
 export function cancelExchangeOffer(offerId){ //ok
  const url = `${EXCHANGE_ROOT_URL}/${offerId}/cancel`;
      const customHeaders = {...headers, ['Content-Type']: 'application/text; charset=UTF-8'};
      console.log("acceptExchangeOffers");

      const config = {
          url: url,
          method: 'post',
          headers: headers
      };

      const request = axios.request(config);

      return {
          type: CANCEL_EXCHANGE_OFFER,
          payload: request
      };

  }//end
  //----------------------------------------------------------------------------------------------------
  export function declineExchangeOffer(offerId){ //ok
   const url = `${EXCHANGE_ROOT_URL}/${offerId}/decline`;
       const customHeaders = {...headers, ['Content-Type']: 'application/text; charset=UTF-8'};
       console.log("acceptExchangeOffers");

       const config = {
           url: url,
           method: 'post',
           headers: headers
       };

       const request = axios.request(config);

       return {
           type:DECLINE_EXCHANGE_OFFER,
           payload: request
       };

   }//end
//----------------------------------------------------------------------------------------------------
 export function deleteProduct(productId,credentials){
   const url = `${ROOT_URL}/product/${productId}`;
   const customHeaders = {...headers, ['Content-Type']: 'application/json; charset=UTF-8'};
   console.log("deleteProduct");

       const config = {
           url: url,
           method: 'delete',
           headers: headers,
           data: credentials
       };

       const request = axios.request(config);

       return {
           type:DELETE_PRODUCT,
           payload: request
       };

   }//end
//----------------------------------------------------------------------------------------------------
//retrieve user's own exchange offers
//Note that this action retrieves //all offers,pending,canceled,completed
export function getExchangeOffers(userId){
 const url = `${EXCHANGE_ROOT_URL}?userId=${userId}`;
     const customHeaders = {...headers, ['Content-Type']: 'application/json; charset=UTF-8'};
     console.log("getExchangeOffers");

     const config = {
         url: url,
         method: 'get',
         headers: customHeaders
     };

     const request = axios.request(config);

     return {
         type: GET_EXCHANGE_OFFERS,
         payload: request
     };

 }//end
//----------------------------------------------------------------------------------------------------
//put token for exchange
export function makeExchangeableToken(userId,productId,marketplace){//ok
 const url = `${EXCHANGE_ROOT_URL}/tokens?userId=${userId}&productId=${productId}&marketplace=${marketplace}`;

// let formData = new FormData();
 //formData.append('userId', userId);
 //formData.append('productId', productId);

     const config = {
         url: url,
         method: 'post',
         //data: formData,
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: MAKE_EXCHANGEABLE_TOKEN,
         payload: request
     };

 }//end
//----------------------------------------------------------------------------------------------------
 //delete tokens for exchange
 export function removeTokenFromExchange(userId,productId,marketplace){//ok
  const url = `${EXCHANGE_ROOT_URL}/tokens?userId=${userId}&productId=${productId}&marketplace=${marketplace}`;

  //let formData = new FormData();
  //formData.append('userId', userId);
  //formData.append('productId', productId);
 // formData.append('productId', productId);

      const config = {
          url: url,
          method: 'delete',
          //data: formData,
          headers: headers
      };

      const request = axios.request(config);

      return {
          type: REMOVE_TOKEN_FROM_EXCHANGE,
          payload: request
      };

  }//end
//----------------------------------------------------------------------------------------------------
//Submit new exchange offer
export function exchangeTokens(jsonMessage){ //ok
 const url = `${EXCHANGE_ROOT_URL}`;
     const customHeaders = {...headers, ['Content-Type']: 'application/json; charset=UTF-8'};
     console.log("exchangeTokens");

     const config = {
         url: url,
         method: 'post',
         data: jsonMessage,
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: EXCHANGE_TOKENS,
         payload: request
     };

 }//end
//----------------------------------------------------------------------------------------------------
//Get exchangeable tokens
export function searchAllExchangeTokens(marketplace){ //ok
     const url = `${EXCHANGE_ROOT_URL}/tokens?marketplace=` + marketplace;
     console.log("searchAllExchangeTokens");

     const config = {
         url: url,
         method: 'get',
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: FETCH_ALL_EXCHANGE_TOKENS,
         payload: request
     };

 }//end
//----------------------------------------------------------------------------------------------------
 export function searchMyExchangeTokens(userId){
 const url = `${EXCHANGE_ROOT_URL}/user-tokens?userId=${userId}`;
     const customHeaders = {...headers, ['Content-Type']: 'application/json; charset=UTF-8'};
     console.log("searchMyExchangeTokens");

     const config = {
         url: url,
         method: 'get',
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: FETCH_MY_EXCHANGE_TOKENS,
         payload: request
     };

 }//end
//----------------------------------------------------------------------------------------------------
export function searchOthersExchangeTokens(){
 const url = `${ROOT_URL}/product/tokens`;
     const customHeaders = {...headers, ['Content-Type']: 'application/json; charset=UTF-8'};
     console.log("searchOthersExchangeTokens");

     const config = {
         url: url,
         method: 'post',
         data: "??",
         headers: headers
     };

     const request = axios.request(config);

     return {
         type: FETCH_OTHERS_EXCHANGE_TOKENS,
         payload: request
     };

 }//end
//----------------------------------------------------------------------------------------------------
export function checkFederatedMarketProductPrice(federatedMarketPlaceProductSpecifications) {
    const url = `${ROOT_URL}/product/get-price`;
    const customHeaders = {...headers, ['Content-Type']: 'application/json; charset=UTF-8'};
    console.log("checkFederatedMarketProductPrice",federatedMarketPlaceProductSpecifications);

    const config = {
        url: url,
        method: 'post',
        data: federatedMarketPlaceProductSpecifications,
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: CHECK_FEDERATED_MARKETPLACE_PRODUCT_PRICE,
        payload: request
    };
}//end
//---------------------------------------------------------------------------------------------------------
export function buyFederatedMarketPlaceProduct(federatedMarketPlaceProductToBuy) {
    const url = `${ROOT_URL}/product/buy`;
    const customHeaders = {...headers, ['Content-Type']: 'application/json; charset=UTF-8'};

    console.log("federatedMarketPlaceProductToBuy",federatedMarketPlaceProductToBuy);

    const config = {
        url: url,
        method: 'post',
        data: federatedMarketPlaceProductToBuy,
        headers: customHeaders
    };

    const request = axios.request(config);

    return {
        type: BUY_FEDERATED_MARKETPLACE_PRODUCT,
        payload: request

    };
}//end
//-------------------------------------------------------------------------------------------
export function checkFederatedMarketPlaces() {//not used
    const url = `${ROOT_URL}/user/cpanel/list_marketplaces`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_FEDERATED_MARKETPLACES,
        payload: request

    };
}

export function fetchFederations() {//not used
    const url = `${ROOT_URL}/user/cpanel/list_federations`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_FEDERATIONS,
        payload: request

    };
}//end
//----------------------------------------------------------------------------------------
export function fetchFederatedMarketPlaces() {
    const url = `${ROOT_URL}/user/cpanel/list_marketplaces`;
    const customHeaders = {...headers, ['Content-Type']: 'application/json; charset=UTF-8'};

    const config = {
        url: url,
        method: 'post',
        headers: customHeaders
    };

    const request = axios.request(config);

    return {
        type: FETCH_FEDERATED_MARKETPLACES,
        payload: request

    };
}
//not used
export function fetchProductsFromFederatedMarketPlace(federatedMarketPlaceId) {

    const url = `${ROOT_URL}/listFederatedMarketPlaceProducts`;

    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('federationId', federatedMarketPlaceId);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config);

        return {
            type: FETCH_FEDERATED_MARKETPLACE_PRODUCTS,
            payload: request

        };

}//end
//-----------------------------------------------------------------
//not used
export function fetchResourcesFromFederatedMarketplace(federatedMarketPlaceId) {

    const url = `${ROOT_URL}/listFederatedMarketPlaceResources`;

    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('federationId', federatedMarketPlaceId);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config);

        return {
            type: FETCH_FEDERATED_MARKETPLACE_RESOURCES,
            payload: request

        };

}//end
//-----------------------------------------------------------------
//Searches L2 resources in a marketplace
export function searchResourcesFromFederatedMarketPlace(searchFederations,
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
                                                                   sort)
 {
   const url = `${ROOT_URL}/resource/search/l2`;
   const customHeaders = {...headers, ['Content-Type']: 'application/json; charset=UTF-8'};

   /*const jsonData ={
      "adaptiveTrust": searchAdaptiveTrust,
      "credentials": { "clientId": clientId,"password": password,"platformId": platformId,"username": username },
      "description": searchDescriptions,
      "federationId": searchFederations,
      "resourceId": searchResourceIds,
      "locationLat": searchLatitude,
      "locationLong": searchLongitude,
      "locationName": searchLocations,
      "maxDistance": searchMaxDistance,
      "resourceName": searchResourceNames,
      "observed_property": searchObservationProperties,
      "price_max": searchMaxPrice,
      "price_min": searchMinPrice,
      "rep_max": searchMaxRep,
      "rep_min": searchMinRep,
      "resourceTrust": searchResourceTrust,
      "resource_type": searchResourceType,
      "sort": sort
   }*/

       const jsonResponseData ={};
           jsonResponseData.credentials = { "clientId": clientId,"password": password,"platformId": platformId,"username": username };
           if(searchAdaptiveTrust!== null)
            jsonResponseData.adaptiveTrust = searchAdaptiveTrust;
           if(searchFederations!== null)
            jsonResponseData.federationId = searchFederations;
           if(searchPlatformNames!== null)
            jsonResponseData.platformName = searchPlatformNames;
           if(searchResourceIds!== null)
            jsonResponseData.resourceId= searchResourceIds;
           if(searchLatitude!== null)
            jsonResponseData.locationLat= searchLatitude;
           if(searchLongitude!== null)
            jsonResponseData.locationLong= searchLongitude;
           if(searchLocations!== null)
             jsonResponseData.locationName= searchLocations;
           if(searchMaxDistance!== null)
            jsonResponseData.maxDistance= searchMaxDistance;
           if(searchResourceNames!== null)
            jsonResponseData.resourceName= searchResourceNames;
           if(searchObservationProperties!== null)
            jsonResponseData.observed_property= searchObservationProperties;
           if(searchMaxPrice!== null)
            jsonResponseData.priceMax= searchMaxPrice;
           if(searchMinPrice!== null)
            jsonResponseData.priceMin= searchMinPrice;
           if(searchMaxRep!== null)
            jsonResponseData.repMax= searchMaxRep;
           if(searchMinRep!== null)
            jsonResponseData.repMin= searchMinRep;
           if(searchResourceTrust!== null)
            jsonResponseData.resourceTrust= searchResourceTrust;
           if(searchResourceType!== null)
             jsonResponseData.resource_type= searchResourceType;
           jsonResponseData.sort= sort;

           console.log(jsonResponseData);

            const config = {
                   url: url,
                   method: 'post',
                   data: jsonResponseData,
                   headers: customHeaders
               };

               const request = axios.request(config);

               return {
                 type: SEARCH_FEDERATED_MARKETPLACE_RESOURCES_L2,
                 payload: request
               };

}//end
//---------------------------------------------------------------------------------------------
export function createNewProduct(jsonData){

 const url = `${ROOT_URL}/product`;
 const customHeaders = {...headers, ['Content-Type']: 'application/json; charset=UTF-8', ['Accept']: 'application/json; charset=UTF-8'};

    const config = {
        url: url,
        method: 'post',
        data: jsonData,
        headers: customHeaders
    };

    const request = axios.request(config);

    return {
      type: CREATE_FEDERATED_MARKETPLACE_PRODUCT,
      payload: request
     };

}//end
//---------------------------------------------------------------------------------------------
export function searchProductsFromFederatedMarketPlace(fedMarketplaceId,
                                                       globalMarketplaceId,
                                                       sellers,
                                                       priceMin,
                                                       priceMax,
                                                       name,
                                                       description,
                                                       resources,
                                                       productRepMin,
                                                       productRepMax,
                                                       vertical,
                                                       location,
                                                       searchStreamingAvailability,
                                                       username,password,clientId,platformId){

    const url = `${ROOT_URL}/product/search`;
    const customHeaders = {...headers, ['Content-Type']: 'application/json; charset=UTF-8'};

    ////////////////// In case is no needed to use Formdata then use the following Json structure as //////////
    ///////////////// register user user action in Admin Gui //////////////////////////////////////////////////
    ///////////////////////////////////////////////
     const jsonData = {
       "sellerId": sellers,
       "priceMin": priceMin,
       "priceMax": priceMax,
       "name": name,
       "fedMarketplaceId": fedMarketplaceId,
       "globalMarketplace": null,
       "description": description,
       "locationName": location,
       "resources": resources,
       "streaming": searchStreamingAvailability,
       "repMin": productRepMin,
       "repMax": productRepMax,
       "vertical": vertical,
       "sort": "descending",
       "credentials": { "clientId": clientId,"password": password,"platformId": platformId,"username": username }
     }

    const jsonResponseData ={};
       if(sellers!== null)
        jsonResponseData.sellerId = sellers;
       if(priceMin!== null)
        jsonResponseData.priceMin = priceMin;
       if(priceMax!== null)
        jsonResponseData.priceMax = priceMax;
       if(productRepMin!== null)
         jsonResponseData.repMin = productRepMin;
       if(productRepMax!== null)
        jsonResponseData.repMax = productRepMax;
       if(name!== null)
        jsonResponseData.name = name;
       jsonResponseData.fedMarketplaceId= fedMarketplaceId;
       //"globalMarketplace": globalMarketplaceId,
       if(description!== null)
        jsonResponseData.description= description;
       if(resources!== null)
        jsonResponseData.resources= resources;
       if(vertical!== null)
        jsonResponseData.vertical = vertical;
       if(location!== null)
        jsonResponseData.locationName= location;

       jsonResponseData.streaming = searchStreamingAvailability;

       jsonResponseData.sort= "descending";

       jsonResponseData.credentials = { "clientId": clientId,"password": password,"platformId": platformId,"username": username };


    //const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('federationId', fedMarketplaceId);
    formData.append('globalMarketplaceId', globalMarketplaceId);
    formData.append('sellerId', sellers);
    formData.append('priceMin', priceMin);
    formData.append('priceMax', priceMax);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('resources', resources);
    formData.append('repMin', productRepMin);
    formData.append('repMax', productRepMax);
    formData.append('vertical', vertical);

    var object = {};
    formData.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);

    const config = {
        url: url,
        method: 'post',
        data: jsonResponseData,//jsonData,//json,
        headers: customHeaders
    };

    const request = axios.request(config);

        return {
            type: SEARCH_FEDERATED_MARKETPLACE_PRODUCTS,
            payload: request

        };

}//end
//----------------------------------------------------------------------------------
export function registerFederation(props, cb) {
    const url = `${ROOT_URL}/user/cpanel/create_federation`;

    const config = {
        url: url,
        method: 'post',
        data: props,
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: REGISTER_FEDERATION,
        payload: request
    };
}//end
//-----------------------------------------------------------------------
export function changeFederationRules(props, cb) {
    const url = `${ROOT_URL}/federation_vote_request/updateFederationRules`;

    const config = {
        url: url,
        method: 'post',
        data: props,
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: CHANGE_FEDERATION_RULES,
        payload: request
    };
}

export function deleteFederation(federationIdToDelete, isAdmin, cb) {

    const url = `${ROOT_URL}/${isAdmin ? "admin" : "user"}/cpanel/delete_federation`;

    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('federationIdToDelete', federationIdToDelete);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config)
        .then((res) => {
            cb(res);
            return res;
        });

    return {
        type: DELETE_FEDERATION,
        payload: request
    };
}
export function joinToFederation(federationIdToJoin, isAdmin, cb) {
    //TODO update the endpoint
    const url = `${ROOT_URL}/${isAdmin ? "admin" : "user"}/cpanel/federation_vote_request/joinFederation`;

    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('federationId', federationIdToJoin);//TODO check if is federationId or id or....

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config)
        .then((res) => {
            cb(res);
            return res;
        });

    return {
        type: JOIN_FEDERATION,
        payload: request
    };
}

export function leaveFederation(federationId, platformId, isAdmin, cb) {

    const url = `${ROOT_URL}/${isAdmin ? "admin" : "user"}/cpanel/leave_federation`;

    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('federationId', federationId);
    formData.append('platformId', platformId);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config)
        .then((res) => {
            cb(res);
            return res;
        });

    return {
        type: LEAVE_FEDERATION,
        payload: request
    };
}

export function leaveFederationWithVote(federationId, platformId, isAdmin, cb) {

    const url = `${ROOT_URL}/${isAdmin ? "admin" : "user"}/cpanel/xxxxxxxx`;//UPDATE THE URL

    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('federationId', federationId);
    formData.append('platformId', platformId);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config)
        .then((res) => {
            cb(res);
            return res;
        });

    return {
        type: LEAVE_FEDERATION_WITH_VOTE,
        payload: request
    };
}

export function inviteToFederation(invitation, cb) {
    const url = `${ROOT_URL}/user/cpanel/federation_invite`;

    const config = {
        url: url,
        method: 'post',
        data: invitation,
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: INVITE_TO_FEDERATION,
        payload: request
    };
}

export function handleFederationInvitation(federationId, platformId, accepted, cb) {
    const url = `${ROOT_URL}/user/cpanel/federation/handleInvitation`;

    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('federationId', federationId);
    formData.append('platformId', platformId);
    formData.append('accepted', accepted);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config)
        .then((res) => {
            cb(res);
            return res;
        });

    return {
        type: HANDLE_INVITATION,
        payload: request
    };
}

export function activateFederationDeleteModal(federationId) {
    return {
        type: ACTIVATE_FEDERATION_DELETE_MODAL,
        payload: federationId
    };
}

export function deactivateFederationDeleteModal() {
    return {
        type: DEACTIVATE_FEDERATION_DELETE_MODAL,
    };
}

export function activateFederationJoinModal(federationId) {
   // alert("activateFederationJoinModal");
    return {
        type: ACTIVATE_FEDERATION_JOIN_MODAL,
        payload: federationId
    };
}

export function deactivateFederationJoinModal() {
   //x alert("deactivateFederationJoinModal");
    return {
        type: DEACTIVATE_FEDERATION_JOIN_MODAL,
    };
}


export function activateFederationLeaveModal(federationId, platformId) {
    console.log("activateFederationLeaveModal");
    console.log(federationId);
    return {
        type: ACTIVATE_FEDERATION_LEAVE_MODAL,
        payload: { federationId, platformId }
    };
}

export function deactivateFederationLeaveModal() {
    return {
        type: DEACTIVATE_FEDERATION_LEAVE_MODAL,
    };
}


export function activateFederationLeaveWithVoteModal(federationId, platformId) {
    console.log("activateFederationLeaveWithVoteModal");
    console.log(federationId);

    return {
        type: ACTIVATE_FEDERATION_LEAVE_WITH_VOTE_MODAL,
        payload: { federationId, platformId }
    };
}

export function deactivateFederationLeaveWithVoteModal() {
    return {
        type: DEACTIVATE_FEDERATION_LEAVE_WITH_VOTE_MODAL,
    };
}

export function activateFederationInviteModal(federationId) {
    return {
        type: ACTIVATE_FEDERATION_INVITE_MODAL,
        payload: federationId
    };
}

export function deactivateFederationInviteModal() {
    return {
        type: DEACTIVATE_FEDERATION_INVITE_MODAL,
    };
}

export function activateHandleFederationInvitationModal(federationId, platformId, accept) {
    return {
        type: ACTIVATE_HANDLE_FEDERATION_INVITATION_MODAL,
        payload: { federationId, platformId, accept }
    };
}

export function deactivateHandleFederationInvitationModal() {
    return {
        type: DEACTIVATE_HANDLE_FEDERATION_INVITATION_MODAL,
    };
}


export function activateFederationChangeRulesModal(federationId,federation,fedTypeRules,fedGovBoardGov,fedGovProposals,fedGovVoteRules,fedGovVoteRulesTypes,qualityAssuranceMetrics,qualityAssuranceMetricsQuality,QualityAssuranceMetricsQoEWeights,QualityAssuranceMetricsQoSWeights,fedMarketplace) {
    return {
        type: ACTIVATE_FEDERATION_CHANGE_RULES_MODAL,
        payload: {federationId,federation,fedTypeRules,fedGovBoardGov,fedGovProposals,fedGovVoteRules,fedGovVoteRulesTypes,qualityAssuranceMetrics,qualityAssuranceMetricsQuality,QualityAssuranceMetricsQoEWeights,QualityAssuranceMetricsQoSWeights,fedMarketplace}
    };
}

export function deactivateFederationChangeRulesModal() {
    return {
        type: DEACTIVATE_FEDERATION_CHANGE_RULES_MODAL,
    };
}

export function activateHandleFederationChangeRulesModal(federationId, platformId, accept) {
    return {
        type: ACTIVATE_HANDLE_FEDERATION_CHANGE_RULES_MODAL,
        payload: { federationId, platformId, accept }
    };
}

export function deactivateHandleFederationChangeRulesModal() {
    return {
        type: DEACTIVATE_HANDLE_FEDERATION_CHANGE_RULES_MODAL,
    };
}