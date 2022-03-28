import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import AdminNavbarLinks from './AdminNavbarLinks';
import RTLNavbarLinks from './RTLNavbarLinks';
import Button from '../CustomButtons/Button';

import headerStyle from '../../assets/jss/material-dashboard-react/components/headerStyle';
import { useHistory } from 'react-router';

function Header({ ...props }: any) {
  const history = useHistory()

  function makeBrand() {
    let name = "";
    // eslint-disable-next-line array-callback-return
    props.routes.map((prop: any, key: any) => {
      let expectedRoute: string = prop.layout + prop.path
      let currentRoute: string = props.location.pathname
      let expectedRouteSplited: string[] = expectedRoute.split("/").filter(pathSegment => pathSegment !== "")
      const currentRouteSplited: string[] = currentRoute.split("/").filter(pathSegment => pathSegment !== "")
      if (expectedRouteSplited.length === currentRouteSplited.length) {
        for (let i = 0; i < expectedRouteSplited.length; i++) {
          if (expectedRouteSplited[i].indexOf(":") >= 0) {
            if(currentRouteSplited[i].indexOf("-") >= 0) {
              expectedRouteSplited[i] = currentRouteSplited[i]
            }
          }
        }
        expectedRoute = expectedRouteSplited.join("/")
        currentRoute = currentRouteSplited.join("/")
      }
      if (expectedRoute === currentRoute) {
        name = prop.name;
      }
    });
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [' ' + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="primary" onClick={() => history.goBack()}>
            {"<"}
          </Button>
          <Button onClick={() => history.go(props.location.pathname)} color="transparent" href={props.location.pathname} className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown={true} implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks history={history} />}
        </Hidden>
        <Hidden mdUp={true} implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
//   color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
// };

export default withStyles(headerStyle)(Header);
