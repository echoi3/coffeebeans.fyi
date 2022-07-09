import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";

import Slide from "@mui/material/Slide";
import styles from "./MobileFotter.module.scss";
import { Button, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function HideOnScroll(props: { children: any; window: any }) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

const MobileFotter = (props: any) => {
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <div className={styles._wrapper}>
          <Toolbar>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={10}
              className={styles._content}
            >
              <Button>
                <SearchIcon /> hello
              </Button>
              <Button>
                <FavoriteBorderIcon /> hello
              </Button>
              <Button>
                <AccountCircleIcon /> hello
              </Button>
            </Stack>
          </Toolbar>
        </div>
      </HideOnScroll>

      <Box>{props.children}</Box>
    </>
  );
};

export default MobileFotter;
