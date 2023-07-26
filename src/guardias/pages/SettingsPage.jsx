import { Box, Button, Grid, Tab, Tabs } from "@mui/material";
import { Navbar } from "../components";
import { UsersSettings } from "../usersSettings";
import { CoursesSettings } from "../coursesSettings";

import "../../styles.css";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const SettingsPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbar />
      <Grid
        container
        spacing={0}
        alignItems="flex-start"
        justifyContent="center"
        sx={{
          minHeight: `100vh`,
          pt: 9,
          //pb: 1,
          px: { xs: 1, md: 0 },
          pb: 1,
        }}
      >
        <Grid
          item
          container
          //wrap="nowrap"
          sx={{
            width: {
              xs: "100%",
              md:
                value === 0
                  ? 400
                  : value === 1
                  ? 950
                  : value === 2
                  ? 650
                  : 1000,
            },
            borderRadius: 2,
            border: "1px lightgrey solid",
          }}
        >
          <Box
            sx={{
              width: "100%",
              "& .MuiBox-root": { padding: "0px" },
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
              >
                <Tab label="CONTRASEÑA" {...a11yProps(0)} />
                <Tab
                  label="USUARIOS"
                  {...a11yProps(1)}
                  // disabled
                  //sx={{ visibility: "hidden" }}
                />
                <Tab label="CURSOS" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                  padding: "10px",
                }}
              >
                <Button variant="outlined">Cambie la contraseña</Button>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                  padding: "10px",
                }}
              >
                <UsersSettings />
              </Grid>
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
              sx={
                {
                  // "&. MuiBox-root": { padding: "0px" },
                  // "&. MuiGrid-container": { padding: "0px" },
                  // "&.MuiGrid-root": { padding: "0px" },
                  // "&. MuiGrid-item": { padding: "0px" },
                  // "& .MuiTab-root": { padding: "0px" },
                  //border: "10px red solid",
                }
              }
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                  padding: "10px",
                }}
              >
                <CoursesSettings />
              </Grid>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

//   <Typography>Cambio de contraseña</Typography>

//  <Grid item md={2}>
//    <PruebasEstadisticas />
// </Grid>
// <Grid item md={8}>
//    <MonthBox />
// </Grid>
// <Grid item md={2}>
//    <PruebasEstadisticas />
// </Grid>
