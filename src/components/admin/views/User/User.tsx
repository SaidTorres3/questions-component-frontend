import React, { ChangeEvent, FC } from "react";
import { createStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  useChangeUserPasswordMutation,
  useGetUserQuery,
} from "./operations.gql";
import { UserContext } from "src/auth/authContext";

const User: FC = (props: any) => {
  const { classes } = props;

  const [passwords, setPasswords] = React.useState<{
    actualPassword: string;
    newPassword: string;
  }>({
    actualPassword: "",
    newPassword: "",
  });

  const { userData } = React.useContext(UserContext);

  const { data } = useGetUserQuery({
    variables: {
      input: {
        userUuid: userData.uuid,
      },
    },
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
    pollInterval: 1000,
  });

  const [changePasswordMutation] = useChangeUserPasswordMutation();

  const handleInput = (e: ChangeEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    setPasswords({ ...passwords, [id]: value });
  };

  const handleChangePassword = () => {
    if (passwords?.newPassword && passwords?.actualPassword) {
      changePasswordMutation({
        variables: {
          input: {
            userUuid: userData.uuid,
            actualPassword: passwords.actualPassword,
            newPassword: passwords.newPassword,
          },
        },
        context: {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      }).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <>
      <div>Usuario: {data?.getUser.user.username}</div>
      <div>Tipo de usuario: {data?.getUser.user.type}</div>
      <div>Old password: </div>
      <input
        id="actualPassword"
        autoComplete="current-password"
        type="password"
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <div>New password: </div>
      <input
        id="newPassword"
        autoComplete="new-password"
        type="password"
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <button onClick={handleChangePassword}>Change password</button>
    </>
  );
};

const styles = createStyles({
  loginRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    background: "#00A8FF",
  },
});

export default withStyles(styles)(User);
