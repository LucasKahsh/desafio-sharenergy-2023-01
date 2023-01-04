import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import GlobalStyle from "./styles/global";
import { ClientProvider } from "./contexts/clients";
import { UserProvider } from "./contexts/user";
import { Toaster } from "react-hot-toast";

const App = () => (
  <AuthProvider>
    <UserProvider>
      <ClientProvider>
        <Toaster />
        <RoutesApp />
        <GlobalStyle />
      </ClientProvider>
    </UserProvider>
  </AuthProvider>
);

export default App;
