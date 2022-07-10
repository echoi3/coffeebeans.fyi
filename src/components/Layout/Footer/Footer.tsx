import { Stack, Typography } from "@mui/material";
import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import styles from "./Footer.module.scss";
const Footer: React.FC = () => {
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
                  &copy; {new Date().getFullYear()} Coffeebeans.fyi, Inc,
                </Typography>
                <ul>
                  <li>. Privacy</li>
                  <li>. Terms</li>
                  <li>. Contact</li>
                </ul>
              </Stack>
            </div>
            <div className={styles.footer_right_wrapper}>
              <ul>
                <li style={{ cursor: "pointer" }}>
                  <LanguageIcon /> English (US)
                </li>
                <li>
                  <CurrencyRupeeIcon /> USD
                </li>
              </ul>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Footer;
