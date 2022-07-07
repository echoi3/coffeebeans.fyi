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
// import SingleBox from "./SingleBox/SingleBox";

const HeaderFilter = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };
  return (
    <div className={classes._wrapper}>
      <div className={classes._content_wrapper}>
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: "100%",
            bgcolor: "background.paper",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            aria-label="visible arrows tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            {filterData?.map((item: any) => (
              <Box key={item.id}>
                {/* @ts-ignore */}
                <ProgressiveImage delay={3000} src={item?.image} placeholder="">
                  {(src: string, loading: string) => (
                    <div>
                      {loading ? (
                        <FHFFilterSkeleton />
                      ) : (
                        <Tab label={<SingleBox data={item} />} />
                      )}
                    </div>
                  )}
                </ProgressiveImage>
              </Box>
              // <Tab key={item.id} label={<SingleBox data={item} />} />
            ))}
          </Tabs>
        </Box>
      </div>
    </div>
  );
};

export default HeaderFilter;
