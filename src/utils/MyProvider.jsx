import { createContext, useContext, useState } from "react";

const MyContext = createContext();
const UpdateMyContext = createContext();
/* const DataContext = createContext();
const UpdateDataContext = createContext(); */

export function useMyContext() {
  return useContext(MyContext);
}
export function useUpdateMyContext() {
  return useContext(UpdateMyContext);
}

/* export function useDataContext() {
  return useContext(DataContext);
}
export function useUpdateDataContext() {
  return useContext(UpdateDataContext);
} */

export const MyProvider = ({ children }) => {
  const [auth, setAuth] = useState("user");
  //const [data, setData] = useState(null);

  function setToken(role) {
    setAuth(role);
    console.log(auth);
  }

  return (
    <MyContext.Provider value={auth}>
      <UpdateMyContext.Provider value={(role)=>setToken(role)}>
            {children}
      </UpdateMyContext.Provider>
    </MyContext.Provider>
  );
};
