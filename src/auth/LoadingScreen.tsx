import React, { FC } from "react";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const LoadingScreen: FC = (props: any) => {
  const { classes } = props;

  return <div className={classes.magicClass}>Loading...</div>;
};

const styles = createStyles({
  magicClass: {
    height: "100vh",
    width: "100vw",
    background: "black"
  },
});


export default withStyles(styles)(LoadingScreen);
