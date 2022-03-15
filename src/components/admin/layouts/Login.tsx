import React, { FC } from "react";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useLoginUserMutation } from "./operations.gql";
import { UserContext } from "src/App";

const LoginScreen: FC = (props: any) => {
  const { classes } = props;

  const [userData, setUserData] = React.useState({
    username: "",
    password: "",
  });
  const [doesUserLoggedIn, setDoesUserLoggedIn] = React.useState(false);
  const [attemptToLogIn] = useLoginUserMutation();
  const {
    setUserData: setUserDataContext,
  } = React.useContext(UserContext);

  const login = async (opts: { username: string; password: string }) => {
    const res = await attemptToLogIn({
      variables: {
        input: {
          username: opts.username,
          password: opts.password,
        },
      },
    });
    if (res.data?.LoginUser?.token) {
      setUserDataContext({
        jwt: res.data.LoginUser.token,
        type: res.data.LoginUser.user.type,
        uuid: res.data.LoginUser.user.uuid,
      });
    }

    setDoesUserLoggedIn(!!res.data?.LoginUser.token);
  };

  return (
    <div className={classes.loginRoot}>
      <div className={classes.loginModuleContainer}>
        <div className={classes.loginModule}>
          {doesUserLoggedIn ? <div>Logged in</div> : ""}
          <div className={classes.loginWlcm}>Iniciar sesión</div>
          <br />
          <div className={classes.loginInstructionLabel}>Usuario:</div>
          <input
            className={classes.inputBox}
            onChange={(e) => {
              setUserData({ ...userData, username: e.target.value });
            }}
            type="username"
          />
          <div className={classes.loginInstructionLabel}>Contraseña:</div>
          <input
            className={classes.inputBox}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
            type="password"
          />
          <br />
          <button
            className={classes.loginButton}
            onClick={() => login(userData)}
          >
            Aceptar
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

const styles = createStyles({
  loginRoot: {
    background: "#00A8FF",
    height: "100%",
    width: "100%",
    overflow: "auto",
    position: "relative",
  },
  loginModuleContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginModule: {
    display: "flex",
    alignContent: "center",
    // justifyContent: "center",
    flexDirection: "column",
    border: "1px solid #fff",
    padding: "30px",
    boxShadow: "0px 0px 10px #0005",
  },
  loginWlcm: {
    fontSize: "70px",
    textAlign: "center",
    fontWeight: 800,
    textShadow: "0px 0px 5px #0003",
    whiteSpace: "pre-line",
  },
  loginInstructionLabel: {
    textShadow: "0px 0px 5px #0003",
    fontSize: "35px",
  },
  inputBox: {
    height: "40px",
    fontSize: "20px",
  },
  loginButton: {
    height: "30px",
  },
});

export default withStyles(styles)(LoginScreen);
