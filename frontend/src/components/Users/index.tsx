import ActionAreaCard from "../Card";
import * as C from "./styles";

const Users = ({ usersList }: any) => {
  return (
    <C.Row>
      {usersList
        .filter((user: any) => user.username !== "desafiosharenergy")
        .map((user: any) => (
          <C.Column key={user._id}>
            <ActionAreaCard key={user._id} user={user} />
          </C.Column>
        ))}
    </C.Row>
  );
};
export default Users;
