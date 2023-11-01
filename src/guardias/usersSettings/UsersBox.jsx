/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Stack } from "@mui/material";
import { HeaderItem } from "./HeaderItem";
import UserItem from "./UserItem";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";
import { useEffect } from "react";
import { useCalendarStore } from "../../hooks";

export default function UsersBox() {
  const { appUsers, startLoadingAppUsers } = useAppUsersStore();
  const { guardDays, startLoadingGuardDays } = useCalendarStore();

  useEffect(() => {
    if (appUsers.length === 0) startLoadingAppUsers();
    if (guardDays.length === 0) startLoadingGuardDays();
  }, []);

  return (
    <div>
      <HeaderItem />

      <Grid>
        <Stack>
          {appUsers.map((appUser) => (
            <UserItem key={appUser.id} appUser={appUser} />
          ))}
        </Stack>
      </Grid>
    </div>
  );
}
