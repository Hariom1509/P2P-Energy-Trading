import { createContext } from "react";
import { useState } from "react";
import React from "react";

export const UserContext = createContext();

export const UserState = (props) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    mobileNumber: "",
    type: "",
    area: "",
    varified: false,
  });
  const host = "http://localhost:5000";

  const setuser = (id, name, email, mobileNumber, type, area, varified) => {
    setUser({ id, name, email, mobileNumber, type, area, varified });
  };

  const getUser = async () => {
    //API call
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("email") }),
    });
    const data = await response.json();
    setUser(data);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        setuser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
