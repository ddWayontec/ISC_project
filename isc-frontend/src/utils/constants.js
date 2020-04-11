export const NO_PERMISSIONS = "noPermissions";

export const ROLES = {
  ISC_EMPLOYEE: "isc_employee",
  IMMIGRANT: "immigrant",
  SERVICE_PROVIDER: "service_provider",
  VISITOR: "visitor"
};

export const ROLE_LOOKUP = {
  iscemp: ROLES.ISC_EMPLOYEE,
  immigrant: ROLES.IMMIGRANT
};

export const BASE_REQUEST_DATA = {
  uppercaseKeys: {
    Program: "settlementcal",
    sm: 2,
    ChainCodeId: "ledger",
    ChannelId: "orgchannel"
  },
  lowercaseKeys: {
    program: "settlementcal",
    sm: 2,
    channelId: "orgchannel",
    chaincodeid: "ledger"
  }
};

export const LOGIN_DATA = BASE_REQUEST_DATA.uppercaseKeys;

export const CREATE_ISC_EMPLOYEE_DATA = {
  addAndMapUser: {
    ...BASE_REQUEST_DATA.lowercaseKeys,
    mspid: "Org1MSP",
    affiliation: "org2.department1",
    extra: {},
    sm_uid: "admin@iscemp.com",
    sm_pwd: "123456"
  },
  sendMessage: {
    ...BASE_REQUEST_DATA.uppercaseKeys,
    StructureId: "registeriscemployee",
    sm_uid: "u1@emp.com",
    sm_pwd: "123456"
  }
};

export const CREATE_IMMIGRANT = {
  addAndMapUser: {
    ...BASE_REQUEST_DATA.lowercaseKeys,
    mspid: "Org1MSP",
    affiliation: "org2.department1",
    extra: {},
    sm_uid: "admin@immigrant.com",
    sm_pwd: "123456"
  },
  sendMessage: {
    ...BASE_REQUEST_DATA.uppercaseKeys,
    StructureId: "registerimmigrant",
    sm_uid: "u1@emp.com",
    sm_pwd: "123456"
  }
};

const GET_IMMIGRANT_DATA = {
  ...BASE_REQUEST_DATA.uppercaseKeys,
  Receiver: {
    ID: "u1@serviceprovider.com",
    MSPID: "Org1MSP"
  },
  sm_uid: "u1@emp.com",
  sm_pwd: "123456"
};

export const LIST_IMMIGRANTS_DATA = {
  ...GET_IMMIGRANT_DATA,
  StructureId: "listofimmigrants"
};

export const GET_IMMIGRANT_BY_EMAIL_DATA = {
  ...GET_IMMIGRANT_DATA,
  StructureId: "immigrantreport"
};

export const GET_ISC_EMPLOYEE_BY_EMAIL_DATA = {
  ...BASE_REQUEST_DATA.uppercaseKeys,
  Receiver: {
    ID: "u1@serviceprovider.com",
    MSPID: "Org1MSP"
  },
  StructureId: "iscemplyeereport",
  sm_uid: "u1@emp.com",
  sm_pwd: "123456"
};

export const URLS = {
  requestReport: "/kc/api/ledgerChainCode/requestReport"
};
