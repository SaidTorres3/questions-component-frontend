import React, { FC } from "react";
import { createStyles } from "@material-ui/core/styles";
import withStyles from '@material-ui/core/styles/withStyles';

const User: FC = (props: any) => {



  return <div>ñ</div>;
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
})

export default withStyles(styles)(User)