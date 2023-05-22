import { Checkbox, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserItem({ appUser }) {
  const onDeleteItem = () => {
    console.log("borra un usuario");
  };

  return (
    <Grid
      container
      sx={{
        /* display: 'flex', */
        my: 0,
        /*        bgcolor: 'grey',
        border: '1px solid black', */
        /* display: 'none', */
        /* justifyContent: 'flex-start', */
      }}
    >
      <Grid
        item
        md={3}
        xs={12}
        sx={{
          /* bgcolor: 'black',
          border: '1px solid black', */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Typography
          sx={{
            /* fontWeight: 'bold', */
            /* border: '1px solid black',
            bgcolor: 'blue', */
            textAlign: "center",
            alignSelf: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {appUser.name}
        </Typography>
      </Grid>

      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*    bgcolor: 'green',
          border: '1px solid black', */
          textAlign: "center",
          alignSelf: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        <Typography
          sx={
            {
              /* fontWeight: 'bold' */
            }
          }
        >
          {appUser.shortName}
        </Typography>
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*    bgcolor: 'yellow',
          border: '1px solid black', */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Checkbox size="small" checked={appUser.isAdmin ? true : false} />
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*      bgcolor: 'yellow',
          border: '1px solid black', */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Checkbox size="small" checked={appUser.isActivated ? true : false} />
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
        <Checkbox
          size="small"
          checked={appUser.isDataModifier ? true : false}
        />
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*     bgcolor: "yellow",
          border: "1px solid black", */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Checkbox size="small" checked={appUser.isTechnician ? true : false} />
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*     bgcolor: "yellow",
          border: "1px solid black", */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Checkbox size="small" checked={appUser.canFLC ? true : false} />
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*       bgcolor: "yellow",
          border: "1px solid black", */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Checkbox
          size="small"
          checked={appUser.canSeeStatistics ? true : false}
        />
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*    bgcolor: "yellow",
          border: "1px solid black", */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <Checkbox
          size="small"
          checked={appUser.isStillWorking ? true : false}
        />
      </Grid>
      <Grid
        item
        md={1}
        xs={12}
        sx={{
          /*    bgcolor: "yellow",
          border: "1px solid black", */
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        <IconButton onClick={onDeleteItem}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
