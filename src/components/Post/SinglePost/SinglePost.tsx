import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { IPostType } from "../../../interface/post";
import StarIcon from "@mui/icons-material/Star";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./SinglePost.module.scss";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

interface IProps {
  data: IPostType;
}

const SinglePost: React.FunctionComponent<IProps> = ({ data }) => {
  return (
    <Card className={styles._wrapper}>
      <CardContent className={styles._content}>
        <Box className={styles._image}>
          <Carousel responsive={responsive} showDots={true} infinite={true}>
            {data?.images.map((item, i) => (
              <img src={item} alt={data.title} key={i} />
            ))}
          </Carousel>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" color="inherit" className={styles._title}>
              {data.title}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              className={styles._rating}
            >
              <StarIcon /> {data.rating}
            </Stack>
          </Stack>
          <Typography variant="h6" color="inherit" className={styles._subtitle}>
            {data.subtitle}
          </Typography>
          <Typography variant="h6" color="inherit" className={styles._date}>
            {data.date}
          </Typography>
          <Typography variant="h6" color="inherit" className={styles._price}>
            <span style={{ fontWeight: "bold" }}>${data.price}</span> night
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SinglePost;
