import React from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import classes from "./HeaderFilter.module.scss";
import filterData from "../data/filterData";
import ProgressiveImage from "react-progressive-graceful-image";
import SingleBox from "./SingleBox/SingleBox";
import FHFSkeleton from "../common/FHFSkeleton";
import FHFFilterSkeleton from "../common/FHFFilterSkeleton";

import StarRateIcon from "@mui/icons-material/StarRate";
import RateReviewIcon from "@mui/icons-material/RateReview";
// import SingleBox from "./SingleBox/SingleBox";

const HeaderFilter = ({ filterValue, handleFilterClick }) => {
  return (
    <div className={classes._wrapper}>
      <div className={classes._content_wrapper}>
        <Box
        // sx={{
        //   flexGrow: 1,
        //   maxWidth: "100%",
        //   bgcolor: "background.paper",
        // }}
        >
          <Tabs
            value={filterValue}
            onChange={handleFilterClick}
            variant="standard"
            aria-label="basic tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            <Tab label="Top Rated" icon={<StarRateIcon />} style={{ fontSize: "12.5px" }} />
            <Tab label="Most Reviewed" icon={<RateReviewIcon />} style={{ fontSize: "12.5px" }} />
          </Tabs>
        </Box>
      </div>
    </div>
  );
};

// {filterData?.map((item: any) => (
// 	<>
// 		<Box key={item.id}>
// 			{/* @ts-ignore */}
// 			<ProgressiveImage src={item?.image} placeholder="">
// 				{(src: string, loading: string) => <div>{loading ? <FHFFilterSkeleton /> : <Tab label={<SingleBox data={item} />} />}</div>}
// 			</ProgressiveImage>
// 		</Box>
// 		<Tab key={item.id} label={<SingleBox data={item} />} />
// 	</>
// ))}

export default HeaderFilter;
