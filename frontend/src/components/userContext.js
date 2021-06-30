import React from "react";

// set the defaults
const UserContext = React.createContext({
    userData: null,
    setUserData: () => {}
});

export default UserContext;
