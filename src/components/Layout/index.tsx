import { Box } from "@mui/material";
import React from "react";
import HeaderFilter from "../HeaderFilter/HeaderFilter";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import MobileFotter from "./MobileFotter/MobileFotter";

// import Header from "./Header/Header";

interface IProps {
  children: any;
}

const Layout: React.FunctionComponent<IProps> = ({ children }) => {
  return (
    // <MobileFotter>
    <>
      <Header children={undefined} window={undefined} />
      <Box
        sx={{
          mt: 5,
          "@media screen and (max-width: 600px)": {
            mt: 0,
          },
        }}
      >
        {" "}
      </Box>

      {/* 
      <Box sx={{ mt: 2 }}>
        <HeaderFilter />
      </Box> */}
      <main>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </main>
      <Footer />
    </>
    // </MobileFotter>
  );
};

export default Layout;
