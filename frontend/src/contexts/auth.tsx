import { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../api/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser]: any = useState();
  const [error, setError]: any = useState();

  const handleUpdate = async (data: any, isChecked: boolean) => {
    setUser(data.data);
    toast.success("Logado com sucesso!");
    if (isChecked) {
      localStorage.setItem("user-info", JSON.stringify(data.data));
    }
  };

  const handleError = async (dataError: any) => {
    setError(dataError.response);
    toast.error("Algo deu errado!");
  };

  const signin = async (
    username: string,
    password: string,
    isChecked: boolean,
  ) => {
    await api
      .post("auth/signin", { username: username, password: password })
      .then((response) => handleUpdate(response, isChecked))
      .catch((err) => handleError(err));
    if (error) {
      return error.data.message;
    } else {
      return;
    }
  };

  const signout = () => {
    setUser(undefined);
    setError(undefined);
    localStorage.removeItem("user-info");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        mustBeLogged: !!localStorage.getItem("user-info"),
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
