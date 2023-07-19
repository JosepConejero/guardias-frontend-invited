/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";
import { useEffect, useState } from "react";
import { useUiStore } from "../../hooks/useUiStore";

export default function UserItem({ appUser }) {
  const { openAppUserModal } = useUiStore();
  const { startDeletingAppUser, startSavingAppUser, setActiveAppUser } =
    useAppUsersStore();
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [isActivatedChecked, setIsActivatedChecked] = useState(false);
  const [isDataModifierChecked, setIsDataModifierChecked] = useState(false);
  const [isTechnicianChecked, setIsTechnicianChecked] = useState(false);
  const [isExternalChecked, setIsExternalChecked] = useState(false);
  const [canFLCChecked, setCanFLCChecked] = useState(false);
  const [canSeeStatisticsChecked, setCanSeeStatisticsChecked] = useState(false);
  const [isStillWorkingChecked, setIsStillWorkingChecked] = useState(false);

  const handleInputChange = () => {
    setActiveAppUser(appUser);
    openAppUserModal();
  };

  const handleIsAdminChange = async (event) => {
    setIsAdminChecked(event.target.checked);
    await startSavingAppUser({
      ...appUser,
      [event.target.name]: event.target.checked,
      /* shortName: "prueba", */
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
  };

  const onDeleteItem = () => {
    startDeletingAppUser(appUser);
  };

  useEffect(() => {
    setIsAdminChecked(appUser.isAdmin);
    setIsActivatedChecked(appUser.isActivated);
    setIsDataModifierChecked(appUser.isDataModifier);
    setIsTechnicianChecked(appUser.isTechnician);
    setIsExternalChecked(appUser.isExternal);
    setCanFLCChecked(appUser.canFLC);
    setCanSeeStatisticsChecked(appUser.canSeeStatistics);
    setIsStillWorkingChecked(appUser.isStillWorking);
  }, []);

  return (
    <Grid
      container
      columns={13}
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
          onDoubleClick={handleInputChange}
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
          onDoubleClick={handleInputChange}
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
        {/* <Checkbox size="small" checked={appUser.isAdmin ? true : false} /> */}
        <Checkbox
          size="small"
          checked={isAdminChecked}
          onChange={handleIsAdminChange}
          name="isAdmin"
        />
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
        <Checkbox
          size="small"
          checked={isActivatedChecked}
          onChange={handleIsActivatedChange}
          name="isActivated"
        />
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
          checked={isDataModifierChecked}
          onChange={handleIsDataModifierChange}
          name="isDataModifier"
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
        <Checkbox
          size="small"
          checked={isTechnicianChecked}
          onChange={handleIsTechnicianChange}
          name="isTechnician"
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
        <Checkbox
          size="small"
          checked={isExternalChecked}
          onChange={handleIsExternalChange}
          name="isExternal"
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
        <Checkbox
          size="small"
          checked={canFLCChecked}
          onChange={handleCanFLCChange}
          name="canFLC"
        />
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
          checked={canSeeStatisticsChecked}
          onChange={handleCanSeeStatisticsChange}
          name="canSeeStatistics"
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
          checked={isStillWorkingChecked}
          onChange={handleIsStillWorkingChange}
          name="isStillWorking"
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
        <IconButton
          sx={{
            color: "red",
            display: appUser.shortName === "JOSEP" ? "none" : "",
          }}
          onClick={onDeleteItem}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
