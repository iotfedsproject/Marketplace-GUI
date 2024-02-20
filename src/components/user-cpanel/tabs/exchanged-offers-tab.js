import React, { Fragment } from "react";
import ExchangeOffersPage from "../../../containers/marketplace/exchange-offers-page";

const ExchangeOffersDetails = () => {
    console.log("##### Back to ExchangeMarketPlaceDetails #####");

    return(
        <Fragment>
            <ExchangeOffersPage  showResources={false}/>
        </Fragment>
    );
};


export default ExchangeOffersDetails;