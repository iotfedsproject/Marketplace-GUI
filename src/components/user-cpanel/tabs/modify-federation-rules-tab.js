import React, { Fragment } from "react";
/*import FederationRegistrationModal from "../../../containers/federation/federation-registration-modal";*/
import ModifyFederationRulesContainer from "../../../containers/federation/modify-federation-rules-container";

const ModifyFederationRulesDetails = () => {
    return(
        <Fragment>
            {/*<FederationRegistrationModal /> */}
            <h1><strong>Federation Rules</strong></h1>
            <ModifyFederationRulesContainer isAdmin={false}/>
        </Fragment>
    );
};

export default ModifyFederationRulesDetails;