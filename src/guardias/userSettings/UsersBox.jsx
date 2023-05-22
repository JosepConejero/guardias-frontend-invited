import { Card, Divider } from "@mui/material";
import { HeaderItem } from "./HeaderItem";
import UserItem from "./UserItem";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";

export default function UsersBox() {
  const { appUsers } = useAppUsersStore();
  return (
    <div>
      <Card sx={{ height: 600, maxWidth: 900 /* bgcolor: 'red'  */ }}>
        <HeaderItem />
        <Divider /* sx={{ display: 'none' }} */ />
        <Card
          sx={{
            height: 600,
            maxWidth: 900,
            /* bgcolor: 'blue', */ b: 0,
            m: 0,
            p: 0,
          }}
        >
          {appUsers.map((appUser) => (
            <UserItem key={appUser.id} appUser={appUser} />
          ))}
        </Card>
      </Card>
    </div>
  );
}
