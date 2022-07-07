import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const FHFSkeleton: React.FunctionComponent = () => {
  return (
    <Box sx={{ my: 5 }}>
      <Skeleton variant="rectangular" width={"100%"} height={200} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Box>
  );
};

export default FHFSkeleton;
