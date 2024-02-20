import React, { Fragment } from "react";
import FederationRegistrationModal from "../../../containers/federation/federation-registration-modal";
import FederationMarketPlace from "../../../containers/marketplace/federated-marketplace";

const FederationMarketPlaceDetails = () => {
       console.log("##### Back to FederationMarketPlace #####");

    return(
        <Fragment>
            {/*<FederationMarketPlace isAdmin={false}/>*/}
            <FederationMarketPlace  showFederatedMarketplaceProducts={false}/>
        </Fragment>
    );
};


export default FederationMarketPlaceDetails;