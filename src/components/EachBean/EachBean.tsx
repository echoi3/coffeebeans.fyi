import StarIcon from "@mui/icons-material/Star";
import { Box, Rating, Grid, Typography } from "@mui/material";
import { Button, Container, TextField, makeStyles, Snackbar } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import styles from "./EachBean.module.scss";
import { BeanContent } from "src/types/beanContent";
import { addRatingAndCommentOnBeanContent, getBeanContentByBeanName, getBeanContentById } from "src/db/beanContent";
import { strHasLength } from "src/utils/strings";
import { COFFEBEANS_FYI_FILES } from "src/constants";
import HeaderForContent from "../Layout/HeaderForContent/HeaderForContent";
import { Comment } from "src/types/comment";
import { addCommentOnAccount, getUserCommentsById } from "src/db/account";
import { listHasLength } from "src/utils/list";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#c4252c",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#ffffff",
    backgroundColor: "#c4252c",
    fontSize: "20px",
    fontWeight: 600,
    "&:hover, &:focus": {
      backgroundColor: "#ffffff",
      color: "#c4252c",
    },
  },
  root: {
    background: "#c4252c",
    textAlign: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
  },
}));

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

const EachBean = () => {
  const [rating, setRating] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  const [isLoading, setIsLoading] = useState(true);
  const [_beanContent, setBeanContent] = useState({} as BeanContent);

  const [comment, setComment] = useState("");
  const [_comments, setComments] = useState([] as Comment[]);
  const [_avgRating, setAvgRating] = useState("");
  const [_numReviews, setNumReviews] = useState("");

  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const userEmail = localStorage?.getItem("userEmail") ?? "";
  const userFirstName = localStorage?.getItem("userFirstname") ?? "";
  const userUUID = localStorage?.getItem("userUUID") ?? "";

  const location: any = useLocation();

  useEffect(() => {
    const fetchBeanPost = async (): Promise<void> => {
      const beanContent: BeanContent = await getBeanContentById(location.state);

      setBeanContent(beanContent);
      setComments((beanContent?.comments as Comment[]) ?? []);
      setAvgRating((beanContent?.avgRating as string) ?? "");
      setNumReviews((beanContent?.numReviews as string) ?? "0");
      setIsLoading(false);
    };
    isLoading && fetchBeanPost();
  }, [isLoading]);

  const classes = useStyles();

  const handleSubmit = async e => {
    e.preventDefault();

    if ((rating as number) > 0) {
      const ratingString = rating?.toString();
      setIsError(false);
      setOpen(true);

      const date = new Date();
      const year = date.getUTCFullYear().toString();
      const monthName = date
        .toLocaleString("default", {
          month: "long",
        })
        .toString();

      const commentContent: Comment = {
        id: _beanContent.uuid,
        userName: userFirstName,
        timeStamp: monthName + " " + year,
        rating: ratingString as string,
        comment,
      };

      const userComments = await getUserCommentsById(userUUID);

      const comments = [...((_beanContent?.comments as Comment[]) ?? []), commentContent];
      setComments(comments);

      const ratings = [...((_beanContent?.ratings as String[]) ?? []), ratingString] as string[];
      const avgRating = (ratings.reduce((acc, val) => acc + Number(val), 0) / ratings.length) as number;
      const avgRatingString = avgRating.toString();
      setAvgRating(avgRatingString);

      const numReviews = strHasLength(commentContent.comment) ? String(Number(_beanContent.numReviews) + 1) : _beanContent.numReviews;
      setNumReviews(numReviews);

      addRatingAndCommentOnBeanContent(_beanContent.uuid, comments, ratings, avgRatingString, numReviews);
      addCommentOnAccount(userUUID, [...userComments, commentContent]);

      setComment("");
      setRating(0);
      setIsLoading(true);
    } else {
      setIsError(true);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles._wrapper}>
      <HeaderForContent children={undefined} window={undefined} />
      <Grid container direction="column" className={styles.beans_wrapper}>
        <Grid xs={12} sm={12} order={{ xs: 1, sm: 3, md: 3, lg: 3 }}>
          <img src={`https://s3.amazonaws.com/${COFFEBEANS_FYI_FILES}/${_beanContent.imageName}`} className={styles._image}></img>
        </Grid>
        <Grid xs={12} sm={12} className={styles._title} order={{ xs: 2, sm: 1, md: 1, lg: 1 }}>
          <Typography
            style={{
              fontWeight: "600",
              fontSize: "24px",
            }}
            display="block"
          >
            {_beanContent.beanName} by {_beanContent.companyName}
          </Typography>
        </Grid>
        <Grid container order={{ xs: 3, sm: 2, md: 2, lg: 2 }} direction="column" className={styles.ratings_and_review}>
          <Grid xs={12} sm={12}>
            <div style={{ display: "flex" }}>
              {strHasLength(_beanContent.avgRating) ? (
                <>
                  <StarIcon style={{ marginTop: "-1.9px", width: "20px" }} />{" "}
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      marginRight: "7px",
                    }}
                  >
                    {Number(_avgRating).toFixed(2)} ·
                  </Typography>
                </>
              ) : (
                <div></div>
              )}

              <Typography
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  marginRight: "10px",
                  marginLeft: "3px",
                }}
              >
                {_numReviews} Reviews ·
              </Typography>
              <Typography style={{ fontSize: "15px", fontWeight: "600" }}>{_beanContent.headquarter}</Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid xs={12} sm={12}>
          <div className={styles.desktop_commentHeader}>
            {strHasLength(_beanContent.avgRating) ? (
              <>
                <StarIcon style={{ marginTop: "2px", width: "30px" }} />{" "}
                <Typography
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginRight: "9px",
                  }}
                >
                  {Number(_avgRating).toFixed(2)} ·
                </Typography>
              </>
            ) : (
              <div></div>
            )}

            <Typography
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginRight: "12px",
                marginLeft: "3px",
              }}
            >
              {_numReviews} Reviews
            </Typography>
          </div>
        </Grid>
        {!_beanContent?.commentedUsers?.includes(userEmail) ? (
          <Grid container direction="row">
            <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
              <Grid container>
                <Grid xs={12} sm={12}>
                  <Typography className={styles.review_title}>Add Your review</Typography>
                </Grid>
                <Grid xs={12} sm={12}>
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      name="text-feedback"
                      value={rating}
                      precision={0.5}
                      getLabelText={getLabelText}
                      sx={{
                        fontSize: "30px",
                        "@media screen and (max-width: 600px)": {
                          fontSize: "50px",
                        },
                      }}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {rating !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>}{" "}
                  </Box>
                </Grid>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="What did you think of the coffee bean? (optional)"
                    multiline
                    value={comment}
                    rows={4}
                    onInput={e => setComment((e?.target as HTMLInputElement).value)}
                  />
                  <Button type="submit" fullWidth variant="contained" className={classes.submit}>
                    Submit
                  </Button>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    ContentProps={{
                      classes: {
                        root: classes.root,
                      },
                    }}
                    message={isError ? "Please provide a rating :)" : "Love it! Thank you :)"}
                  ></Snackbar>
                </form>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <div></div>
        )}
        <Grid container>
          {listHasLength(_comments) ? (
            _comments.map(comment =>
              strHasLength(comment.comment) ? (
                <Grid xs={12} sm={5.7} className={styles.each_comment_wrapper}>
                  <Typography className={styles.first_name}>{comment?.userName ?? ""}</Typography>
                  <Typography className={styles.date}>{comment.timeStamp}</Typography>
                  <Typography className={styles.comment_content}>{comment.comment}</Typography>
                </Grid>
              ) : (
                <div></div>
              ),
            )
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default EachBean;
