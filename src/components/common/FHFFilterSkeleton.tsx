import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const FHFFilterSkeleton: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        mx: 1,
        width: "80px",
      }}
    >
      <Skeleton
        variant="circular"
        width={35}
        height={35}
        sx={{ margin: "0 auto" }}
      />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
      </Box>
    </Box>
  );
};

export default FHFFilterSkeleton;
