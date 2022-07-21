import { Box } from "@mui/material";
import React from "react";
import { Link, Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import { sliderImage } from "../data/post";
import styles from "./Post.module.scss";
import SinglePost from "./SinglePost/SinglePost";
import ProgressiveImage from "react-progressive-graceful-image";
import FHFSkeleton from "../common/FHFSkeleton";
import { useState } from "react";
import { BeanContent } from "src/types/beanContent";
import { useEffect, useLayoutEffect, useRef } from "react";
import { getAllBeanContents } from "src/db/beanContent";
import { COFFEBEANS_FYI_FILES } from "src/constants";
import { BaseRoutes } from "src/routes/constants";

import { listHasLength } from "src/utils/list";

const handleScrollPosition = () => {
  const _scrollPosition = localStorage.getItem("scrollPosition");
  if (_scrollPosition) {
    setTimeout(function () {
      window.scrollTo(0, parseInt(_scrollPosition));
    }, 100);

    if (window.scrollY < parseInt(_scrollPosition)) {
      window.scrollTo({ top: parseInt(_scrollPosition) });
    }
    localStorage.removeItem("scrollPosition");
  }
};

const Post: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [_beanContents, setBeanContents] = useState([] as BeanContent[]);
  const [scrollTop, setScrollTop] = useState(0);

  const myRef = useRef();

  useEffect(() => {
    const fetchBeanContents = async (): Promise<void> => {
      const beanContents: BeanContent[] = await getAllBeanContents();
      const sortedBeanContents: BeanContent[] = beanContents.sort((a, b) => (new Date(b.timeStamp) as any) - (new Date(a.timeStamp) as any));
      setBeanContents(sortedBeanContents);
      setIsLoading(false);
    };

    isLoading && fetchBeanContents();
  }, [isLoading]);

  useLayoutEffect(() => {
    if (listHasLength(_beanContents) && !isLoading) {
      handleScrollPosition();
    }
  }, [_beanContents, isLoading]);

  const handleLinkClick = e => {
    // e.preventDefault();
    const scrollPosition = `${window.scrollY}` as any;

    localStorage.setItem("scrollPosition", scrollPosition);
  };

  const renderHome = () => {
    return (
      <div className={styles._wrapper}>
        <div className={styles._content}>
          <div className={styles._card_wrapper}>
            {_beanContents?.map(beanContent => (
              <Link
                to={{
                  pathname: `${BaseRoutes.BeanContent}/` + beanContent.uuid,
                }}
                style={{ textDecoration: "none" }}
                key={`link_${beanContent.uuid}`}
                onClick={handleLinkClick}
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
                          <div>
                            <SinglePost beanContent={beanContent} />
                          </div>
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
