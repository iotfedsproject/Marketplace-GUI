import React, { Fragment } from "react";
import ExchangeMarketPlace from "../../../containers/marketplace/exchange-marketplace";

const ExchangeMarketPlaceDetails = () => {
    console.log("##### Back to ExchangeMarketPlaceDetails #####");

    return(
        <Fragment>
            <ExchangeMarketPlace  showResources={false}/>
        </Fragment>
    );
};


export default ExchangeMarketPlaceDetails;