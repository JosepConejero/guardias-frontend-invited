import { Box, Grid, Tab, Tabs } from "@mui/material";
import { Navbar } from "../components";
import { UsersSettings } from "../usersSettings";
import { CoursesSettings } from "../coursesSettings";

import "../../styles.css";
import { ReactNode, useState } from "react";
import { PasswordSettings } from "../passwordSettings/PasswordSettings";

interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
  //...other: string[];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const SettingsPage = (): JSX.Element => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: any, newValue: number) => {
    ///any
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
          px: { xs: 1, md: 0 },
          pb: 1,
        }}
      >
        <Grid
          item
          container
          sx={{
            width: {
              xs: "100%",
              md:
                value === 0
                  ? 400
                  : value === 1
                  ? 1000
                  : value === 2
                  ? 700
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
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="CONTRASEÑA" {...a11yProps(0)} />
                <Tab label="USUARIOS" {...a11yProps(1)} />
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
                <PasswordSettings />
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

            <TabPanel value={value} index={2}>
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
