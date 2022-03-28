import { useState } from "react";
import { UserData } from "./authContext";

export default function useAuth() {
  const [userData, setUserData] = useState<UserData>({
    type: "",
    uuid: "",
    username: ""
  });

  return {
    userData,
    setUserData
  };
}
