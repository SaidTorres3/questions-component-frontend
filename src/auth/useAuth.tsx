import { useState } from "react";

export default function useAuth() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return {
    setLoggedIn,
    loggedIn,
  };
}
