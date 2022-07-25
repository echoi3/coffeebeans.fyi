import { Stack, Typography } from "@mui/material";
// import Image from "next/image";
import React from "react";
import styles from "./SingleBox.module.scss";

import StarRateIcon from "@mui/icons-material/StarRate";
import RateReviewIcon from "@mui/icons-material/RateReview";

interface IProps {
  data: any;
}

const SingleBox: React.FunctionComponent<IProps> = ({ data }) => {
  return (
    <Stack direction="column" className={styles._wrapper}>
      {/* <img src={data?.image} alt="filter" style={{ width: "25px", height: "25px" }} /> */}
      {data?.title === "Top Rated" ? <StarRateIcon /> : <RateReviewIcon />}
      {/* <Image
        src={data?.image}
        alt="filter"
        objectFit="contain"
        width={25}
        height={25}
      /> */}
      <Typography variant="subtitle2" color="inherit" className={styles._title}>
        {data?.title}
      </Typography>
    </Stack>
  );
};

export default SingleBox;
