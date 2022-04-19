import React, { ChangeEvent, FC } from "react";
import { createStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  useChangeUserPasswordMutation,
  useGetUserQuery,
} from "./operations.gql";
import { UserContext } from "src/auth/authContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "../../components/Card/Card";

const User: FC = (props: any) => {
  const { classes } = props;

  const [passwords, setPasswords] = React.useState<{
    actualPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }>({
    actualPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const { userData } = React.useContext(UserContext);
  const [modalData, setModalData] = React.useState<{
    showModal: boolean;
    msg: string;
  }>({
    showModal: false,
    msg: "",
  });

  const handleCloseModal = () => {
    setModalData({ msg: "", showModal: false });
  };

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
    if (
      passwords?.newPassword &&
      passwords?.actualPassword &&
      passwords.newPasswordConfirmation
    ) {
      if (passwords.newPassword === passwords.newPasswordConfirmation) {
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
          setModalData({
            showModal: true,
            msg: res.errors
              ? "Error al cambiar la contraseña"
              : res.data?.changeUserPassword?.__typename ===
                "ChangeUserPasswordPayloadSuccess"
              ? "Contraseña cambiada con éxito"
              : "Contraseña actual incorrecta",
          });

          if (
            res.data?.changeUserPassword?.__typename ===
            "ChangeUserPasswordPayloadSuccess"
          ) {
            setPasswords({
              actualPassword: "",
              newPassword: "",
              newPasswordConfirmation: "",
            });
          }
        });
      }
    } else {
      setModalData({
        showModal: true,
        msg: "La nueva contraseña no coincide con la confirmación",
      });
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.nword}>
          Usuario: {data?.getUser.user.username}
        </div>
        <div className={classes.nword}>
          Tipo de usuario: {data?.getUser.user.type}
        </div>
        <br />
        <div>
          <div className={classes.nword} style={{ paddingBottom: "15px" }}>
            Cambio de contraseña:
          </div>
          <div className={classes.passwordInputsContainer}>
            <TextField
              id="actualPassword"
              size="small"
              autoComplete="current-password"
              type="password"
              onChange={(e) => {
                handleInput(e);
              }}
              value={passwords.actualPassword}
              label="Contraseña actual"
              className={classes.passwordInput}
              variant="outlined"
            />
            <TextField
              id="newPassword"
              size="small"
              autoComplete="new-password"
              type="password"
              onChange={(e) => {
                handleInput(e);
              }}
              value={passwords.newPassword}
              label="Nueva contraseña"
              className={classes.passwordInput}
              variant="outlined"
            />
            <TextField
              id="newPasswordConfirmation"
              size="small"
              autoComplete="new-password"
              type="password"
              onChange={(e) => {
                handleInput(e);
              }}
              value={passwords.newPasswordConfirmation}
              label="Confirmar nueva contraseña"
              className={classes.passwordInput}
              variant="outlined"
            />
          </div>
          <Button onClick={handleChangePassword} color="secondary">
            Cambiar contraseña
          </Button>
          <Modal
            open={modalData.showModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box style={{ backgroundColor: "black", padding: 20 }}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="error"
              >
                {modalData.msg}
              </Typography>
            </Box>
          </Modal>
        </div>
      </Card>
      <Card className={classes.card}>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          color="secondary"
        >
          Cerrar sesión
        </Button>
      </Card>
    </>
  );
};

const styles = createStyles({
  card: {
    padding: "40px",
    boxSizing: "border-box",
    fontSize: "16px",
  },
  nword: {
    fontWeight: "bold",
    paddingBottom: "2px",
  },
  passwordInputsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  passwordInput: {
    marginBottom: "15px",
  },
});

export default withStyles(styles)(User);
