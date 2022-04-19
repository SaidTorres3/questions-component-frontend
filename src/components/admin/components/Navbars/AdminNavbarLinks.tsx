import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Dashboard from "@material-ui/icons/Dashboard";
// core components
import Button from "../CustomButtons/Button";
import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle";

interface Props {
  classes: any;
  history: any;
}

class HeaderLinks extends React.Component<Props> {
  anchorEl: any;
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = (event: any) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const { history } = this.props;

    return (
      <div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
          onClick={() => history.push("/admin/dashboard")}
        >
          <Dashboard className={classes.icons} />
          <Hidden mdUp={true} implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </Button>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Person"
          className={classes.buttonLink}
          // on click, go to /admin/user
         onClick={() => history.push("/admin/usuario")}
        >
          <Person className={classes.icons} />
          <Hidden mdUp={true} implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
