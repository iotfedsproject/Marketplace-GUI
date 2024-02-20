import React, { Fragment } from "react";
/*import FederationRegistrationModal from "../../../containers/federation/federation-registration-modal";*/
import FederationToJoinList from "../../../containers/federation/federation-join-list";

const FederationJoinDetails = () => {
    return(
        <Fragment>
            {/*<FederationRegistrationModal /> */}
            <h1><strong>List of available federations</strong></h1>
            <FederationToJoinList isAdmin={false}/>
        </Fragment>
    );
};

export default FederationJoinDetails;