import React, { FC } from "react";
import { createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const Pagination: FC = () => {
  return (
    <>
      <div className="spinner">
        <div className="spin"></div>
      </div>
    </>
  );
}

const styles = createStyles({});

export default withStyles(styles)(Pagination);