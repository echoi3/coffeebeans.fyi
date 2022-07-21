import { Stack, Typography } from "@mui/material";
import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import styles from "./FooterForContent.module.scss";
import { useNavigate } from "react-router";
import { BaseRoutes } from "src/routes/constants";
const FooterForContent: React.FC = () => {
  let navigate = useNavigate();

  const handleTermsClick = () => {
    navigate(BaseRoutes.Terms);
  };

  const handlePrivacyClick = () => {
    navigate(BaseRoutes.Privacy);
  };

  return (
    <div className={styles._wrapper}>
      <div className={styles._content}>
        <div className={styles.desktop_part}>
          <Stack direction="row" justifyContent="space-between">
            <div className={styles.footer_left_wrapper}>
              <Stack direction="row" spacing={1}>
                <Typography variant="subtitle2" color="inherit" className={styles.copyright_title}>
                  &copy; {new Date().getFullYear()} coffeebeans.fyi, Inc.
                </Typography>
                <ul>
                  <li onClick={handlePrivacyClick}>Privacy</li>
                  <li onClick={handleTermsClick}>Terms</li>
                  <a href={`mailto:eric.choi@coffeebeans.fyi`} target="_blank" style={{ textDecoration: "none" }}>
                    <li>Contact</li>
                  </a>
                </ul>
              </Stack>
            </div>
            {/* <div className={styles.footer_right_wrapper}>
              <ul>
                <li style={{ cursor: "pointer" }}>
                  <LanguageIcon /> English (US)
                </li>
                <li>
                  <CurrencyRupeeIcon /> USD
                </li>
              </ul>
            </div> */}
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default FooterForContent;
