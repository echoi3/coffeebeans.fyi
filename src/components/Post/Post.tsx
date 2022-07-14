import { Box } from "@mui/material";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import { sliderImage } from "../data/post";
import styles from "./Post.module.scss";
import SinglePost from "./SinglePost/SinglePost";
import ProgressiveImage from "react-progressive-graceful-image";
import FHFSkeleton from "../common/FHFSkeleton";
import { useState } from "react";
import { BeanContent } from "src/types/beanContent";
import { useEffect } from "react";
import { getAllBeanContents } from "src/db/beanContent";
import { COFFEBEANS_FYI_FILES } from "src/constants";
import { BaseRoutes } from "src/routes/constants";

const Post: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [_beanContents, setBeanContents] = useState([] as BeanContent[]);

  useEffect(() => {
    const fetchBeanContents = async (): Promise<void> => {
      const beanContents: BeanContent[] = await getAllBeanContents();

      setBeanContents([...beanContents, ...beanContents, ...beanContents]);
      setIsLoading(false);
    };
    isLoading && fetchBeanContents();
  }, [isLoading]);

  const renderHome = () => {
    return (
      <div className={styles._wrapper}>
        <div className={styles._content}>
          <div className={styles._card_wrapper}>
            {_beanContents?.map(beanContent => (
              <Link
                to={{
                  pathname: `${BaseRoutes.BeanContent}/` + beanContent.beanName.replace(/\s+/g, " ").trim().split(" ").join("-"),
                }}
                state={beanContent.uuid}
                style={{ textDecoration: "none" }}
              >
                <Box key={beanContent.uuid}>
                  {/* @ts-ignore */}
                  <ProgressiveImage src={`https://s3.amazonaws.com/${COFFEBEANS_FYI_FILES}/${beanContent.imageName}`} placeholder="">
                    {(src: string, loading: string) => (
                      <div>
                        {loading ? (
                          <div style={{ minWidth: "300px", width: "100%" }}>
                            <FHFSkeleton />
                          </div>
                        ) : (
                          <SinglePost beanContent={beanContent} />
                        )}
                      </div>
                    )}
                  </ProgressiveImage>
                </Box>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return renderHome();
};

export default Post;
