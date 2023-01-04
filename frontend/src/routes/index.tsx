import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Status from "../pages/Status";
import Signin from "../pages/Signin";
import Dog from "../pages/Dog";
import Clients from "../pages/Clients";

const Private = ({ Item }: any) => {
  const { signed, mustBeLogged }: any = useAuth();

  return signed || mustBeLogged > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/home" element={<Private Item={Home} />} />
          <Route path="/status" element={<Private Item={Status} />} />
          <Route path="/dog" element={<Private Item={Dog} />} />
          <Route path="/clients" element={<Private Item={Clients} />} />
          <Route path="/" element={<Signin />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
