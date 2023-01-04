import { AuthProvider } from "./auth";
import { ClientProvider } from "./clients";
import { ReactNode } from "react";

interface IProviderProps {
  children: ReactNode;
}
export const Providers = ({ children }: IProviderProps) => {
  return (
    <ClientProvider>
      <AuthProvider>{children}</AuthProvider>
    </ClientProvider>
  );
};
