import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
const UpdateUserContext = createContext();


export function useUserContext() {
  return useContext(UserContext);
}
export function useUpdateUserContext() {
  return useContext(UpdateUserContext);
}

let token = localStorage.getItem("userInfo");

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(token ? JSON.parse(token) : {isAuth:false,username:"",role:""});

  function setToken(token){
    localStorage.setItem("userInfo",JSON.stringify(token));
    setUserInfo(token);
  }

  return (
    <UserContext.Provider value={userInfo}>
      <UpdateUserContext.Provider value={setToken}>
            {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
};