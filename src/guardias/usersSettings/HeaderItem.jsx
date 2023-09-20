import { Grid, Tooltip, Typography } from "@mui/material";

export const HeaderItem = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{ width: "930px", display: { xs: "none", md: "block" } }}
    >
      <Grid item>
        <Grid
          container
          columns={14}
          direction="row"
          sx={{
            borderRadius: 2,
            bgcolor: "lightgrey",
            // "& .MuiTypography-root": { ml: 0 },
          }}
        >
          <Grid item xs={8} md={4}>
            <Tooltip
              title="Nombre completo del usuario"
              arrow /* placement="bottom-start" */
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Nombre completo
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={1.7}>
            <Tooltip
              title="Nombre corto (máximo 8 caracteres)"
              arrow /* placement="bottom-start" */
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Nombre corto
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={1.7}>
            <Tooltip
              title="email de acceso"
              arrow /* placement="bottom-start" */
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                @
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={0.8}>
            <Tooltip
              title="Si es el administrador"
              arrow /* placement="bottom-start" */
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Admin
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={1}>
            <Tooltip
              title="Si el usuario está activado"
              arrow /* placement="bottom-start" */
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Activado
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={1}>
            <Tooltip
              title="Si el usuario puede modificar datos"
              arrow /* placement="bottom-start" */
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Cambios
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={0.9}>
            <Tooltip
              title="Si el usuario es un técnico"
              arrow /* placement="bottom-start" */
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Técnico
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={0.9}>
            <Tooltip
              title="Si es un formador externo"
              arrow /* placement="bottom-start" */
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Externo
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={0.5}>
            <Tooltip
              title="Si el usuario puede impartir cursos de la FLC"
              arrow /* placement="bottom-start" */
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                FLC
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={1.3}>
            <Tooltip
              title="Si el usuario puede ver las estadísticas"
              arrow /* placement="bottom-start" */
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  ml: 1.5,
                  fontSize: "14px",
                  py: 1,
                }}
              >
                Estadísticas
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={0.8}>
            <Tooltip
              title="Si el usuario está de alta en MPE"
              arrow /* placement="bottom-start" */
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  ml: 1.5,
                  fontSize: "14px",
                  py: 1,
                }}
              >
                Contratado
              </Typography>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid
      container
      columns={13}
      sx={{
        my: 1,
        p: 1 / 2,
      }}
    >
      <Grid
        item
        md={3}
        xs={12}
        sx={{
          // bgcolor: "green",
          // border: "1px solid black",
          // flexWrap: 'nowrap', 
          textOverflow: "ellipsis",
          // overflow: 'hidden', 
          // textAlign: 'center', 
          //    textAlign: 'auto', 
          // alignSelf: 'center', 
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            //    bgcolor: 'green', 

            // textOverflow: 'ellipsis', 
            //     overflow: 'auto', 
            // overflow: 'hidden', 
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            // border: "1px black solid",
          }}
        >
          Nombre completo del técnico
        </Typography>
      </Grid>

      <Grid
        item
        md={1}
        xs={12}
        sx={{
          //           bgcolor: 'green',
          //border: '1px solid black', 
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
          //     bgcolor: 'yellow',
          //border: '1px solid black', 
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
          //          bgcolor: 'yellow',
          //border: '1px solid black', 
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
          //  bgcolor: "yellow",
          //border: "1px solid black", 
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
          //   bgcolor: "yellow",
          //border: "1px solid black", 
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
          //   bgcolor: "yellow",
          //border: "1px solid black", 
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
          //  bgcolor: "yellow",
          //border: "1px solid black", 
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>FLC</Typography> <------------------------------------------------------
      </Grid>

      <Grid
        item
        md={1}
        xs={12}
        sx={{
          //  bgcolor: "yellow",
          //border: "1px solid black", 
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
          // bgcolor: "yellow",
          //border: "1px solid black", 
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>contratad</Typography>
      </Grid>
    </Grid> */}
    </Grid>
  );
};
