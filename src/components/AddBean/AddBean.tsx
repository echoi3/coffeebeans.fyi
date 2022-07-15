import StarIcon from "@mui/icons-material/Star";
import { Box, Rating, Grid, Typography } from "@mui/material";
import { Button, Container, TextField, makeStyles, Snackbar } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { DropzoneArea } from "material-ui-dropzone";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import styles from "./AddBean.module.scss";
import { BeanContent } from "src/types/beanContent";
import { createBeanContent, getAllBeanContents, getBeanContentByBeanName, getBeanContentById } from "src/db/beanContent";
import { strHasLength } from "src/utils/strings";
import { COFFEBEANS_FYI_FILES } from "src/constants";
import HeaderForContent from "../Layout/HeaderForContent/HeaderForContent";
import { listHasLength } from "src/utils/list";
import { uploadToS3 } from "src/db/s3";
import { BaseRoutes } from "src/routes/constants";
import { createCompany, getAllCompanies } from "src/db/company";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#c4252c",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#ffffff",
    backgroundColor: "#c4252c",
    fontSize: "20px",
    fontWeight: 600,
    "&:hover, &:focus": {
      backgroundColor: "#ffffff",
      color: "#c4252c",
    },
  },
  root: {
    background: "#c4252c",
    textAlign: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
  },
  preview: {
    width: "500%",
    fullWidth: "true",
  },
}));

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export interface CompaniesAndBeans {
  companyName: string;
  beans: string[];
}

const AddBean = () => {
  let navigate = useNavigate();

  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  const [isLoading, setIsLoading] = useState(true);
  const [companyNameFieldOpen, setCompanyNameFieldOpen] = useState(false);
  const [beanNameFieldOpen, setBeanNameFieldOpen] = useState(false);

  const [file, setFile] = useState(null as unknown);

  const [companyName, setCompanyName] = useState("");
  const [beanName, setBeanName] = useState("");
  const [headquarter, setHeadquarter] = useState("");

  const [_beanContents, setBeanContents] = useState([] as BeanContent[]);
  const [_uniqueCoffeeCompanies, setUniqueCoffeeCompanies] = useState([] as string[]);
  const [_uniqueBeans, setUniqueBeans] = useState([] as string[]);

  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const userEmail = localStorage?.getItem("userEmail") ?? "";

  const classes = useStyles();

  useEffect(() => {
    const fetchBeanContents = async (): Promise<void> => {
      const beanContents: BeanContent[] = await getAllBeanContents();

      setBeanContents(beanContents);

      const coffeeCompanies = beanContents.map(beanContent => beanContent.companyName);
      const uniqueCoffeeCompanies = Array.from(new Set(coffeeCompanies)) as string[];
      setUniqueCoffeeCompanies(uniqueCoffeeCompanies);
      setIsLoading(false);
    };
    isLoading && fetchBeanContents();
  }, [isLoading]);

  console.log("Company name", companyName);
  console.log("Bean name", beanName);

  const retrieveBeansFromCompany = () => {
    const beansList = _beanContents.map(beanContent => {
      if (beanContent.companyName === companyName) {
        return beanContent.beanName;
      }
    }) as string[];
    console.log("Beans?? ", beansList);
    setUniqueBeans(beansList.filter(Boolean));
  };

  const handleFileUpload = (files: any) => {
    setFile(files[0]);
  };

  const uploadImageToServer = (file: File) => {
    return new Promise(resolve => {
      console.log(`Uploading image ${file.name} ...`);
      uploadToS3(file, file.name).then(() => {
        console.log("Upload successful");
        resolve(`https://s3.amazonaws.com/${COFFEBEANS_FYI_FILES}/${file.name}`);
      });
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!file) {
      setIsError(true);
      setOpen(true);
    } else {
      setIsError(false);
      const beanContent: Partial<BeanContent> = {
        companyName,
        beanName,
        headquarter,
        imageName: (file as any).name as string,
      };

      setOpen(true);
      setTimeout(() => {
        navigate(BaseRoutes.Home);
      }, 2000);

      uploadImageToServer(file as File);
      createBeanContent(beanContent);

      const allCompanies = await getAllCompanies();
      if (!allCompanies.includes(companyName)) {
        await createCompany({ companyName });
      }

      try {
        await fetch("/api/post-bean", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email: userEmail, companyName, beanName }),
        });
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles._wrapper}>
      <HeaderForContent children={undefined} window={undefined} />

      <Grid container direction="row" className={styles.comments_wrapper}>
        <Grid container direction="row">
          <Grid xs={12} sm={11.6} className={styles.rating_wrapper}>
            <Grid container>
              <Grid xs={12} sm={12}>
                <Typography className={styles.review_title}>Add Coffee Bean</Typography>
              </Grid>

              <form className={classes.form} onSubmit={handleSubmit}>
                <Autocomplete
                  fullWidth
                  open={companyNameFieldOpen}
                  onOpen={() => {
                    if (companyName) {
                      setCompanyNameFieldOpen(true);
                    }
                  }}
                  onClose={() => setCompanyNameFieldOpen(false)}
                  inputValue={companyName}
                  onInputChange={(e, value, reason) => {
                    setCompanyName(value);

                    if (!value) {
                      setCompanyNameFieldOpen(false);
                    }
                  }}
                  freeSolo
                  options={_uniqueCoffeeCompanies}
                  getOptionLabel={option => option}
                  renderInput={params => <TextField required {...params} label="Name of the company?" fullWidth margin="normal" variant="outlined" />}
                />

                <Autocomplete
                  fullWidth
                  open={beanNameFieldOpen}
                  onOpen={() => {
                    retrieveBeansFromCompany();
                    if (beanName) {
                      setBeanNameFieldOpen(true);
                    }
                  }}
                  onClose={() => setBeanNameFieldOpen(false)}
                  inputValue={beanName}
                  onInputChange={(e, value, reason) => {
                    setBeanName(value);

                    if (!value) {
                      setBeanNameFieldOpen(false);
                    }
                  }}
                  freeSolo
                  options={_uniqueBeans}
                  getOptionLabel={option => option}
                  renderInput={params => <TextField required {...params} label="Name of the coffee bean?" fullWidth margin="normal" variant="outlined" />}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="(Optional) Where's the headquarter?"
                  value={headquarter}
                  onInput={e => setHeadquarter((e?.target as HTMLInputElement).value)}
                />
                <DropzoneArea
                  dropzoneText="Please upload a nice pic of the bean! (square size image preferred)"
                  previewText="Looks Good"
                  filesLimit={1}
                  onChange={handleFileUpload}
                  getFileAddedMessage={() => "File successfully added. Looks good!"}
                />
                <Button type="submit" fullWidth variant="contained" className={classes.submit}>
                  Submit
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  ContentProps={{
                    classes: {
                      root: classes.root,
                    },
                  }}
                  message={isError ? "Please upload the image" : "Love it! Thank you :)"}
                ></Snackbar>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddBean;
