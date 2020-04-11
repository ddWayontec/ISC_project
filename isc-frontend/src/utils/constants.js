export const NO_PERMISSIONS = "noPermissions";

export const ROLES = {
  ISC_EMPLOYEE: "isc_employee",
  IMMIGRANT: "immigrant",
  SERVICE_PROVIDER: "service_provider",
  VISITOR: "visitor"
};

export const CREATE_ISC_EMPLOYEE_DATA = {
  addAndMapUser: {
    mspid: "Org1MSP",
    affiliation: "org2.department1",
    extra: {},
    sm: 2,
    program: "settlementcal",
    channelId: "orgchannel",
    chaincodeid: "ledger",
    sm_uid: "admin@iscemp.com",
    sm_pwd: "123456"
  },
  sendMessage: {
    Program: "settlementcal",
    StructureId: "registeriscemployee",
    sm: 2,
    sm_uid: "u1@emp.com",
    sm_pwd: "123456",
    ChainCodeId: "ledger",
    ChannelId: "orgchannel"
  }
};

export const CREATE_IMMIGRANT = {
  addAndMapUser: {
    mspid: "Org1MSP",
    affiliation: "org2.department1",
    extra: {},
    sm: 2,
    program: "settlementcal",
    channelId: "orgchannel",
    chaincodeid: "ledger",
    sm_uid: "admin@immigrant.com",
    sm_pwd: "123456"
  },
  sendMessage: {
    Program: "settlementcal",
    StructureId: "registerimmigrant",
    sm: 2,
    sm_uid: "u1@emp.com",
    sm_pwd: "123456",
    ChainCodeId: "ledger",
    ChannelId: "orgchannel"
  }
};
