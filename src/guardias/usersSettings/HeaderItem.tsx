import { Grid, Tooltip, Typography } from "@mui/material";

export const HeaderItem = (): JSX.Element => {
  return (
    <Grid
      container
      direction="column"
      sx={{ width: "940px", display: { xs: "none", md: "block" } }}
    >
      <Grid item>
        <Grid
          container
          columns={14}
          direction="row"
          sx={{
            borderRadius: 2,
            bgcolor: "lightgrey",
          }}
        >
          <Grid item xs={8} md={4}>
            <Tooltip title="Nombre completo del usuario" arrow>
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Nombre completo
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={1.7}>
            <Tooltip title="Nombre corto (máximo 8 caracteres)" arrow>
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Nombre corto
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={0.5}>
            <Tooltip title="email de acceso" arrow>
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                @
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={0.8}>
            <Tooltip title="Si es el administrador" arrow>
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Admin
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={1}>
            <Tooltip title="Si el usuario está activado" arrow>
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Activado
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={1}>
            <Tooltip title="Si el usuario puede modificar datos" arrow>
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Cambios
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={0.9}>
            <Tooltip title="Si el usuario es un técnico" arrow>
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                Técnico
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={0.9}>
            <Tooltip title="Si es un formador externo" arrow>
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
              arrow
            >
              <Typography
                sx={{ fontWeight: "bold", ml: 1.5, fontSize: "14px", py: 1 }}
              >
                FLC
              </Typography>
            </Tooltip>
          </Grid>

          <Grid item xs={8} md={1.3}>
            <Tooltip title="Si el usuario puede ver las estadísticas" arrow>
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
            <Tooltip title="Si el usuario está de alta en MPE" arrow>
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
    </Grid>
  );
};
