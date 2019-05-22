import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import classNames from 'classnames';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

const styles1 = theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  });
  
  
  function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }
  
  MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  };
  
  const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

export default class SnackbarProvider extends PureComponent {
  state = {
    message: null,
    open: false,
    type: 'success'
  }

  getChildContext () {
    return {
      snackbar: {
        showMessage: this.showMessage
      }
    }
  }

  showMessage = (message, type) => {
    this.setState({ open: true, message: message, type: type})
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render () {
    const {
      message,
      open,
      type
    } = this.state
    const { classes } = this.props;
    const {
      ButtonProps = {},
      children,
      SnackbarProps = {}
    } = this.props

    return (
      <React.Fragment>
        {children}
        <Snackbar
         {...SnackbarProps}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          onClose={this.handleClose}
        >
        <MySnackbarContentWrapper
        onClose={this.handleClose}
        variant={type}
        message={message}
        />
        </Snackbar>
      </React.Fragment>
    )
  }
}

SnackbarProvider.childContextTypes = {
  snackbar: PropTypes.shape({
    showMessage: PropTypes.func
  })
}

SnackbarProvider.propTypes = {
  /**
   * Props to pass through to the action button.
   */
  ButtonProps: PropTypes.object,
  /**
   * The children that are wrapped by this provider.
   */
  children: PropTypes.node,
  /**
   * Props to pass through to the snackbar.
   */
  SnackbarProps: PropTypes.object
}