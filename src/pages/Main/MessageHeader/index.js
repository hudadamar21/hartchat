import { useAuth0 } from "@auth0/auth0-react";
import Typography from "@material-ui/core/Typography";
import { ExitToApp } from "@material-ui/icons";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../../recoil";

const MessageHeader = () => {
  const [selectedUser] = useRecoilState(selectedUserState)
  const { logout } = useAuth0()
  return (
    <Typography variant="h6" noWrap style={{width: '100%'}}>
      {selectedUser?.name}
      <ExitToApp style={{float: 'right'}} onClick={() => logout({
        returnTo: process.env.REACT_APP_BASE_URL
      })} />
    </Typography>
  )
}

export default MessageHeader