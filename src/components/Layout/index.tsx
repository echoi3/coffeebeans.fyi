import { Box } from "@mui/material";
import React from "react";
import HeaderFilter from "../HeaderFilter/HeaderFilter";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

// import Header from "./Header/Header";

interface IProps {
  children: any;
}

const Layout: React.FunctionComponent<IProps> = ({ children }) => {
  return (
    <>
      <Header children={undefined} window={undefined} />
      <Box sx={{ mt: 2 }}>
        <HeaderFilter />
      </Box>
      <main>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
