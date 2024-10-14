/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Stack } from "@mui/material";
import { HeaderItem } from "./HeaderItem";
import UserItem from "./UserItem";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";
import { useEffect } from "react";
import { useCalendarStore } from "../../hooks";
import { User } from "../../interfaces";

export default function UsersBox(): JSX.Element {
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
          {appUsers.map((appUser: User) => (
            <UserItem key={appUser.id} appUser={appUser} />
          ))}
        </Stack>
      </Grid>
    </div>
  );
}
