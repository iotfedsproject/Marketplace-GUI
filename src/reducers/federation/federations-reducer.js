import _ from "lodash";
import {
    FETCH_FEDERATIONS, REGISTER_FEDERATION, DELETE_FEDERATION, LEAVE_FEDERATION, HANDLE_INVITATION, INVITE_TO_FEDERATION,
    DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT, DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT,
    DISMISS_FEDERATION_LEAVE_SUCCESS_ALERT, DISMISS_FEDERATION_LEAVE_ERROR_ALERT,
    DISMISS_FEDERATION_DELETION_SUCCESS_ALERT, DISMISS_FEDERATION_DELETION_ERROR_ALERT,
    DISMISS_FEDERATION_INVITATION_SUCCESS_ALERT, DISMISS_FEDERATION_INVITATION_ERROR_ALERT,
    DISMISS_HANDLE_FEDERATION_INVITATION_SUCCESS_ALERT, DISMISS_HANDLE_FEDERATION_INVITATION_ERROR_ALERT,
    REMOVE_FEDERATION_REGISTRATION_ERRORS,JOIN_FEDERATION,DISMISS_FEDERATION_JOIN_SUCCESS_ALERT,DISMISS_FEDERATION_JOIN_ERROR_ALERT,
    CHANGE_FEDERATION_RULES,DISMISS_FEDERATION_CHANGE_RULES_ERROR_ALERT, DISMISS_FEDERATION_CHANGE_RULES_SUCCESS_ALERT,
    LEAVE_FEDERATION_WITH_VOTE,FETCH_FEDERATED_MARKETPLACES,FETCH_FEDERATED_MARKETPLACE_PRODUCTS,CHECK_FEDERATED_MARKETPLACE_PRODUCT_PRICE,
    FETCH_FEDERATED_MARKETPLACE_RESOURCES,SEARCH_FEDERATED_MARKETPLACE_RESOURCES_L2,CREATE_FEDERATED_MARKETPLACE_PRODUCT,
    SEARCH_FEDERATED_MARKETPLACE_PRODUCTS,BUY_FEDERATED_MARKETPLACE_PRODUCT,RESET_MARKETPLACE_STATE,RESET_CREATE_PRODUCT_STATE,
    FETCH_MY_EXCHANGE_TOKENS,FETCH_OTHERS_EXCHANGE_TOKENS,IOTFEDS_SET_PASSWORD,FETCH_ALL_EXCHANGE_TOKENS,EXCHANGE_TOKENS,GET_EXCHANGE_OFFERS,
    ACCEPT_EXCHANGE_OFFER,CANCEL_EXCHANGE_OFFER,DECLINE_EXCHANGE_OFFER,MAKE_EXCHANGEABLE_TOKEN,REMOVE_TOKEN_FROM_EXCHANGE,DELETE_PRODUCT,
    AUDIT_RECEIPT_BUYER,AUDIT_RECEIPT_SELLER,AUDIT_VERIFY_RECEIPT_SELL,AUDIT_VERIFY_RECEIPT_BUY,AUDIT_VERIFY_ACCESS_LOG,AUDIT_ACCESS_LOGS,GET_BALANCE

} from "../../actions";
import { ROOT_URL } from "../../configuration";

const INITIAL_STATE = { password: "xxx",availableBalance: {}, availableAccessLogs: {},availableReceiptBuyer: {}, availableReceiptSeller: {}, myExchangeOffers: {}, allAvailableExchangeTokens: {} ,myAvailableExchangeTokens: {}, othersAvailableExchangeTokens: {}, availableFederations: {}, availableFederatedMarketPlaces: {}, availableFederatedMarketPlaceProducts: {}, searchedFederatedMarketPlaceL2Resources: {},productCreationMessage:{}, availableFederatedMarketPlaceResources: {}, calculatedProductPrice: {} };

export default function(state = {}, action) {
    switch(action.type) {
case GET_BALANCE:
 if (action.error)
       return { ...state, balance_error_message : `${action.payload.message}: Error balance not found`, availableBalance: `-`};
      else {
         var responseMessage = action.payload.data.balance;
         console.log("balance: ", responseMessage);
         return {...state, balance_error_message : "" , availableBalance: responseMessage};
      }
      break;
break;
case AUDIT_ACCESS_LOGS:
 if (action.error)
       return { ...state, audit_access_logs_error_message : `${action.payload.message}: Could not audit for access logs`};
      else {
         var foundAccessLogsItems =  _.mapKeys(action.payload.data, "TransactionID");
         var responseMessage = "Success";

         if (foundAccessLogsItems) {
            var sizeOfAccessLogsItems = Object.keys(foundAccessLogsItems).length;
            responseMessage = "Success!!! Found a list of access logs";
            console.log("Size of sizeOfAccessLogsItems: ", sizeOfAccessLogsItems);
          } else {
            console.log("sizeOfMyExchangeOffers is null or undefined");
            responseMessage ="No list of access logs found";
          }

          return {...state, audit_access_logs_error_message : "",auditAccessLogsMessage: responseMessage, availableAccessLogs: foundAccessLogsItems};
      }
      break;
case AUDIT_VERIFY_ACCESS_LOG:
     if (action.error)
       return { ...state, audit_access_logs_error_message : `${action.payload.message}: Could not audit for verification access log`};
      else {
       var responseMessage =  "";

       if(action.payload.data.Verified === true)
        responseMessage = "Verification of access log is verified";
       else
        responseMessage = "Verification of access log is not verified";

        return {...state, audit_access_logs_error_message : "",auditAccessLogsMessage: responseMessage};
      }

break;
case AUDIT_VERIFY_RECEIPT_BUY:
     if (action.error)
      return { ...state, audit_receipt_buyer_error_message : `${action.payload.message}: Could not audit for verification receipt of purchased product`};
     else {
      var responseMessage =  "";

      if(action.payload.data.Verified === true)
        responseMessage = "Receipt for purchased product is verified";
       else
        responseMessage = "Receipt for purchased product not verified";

        return {...state, audit_receipt_buyer_error_message : "",auditReceiptBuyerMessage: responseMessage};
      }
    break;
    case AUDIT_RECEIPT_BUYER:
     if (action.error)
      return { ...state, audit_receipt_buyer_error_message : `${action.payload.message}: Could not audit for receipts of purchased products`};
     else {
        var foundReceiptBuyerItems =  _.mapKeys(action.payload.data, "TransactionID");
        var responseMessage = "Success";

        if (foundReceiptBuyerItems) {
           var sizeOfReceiptBuyerItems = Object.keys(foundReceiptBuyerItems).length;
           responseMessage = "Success!!! Found a list of receipts of purchased products";
           console.log("Size of sizeOfReceiptBuyerItems: ", sizeOfReceiptBuyerItems);
         } else {
           console.log("sizeOfMyExchangeOffers is null or undefined");
           responseMessage ="No receipts of purchased products found";
         }

         return {...state, audit_receipt_buyer_error_message : "",auditReceiptBuyerMessage: responseMessage, availableReceiptBuyer: foundReceiptBuyerItems};
     }
    break;
case AUDIT_VERIFY_RECEIPT_SELL:
     if (action.error)
      return { ...state, audit_receipt_seller_error_message : `${action.payload.message}: Could not audit for to verification receipt of product sold`};
     else {
        var responseMessage =  "";

        if(action.payload.data.Verified === true)
         responseMessage = "Receipt for product sold is verified";
        else
         responseMessage = "Receipt for product sold not verified";

        return {...state, audit_receipt_seller_error_message : "",auditReceiptSellerMessage: responseMessage};
     }
    break;
    case AUDIT_RECEIPT_SELLER:
     if (action.error)
      return { ...state, audit_receipt_seller_error_message : `${action.payload.message}: Could not audit for receipts of products sold`};
     else {
        var foundReceiptSellerItems =  _.mapKeys(action.payload.data, "TransactionID");
        var responseMessage = "Success";

        if (foundReceiptSellerItems) {
           var sizeOfReceiptSellerItems = Object.keys(foundReceiptSellerItems).length;
           responseMessage = "Success!!! Found a list receipts of products sold";
           console.log("Size of sizeOfReceiptSellerItems: ", sizeOfReceiptSellerItems);
         } else {
           console.log("sizeOfReceiptSellerItems is null or undefined");
           responseMessage ="No receipts of products sold found";
         }

         return {...state, audit_receipt_seller_error_message : "",auditReceiptSellerMessage: responseMessage, availableReceiptSeller: foundReceiptSellerItems};
     }
    break;

    case ACCEPT_EXCHANGE_OFFER:
    if (action.error)
      return { ...state,proposal_error_message : `${action.payload.message}: Could not accepted the proposal`};
    else {
      return {...state, proposal_error_message : "",proposalMessage: action.payload.data};
    }
     break;
    case CANCEL_EXCHANGE_OFFER:
     if (action.error)
      return { ...state,proposal_error_message : `${action.payload.message}: Could not cancel the proposal`};
     else {
      return {...state, proposal_error_message : "",proposalMessage: action.payload.data};
     }
    break;
    case DECLINE_EXCHANGE_OFFER:
     if (action.error)
      return { ...state,proposal_error_message : `${action.payload.message}: Could not decline the proposal`};
     else {
      return {...state, proposal_error_message : "",proposalMessage: action.payload.data};
     }
    break;
    case GET_EXCHANGE_OFFERS:
     if (action.error)
      return { ...state,proposal_error_message : `${action.payload.message}: Could not get  exchange offers`};
     else {
        var foundMyExchangeOffers =  _.mapKeys(action.payload.data, "id");

        var responseMessage = "Success";

        if (foundMyExchangeOffers) {
           var sizeOfMyExchangeOffers = Object.keys(foundMyExchangeOffers).length;
           responseMessage = "Found " + sizeOfMyExchangeOffers + " Proposals";
           console.log("Size of sizeOfMyExchangeOffers: ", sizeOfMyExchangeOffers);
         } else {
           console.log("sizeOfMyExchangeOffers is null or undefined");
           responseMessage ="No  Exchange Offers found";
         }

         return {...state, proposal_error_message : "",proposalMessage: responseMessage, myExchangeOffers :  foundMyExchangeOffers};
     }
    break;

    case EXCHANGE_TOKENS:
       if (action.error)
         return { ...state,exchange_tokens_error : `${action.payload.message}: Could not Exchange Tokens`};
         else {
           const accepted     = action.payload.data.accepted;
           console.log("accepted = " + accepted);
           console.log("accepted = " + typeof accepted);
           if(accepted === true)
            return {...state, exchange_tokens_error : "",successfulExchangeTokensMessage: "Tokens submitted to be exchanged. Status: " + action.payload.data.status + ".  Exchange id = " + action.payload.data.id };
           else
            return {...state, exchange_tokens_error : "",successfulExchangeTokensMessage: "Tokens exchanged not accepted "};

         }
    break;
   case REMOVE_TOKEN_FROM_EXCHANGE:
   console.log("REMOVE_TOKEN_FROM_EXCHANGE");
     if (action.error)
        return { ...state, successfulMyTokensMessage: "",successfulExchangeTokensMessage: "", successfulExchangeTokensMessage: "",fetching_error : `${action.payload.message}: Could not make the token exchangeable`,fetching_my_tokens_error : `${action.payload.message}: Could not make the token exchangeable`};
          else {
           //////////var exchangeTokens =  _.mapKeys(action.payload.data, "productId");
           // Check if foundMyExchangeTokens is not null or undefined
           var responseMessage = "Success";
           responseMessage = action.payload.data.code;
         /////////  if (exchangeTokens) {
          //////////  var sizeOfExchangeTokens = Object.keys(exchangeTokens).length;
          ///////////  responseMessage = "The token is now removed from exchange";
          ////////  console.log("Size of sizeOfExchangeTokens", sizeOfExchangeTokens);
          //////// } else {
          ////////    console.log("sizeOfExchangeTokens is null or undefined");
         /////     responseMessage ="No  Exchange Tokens found";
        ///////   }
        //           return {...state, fetching_error : "",fetching_my_tokens_error : "",successfulExchangeTokensMessage: responseMessage,successfulMyTokensMessage: responseMessage, allAvailableExchangeTokens :  exchangeTokens};

           return {...state, fetching_error : "",fetching_my_tokens_error : "",successfulExchangeTokensMessage: responseMessage,successfulMyTokensMessage: responseMessage};
          }
   break;

    case MAKE_EXCHANGEABLE_TOKEN:
     console.log("MAKE_EXCHANGEABLE_TOKEN");
     if (action.error)
        return { ...state,  successfulMyTokensMessage: "",  successfulExchangeTokensMessage: "",fetching_error : `${action.payload.message}: Could not make the token exchangeable`,fetching_my_tokens_error : `${action.payload.message}: Could not make the token exchangeable`};
          else {
           /////////var exchangeTokens =  _.mapKeys(action.payload.data, "productId");
           // Check if foundMyExchangeTokens is not null or undefined
           var responseMessage = "Success";
           responseMessage = action.payload.data.code;
           //////////if (exchangeTokens) {
           //////// var sizeOfExchangeTokens = Object.keys(exchangeTokens).length;
           ////////// responseMessage = "The token is now exchangeable";
           ////////// console.log("Size of sizeOfExchangeTokens", sizeOfExchangeTokens);
          ////// } else {
              ///////console.log("sizeOfExchangeTokens is null or undefined");
             ///////// responseMessage ="No  Exchange Tokens found";
           /////}
           //return {...state, fetching_error : "",fetching_my_tokens_error : "", successfulExchangeTokensMessage: responseMessage, successfulMyTokensMessage: responseMessage,allAvailableExchangeTokens :  exchangeTokens};
           return {...state, fetching_error : "",fetching_my_tokens_error : "", successfulExchangeTokensMessage: responseMessage, successfulMyTokensMessage: responseMessage};

          }
          break;
    case FETCH_ALL_EXCHANGE_TOKENS:
       if (action.error)
           return { ...state, successfulExchangeTokensMessage: "", successfulExchangeTokensMessage: "",fetching_error : `${action.payload.message}: Could not find my ExchangeTokens`};
          else {
          /////////////
         // const filteredData = _.filter(action.payload.data, { toBeExchanged: true });
          ////////////
           var exchangeTokens =  _.mapKeys(action.payload.data, "productId");
           // Check if foundMyExchangeTokens is not null or undefined
           var responseMessage = "Success";

           if (exchangeTokens) {
            var sizeOfExchangeTokens= Object.keys(exchangeTokens).length;
            responseMessage = "Found " + sizeOfExchangeTokens + " Exchange Tokens";
            console.log("Size of sizeOfExchangeTokens:", sizeOfExchangeTokens);
           } else {
            console.log("sizeOfExchangeTokens is null or undefined");
            responseMessage ="No  Exchange Tokens found";
           }

          return {...state, fetching_error : "",successfulExchangeTokensMessage: responseMessage, allAvailableExchangeTokens :  exchangeTokens};
         }
    break;

    case FETCH_MY_EXCHANGE_TOKENS:
      if (action.error)
       return { ...state, successfulMyTokensMessage: "",fetching_my_tokens_error : `${action.payload.message}: Could not fetch my wallet`};
      else {
       var foundMyTokens =  _.mapKeys(action.payload.data, "productId");
       var responseMessage = "Success";

       if (foundMyTokens) {
        var sizeOfMyTokens= Object.keys(foundMyTokens).length;
        responseMessage = "Found " + sizeOfMyTokens + " Tokens in my wallet";
        console.log("Size of sizeOfMyTokens:", sizeOfMyTokens);
       } else {
        console.log("foundMyExchangeTokens is null or undefined");
        responseMessage ="No Tokens found";
       }

      return {...state, fetching_my_tokens_error : "",successfulMyTokensMessage: responseMessage, myAvailableExchangeTokens :  foundMyTokens};
     }
    break;

    case FETCH_OTHERS_EXCHANGE_TOKENS:

    break;

    case IOTFEDS_SET_PASSWORD:
    console.log("password: action.payload.data = " + action.payload)
      return {...state,password: action.payload};
    break;

    case RESET_MARKETPLACE_STATE:
     return {...state,fetching_error : "", successfulMessage: "",availableFederatedMarketPlaceProducts: '', calculatedProductPrice: "" };
    break;

    case RESET_CREATE_PRODUCT_STATE:
         return {...state,fetching_error : "",  successfulProductMessage: "", searchedFederatedMarketPlaceL2Resources: '', calculatedProductPrice: "" };
    break;

    case CHECK_FEDERATED_MARKETPLACE_PRODUCT_PRICE:
     if (action.error){
        if(action.payload.response)
         return { ...state, successfulMessage: "", calculatedProductPrice: "",fetching_error : `${action.payload.response.data.message}: Could not calculate the product price `};
        else
         return { ...state, successfulMessage: "", calculatedProductPrice: "",fetching_error : `${action.payload.message}: Could not calculate the product price `};
       }
     else {
       console.log("calculatedProductPrice",action.payload.data.price);
       return {...state,fetching_error : "", successfulMessage: "Success,the price of product is calculated ",calculatedProductPrice :  action.payload.data.price};
    }
    break;
   case BUY_FEDERATED_MARKETPLACE_PRODUCT:
     if (action.error){
       if(action.payload.response)
        return { ...state, successfulMessage: "",fetching_error : `${action.payload.response.data.message}: Could not buy the product`};
       else
        return { ...state, successfulMessage: "",fetching_error : `${action.payload.message}: Could not buy the product`};
       }
     else {
       return {...state,fetching_error : "", successfulMessage: "The product purchased completely successfully"};
    }
    break;

    case DELETE_PRODUCT:
     if (action.error)
         return { ...state,  successfulMessage: "",fetching_error : `${action.payload.message}: Could not delete  product`};
       else {
         var responseMessage = "Deletion of product with id : " + + action.payload.data.id +" completed. Press the search products button to update the list of products.";//  + ". " + action.payload.data.body;
         return {...state, fetching_error : "", successfulMessage: responseMessage };
       }
    break;

    case SEARCH_FEDERATED_MARKETPLACE_PRODUCTS:

     if (action.error)//check if we should use ..state instead of INITIAL_STATE
        return { ...INITIAL_STATE, successfulMessage: "",fetching_error : `${action.payload.message}: Could not search products`};
      else {

        var foundProducts =  _.mapKeys(action.payload.data, "productId");//_.mapKeys(action.payload.data.body, "productId");
        // Check if foundProducts is not null or undefined
        var responseMessage = "Success";

        if (foundProducts) {
          var sizeOfFoundProducts = Object.keys(foundProducts).length;
          responseMessage = "Found " + sizeOfFoundProducts + " products";
          console.log("Size of foundProducts:", sizeOfFoundProducts);
        } else {
          console.log("foundProducts is null or undefined");
          responseMessage ="No products found";
        }

        return {...state, fetching_error : "", successfulMessage: responseMessage , availableFederatedMarketPlaceProducts :  _.mapKeys(action.payload.data, "productId")};
      }
   break;

   case SEARCH_FEDERATED_MARKETPLACE_RESOURCES_L2:
       if (action.error)//check if we should use ..state instead of INITIAL_STATE
         return { ...INITIAL_STATE, successfulProductMessage: "",fetching_error : `${action.payload.message}: Could not search L2 resources`};
       else {

        var foundL2Resources =  _.mapKeys(action.payload.data, "resourceId");
        // Check if foundL2Resources is not null or undefined
        var responseMessage = "Success";

        if (foundL2Resources) {
          var sizeOfFoundL2Resources = Object.keys(foundL2Resources).length;
          responseMessage = "Found " + sizeOfFoundL2Resources + " L2 resources";
          console.log("Size of foundL2Resources:", sizeOfFoundL2Resources);
        } else {
          console.log("foundL2Resources is null or undefined");
          responseMessage ="No L2 Resources found";
        }

         return {...state, fetching_error : "",successfulProductMessage: responseMessage, searchedFederatedMarketPlaceL2Resources :  _.mapKeys(action.payload.data, "resourceId")};
       }
      break;

    case CREATE_FEDERATED_MARKETPLACE_PRODUCT:
          if (action.error)//check if we should use ..state instead of INITIAL_STATE
            return { ...INITIAL_STATE,successfulProductMessage: "", fetching_error : `${action.payload.message}: Could not create product`};
          else {
            return {...state, fetching_error : "", successfulProductMessage: "The product created with id: " + action.payload.data.id, productCreationMessage :  action.payload.data};
          }

      break;

   case FETCH_FEDERATED_MARKETPLACE_RESOURCES://replaced by SEARCH_FEDERATED_MARKETPLACE_RESOURCES_L2

        if (action.error)//check if we should use ..state instead of INITIAL_STATE
           return { ...INITIAL_STATE, successfulMessage: "",fetching_error : `${action.payload.message}: Could not fetch the list of resources`};
         else {
           return {...state, fetching_error : "",successfulMessage: "Success", availableFederatedMarketPlaceResources :  _.mapKeys(action.payload.data, "id")};
         }
      break;

    case FETCH_FEDERATED_MARKETPLACES:
         if (action.error)//check if we should use ..state instead of INITIAL_STATE
            return { ...INITIAL_STATE, successfulMessage: "", fetching_error : `${action.payload.message}: Could not fetch the federated marketplaces list`};
         else {
               return {...state, fetching_error : "",successfulMessage: "",availableFederatedMarketPlaces :action.payload.data};//  _.mapKeys(action.payload.data, "id")};
         }
        case FETCH_FEDERATIONS:

            if (action.error)//check if we should use ..state instead of INITIAL_STATE
                return { ...INITIAL_STATE, successfulMessage: "",fetching_error : `${action.payload.message}: Could not fetch the federation list`};
            else {
                console.log("else");
                return {...state, availableFederations :  _.mapKeys(action.payload.data, "id")};
            }
        case CHANGE_FEDERATION_RULES:
        console.log("----------- CHANGE_FEDERATION_RULES---------------");
        console.log(action.payload);
        if (action.error){

         console.log("action.error");
         console.log(action.error);

           if (action.payload.response && action.payload.response.data.error){
            console.log(action.payload.response);
            const message = action.payload.response.data.error;
            console.log(message);

             return {
                 ...removeErrors(state),
                 federationRulesUpdateError: message
                 };

           }else{
           return {
              ...removeErrors(state),
              federationRulesUpdateError: "Network Error: Could not contact server"
             };
           }

        }else{
           if (action.payload.data.message){
             console.log("if action.payload.data.message");
             const message = action.payload.data.message;
             console.log(message);
             return {
                ...removeErrors(state),
                federationRulesUpdateSuccessful: message
             };
         }
        }

        return state;
        break;
        case REGISTER_FEDERATION:
            if (action.error) {

                if (action.payload.response) {
                    const message = action.payload.response.data;
                    let newState = {};


                    if (message["error_id"])
                        newState.id_error = message["error_id"];

                    if (message["error_name"])
                        newState.name_error = message["error_name"];

                    if (message["error_informationModel_id"])
                        newState.informationModel_id_error = message["error_informationModel_id"];

                    if (message["error_public"])
                        newState.public_error = message["error_public"];

                    if (message["error_public"])
                        newState.public_error = message["error_public"];

                    if (message["error_members"])
                        newState.members_error = message["error_members"];

                    if (message["error_members_platformId"]) {
                        newState.members_id_error = [];
                        for (let i of message["error_members_platformId"])
                            newState.members_id_error.push(i);

                    }

                    if (message["error_slaConstraints_metric"]) {
                        newState.slaConstraints_metric_error = [];
                        for (let i of message["error_slaConstraints_metric"])
                            newState.slaConstraints_metric_error.push(i);

                    }

                    if (message["error_slaConstraints_comparator"]) {
                        newState.slaConstraints_comparator_error = [];
                        for (let i of message["error_slaConstraints_comparator"])
                            newState.slaConstraints_comparator_error.push(i);

                    }

                    if (message["error_slaConstraints_threshold"]) {
                        newState.slaConstraints_threshold_error = [];
                        for (let i of message["error_slaConstraints_threshold"])
                            newState.slaConstraints_threshold_error.push(i);

                    }

                    if (message["error_slaConstraints_duration"]) {
                        newState.slaConstraints_duration_error = [];
                        for (let i of message["error_slaConstraints_duration"])
                            newState.slaConstraints_duration_error.push(i);

                    }

                    newState.federationRegistrationError = message.error;
                    return { ...removeErrors(state), ...newState};
                } else {
                    return {
                        ...removeErrors(state),
                        federationRegistrationError: "Network Error: Could not contact server"
                    };
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const response = JSON.parse(action.payload.request.response);
                    const { federation } = response;
                    const { id } =  federation;
                    const successfulFederationRegistration = `Registration of federation "${id}" was successful!`;

                    let newFederations = {
                        ...state.availableFederations,
                        [id] : federation
                    };

                    return {
                        ...removeErrors(state),
                        availableFederations : newFederations,
                        successfulFederationRegistration,
                    };
                }
            }
        case LEAVE_FEDERATION:
            if (action.error) {
                let newState = _.omit(state, "successfulFederationLeave");

                if (action.payload.response) {
                    const { data } = action.payload.response;
                    const message = data.error ? data.error : data;
                    return {  ...removeErrors(newState), federationLeaveError : message };
                } else {
                    return { ...removeErrors(newState), federationLeaveError: "Network Error: Could not contact server"};
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const federationId = action.payload.config.data.get("federationId");
                    const platformId = action.payload.config.data.get("platformId");
                    const { status } = action.payload;
                    let successfulFederationLeave = "";
                    let newState = _.omit(state, "federationLeaveError");
                    let newAvailableFederation = { };

                    if (status === 200) {
                        successfulFederationLeave = `The platform with id "${platformId}" left the federation "${federationId}" successfully!`;
                        newAvailableFederation = {
                            ...state.availableFederations,
                            [federationId]: action.payload.data[federationId]
                        };
                    } else if (status === 204) {
                        successfulFederationLeave = `The federation "${federationId}" was deleted, since platform `
                            + `"${platformId}" was the only platform left in the federation`;
                        newAvailableFederation = _.omit(state.availableFederations, federationId);
                    }

                    return {
                        ...removeErrors(newState),
                        availableFederations : newAvailableFederation,
                        successfulFederationLeave
                    };
                }
            }
 case LEAVE_FEDERATION_WITH_VOTE :
            if (action.error) {
                let newState = _.omit(state, "successfulFederationLeave");

                if (action.payload.response) {
                    const { data } = action.payload.response;
                    const message = data.error ? data.error : data;
                    return {  ...removeErrors(newState), federationLeaveError : message };
                } else {
                    return { ...removeErrors(newState), federationLeaveError: "Network Error: Could not contact server"};
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const federationId = action.payload.config.data.get("federationId");
                    const platformId = action.payload.config.data.get("platformId");
                    const { status } = action.payload;
                    let successfulFederationLeave = "";
                    let newState = _.omit(state, "federationLeaveError");
                    let newAvailableFederation = { };

                    if (status === 200) {
                        successfulFederationLeave = `The platform with id "${platformId}" left the federation "${federationId}" successfully!`;
                        newAvailableFederation = {
                            ...state.availableFederations,
                            [federationId]: action.payload.data[federationId]
                        };
                    } else if (status === 204) {
                        successfulFederationLeave = `The federation "${federationId}" was deleted, since platform `
                            + `"${platformId}" was the only platform left in the federation`;
                        newAvailableFederation = _.omit(state.availableFederations, federationId);
                    }

                    return {
                        ...removeErrors(newState),
                        availableFederations : newAvailableFederation,
                        successfulFederationLeave
                    };
                }
            }
        case JOIN_FEDERATION:

        if (action.error) {
         let newState = _.omit(state, "successfulFederationJoin");

          if (action.payload.response && action.payload.response.data.error) {
            const message = action.payload.response.data.error;
           return { ...newState, federationJoinError : message };
          } else {
            return {...newState, federationJoinError: "Network Error: Could not contact server"};
          }
        }
         else {
           const pattern = new RegExp(`${ROOT_URL}$`);

               if (pattern.test(action.payload.request.responseURL))
                   return state;
               else {
                 const federationId = action.payload.config.data.get("federationIdToDelete");//TODO federationIdToDelete to federationId
                 const successfulFederationJoin = `The federation with id "${federationId}" was deleted successfully!`;

                 let newState = _.omit(state, "federationJoinError");

                  return {
                         ...removeErrors(newState),
                         availableFederations : _.omit(state.availableFederations, federationId),
                         successfulFederationJoin
                  };
             }
          }
        case DELETE_FEDERATION:
            if (action.error) {
                let newState = _.omit(state, "successfulFederationDeletion");

                if (action.payload.response && action.payload.response.data.error) {
                    const message = action.payload.response.data.error;
                    return { ...newState, federationDeletionError : message };
                } else {
                    return {...newState, federationDeletionError: "Network Error: Could not contact server"};
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const federationId = action.payload.config.data.get("federationIdToDelete");
                    const successfulFederationDeletion = `The federation with id "${federationId}" was deleted successfully!`;

                    let newState = _.omit(state, "federationDeletionError");

                    return {
                        ...removeErrors(newState),
                        availableFederations : _.omit(state.availableFederations, federationId),
                        successfulFederationDeletion
                    };
                }
            }
        case INVITE_TO_FEDERATION:
            if (action.error) {
                if (action.payload.response && action.payload.response.data.error) {
                    const message = action.payload.response.data;
                    let newState = {};

                    newState.federationInvitationError = message.error;
                    return { ...removeErrors(state), ...newState};
                } else {
                    return {
                        ...removeErrors(state),
                        federationInvitationError: "Network Error: Could not contact server"
                    };
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const invitationRequest = JSON.parse(action.payload.config.data);
                    const id =  invitationRequest["federationId"];
                    const response = JSON.parse(action.payload.request.response);
                    const federation = response[id];
                    const successfulFederationInvitation = `Invitation to federation "${id}" was successful!`;

                    let newFederations = {
                        ...state.availableFederations,
                        [id] : federation
                    };

                    return {
                        ...removeErrors(state),
                        availableFederations : newFederations,
                        successfulFederationInvitation,
                    };
                }
            }
        case HANDLE_INVITATION:
            if (action.error) {
                let newState = _.omit(state, "successfulHandleFederationInvitation");

                if (action.payload.response) {
                    const { data } = action.payload.response;
                    const message = data.error ? data.error : data;
                    return {  ...removeErrors(newState), handleFederationInvitationError : message };
                } else {
                    return { ...removeErrors(newState), handleFederationInvitationError: "Network Error: Could not contact server"};
                }
            }
            else {
                const pattern = new RegExp(`${ROOT_URL}$`);

                if (pattern.test(action.payload.request.responseURL))
                    return state;
                else {
                    const federationId = action.payload.config.data.get("federationId");
                    const platformId = action.payload.config.data.get("platformId");
                    const accepted = action.payload.config.data.get("accepted");
                    const successfulHandleFederationInvitation = `The invitation to platform with id "${platformId}" ` +
                        `to join the federation with id "${federationId}" was ${accepted === "true" ? "accepted" : "rejected"} successfully`;
                    let newState = _.omit(state, "handleFederationInvitationError");
                    let newAvailableFederation = { };

                    newAvailableFederation = {
                        ...state.availableFederations,
                        [federationId]: action.payload.data[federationId]
                    };


                    return {
                        ...removeErrors(newState),
                        availableFederations : newAvailableFederation,
                        successfulHandleFederationInvitation
                    };
                }
            }
        case DISMISS_FEDERATION_CHANGE_RULES_ERROR_ALERT:
          return _.omit(state, "federationRulesUpdateError");//mxar
        case DISMISS_FEDERATION_CHANGE_RULES_SUCCESS_ALERT:
           return _.omit(state, "federationRulesUpdateSuccessful");//mxar

        case DISMISS_FEDERATION_REGISTRATION_SUCCESS_ALERT:
            return _.omit(state, "successfulFederationRegistration");
        case DISMISS_FEDERATION_REGISTRATION_ERROR_ALERT:
            return _.omit(state, "federationRegistrationError");
        case DISMISS_FEDERATION_LEAVE_SUCCESS_ALERT:
            return _.omit(state, "successfulFederationLeave");
        case DISMISS_FEDERATION_LEAVE_ERROR_ALERT:
            return _.omit(state, "federationLeaveError");
        case DISMISS_FEDERATION_DELETION_SUCCESS_ALERT:
            return _.omit(state, "successfulFederationDeletion");
        case DISMISS_FEDERATION_DELETION_ERROR_ALERT:
            return _.omit(state, "federationDeletionError");
        case DISMISS_FEDERATION_JOIN_SUCCESS_ALERT:
            return _.omit(state, "successfulFederationJoin");
        case DISMISS_FEDERATION_JOIN_ERROR_ALERT:
            return _.omit(state, "federationJoinError");
        case DISMISS_FEDERATION_INVITATION_SUCCESS_ALERT:
            return _.omit(state, "successfulFederationInvitation");
        case DISMISS_FEDERATION_INVITATION_ERROR_ALERT:
            return _.omit(state, "federationInvitationError");
        case DISMISS_HANDLE_FEDERATION_INVITATION_SUCCESS_ALERT:
            return _.omit(state, "successfulHandleFederationInvitation");
        case DISMISS_HANDLE_FEDERATION_INVITATION_ERROR_ALERT:
            return _.omit(state, "handleFederationInvitationError");
        case REMOVE_FEDERATION_REGISTRATION_ERRORS:
            return {...removeErrors(state)};
        default:
            return state;
    }
}

const removeErrors = (state) => {
    const errors = [
        "id_error", "error_platforms_id", "qosConstraints_metric_error",
        "qosConstraints_comparator_error", "qosConstraints_threshold_error",
        "qosConstraints_duration_error", "federationRegistrationError",
        "federationLeaveError", "federationDeletionError", "federationInvitationError",
        "handleFederationInvitationError","federationJoinError","federationRulesUpdateError"
    ];

    let newState = {...state};
    for (let i = 0; i < errors.length; i++)
        newState =  _.omit(newState, errors[i]);

    return newState;
};