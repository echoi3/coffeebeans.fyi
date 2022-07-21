import { TransitionProps } from "@material-ui/core/transitions";
import { Button, Snackbar, Dialog, DialogTitle, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, Divider } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./LogInOrSignup.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
// import { GoogleLogin } from "react-google-login";
import GoogleLogo from "../../assets/google.svg";
import { createAccount, getAllAccountEmails, getUUIDFromEmail } from "../../db/account";
import { refreshTokenSetup } from "../../utils/auth";

import { GoogleLogin, useGoogleLogin, googleLogout } from "@react-oauth/google";

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props}>
    <div></div>
  </Slide>
));

const useDialogStyles = makeStyles(theme => ({
  paper: {
    minWidth: "100vw",
    overflowX: "hidden",

    [theme?.breakpoints.up("sm")]: {
      minWidth: "10vw",
      width: "750px",
    },
  },
  snackbarRoot: {
    background: "#c4252c",
    backgroundColor: "#c4252c",
    textAlign: "center",
    justifyContent: "center",
    fontSize: "1.2rem",

    [theme?.breakpoints.up("xs")]: {
      minWidth: "10vw",
      width: "750px",
    },
  },
}));

const LogInOrSignup = (props: any) => {
  const dialogClasses = useDialogStyles();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { onClose, open } = props;

  const fetchUserInfo = async (token: string) => {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  const login = useGoogleLogin({
    onSuccess: async res => {
      const response = await fetchUserInfo(res?.access_token);

      const firstName = response?.given_name;
      const lastName = response?.family_name;
      const email = response?.email;
      const userUUID = (await getUUIDFromEmail(email)) ?? "";
      console.log("User UUID by signing in", userUUID);

      localStorage.setItem("userUUID", userUUID);
      localStorage.setItem("userFirstname", firstName);
      localStorage.setItem("userEmail", email);

      const allUserEmails = await getAllAccountEmails();

      // if account not on DynamoDB, create an account on DynamoDB
      if (!allUserEmails.includes(email)) {
        const userUUID = uuidv4();
        localStorage.setItem("userUUID", userUUID);

        await createAccount({ uuid: userUUID, email, firstName, lastName });
        onClose();
        setSnackbarOpen(true);

        try {
          await fetch("/api/sign-up", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
        } catch (e) {
          console.log("Error", e);
        }
      }
      onClose();
      setSnackbarOpen(true);

      // refreshTokenSetup(res);
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} classes={dialogClasses}>
        <DialogTitle style={{ display: "flex" }}>
          <Grid container>
            <Grid item xs={1} onClick={handleClose}>
              <CloseIcon className={styles.close_button} />
            </Grid>
            <Grid item xs={10}>
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
              <Grid container direction="column" justifyContent="center" alignItems="center" textAlign="center">
                <Grid item xs={12}>
                  <Button
                    onClick={() => login()}
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
                      <Grid item xs={1}>
                        <img src={GoogleLogo} alt="google sign up" className={styles.google_logo} />
                      </Grid>
                      <Grid item xs={11} className={styles.google_logo_text}>
                        {" "}
                        Continue with Google
                      </Grid>
                    </Grid>
                  </Button>
                </Grid>
              </Grid>
              {/* <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
              buttonText="Continue with Google"
              onSuccess={handleSignUpSuccess}
              onFailure={err => console.log("Login Failed with Error,", err)}
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
                        <img src={GoogleLogo} alt="google sign up" className={styles.google_logo} />
                      </Grid>
                      <Grid xs={11} className={styles.google_logo_text}>
                        {" "}
                        Continue with Google
                      </Grid>
                    </Grid>
                  </Button>
                </>
              )}
            /> */}
              {/* <div className={styles.google_signup_button}>
              <GoogleLogin
                onSuccess={handleSignUpSuccess}
                onError={() => {
                  console.log("Login Failed");
                }}
                size="large"
                width="500px"
                text="continue_with"
                logo_alignment="left"
              />
            </div> */}
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
    </>
  );
};

export default LogInOrSignup;
