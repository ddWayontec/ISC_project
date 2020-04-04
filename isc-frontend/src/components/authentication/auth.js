import get from "lodash/get";
import React, { useState } from "react";

import { AuthProvider } from "../../contexts";
import { ROLES } from "../../utils/constants";
import { request } from "../../utils/request";

const mockResponseObj = {
  Status: true,
  Msg: "success",
  Extra: {
    USER_TYPE: "HL_USER",
    actor: "iscemp",
    assignablePermissionsByUsers: [],
    creatorOrModifier: {
      ID: "admin@iscemp.com",
      MSPID: "Org1MSP"
    },
    details: {},
    entity: "iscemployee",
    identifier: {
      ID: "isc2",
      MSPID: "Org1MSP"
    },
    permissionTable: {
      allowed_publish: [],
      allowed_receive: ["registeriscemployee", "addresults"],
      allowed_send: ["registerimmigrant", "registeriscemployee", "addresults"]
    },
    program: "settlementcal",
    uuid: "dd170c74f9aef9eb46522bbd3e9ada392aa19e98a0076ab20be7d5c0ddf56e8d"
  }
};

const mockedRequestObj = {
  Program: "settlementcal",
  sm: 2,
  sm_uid: "isc2",
  sm_pwd: "123456",
  ChainCodeId: "ledger",
  ChannelId: "orgchannel"
};

const LOGIN_DATA = {
  Program: "settlementcal",
  sm: 2,
  ChainCodeId: "ledger",
  ChannelId: "orgchannel"
};

export const Auth = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({ role: ROLES.VISITOR });
  const [accessToken, setAccessToken] = useState("");

  const setSession = ({ accessToken, id, email, role, permissions }) => {
    const user = {
      id,
      email,
      role,
      permissions
    };

    sessionStorage.setItem("user", JSON.stringify(user));

    setAuthenticated(true);
    setAccessToken(accessToken);
    setUser(user);

    return { authenticated: true, user };
  };

  const handleAuthentication = ({
    accessToken = "",
    id,
    email,
    role,
    permissions
  }) => {
    // check if its expired here?
    return setSession({
      accessToken,
      id,
      email,
      role,
      permissions
    });
  };

  const initiateLogin = async (email, password) => {
    const response = await request("/kc/api/ledgerChainCode/performLogin", {
      method: "post",
      data: {
        ...LOGIN_DATA,
        sm_uid: email,
        sm_pwd: password
      }
    });

    console.log(`Response status: ${JSON.stringify(response)}`);

    //make a request to block chain
    const data = response;

    const roleLookup = {
      iscemp: ROLES.ISC_EMPLOYEE,
      immigrant: ROLES.IMMIGRANT
    };

    if (response.Status === true && response.Msg === "success") {
      const userType = get(response, "Extra.actor");

      return handleAuthentication({
        id: get(response, "Extra.identifier.ID"), // switch to PRno / employee id
        email: get(response, "Extra.identifier.ID"),
        role: get(roleLookup, userType, ROLES.VISITOR),
        permissions: get(response, "Extra.permissionTable")
      });
    }
    return {};
  };

  const logout = () => {
    const user = { role: ROLES.VISITOR };
    setAuthenticated(false);
    setUser(user);
    setAccessToken("");

    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const authProviderValue = {
    authenticated,
    user,
    accessToken,
    initiateLogin,
    logout,
    handleAuthentication,
    setSession
  };
  return <AuthProvider value={authProviderValue}>{children}</AuthProvider>;
};
