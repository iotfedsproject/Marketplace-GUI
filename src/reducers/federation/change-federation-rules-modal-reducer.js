import { ACTIVATE_FEDERATION_CHANGE_RULES_MODAL, DEACTIVATE_FEDERATION_CHANGE_RULES_MODAL } from "../../actions";

const INITIAL_STATE = { federationId : "",federation:"",fedTypeRules:"",fedGovBoardGov:"",fedGovProposals:"",fedGovVoteRules:"",fedGovVoteRulesTypes:"",qualityAssuranceMetrics:"",qualityAssuranceMetricsQuality:"",QualityAssuranceMetricsQoEWeights:"",QualityAssuranceMetricsQoSWeights:"",fedMarketplace:""};
export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_FEDERATION_CHANGE_RULES_MODAL:
             const { federationId, federation,fedTypeRules,fedGovBoardGov,fedGovProposals,fedGovVoteRules,fedGovVoteRulesTypes,qualityAssuranceMetrics,qualityAssuranceMetricsQuality,QualityAssuranceMetricsQoEWeights,QualityAssuranceMetricsQoSWeights,fedMarketplace } = action.payload;
             return { federationId, federation,fedTypeRules,fedGovBoardGov,fedGovProposals,fedGovVoteRules,fedGovVoteRulesTypes,qualityAssuranceMetrics,qualityAssuranceMetricsQuality,QualityAssuranceMetricsQoEWeights,QualityAssuranceMetricsQoSWeights,fedMarketplace };
        case DEACTIVATE_FEDERATION_CHANGE_RULES_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}