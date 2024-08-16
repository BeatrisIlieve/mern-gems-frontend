import { useEffect } from "react";

import { Authentication } from "./Authentication/Authentication";
import { Collection } from "../../common/Collection/Collection";
import { Jewelries } from "./Jewelries/Jewelries";

import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";

export const Home = () => {
  const { isAuthenticated } = useAuthenticationContext();

  useEffect(() => {
    if (isAuthenticated) {
      document.body.style.overflow = "visible";
    }
  });

  return (
    <>
      {!isAuthenticated && <Authentication />}
      <Jewelries />
    </>
  );
};
