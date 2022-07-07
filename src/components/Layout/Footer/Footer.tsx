import { Stack, Typography } from "@mui/material";
import React from "react";
import styles from "./Footer.module.scss";
const Footer = () => {
  return (
    <div className={styles._wrapper}>
      <div className={styles._content}>
        <div className={styles.desktop_part}>
          <Stack direction="row" justifyContent="space-between">
            <div className={styles.footer_left_wrapper}>
              <Stack direction="row" spacing={1}>
                <Typography
                  variant="subtitle2"
                  color="inherit"
                  className={styles.copyright_title}
                >
                  &copy; {new Date().getFullYear()} Airbnb, Inc.
                </Typography>
                <ul>
                  <li>. Privacy</li>
                  <li>. Terms</li>
                  <li>. Sitemap</li>
                  <li>. Destinations</li>
                </ul>
              </Stack>
            </div>
            <div>helo</div>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Footer;
