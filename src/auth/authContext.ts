import React from "react";
import { Dispatch, SetStateAction } from "react";

export const UserContext = React.createContext<{
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}>(null!);

export interface UserData {
  uuid: string;
  type: string;
  username: string;
}
