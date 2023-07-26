/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, Divider, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";
import { useEffect, useState } from "react";
import { useUiStore } from "../../hooks/useUiStore";
import { useAuthStore } from "../../hooks";

export default function UserItem({ appUser }) {
  const { openAppUserModal } = useUiStore();
  const { startDeletingAppUser, startSavingAppUser, setActiveAppUser } =
    useAppUsersStore();
  const { user } = useAuthStore();

  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [isActivatedChecked, setIsActivatedChecked] = useState(false);
  const [isDataModifierChecked, setIsDataModifierChecked] = useState(false);
  const [isTechnicianChecked, setIsTechnicianChecked] = useState(false);
  const [isExternalChecked, setIsExternalChecked] = useState(false);
  const [canFLCChecked, setCanFLCChecked] = useState(false);
  const [canSeeStatisticsChecked, setCanSeeStatisticsChecked] = useState(false);
  const [isStillWorkingChecked, setIsStillWorkingChecked] = useState(false);

  const handleAppUserChange = () => {
    setActiveAppUser(appUser);
    openAppUserModal();
  };

  /*  const handleIsAdminChange = async (event) => {
    setIsAdminChecked(event.target.checked);
    await startSavingAppUser({
      ...appUser,
      [event.target.name]: event.target.checked,
      // shortName: "prueba", 
    });
  };

  const handleIsActivatedChange = async (event) => {
    setIsActivatedChecked(event.target.checked);
    await startSavingAppUser({
      ...appUser,
      [event.target.name]: event.target.checked,
    });
  };

  const handleIsDataModifierChange = async (event) => {
    setIsDataModifierChecked(event.target.checked);
    await startSavingAppUser({
      ...appUser,
      [event.target.name]: event.target.checked,
    });
  };

  const handleIsTechnicianChange = async (event) => {
    setIsTechnicianChecked(event.target.checked);
    await startSavingAppUser({
      ...appUser,
      [event.target.name]: event.target.checked,
    });
  };

  const handleIsExternalChange = async (event) => {
    setIsExternalChecked(event.target.checked);
    await startSavingAppUser({
      ...appUser,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCanFLCChange = async (event) => {
    setCanFLCChecked(event.target.checked);
    await startSavingAppUser({
      ...appUser,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCanSeeStatisticsChange = async (event) => {
    setCanSeeStatisticsChecked(event.target.checked);
    await startSavingAppUser({
      ...appUser,
      [event.target.name]: event.target.checked,
    });
  };

  const handleIsStillWorkingChange = async (event) => {
    setIsStillWorkingChecked(event.target.checked);
    await startSavingAppUser({
      ...appUser,
      [event.target.name]: event.target.checked,
    });
  }; */

  const onDeleteItem = () => {
    startDeletingAppUser(appUser);
  };

  useEffect(() => {
    // setIsAdminChecked(appUser.isAdmin);
    // setIsActivatedChecked(appUser.isActivated);
    // setIsDataModifierChecked(appUser.isDataModifier);
    // setIsTechnicianChecked(appUser.isTechnician);
    // setIsExternalChecked(appUser.isExternal);
    // setCanFLCChecked(appUser.canFLC);
    // setCanSeeStatisticsChecked(appUser.canSeeStatistics);
    // setIsStillWorkingChecked(appUser.isStillWorking);
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" direction="row">
      <Grid item xs={12} sx={{ mr: -0.5, mb: -0.5 }}>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          direction="row"
          columns={14}
          sx={{
            color: "primary.main",
            //border: { xs: "1px solid grey", md: 0 },
            //borderRadius: { xs: 2, md: 0 },
            my: { xs: 0.7, md: 0 },
            //pr: { xs: 1, md: 0 },
          }}
        >
          <Grid item xs={14} md={4} onClick={handleAppUserChange}>
            <Typography
              variant="span"
              component="span"
              sx={{
                //display: "inline-flex",
                display: { md: "none" },
                fontSize: "14px",
              }}
            >
              nombre completo:{/* &nbsp; */}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                ml: { xs: 1, md: 1.2 },
                fontSize: "14px",
                overflow: { md: "hidden" },
                whiteSpace: { md: "nowrap" },
                textOverflow: { md: "ellipsis" },
              }}
            >
              {/* <span className="app-users-label">Nombre completo:&nbsp;</span> */}
              {appUser.name}
            </Typography>
          </Grid>

          <Grid item xs={8} md={1.7} onClick={handleAppUserChange}>
            <Typography
              sx={{
                fontWeight: "bold",
                ml: { xs: 1, md: 1.2 },
                fontSize: "14px",
                overflow: { md: "hidden" },
                whiteSpace: { md: "nowrap" },
                textOverflow: { md: "ellipsis" },
              }}
            >
              <span className="app-users-label">Nombre corto:&nbsp;</span>
              {appUser.shortName}
            </Typography>
          </Grid>

          <Grid
            item
            xs={1.5}
            md={0.8}
            onClick={handleAppUserChange}
            sx={{
              pl: { xs: 0, md: 1.5 },
            }}
            textAlign="center"
          >
            <Checkbox checked={appUser.isAdmin} name="isAdmin" disabled />
          </Grid>

          <Grid
            item
            xs={1.5}
            md={1.2}
            onClick={handleAppUserChange}
            textAlign="center"
          >
            <Checkbox
              checked={appUser.isActivated}
              name="isActivated"
              disabled
            />
          </Grid>

          <Grid
            item
            xs={1.5}
            md={0.8}
            onClick={handleAppUserChange}
            textAlign="center"
          >
            <Checkbox
              checked={appUser.isDataModifier}
              name="isDataModifier"
              disabled
            />
          </Grid>

          <Grid
            item
            xs={1.5}
            md={1.1}
            onClick={handleAppUserChange}
            textAlign="center"
          >
            <Checkbox
              checked={appUser.isTechnician}
              name="isTechnician"
              disabled
            />
          </Grid>

          <Grid
            item
            xs={1.5}
            md={0.7}
            onClick={handleAppUserChange}
            textAlign="center"
          >
            <Checkbox checked={appUser.isExternal} name="isExternal" disabled />
          </Grid>

          <Grid
            item
            xs={1.5}
            md={0.7}
            onClick={handleAppUserChange}
            textAlign="center"
          >
            <Checkbox checked={appUser.canFLC} name="canFLC" disabled />
          </Grid>

          <Grid
            item
            xs={1.5}
            md={1.1}
            onClick={handleAppUserChange}
            textAlign="center"
          >
            <Checkbox
              checked={appUser.canSeeStatistics}
              name="canSeeStatistics"
              disabled
            />
          </Grid>

          <Grid
            item
            xs={1.5}
            md={1.4}
            onClick={handleAppUserChange}
            textAlign="center"
          >
            <Checkbox
              checked={appUser.isStillWorking}
              name="isStillWorking"
              disabled
            />
          </Grid>

          <Grid
            item
            xs={1}
            md={0.1}
            sx={{
              pl: { xs: 0, md: 0 },
              //"& .MuiGrid-root": { pl: 0 },
              "& .MuiIconButton-root": {
                pl: { xs: "2px", md: "1px" },
                py: "8px",
              },
            }}
          >
            <IconButton
              onClick={onDeleteItem}
              //sx={{ visibility: course.title === "SIN CURSO" ? "hidden" : "" }}
              disabled={user.isDataModifier ? false : true}
              sx={{
                color: "#CF0000",
                visibility: user.isDataModifier ? "" : "hidden",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider sx={{ display: { md: "none" }, bgcolor: "lightgrey" }} />
      </Grid>
    </Grid>
  );
}
