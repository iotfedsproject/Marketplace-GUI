import React, { Fragment } from "react";
//import FederationRegistrationModal from "../../../containers/federation/federation-registration-modal";
import CreateProduct from "../../../containers/marketplace/create-product";

const CreateProductDetails = () => {
    console.log("##### Back to CreateProduct #####");

    return(
        <Fragment>
            <CreateProduct  showResources={false}/>
        </Fragment>
    );
};


export default CreateProductDetails;
