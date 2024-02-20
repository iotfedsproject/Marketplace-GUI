import React, { Fragment } from "react";
import PlatformRegistrationModal from "../../../containers/platform/platform-registration-modal";
import PlatformUpdateModal from "../../../containers/platform/platform-update-modal";
import PlatformList from "../../../containers/platform/platform-list";

const PlatformDetails = () => {
    return(
        <Fragment>
           <h1>Platform list</h1>
            <PlatformRegistrationModal />
            <PlatformUpdateModal />
            <PlatformList />
        </Fragment>
    );
};

export default PlatformDetails;