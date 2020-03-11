export const rules = {
  visitor: {
    static: ["home-page:visit"]
  },
  immigrant: {
    static: ["immigrant-pages:visit"],
    dynamic: {
      "profile:edit": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      }
    }
  },
  isc_employee: {
    static: ["isc-pages:visit"]
  }
};
