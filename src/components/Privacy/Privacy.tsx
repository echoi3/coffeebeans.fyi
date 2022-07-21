import StarIcon from "@mui/icons-material/Star";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Box, Rating, Grid, Typography } from "@mui/material";
import { Button, Container, TextField, makeStyles, Snackbar } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";

import styles from "./Privacy.module.scss";
import { BeanContent } from "src/types/beanContent";
import { addRatingAndCommentOnBeanContent, getBeanContentById } from "src/db/beanContent";
import { strHasLength } from "src/utils/strings";
import { COFFEBEANS_FYI_FILES, UUID_REGEX } from "src/constants";
import HeaderForContent from "../Layout/HeaderForContent/HeaderForContent";
import { Comment } from "src/types/comment";
import { addCommentOnAccount, getUserCommentsById } from "src/db/account";
import { listHasLength } from "src/utils/list";
import LogInOrSignup from "../LogInOrSignup/LogInOrSignup";
import { isLoggedin } from "src/utils/login";
import Footer from "../Layout/Footer/Footer";
import FooterForContent from "../Layout/FooterForContent/FooterForContent";
import { BaseRoutes } from "src/routes/constants";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

const Privacy = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [_beanContent, setBeanContent] = useState({} as BeanContent);

  const [_comments, setComments] = useState([] as Comment[]);
  const [_avgRating, setAvgRating] = useState("");
  const [_numReviews, setNumReviews] = useState("");

  const location: any = useLocation();

  let navigate = useNavigate();

  useScrollToTop();

  useEffect(() => {
    const fetchBeanPost = async (): Promise<void> => {
      const uuidRegex = UUID_REGEX.exec(location.pathname) as string[];

      const contentUUID = uuidRegex[0];

      const beanContent: BeanContent = await getBeanContentById(contentUUID);

      setBeanContent(beanContent);
      setComments((beanContent?.comments as Comment[]) ?? []);
      setAvgRating((beanContent?.avgRating as string) ?? "");
      setNumReviews((beanContent?.numReviews as string) ?? "0");
      setIsLoading(false);
    };
    isLoading && fetchBeanPost();
  }, [isLoading]);

  const handleTermsClick = () => {
    navigate(BaseRoutes.Terms);
  };

  return (
    <div className={styles._wrapper}>
      <HeaderForContent children={undefined} window={undefined} beanContent={_beanContent} href={window.location.href} />

      <Grid container direction="column" className={styles.beans_wrapper}>
        <Grid xs={12} sm={12} className={styles._title} order={{ xs: 2, sm: 1, md: 1, lg: 1 }}>
          <Typography className={styles._title_content} display="block">
            {" "}
            Privacy Policy
          </Typography>
        </Grid>
        <Grid container order={{ xs: 3, sm: 2, md: 2, lg: 2 }} direction="column" className={styles.ratings_and_review}></Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Introduction</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  At coffeebeans.fyi, accessible from http://coffeebeans.fyi, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types
                  of information that is collected and recorded by coffeebeans.fyi and how we use it. If you have additional questions or require more information about our Privacy
                  Policy, do not hesitate to contact us through email at eric.choi@coffeebeans.fyi
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Log Files</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  coffeebeans.fyi follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of
                  hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date
                  and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of
                  the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Cookies and Web Beacons</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  Like any other website, coffeebeans.fyi uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website
                  that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser
                  type and/or other information.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Our Advertising Partners</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  Some of advertisers on our site may use cookies and web beacons. Each of our advertising partners has their own Privacy Policy for their policies on user data.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Privacy Policies</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  You may consult this list to find the Privacy Policy for each of the advertising partners of coffeebeans.fyi. Third-party ad servers or ad networks uses
                  technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on coffeebeans.fyi, which are sent
                  directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their
                  advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that coffeebeans.fyi has no access to or control
                  over these cookies that are used by third-party advertisers.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Third Party Privacy Policies</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  coffeebeans.fyi's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these
                  third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You may find a
                  complete list of these Privacy Policies and their links here: Privacy Policy Links. You can choose to disable cookies through your individual browser options. To
                  know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites. What Are Cookies?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Children's Information</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or
                  monitor and guide their online activity. coffeebeans.fyi does not knowingly collect any Personal Identifiable Information from children under the age of 13. If
                  you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to
                  promptly remove such information from our records.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Online Privacy Policy Only</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect
                  in coffeebeans.fyi. This policy is not applicable to any information collected offline or via channels other than this website.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Consent</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  By using our website, you hereby consent to our Privacy Policy and agree to its{" "}
                  <a onClick={handleTermsClick} style={{ textDecoration: "underline", cursor: "pointer" }}>
                    Terms and Conditions.
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <FooterForContent />
    </div>
  );
};

export default Privacy;
