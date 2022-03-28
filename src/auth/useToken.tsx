import { useState } from "react";

export default function useToken() {
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
  };

  return {
    setToken: saveToken,
    token,
    getToken
  };
}
