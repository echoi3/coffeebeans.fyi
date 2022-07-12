import { TransitionProps } from "@material-ui/core/transitions";
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";
import styles from "./LogInOrSignup.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { GoogleLogin } from "react-google-login";
import GoogleLogo from "../../assets/google.svg";

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props}>
    <div></div>
  </Slide>
));

const responseGoogle = (response: any) => {
  console.log(response);
};

const useDialogStyles = makeStyles((theme) => ({
  paper: {
    minWidth: "100vw",
    [theme?.breakpoints.up("sm")]: {
      minWidth: "10vw",
      width: "750px",
    },
  },
}));

const LogInOrSignup = (props: any) => {
  const dialogClasses = useDialogStyles();

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} classes={dialogClasses}>
      <DialogTitle style={{ display: "flex" }}>
        <Grid container>
          <Grid xs={1} onClick={handleClose}>
            <CloseIcon className={styles.close_button} />
          </Grid>
          <Grid xs={10}>
            <Typography
              className={styles.login_or_signup}
              style={{
                fontWeight: "600",
                fontSize: "16px",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {" "}
              Log in or sign up
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider />

      <DialogTitle>
        <Typography style={{ fontWeight: "600", fontSize: "22px" }}>
          Welcome to <span style={{ color: "#c4252c" }}>coffeebeans.fyi</span>
        </Typography>
      </DialogTitle>
      <List className={styles.google_signup_wrapper}>
        <ListItem>
          <ListItemAvatar>
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
              buttonText="Continue with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              style={{ marginLeft: "auto" }}
              render={(renderProps: any) => (
                <>
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    variant="text"
                    color="inherit"
                    className={styles.google_signup_button}
                    style={{
                      border: "1.2px solid",
                      borderRadius: "0.7rem",
                    }}
                  >
                    <Grid container>
                      {" "}
                      <Grid xs={1}>
                        <img
                          src={GoogleLogo}
                          alt="google sign up"
                          className={styles.google_logo}
                        />
                      </Grid>
                      <Grid xs={11} className={styles.google_logo_text}>
                        {" "}
                        Continue with Google
                      </Grid>
                    </Grid>
                  </Button>
                </>
              )}
            />
          </ListItemAvatar>
          <ListItemText />
        </ListItem>
        {/* <ListItem autoFocus button>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem> */}
      </List>
    </Dialog>
  );
};

export default LogInOrSignup;
