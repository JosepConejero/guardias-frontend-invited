/* eslint-disable react-hooks/exhaustive-deps */
import {
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";
import { useState } from "react";
import { useUiStore } from "../../hooks/useUiStore";
import { useAuthStore, useCalendarStore } from "../../hooks";
import { Confirmation } from "../../ui/pages/Confirmation";
import Swal from "sweetalert2";

export default function UserItem({ appUser }) {
  const [open, setOpen] = useState(false);
  const { openAppUserModal } = useUiStore();
  const { startDeletingAppUser, setActiveAppUser } = useAppUsersStore();
  const { user } = useAuthStore();
  const { guardDays } = useCalendarStore();

  const handleAppUserChange = () => {
    if (user.isDataModifier) {
      setActiveAppUser(appUser);
      openAppUserModal();
    }
  };

  const isThisAppUserBeingUsed = (id) => {
    let found = false;
    for (let i = 0; i < guardDays.length; i++) {
      if (guardDays[i].technicians.length > 0) {
        for (let j = 0; j < guardDays[i].technicians.length; j++) {
          if (guardDays[i].technicians[j].technicianId === id) {
            found = true;
            break;
          }
        }
      }
    }
    return found;
  };

  const onDeleteItem = () => {
    if (!isThisAppUserBeingUsed(appUser.id)) {
      startDeletingAppUser(appUser);
    } else {
      Swal.fire({
        title: "No se puede borrar el usuario.",
        text: "El usuario ya ha hecho alguna guardia.",
        icon: "error",
      });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (answer) => {
    if (answer) onDeleteItem();
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <Grid item xs={12} sx={{ mr: -0.5, mb: -0.5 }}>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="center"
            direction="row"
            columns={14}
            sx={{
              color: "primary.main",
              my: { xs: 0.7, md: 0 },
            }}
          >
            <Grid item xs={14} md={4} onClick={handleAppUserChange}>
              <Typography
                sx={{
                  display: { md: "none" },
                  fontSize: "14px",
                }}
              >
                Nombre completo:
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  ml: { xs: 0, md: 1.2 },
                  mb: { xs: 1, md: 0 },
                  fontSize: "14px",
                  overflow: { md: "hidden" },
                  whiteSpace: { md: "nowrap" },
                  textOverflow: { md: "ellipsis" },
                }}
              >
                {appUser.name}
              </Typography>
            </Grid>

            <Grid item xs={14} md={1.9} mb={0.5} onClick={handleAppUserChange}>
              <Typography
                sx={{
                  display: { md: "none" },
                  fontSize: "14px",
                }}
              >
                Nombre corto:
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  ml: { xs: 0, md: 1.2 },
                  fontSize: "14px",
                  overflow: { md: "hidden" },
                  whiteSpace: { md: "nowrap" },
                  textOverflow: { md: "ellipsis" },
                }}
              >
                {appUser.shortName}
              </Typography>
            </Grid>

            <Grid item xs={14} md={0.5} mb={0.5} onClick={handleAppUserChange}>
              <Typography
                sx={{
                  display: { md: "none" },
                  fontSize: "14px",
                }}
              >
                Email:
              </Typography>
              <Tooltip title={appUser.email} arrow>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    ml: { xs: 0, md: -0.5 },
                    fontSize: "14px",
                    overflow: { md: "hidden" },
                    whiteSpace: { md: "nowrap" },
                    textOverflow: { md: "ellipsis" },
                    display: { xs: "none", md: "block" },
                  }}
                >
                  @
                </Typography>
              </Tooltip>
              <Typography
                sx={{
                  fontWeight: "bold",
                  ml: { xs: 0, md: 1.2 },
                  fontSize: "14px",
                  overflow: { md: "hidden" },
                  whiteSpace: { md: "nowrap" },
                  textOverflow: { md: "ellipsis" },
                  display: { md: "none" },
                }}
              >
                {appUser.email}
              </Typography>
            </Grid>

            <Grid
              item
              xs="auto"
              md={0.9}
              onClick={handleAppUserChange}
              textAlign="center"
              sx={{ mr: { xs: 2, md: 0 } }}
            >
              <Grid container alignItems="center" direction="row">
                <Typography sx={{ display: { md: "none" }, fontSize: "14px" }}>
                  Admin:
                </Typography>
                <Checkbox checked={appUser.isAdmin} name="isAdmin" disabled />{" "}
              </Grid>
            </Grid>

            <Grid
              item
              xs="auto"
              md={1}
              onClick={handleAppUserChange}
              textAlign="center"
              sx={{ mr: { xs: 2, md: 0 } }}
            >
              <Grid container alignItems="center" direction="row">
                <Typography
                  sx={{
                    display: { md: "none" },
                    fontSize: "14px",
                  }}
                >
                  Activado:
                </Typography>
                <Checkbox
                  checked={appUser.isActivated}
                  name="isActivated"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs="auto"
              md={0.9}
              onClick={handleAppUserChange}
              textAlign="center"
              sx={{ mr: { xs: 2, md: 0 } }}
            >
              <Grid container alignItems="center" direction="row">
                <Typography
                  sx={{
                    display: { md: "none" },
                    fontSize: "14px",
                  }}
                >
                  Cambios:
                </Typography>
                <Checkbox
                  checked={appUser.isDataModifier}
                  name="isDataModifier"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs="auto"
              md={0.9}
              onClick={handleAppUserChange}
              textAlign="center"
              sx={{ mr: { xs: 2, md: 0 } }}
            >
              <Grid container alignItems="center" direction="row">
                <Typography
                  sx={{
                    display: { md: "none" },
                    fontSize: "14px",
                  }}
                >
                  Técnico:
                </Typography>
                <Checkbox
                  checked={appUser.isTechnician}
                  name="isTechnician"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs="auto"
              md={0.75}
              onClick={handleAppUserChange}
              textAlign="center"
              sx={{ mr: { xs: 2, md: 0 } }}
            >
              <Grid container alignItems="center" direction="row">
                <Typography
                  sx={{
                    display: { md: "none" },
                    fontSize: "14px",
                  }}
                >
                  Externo:
                </Typography>
                <Checkbox
                  checked={appUser.isExternal}
                  name="isExternal"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs="auto"
              md={0.9}
              onClick={handleAppUserChange}
              textAlign="center"
              sx={{ mr: { xs: 2, md: 0 } }}
            >
              <Grid container alignItems="center" direction="row">
                <Typography
                  sx={{
                    display: { md: "none" },
                    fontSize: "14px",
                  }}
                >
                  FLC:
                </Typography>
                <Checkbox checked={appUser.canFLC} name="canFLC" disabled />
              </Grid>
            </Grid>

            <Grid
              item
              xs="auto"
              md={1.2}
              onClick={handleAppUserChange}
              textAlign="center"
              sx={{ mr: { xs: 2, md: 0 } }}
            >
              <Grid container alignItems="center" direction="row">
                <Typography
                  sx={{
                    display: { md: "none" },
                    fontSize: "14px",
                  }}
                >
                  Estadísticas:
                </Typography>
                <Checkbox
                  checked={appUser.canSeeStatistics}
                  name="canSeeStatistics"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs="auto"
              md={0.8}
              onClick={handleAppUserChange}
              textAlign="center"
              sx={{ mr: { xs: 2, md: 0 } }}
            >
              <Grid container alignItems="center" direction="row">
                <Typography
                  sx={{
                    display: { md: "none" },
                    fontSize: "14px",
                  }}
                >
                  Contratado:
                </Typography>
                <Checkbox
                  checked={appUser.isStillWorking}
                  name="isStillWorking"
                  disabled
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs="auto"
              md={0.1}
              sx={{
                pl: { xs: 8, md: 0 },
                "& .MuiIconButton-root": {
                  pl: { xs: "2px", md: "1px" },
                  py: "8px",
                },
              }}
            >
              {!appUser.isAdmin ? (
                <IconButton
                  onClick={handleOpen}
                  sx={{
                    color: "#CF0000",
                    visibility: user.isDataModifier ? "" : "hidden",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
          <Divider
            sx={{
              mb: { xs: 1, md: 0 },
              display: { md: "none" },
              bgcolor: "lightgrey",
            }}
          />
        </Grid>
      </Grid>
      <Confirmation
        question="¿Seguro que quiere borrar este usuario?"
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}
