import * as React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: "var(--f-mkcy-f)",
  border: " 1px solid var(--j-qkgmf)",
  boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
  borderRadius: "40px",
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  backgroundColor: "#c4252c",
  borderRadius: "50%",
  padding: "7px",
  position: "absolute",
  right: "8px",
  top: "2px",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "15px",
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const SearchBox: React.FunctionComponent = () => {
  return (
    <>
      <Search>
        <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        <SearchIconWrapper>
          <SearchIcon style={{ fontSize: "20px" }} />
        </SearchIconWrapper>
      </Search>
      {/* </Toolbar> */}
      {/* <Typography style={{ color: "#c4252c", fontWeight: "600", fontSize: "20px", paddingTop: "23px" }}>Everything About Coffee Beans</Typography> */}
    </>
  );
};

export default SearchBox;
