import { Divider, Grid, Typography } from "@mui/material";
import { useStatisticsData } from "../../hooks/useStatisticsData";
//import { useState } from "react";
//import { sortArrayOfObjectsByProperty } from "../../helpers/sortArrayOfObjectsByField";
/* import { useState } from "react";
import { useSelector } from "react-redux"; */
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import SouthIcon from "@mui/icons-material/South";
// import NorthIcon from "@mui/icons-material/North";

export const GuardsAndCoursesStatistics = () => {
  const {
    guardsAndFlcsStatisticsSortedByShortName,
    //guardsAndFlcsStatisticsSortedByTotalGuards,
    //guardsAndFlcsStatisticsSortedByTotalFlcs,
  } = useStatisticsData();

  //const [sortedGuardsAndFlcsStatistics, setSortedGuardsAndFlcsStatistics] =    useState([...guardsAndFlcsStatisticsSortedByShortName]);

  // const sortedGuardsAndFlcsStatistics = sortArrayOfObjectsByProperty();
  /* console.log(guardDays, showedMonth);

  const [data, setData] = useState(datos);
  const [flecha1, setFlecha1] = useState(false);
  const [flecha3, setFlecha3] = useState(false);
  const [flecha2, setFlecha2] = useState(false);
 */
  const handleClickTechnician = () => {
    //console.log("aquí ordena los nombres de los técnicos");
    //console.log("resultado final: ", guardsAndFlcsStatistics);
    // setFlecha1((prevValue) => !prevValue);
    //setData((prevValue) => data.sort((tecnico)=>tecnico.name>prevValue.name));
    //sortArrayOfObjectsByProperty(guardsAndFlcsStatistics, "shortName");
    //setSortedGuardsAndFlcsStatistics([      ...guardsAndFlcsStatisticsSortedByShortName,    ]);
  };
  const handleClickGuards = () => {
    //console.log("aquí ordena por el número de guardias");
    //setFlecha2((prevValue) => !prevValue);
    //setSortedGuardsAndFlcsStatistics([      ...guardsAndFlcsStatisticsSortedByTotalGuards,    ]);
  };
  const handleClickFlcs = () => {
    //console.log("aquí ordena por el número de formaciones de la FLC");
    //setFlecha3((prevValue) => !prevValue);
    //setSortedGuardsAndFlcsStatistics([      ...guardsAndFlcsStatisticsSortedByTotalFlcs,    ]);
  };

  return (
    <Grid
      container
      direction="column"
      sx={{
        border: "1px solid lightgrey",
        //width: { xs: "100%", md: 210 },
        width: "100%",
        height: "auto",
        //bgcolor: "red",
        borderRadius: 2,
        //color: 'black',
        p: 0.5,
      }}
      alignItems="center"
      //justifyContent="flex-start"
    >
      <Grid
        item
        sx={{
          width: "100%",
          // border: "1px solid black",
          borderRadius: 2,
          p: 0.4,
          //mb: 0.5,
          //bgcolor: 'red',
        }}
      >
        <Grid container columns={14} direction="row">
          <Grid
            item
            //sx={{ border: 1 }}
            xs={5}
            md={5}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              //justifyContent="center"
              sx={{ pl: 0.5 }}
            >
              <Grid item>
                <Typography
                  onClick={handleClickTechnician}
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                >
                  Técnico
                </Typography>
              </Grid>
              {/*  <Grid item>
                <IconButton size="small" onClick={handleClickFlecha1}>
                  {flecha1 ? (
                    <NorthIcon fontSize="inherit" />
                  ) : (
                    <SouthIcon fontSize="inherit" />
                  )}
                </IconButton>
              </Grid> */}
            </Grid>
          </Grid>

          <Grid
            item
            // sx={{ border: 1 }}
            xs={5}
            md={5}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              //justifyContent="center"
              sx={{ px: 0.5 }}
            >
              <Grid item>
                <Typography
                  onClick={handleClickGuards}
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                >
                  Guardias
                </Typography>
              </Grid>
              {/* <Grid item>
                <IconButton size="small" onClick={handleClickFlecha2}>
                  {flecha2 ? (
                    <NorthIcon fontSize="inherit" />
                  ) : (
                    <SouthIcon fontSize="inherit" />
                  )}
                </IconButton>
              </Grid> */}
            </Grid>
          </Grid>

          <Grid
            item
            //sx={{ border: 1 }}
            //xs={4} md={4}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              //justifyContent="center"
              sx={{ px: 0.5 }}
            >
              <Grid item>
                <Typography
                  onClick={handleClickFlcs}
                  sx={{ fontSize: 14, fontWeight: "bold" }}
                >
                  Cursos
                </Typography>
              </Grid>
              {/*  <Grid item>
                <IconButton size="small" onClick={handleClickFlecha3}>
                  {flecha3 ? (
                    <NorthIcon fontSize="inherit" />
                  ) : (
                    <SouthIcon fontSize="inherit" />
                  )}
                </IconButton>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider
        sx={{
          width: "100%",
          background: "lightgrey",
          //border: 2,
        }}
      />

      <Grid
        item
        sx={{
          width: "100%",
          //border: "1px solid black",
          //borderRadius: 2,
          p: 1,
        }}
      >
        {/* {data.map((technician) => ( */}
        {/* {sortedGuardsAndFlcsStatistics?.map((technician) => ( */}
        {guardsAndFlcsStatisticsSortedByShortName.map((technician) => (
          <Grid
            container
            key={technician.technicianId}
            direction="row"
            columns={14}
            //sx={{ ml: 1 }}
          >
            <Grid item xs={5} md={5}>
              <Typography
                sx={{ fontSize: 14, fontWeight: "bold", color: "blue" }}
              >
                {/* {technicianShortNameById(technician.technicianId)} */}
                {technician.shortName}
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography sx={{ ml: 3.5, fontSize: 14 }}>
                {technician.totalGuards}
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}>
              <Typography sx={{ ml: { md: 5, xs: 6.5 }, fontSize: 14 }}>
                {technician.totalFlcs}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
