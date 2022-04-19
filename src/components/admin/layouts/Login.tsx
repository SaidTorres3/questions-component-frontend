import React, { FC, useCallback, useEffect } from "react";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useLoginUserMutation } from "./operations.gql";
import { UserContext } from "src/auth/authContext";
import useToken from "src/auth/useToken";
import useValidadeToken from "src/auth/useValidadeToken";
import LoadingScreen from "src/auth/LoadingScreen";
import Button from "../components/CustomButtons/Button";

const LoginScreen: FC = (props: any) => {
  const { classes } = props;

  const [userDataForm, setUserDataForm] = React.useState({
    username: "",
    password: "",
  });
  const [doesUserLoggedIn, setDoesUserLoggedIn] = React.useState(false);
  const [doesQueryFinished, setDoesQueryFinished] = React.useState(false);
  const [attemptToLogIn] = useLoginUserMutation();
  const { setUserData } = React.useContext(UserContext);
  const { token, setToken } = useToken();
  const { validadeToken } = useValidadeToken();

  useEffect(() => {
    if (token) {
      setDoesQueryFinished(false);
      validadeToken(token).then((res) => {
        setDoesQueryFinished(true);
        if (res) {
          setUserData(res);
        }
      });
    } else {
      setDoesQueryFinished(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = useCallback(async (opts: { username: string; password: string }) => {
    const res = await attemptToLogIn({
      variables: {
        input: {
          username: opts.username,
          password: opts.password,
        },
      },
    }).catch((err) => {
      console.log("testing");
      console.log(err);
    });

    const loginUserVar = res?.data?.loginUser;
    if (loginUserVar && loginUserVar.__typename === "LoginUserPayloadSuccess") {
      setUserData({
        type: loginUserVar.user.type,
        uuid: loginUserVar.user.uuid,
        username: loginUserVar.user.username,
      });
      setDoesUserLoggedIn(true);
      setToken(loginUserVar.token);
    } else if (
      loginUserVar &&
      loginUserVar.__typename === "LoginUserPayloadFail"
    ) {
      setUserData({
        username: "",
        type: "",
        uuid: "",
      });
      setDoesUserLoggedIn(false);
    }
  }, [attemptToLogIn, setToken, setUserData]);

  const handleSubmit = useCallback(() => {
    console.log(userDataForm);
    login(userDataForm);
  }, [userDataForm, login]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
        console.log("Handle submit just triggered");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <div className={classes.loginRoot}>
      {doesQueryFinished ? (
        <div className={classes.loginModuleContainer}>
          <div className={classes.loginModule}>
            {doesUserLoggedIn ? <div>Logged in</div> : ""}
            <div className={classes.loginWlcm}>Iniciar sesión</div>
            <br />
            <div className={classes.loginInstructionLabel}>Usuario:</div>
            <input
              className={classes.inputBox}
              onChange={(e) => {
                setUserDataForm({ ...userDataForm, username: e.target.value });
              }}
              type="username"
            />
            <div className={classes.loginInstructionLabel}>Contraseña:</div>
            <input
              className={classes.inputBox}
              onChange={(e) => {
                setUserDataForm({ ...userDataForm, password: e.target.value });
              }}
              type="password"
            />
            <br />
            <Button className={classes.loginButton} onClick={handleSubmit} color="primary">
              Aceptar
            </Button>
            <br />
          </div>
        </div>
      ) : (
        <LoadingScreen></LoadingScreen>
      )}
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
    maxWidth: "50%",
    flexDirection: "column",
    border: "2px solid #fff",
    borderRadius: "10px",
    padding: "60px",
    boxShadow: "0px 0px 10px #0005",
  },
  loginWlcm: {
    fontSize: "60px",
    textAlign: "center",
    fontWeight: 800,
    textShadow: "0px 0px 5px #0003",
    whiteSpace: "pre-line",
    "@media (max-width: 600px)": {
      fontSize: "50px",  
    }
  },
  loginInstructionLabel: {
    textShadow: "0px 0px 5px #0003",
    fontSize: "30px",
    paddingTop: "10px",
    paddingBottom: "5px",
    fontWeight: 800,
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
