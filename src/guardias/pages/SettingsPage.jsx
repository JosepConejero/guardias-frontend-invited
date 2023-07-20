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
          //backgroundColor: "yellow",
          pt: 9,
        }}
      >
        <Grid
          item
          container
          sx={{
            width: { sm: 1000 },
            //backgroundColor: "cyan",
            borderRadius: 2,
            border: 1,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              /* alignItems="center"
              justifyContent="center" */
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                //  bgcolor: "red"
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
                <Tab label="CURSOS" {...a11yProps(2)} /* disabled */ />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                //sx={{}}
              >
                <Button variant="outlined">Cambie la contraseña</Button>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                //sx={{}}
              >
                <UsersSettings />
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2} sx={{ boder: 1 }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                //sx={{}}
              >
                <CoursesSettings />
              </Grid>
            </TabPanel>
          </Box>

          {/* <Typography>Cambio de contraseña</Typography> */}

          <Grid item md={2}>
            {/*  <PruebasEstadisticas /> */}
          </Grid>
          <Grid item md={8}>
            {/*  <MonthBox /> */}
          </Grid>
          <Grid item md={2}>
            {/*  <PruebasEstadisticas /> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
