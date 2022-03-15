import React, { FC } from 'react';
import { createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const SpinLoader: FC = (props: any) => {
  const { classes } = props;
  return (
    <>
      <div className={classes.spinner}>
        <div className={classes.spin}></div>
      </div>
    </>
  )
}

const styles = createStyles({
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 9999,
  },
  spin: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '5px solid #ccc',
    borderTop: '5px solid #000',
    boderImage: `linear-gradient(
      to bottom, 
      red, 
      rgba(0, 0, 0, 0)
    ) 1 100%;`,
    animation: '$spin 1.2s linear infinite',
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
});

export default withStyles(styles)(SpinLoader);
