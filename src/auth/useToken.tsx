import { useState } from "react";
import useAuth from "./useAuth";

export default function useToken() {
  const { setLoggedIn } = useAuth();

  const getToken = (): string | undefined => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      return tokenString;
    }
    return undefined;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
    setLoggedIn(true);
  };

  return {
    setToken: saveToken,
    token,
    getToken
  };
}
