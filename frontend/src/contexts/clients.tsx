import { createContext, useState, useContext } from "react";
import api from "../api/api";
import useAuth from "../hooks/useAuth";

export const ClientContext = createContext({});

export const ClientProvider = ({ children }: any) => {
  const { user }: any = useAuth();
  const [clients, setClients]: any = useState([]);

  const getClients = async () => {
    api
      .get("client", {
        headers: {
          Authorization:
            JSON.parse(localStorage.getItem("user-info")!)?.token ?? user.token,
        },
      })
      .then((response) => setClients(response.data.data))
      .catch((err) => console.log(err));
    return;
  };

  return (
    <ClientContext.Provider value={{ clients, getClients }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
