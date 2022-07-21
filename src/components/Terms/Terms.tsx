import StarIcon from "@mui/icons-material/Star";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Box, Rating, Grid, Typography } from "@mui/material";
import { Button, Container, TextField, makeStyles, Snackbar } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";

import styles from "./Terms.module.scss";
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

const Terms = () => {
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

  const handlePrivacyClick = () => {
    navigate(BaseRoutes.Privacy);
  };

  return (
    <div className={styles._wrapper}>
      <HeaderForContent children={undefined} window={undefined} beanContent={_beanContent} href={window.location.href} />

      <Grid container direction="column" className={styles.beans_wrapper}>
        <Grid xs={12} sm={12} className={styles._title} order={{ xs: 2, sm: 1, md: 1, lg: 1 }}>
          <Typography className={styles._title_content} display="block">
            {" "}
            Terms of Service
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
                  Welcome to coffeebeans.fyi by Sciontia! We have developed these Terms of Service to govern your use and enjoyment of our digital products, including
                  coffeebeans.fyi ("the Site"), coffeebeans.fyi Mobile, any content found on the Site, any digital application edition of coffeebeans.fyi magazine, or other digital
                  application published by coffeebeans.fyi (each a "Digital Application"). Your use of any product in our network, accessed via any device, tells us you have read
                  and agreed to these Terms of Service and to our Privacy Policy. Please read both these documents carefully.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Intellectual Property</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  Unless otherwise stated, Sciontia, Inc and/or its licensors own the intellectual property rights for all material on coffeebeans.fyi. All intellectual property
                  rights are reserved. You may access this from coffeebeans.fyi for your own personal use subjected to restrictions set in these terms and conditions. <br />
                  <br />
                  You must not:
                  <li>Republish material from coffeebeans.fyi</li>
                  <li>Sell, rent or sub-license material from coffeebeans.fyi</li>
                  <li>Reproduce, duplicate or copy material from coffeebeans.fyi</li>
                  <li>Redistribute content from coffeebeans.fyi</li>
                  <br />
                  This Agreement shall begin on the date hereof. Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas
                  of the website. Sciontia, Inc does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and
                  opinions of Sciontia, Inc,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent
                  permitted by applicable laws, Sciontia, Inc shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of
                  any use of and/or posting of and/or appearance of the Comments on this website. Sciontia, Inc reserves the right to monitor all Comments and to remove any
                  Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
                  <br /> <br />
                  You warrant and represent that:
                  <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                  <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                  <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                  <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                  <br />
                  You hereby grant , Inc a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms,
                  formats or media. coffeebeans.fyi is for your personal, non-commercial use unless you enter into a separate agreement with us for your commercial use.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Hyperlinking to our Content</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  The following organizations may link to our Website without prior written approval:
                  <br />
                  <br />
                  <li>Government agencies;</li>
                  <li>Search engines;</li>
                  <li>News organizations;</li>
                  <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                  <li>
                    System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to
                    our Web site.
                  </li>
                  <br />
                  These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not
                  falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s
                  site. We may consider and approve other link requests from the following types of organizations:
                  <br />
                  <br />
                  <li>commonly-known consumer and/or business information sources;</li>
                  <li>dot.com community sites;</li>
                  <li>associations or other groups representing charities;</li>
                  <li>online directory distributors;</li>
                  <li>internet portals;</li>
                  <li>accounting, law and consulting firms; and</li>
                  <li>educational institutions and trade associations.</li>
                  <br />
                  We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited
                  businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of
                  , Inc; and (d) the link is in the context of general resource information.
                  <br />
                  <br />
                  These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or
                  approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.
                  <br />
                  <br />
                  If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Sciontia,
                  Inc. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to
                  our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
                  <br />
                  <br />
                  Approved organizations may hyperlink to our Website as follows:
                  <li>By use of our corporate name; or</li>
                  <li>By use of the uniform resource locator being linked to; or</li>
                  <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
                  <br />
                  No use of Sciontia, Inc's logo or other artwork will be allowed for linking absent a trademark license agreement.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>iFrames</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our
                  Website.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Content Liability</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your
                  Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates
                  the infringement or other violation of, any third party rights.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Your Privacy</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  Please read{" "}
                  <a onClick={handlePrivacyClick} style={{ textDecoration: "underline", cursor: "pointer" }}>
                    Privacy Policy
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Reservation of Rights</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon
                  request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be
                  bound to and follow these linking terms and conditions.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Removal of links from our website</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links
                  but we are not obligated to or so or to respond to you directly. We do not ensure that the information on this website is correct, we do not warrant its
                  completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <Typography className={styles.content_header}>Disclaimer</Typography>
        </Grid>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.content_body}>
                  To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website.
                  Nothing in this disclaimer will:
                  <br />
                  <br />
                  <li>limit or exclude our or your liability for death or personal injury;</li>
                  <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                  <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                  <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                  <br />
                  The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all
                  liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty. As long as the website and the
                  information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
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

export default Terms;
