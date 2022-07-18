import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IPostType } from "../../../interface/post";
import StarIcon from "@mui/icons-material/Star";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./SinglePost.module.scss";

import { BeanContent } from "src/types/beanContent";
import { COFFEBEANS_FYI_FILES } from "src/constants";

import monorail from "../../../assets/monorail.png";
import { strHasLength } from "src/utils/strings";

interface IProps {
  beanContent: BeanContent;
}

const SinglePost: React.FunctionComponent<IProps> = ({ beanContent }) => {
  return (
    <Card className={styles._wrapper}>
      <CardContent className={styles._content}>
        <Box className={styles._image}>
          <div className={styles.img_container}>
            <img src={`https://s3.amazonaws.com/${COFFEBEANS_FYI_FILES}/${beanContent.imageName}`} alt="xx" />
          </div>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" color="inherit" className={styles._title}>
              {beanContent.beanName}
            </Typography>
            {strHasLength(beanContent.avgRating) ? (
              <>
                <Stack direction="row" spacing={1} alignItems="center" className={styles._rating}>
                  <StarIcon style={{ marginTop: "-2px" }} /> {Number(beanContent.avgRating).toFixed(2)}
                </Stack>
              </>
            ) : (
              <div></div>
            )}
          </Stack>
          <Typography variant="h6" color="inherit" className={styles._subtitle}>
            {beanContent.companyName}
          </Typography>
          <Typography variant="h6" color="inherit" className={styles._date}>
            {beanContent.headquarter}
          </Typography>
          <Typography variant="h6" color="inherit" className={styles._price}>
            <span style={{ fontWeight: "bold" }}>{beanContent.numReviews}</span> Reviews
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SinglePost;
