import { createContext, useState, useContext } from "react";
import api from "../api/api";
import useAuth from "../hooks/useAuth";

export const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const { user }: any = useAuth();
  const [users, setUsers]: any = useState([]);
  const [allUsers, setAllUsers]: any = useState([]);

  const getUsers = (page: string, perPage: string) => {
    api
      .get(`users?page=${page}&perpage=${perPage}`, {
        headers: {
          Authorization:
            JSON.parse(localStorage.getItem("user-info")!)?.token ?? user.token,
        },
      })
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  };

  const getAllUsers = () => {
    api
      .get("users/all", {
        headers: {
          Authorization:
            JSON.parse(localStorage.getItem("user-info")!)?.token ?? user.token,
        },
      })
      .then((response) => setAllUsers(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <UserContext.Provider value={{ users, allUsers, getUsers, getAllUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
