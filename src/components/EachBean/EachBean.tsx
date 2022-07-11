import StarIcon from "@mui/icons-material/Star";
import { CssBaseline, Grid, Typography } from "@mui/material";
import React from "react";

import monorail from "../../assets/monorail.png";

import styles from "./EachBean.module.scss";

const EachBean = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={styles._wrapper}
      >
        <Grid
          sm={12}
          className={styles._title}
          order={{ xs: 2, sm: 1, md: 1, lg: 1 }}
        >
          <Typography
            style={{
              fontWeight: "600",
              fontSize: "24px",
            }}
          >
            Monorail Espresso Blend by Monorail Espresso
          </Typography>
        </Grid>
        <Grid container order={{ xs: 3, sm: 2, md: 2, lg: 2 }} direction="row">
          <Grid
            className={styles._rating}
            xs={1.5}
            sm={0.7}
            md={1}
            lg={0.6}
            xl={0.4}
          >
            <div style={{ display: "flex", marginRight: "50px" }}>
              <StarIcon style={{ marginTop: "-1.9px", width: "20px" }} />{" "}
              <Typography
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                4.9
              </Typography>
            </div>
          </Grid>
          <Grid xs={3} sm={1.5} md={1.5} lg={1} xl={1}>
            <Typography style={{ fontSize: "15px", fontWeight: "600" }}>
              21 Reviews
            </Typography>
          </Grid>
          <Grid
            className={styles._rating}
            xs={7.5}
            sm={4}
            md={5}
            lg={10.4}
            xl={10.6}
          >
            <Typography style={{ fontSize: "15px", fontWeight: "600" }}>
              Seattle, Washington, United States
            </Typography>
          </Grid>
        </Grid>
        <Grid sm={12} order={{ xs: 1, sm: 3, md: 3, lg: 3 }}>
          <img src={monorail} className={styles._image}></img>
        </Grid>
      </Grid>
    </>
  );
};

export default EachBean;
