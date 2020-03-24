import get from "lodash/get";
import React, { useState } from "react";

import { AuthProvider } from "../../contexts";
import { ROLES } from "../../utils/constants";

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
    //make a request to block chain
    const data = mockResponseObj;

    if (data.Status === true && data.Msg === "success") {
      // mock employee login
      let result = {};
      if (email === "isc@gmail.com" && password === "pig") {
        result = handleAuthentication({
          id: data.uuid,
          email: data.Extra.creatorOrModifier.ID,
          permissions: data.Extra.permissionTable,
          role: ROLES.ISC_EMPLOYEE
        });
      }

      //mock immigrant login
      if (email === "immigrant@gmail.com" && password === "cow") {
        result = handleAuthentication({
          id: data.uuid,
          email: data.Extra.creatorOrModifier.ID,
          permissions: data.Extra.permissionTable,
          role: ROLES.IMMIGRANT
        });
      }

      // mock login delay
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(result);
        }, 2000);
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
