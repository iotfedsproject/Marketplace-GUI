import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ServerInfoReducer from "./server/server-info-reducer";
import UserRolesReducer from "./user/user-roles-reducer";
import UserDetailsReducer from "./user/user-details-reducer";
import UserRegistrationReducer from "./user/user-registration-reducer";
import UserLoginReducer from "./user/user-login-reducer";
import ForgotPasswordReducer from "./user/forgot-password-reducer";
import ResendVerificationEmail from "./user/resend-verification-email-reducer";
import UserLogoutReducer from "./user/user-logout-reducer";
import ModalReducer from "./modal/modal-reducer";
import ClientDeleteModalReducer from "./client/delete-client-modal-reducer";
import PlatformDeleteModalReducer from "./platform/delete-platform-modal-reducer";
import PlatformUpdateModalReducer from "./platform/update-platform-modal-reducer";
import PlatformConfigModalReducer from "./platform/config-platform-modal-reducer";
import SSPConfigModalReducer from "./ssp/config-ssp-modal-reducer";
import SSPUpdateModalReducer from "./ssp/update-ssp-modal-reducer";
import SSPDeleteModalReducer from "./ssp/delete-ssp-modal-reducer";
import InformationModelReducer from "./information-model/information-models-reducer";
import InfoModelDeleteModalReducer from "./information-model/delete-info-model-modal-reducer";
import MappingReducer from "./mapping/mappings-reducer";
import MappingDeleteModalReducer from "./mapping/delete-mapping-modal-reducer";
import UserPlatformsReducer from "./platform/user-platforms-reducer";
import UserSSPsReducer from "./ssp/user-ssps-reducer";
import FederationsReducer from "./federation/federations-reducer";
import FederationDeleteModalReducer from "./federation/delete-federation-modal-reducer";
import FederationLeaveModalReducer from "./federation/leave-federation-modal-reducer";
import FederationInviteModalReducer from "./federation/invite-federation-modal-reducer";
import HandleFederationInvitationModalReducer from "./federation/handle-federation-invitation-modal-reducer";

import PendingJoinRequestReducer from "./pending-join-request-reducers/pending-join-request-reducer";
import FederationJoinModalReducer from "./federation/join-federation-modal-reducer";
import ChangeFederationRulesModalReducer from "./federation/change-federation-rules-modal-reducer";
import FederationLeaveWithVoteModalReducer from "./federation/leave-with-vote-federation-modal-reducer"


const rootReducer = combineReducers({
    userRoles: UserRolesReducer,
    serverInfo: ServerInfoReducer,
    userDetails: UserDetailsReducer,
    userRegistrationState: UserRegistrationReducer,
    userLoginState: UserLoginReducer,
    forgotPasswordState: ForgotPasswordReducer,
    resendVerificationEmailState: ResendVerificationEmail,
    userLogoutState: UserLogoutReducer,
    modalState: ModalReducer,
    clientDeleteModal: ClientDeleteModalReducer,
    platformDeleteModal: PlatformDeleteModalReducer,
    platformUpdateModal: PlatformUpdateModalReducer,
    platformConfigModal: PlatformConfigModalReducer,
    sspDeleteModal: SSPDeleteModalReducer,
    sspUpdateModal: SSPUpdateModalReducer,
    sspConfigModal: SSPConfigModalReducer,
    informationModels: InformationModelReducer,
    infoModelDeleteModal: InfoModelDeleteModalReducer,
    mappings: MappingReducer,
    mappingDeleteModal: MappingDeleteModalReducer,
    userPlatforms: UserPlatformsReducer,
    userSSPs: UserSSPsReducer,
    federations: FederationsReducer,
    federationDeleteModal: FederationDeleteModalReducer,
    federationLeaveModal: FederationLeaveModalReducer,
    federationInviteModal: FederationInviteModalReducer,
    handleFederationInvitationModalReducer: HandleFederationInvitationModalReducer,
    form: formReducer,
    pendingJoinRequests:PendingJoinRequestReducer,
    federationJoinModal: FederationJoinModalReducer,
    changeFederationRulesModal: ChangeFederationRulesModalReducer,
    federationLeaveWithVoteModal: FederationLeaveWithVoteModalReducer

});

export default rootReducer;
