/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Stack } from "@mui/material";
import { HeaderItem } from "./HeaderItem";
import UserItem from "./UserItem";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";
import { useEffect } from "react";

export default function UsersBox() {
  const { appUsers, startLoadingAppUsers } = useAppUsersStore();

  useEffect(() => {
    if (appUsers.length === 0) startLoadingAppUsers();
    //siempre habrá un usuario como mínimo cuando entre a la app (en el caso de que los borrara todos)
  }, []);

  return (
    <div>
      {/*  <Card
        sx={{
          //  height: 600,
          maxWidth: 900,
          // bgcolor: 'red'
        }}
      > */}
      <HeaderItem />
      {/* <Divider
        // sx={{ display: 'none' }}
        /> */}

      <Grid>
        <Stack>
          {appUsers.map((appUser) => (
            <UserItem key={appUser.id} appUser={appUser} />
          ))}
        </Stack>
      </Grid>

      {/* <Card
        sx={{
          height: 600,
          maxWidth: 800,
          // bgcolor: 'blue', 
           b: 0,
          m: 0,
          p: 0,
        }}
      >
        {appUsers.map((appUser) => (
          <UserItem key={appUser.id} appUser={appUser} />
        ))}
      </Card> */}
      {/*   </Card> */}
    </div>
  );
}
