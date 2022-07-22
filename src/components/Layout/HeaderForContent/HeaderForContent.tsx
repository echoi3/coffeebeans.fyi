import { Grid, Stack, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { googleLogout } from "@react-oauth/google";
import CloseIcon from "@mui/icons-material/Close";

import SearchBox from "../../common/SearchBox";
import LogInOrSignup from "../../LogInOrSignup/LogInOrSignup";
import logo from "../../../assets/logo.png";

import styles from "./HeaderForContent.module.scss";
import { BaseRoutes } from "src/routes/constants";
import { BeanContent } from "src/types/beanContent";
import { isLoggedin } from "src/utils/login";

// function ElevationScroll(props: { children: any; window: any }) {
//   const { children, window } = props;
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//     target: window ? window() : undefined,
//   });
//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// }

interface IProps {
  children: any;
  window: any;
  beanContent?: BeanContent;
  href?: string;
}

const HeaderForContent: React.FunctionComponent<IProps> = ({ children, window, beanContent, href }) => {
  let navigate = useNavigate();

  const _beanContent = (beanContent as BeanContent) ?? {};
  const _href = href ?? "";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [isSignupOrLoginClicked, setIsSignupOrLoginClicked] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const userEmail = localStorage?.getItem("userEmail") ?? "";
  const userFirstName = localStorage?.getItem("userFirstname") ?? "";
  const userUUID = localStorage?.getItem("userUUID") ?? "";

  const handleLogoClick = (): void => {
    navigate(BaseRoutes.Home);
  };

  const handleAddBeanClick = (): void => {
    isLoggedin(userEmail, userUUID) ? navigate(BaseRoutes.Add_Bean) : setIsSignupOrLoginClicked(true);
  };

  const handleSignupOrLoginClick = () => {
    setIsSignupOrLoginClicked(true);
  };

  const handleLogOutClick = () => {
    googleLogout();

    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFirstname");
    localStorage.removeItem("userUUID");
    navigate(0);
  };

  const handleSignupOrLoginClose = () => {
    setIsSignupOrLoginClicked(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <AppBar className={styles._wrapper}>
        <>
          {/* <Container maxWidth={false}> */}
          <div className={styles.header_content}>
            <Grid container>
              <Grid item xs={12} md={4} sm={2} className={styles.header_logo_wrapper}>
                <div className={styles.desktop_logo} onClick={handleLogoClick}>
                  <Stack direction="row" spacing={0.7}>
                    <img src={logo} alt="logo" width="30px" style={{ marginTop: "-2px" }} />
                    <Typography className={styles.logo_text}>coffeebeans.fyi</Typography>
                  </Stack>
                </div>
                <div className={styles.mobile_logo} onClick={handleLogoClick}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" style={{ width: "100%" }}>
                    <div>
                      <img src={logo} alt="logo" width="30px" />
                    </div>

                    <div>
                      <Stack direction="row" spacing={1}>
                        <Button variant="text" color="inherit" className={styles.mobile_lets_chat} onTouchStart={handleModalOpen} onClick={handleModalOpen}>
                          Let's Chat!
                        </Button>
                        <Button variant="text" color="inherit" className={styles.mobile_add_bean} onTouchStart={handleAddBeanClick} onClick={handleAddBeanClick}>
                          Add Bean
                        </Button>
                        {isLoggedin(userEmail, userUUID) ? (
                          <Button variant="text" color="inherit" className={styles.mobile_log_out} onTouchStart={handleLogOutClick} onClick={handleLogOutClick}>
                            Log Out
                          </Button>
                        ) : (
                          <>
                            {" "}
                            <Button variant="text" color="inherit" className={styles.mobile_sign_up} onTouchStart={handleSignupOrLoginClick} onClick={handleSignupOrLoginClick}>
                              Sign up
                            </Button>
                            <Button variant="text" color="inherit" className={styles.mobile_log_in} onTouchStart={handleSignupOrLoginClick} onClick={handleSignupOrLoginClick}>
                              Log In{" "}
                            </Button>
                          </>
                        )}
                      </Stack>
                    </div>
                  </Stack>
                </div>
              </Grid>
              <Grid item xs={12} md={4} sm={6} className={styles.header_sarch_box}>
                {/* <SearchBox /> */}
              </Grid>
              <Grid item xs={12} md={4} sm={4} className={styles.header_post_profile_wrapper}>
                <Stack direction="row" spacing={2}>
                  <Button variant="text" color="inherit" className={styles.lets_chat} onClick={handleModalOpen}>
                    Let's Chat!
                  </Button>
                  <Button variant="text" color="inherit" className={styles.add_bean} onClick={handleAddBeanClick}>
                    Add Bean
                  </Button>
                  {isLoggedin(userEmail, userUUID) ? (
                    <Button variant="text" color="inherit" className={styles.sign_up} onClick={handleLogOutClick}>
                      Log Out
                    </Button>
                  ) : (
                    <>
                      <Button variant="text" color="inherit" className={styles.sign_up} onClick={handleSignupOrLoginClick}>
                        Sign Up
                      </Button>
                      <Button variant="text" color="inherit" className={styles.log_in} onClick={handleSignupOrLoginClick}>
                        Log In
                      </Button>
                    </>
                  )}
                  <LogInOrSignup onClose={handleSignupOrLoginClose} open={isSignupOrLoginClicked} />

                  {/* <div>
                      <React.Fragment>
                        <Button
                          onClick={handleClick}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          className={styles.header_profile_button}
                        >
                          <MenuIcon
                            style={{
                              color: "var(--fo-jk-r-s)",
                              fontSize: "30px",
                            }}
                          />
                          <AccountCircleIcon
                            style={{
                              color: "var(--fo-jk-r-s)",
                              fontSize: "30px",
                              marginLeft: "8px",
                            }}
                          />
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              overflow: "visible",
                              borderRadius: "10px",
                              width: "280px",
                              filter:
                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                              mt: 1.5,
                              "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                            },
                          }}
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                          <MenuItem
                            style={{
                              color: "#222222",
                              fontSize: "14px",
                              lineHeight: "18px",
                              letterSpacing: "normal",
                              fontWeight: "bold",
                            }}
                          >
                            Sign up
                          </MenuItem>
                          <MenuItem
                            style={{
                              color: "#222222",
                              fontSize: "14px",
                              lineHeight: "18px",
                              letterSpacing: "normal",
                            }}
                          >
                            Log in
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            style={{
                              color: "#222222",
                              fontSize: "14px",
                              lineHeight: "18px",
                              letterSpacing: "normal",
                            }}
                          >
                            Host your Home
                          </MenuItem>
                          <MenuItem
                            style={{
                              color: "#222222",
                              fontSize: "14px",
                              lineHeight: "18px",
                              letterSpacing: "normal",
                            }}
                          >
                            Host an Experience
                          </MenuItem>
                        </Menu>
                      </React.Fragment>
                    </div> */}
                </Stack>
              </Grid>
            </Grid>
          </div>
        </>
      </AppBar>
      <Toolbar className={styles.toolbar} />
      <Modal open={modalOpen} onClose={handleModalClose}>
        <div className={styles.modalWrapper}>
          <CloseIcon onClick={handleModalClose} style={{ position: "absolute", top: "3%", right: "2%" }} />

          <div className={styles.modalBody}>
            <Typography className={styles.modalHeader}>Choose one of three methods below to chat with Eric, who built this website:</Typography>
            <br />
            <li>
              1. Talk to Eric on{" "}
              <a href="https://www.instagram.com/echoi33/" target="_blank">
                Instagram
              </a>
            </li>
            <li>
              2. Talk to Eric on{" "}
              <a href="https://twitter.com/echoi333" target="_blank">
                Twitter
              </a>
            </li>
            <li>
              3. Email to{" "}
              <a href={`mailto:echoi3@alumni.nd.edu`} target="_blank">
                echoi3@alumni.nd.edu
              </a>
            </li>
            <br />
            <div className={styles.text}>Can't wait to get to know you and collect your feedback! :)</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HeaderForContent;
