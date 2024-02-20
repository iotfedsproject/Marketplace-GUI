export function InterworkingService(url, informationModelId) {
    this.url = url;
    this.informationModelId = informationModelId;
}

export function Platform(id, name, description, interworkingServices, isEnabler) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.interworkingServices = interworkingServices;
    this.isEnabler = isEnabler;
}

export function SSP(id, name, description, externalAddress, siteLocalAddress, informationModelId, exposingSiteLocalAddress) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.externalAddress = externalAddress;
    this.siteLocalAddress = siteLocalAddress;
    this.informationModelId = informationModelId;
    this.exposingSiteLocalAddress = exposingSiteLocalAddress;
}

export function PlatformConfigurationMessage(platformId, platformOwnerUsername, platformOwnerPassword,
                                             componentsKeystorePassword, aamKeystoreName, aamKeystorePassword,
                                             aamPrivateKeyPassword, tokenValidity, useBuiltInRapPlugin, level,
                                             deploymentType) {
    this.platformId = platformId;
    this.platformOwnerUsername = platformOwnerUsername;
    this.platformOwnerPassword = platformOwnerPassword;
    this.componentsKeystorePassword = componentsKeystorePassword;
    this.aamKeystoreName = aamKeystoreName;
    this.aamKeystorePassword = aamKeystorePassword;
    this.aamPrivateKeyPassword = aamPrivateKeyPassword;
    this.tokenValidity = tokenValidity;
    this.useBuiltInRapPlugin = useBuiltInRapPlugin;
    this.level = level;
    this.deploymentType = deploymentType;
}

export function InformationModel(id, uri, name, owner, rdf, rdfFormat) {
    this.id = id;
    this.uri = uri;
    this.name = name;
    this.owner = owner;
    this.rdf = rdf;
    this.rdfFormat = rdfFormat;
}

export function Federation(id, name, isPublic, informationModel, slaConstraints, members, smartContract) {
    this.id = id;
    this.name = name;
    this.public = isPublic;
    this.informationModel = informationModel;
    this.slaConstraints = slaConstraints;
    this.members = members;
    this.smartContract = smartContract;
}

export function FederationToUpdate(id, name, isPublic, informationModel, slaConstraints, members, openInvitations,smartContract) {
    this.id = id;
    this.name = name;
    this.public = isPublic;
    this.informationModel = informationModel;
    this.slaConstraints = slaConstraints;
    this.members = members;
    this.openInvitations = openInvitations;
    this.smartContract   = smartContract;
}



export function SmartContract(ioTFedsRules){
  this.IoTFedsRules = ioTFedsRules;
}

export function IoTFedsRules(fedGov,fedMarketplace,fedTypeRules,qualityAssuranceMetrics){
  this.FedGov                  = fedGov;
  this.FedMarketplace          = fedMarketplace;
  this.FedTypeRules            = fedTypeRules;
  this.QualityAssuranceMetrics = qualityAssuranceMetrics;
}

export function FedGov(boardGov,proposals,voteRules){
  this.BoardGov  = boardGov;
  this.Proposals = proposals;
  this.VoteRules = voteRules;
}

export function BoardGov(user){
  this.user = user;
}

export function Proposals(proposal){
  this.proposal = proposal;
}

export function VoteRules(tokens,type){
 this.Tokens = tokens;
 this.Type   = type;
}

export function Type(approvalPercentage,base){
 this.ApprovalPercentage = approvalPercentage;
 this.Base   = base;
}

export function FedMarketplace(chargePolicy,coin,fedProduct,profitPolicy){
 this.ChargePolicy = chargePolicy;
 this.Coin         = coin;
 this.FedProduct   = fedProduct;
 this.ProfitPolicy = profitPolicy;
}

export function FedTypeRules(dataAvailability,serviceType,supportedOntologies,type){
 this.DataAvailability    = dataAvailability;
 this.ServiceType         = serviceType;
 this.SupportedOntologies = supportedOntologies;
 this.Type = type;
}

export function FederationMember(platformId, interworkingServiceURL) {
    this.platformId = platformId;
    this.interworkingServiceUrl = interworkingServiceURL;
}

export function  QualityExpWeights(businessEnablement,completeness,correctness,easyOfUse,precision,relevance,responseTime,valueForMoney){
  this.business_enablement = businessEnablement;
  this.completeness    = completeness;
  this.correctness     = correctness;
  this.ease_of_use     = easyOfUse;
  this.precision       = precision;
  this.relevance       = relevance;
  this.response_time   = responseTime;
  this.value_for_money = valueForMoney;
}


 export function   QualityOfServicesWeights(availability, precision,responseTime){
   this.availability  = availability;
   this.precision     = precision;
   this.response_time = responseTime;
 }





export function Metrics(qosPercentage,quality){
  this.QosPercentage = qosPercentage;
  this.Quality       = quality;
}

export function Quality(minValueFed){
 this.MinValueFed = minValueFed;
}
export function QualityAssurance(metrics,reputationPercentage,underPerformance){
   this.Metrics              = metrics;
   this.ReputationPercentage = reputationPercentage;
   this.UnderPerformance     = underPerformance;
}

export function QualityAssuranceMetrics(qualityExpWeights,qosPercentage,qualityOfServicesWeights,quality,reputationPercentage ,underPerformance){
   this.QoEWeights     = qualityExpWeights;
   this.QoSPercentage  = qosPercentage;
   this.QoSWeights     = qualityOfServicesWeights;
   this.Quality        = quality;
   this.ReputationPercentage = reputationPercentage;
   this.UnderPerformance     = underPerformance;
}


export function Permissions(usernamePermission, emailPermission, publicKeysPermission, jwtPermission) {
    this.usernamePermission = usernamePermission;
    this.emailPermission = emailPermission;
    this.publicKeysPermission = publicKeysPermission;
    this.jwtPermission = jwtPermission;
}

export function InvitationRequest(federationId, invitedPlatforms) {
    this.federationId = federationId;
    this.invitedPlatforms = invitedPlatforms;
}

export function ForgotPasswordRequest(username, email) {
    this.username = username;
    this.email = email;
}

export function ResendVerificationEmailRequest(username, password) {
    this.username = username;
    this.password = password;
}

export function Mapping(name, sourceModelId, destinationModelId, definition) {
    this.name = name;
    this.sourceModelId = sourceModelId;
    this.destinationModelId = destinationModelId;
    this.definition = definition;
}