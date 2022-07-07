import { Box } from "@mui/material";
import React from "react";
import { sliderImage } from "../data/post";
import styles from "./Post.module.scss";
import SinglePost from "./SinglePost/SinglePost";
import ProgressiveImage from "react-progressive-graceful-image";
import FHFSkeleton from "../common/FHFSkeleton";

const Post: React.FunctionComponent = () => {
  return (
    <div className={styles._wrapper}>
      <div className={styles._content}>
        <div className={styles._card_wrapper}>
          {sliderImage?.map((item) => (
            <Box key={item.id}>
              {/* @ts-ignore */}
              <ProgressiveImage
                delay={3000}
                src={item?.images && item?.images[0]}
                placeholder=""
              >
                {(src: string, loading: string) => (
                  <div>
                    {loading ? (
                      <div style={{ minWidth: "300px", width: "100%" }}>
                        <FHFSkeleton />
                      </div>
                    ) : (
                      <SinglePost data={item} />
                    )}
                  </div>
                )}
              </ProgressiveImage>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;

//  <ProgressiveImage src={el.image} placeholder="">
//    {(src, loading) => (
//      <div>
//        {loading ? (
//          <FHFSkeleton />
//        ) : (
//          <ImageDialog

//          />
//        )}
//      </div>
//    )}
//  </ProgressiveImage>;
