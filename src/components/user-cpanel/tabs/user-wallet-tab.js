import React, { Fragment } from "react";
import UserWalletPage from "../../../containers/marketplace/user-wallet-page";

const UserWalletDetails = () => {
    console.log("##### Back to UserWalletDetails #####");

    return(
        <Fragment>
            <UserWalletPage  showResources={false}/>
        </Fragment>
    );
};

export default UserWalletDetails;