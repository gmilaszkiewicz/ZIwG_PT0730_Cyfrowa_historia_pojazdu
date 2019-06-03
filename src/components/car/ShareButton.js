import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
  }));

export function ShareButton () {
    const classes = useStyles();
    return(
    <Button variant="contained" size="small" className={classes.button}>
        <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
        Share info
      </Button>
    )
}

export function SellCarButton({handleClick}){
  const classes = useStyles()
  return (
      <Button variant="contained" color="primary" className={classes.button} onClick={handleClick}>
        Sell car
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
  )
}
