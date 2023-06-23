import { Grid, Typography } from "@mui/material";

export const HeaderItem = () => {
  return (
    <Grid
      container
      columns={13}
      sx={{
        /* display: 'flex', */
        my: 1,
        p: 1 / 2,
        /*       bgcolor: 'grey', */
        /* display: 'none', */
        /* justifyContent: 'flex-start', */
      }}
    >
      <Grid
        item
        md={3}
        xs={12}
        sx={{
          /*      bgcolor: 'green',
          border: '1px solid black', */
          /* flexWrap: 'nowrap', */
          textOverflow: "ellipsis",
          /* overflow: 'hidden', */
          /* textAlign: 'center', */
          /*    textAlign: 'auto', */
          /* alignSelf: 'center', */
          border: "1px black solid",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            /*    bgcolor: 'green', */
            textAlign: "center",
            alignSelf: "center",
            /* textOverflow: 'ellipsis', */
            /*     overflow: 'auto', */
            /* overflow: 'hidden', */
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            border: "1px black solid",
          }}
        >
          Nombre completo pa que veas lo guay que puede ser esto de
        </Typography>
      </Grid>

      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*           bgcolor: 'green',
          border: '1px solid black', */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>Nom cort</Typography>
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*     bgcolor: 'yellow',
          border: '1px solid black', */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>admin</Typography>
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*          bgcolor: 'yellow',
          border: '1px solid black', */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>activado</Typography>
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*  bgcolor: "yellow",
          border: "1px solid black", */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>modif dat</Typography>
      </Grid>

      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*   bgcolor: "yellow",
          border: "1px solid black", */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>técnico</Typography>
      </Grid>

      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*   bgcolor: "yellow",
          border: "1px solid black", */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>externo</Typography>
      </Grid>

      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*  bgcolor: "yellow",
          border: "1px solid black", */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>FLC</Typography>
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*  bgcolor: "yellow",
          border: "1px solid black", */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>stadíst</Typography>
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /* bgcolor: "yellow",
          border: "1px solid black", */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>contratad</Typography>
      </Grid>
    </Grid>
  );
};
