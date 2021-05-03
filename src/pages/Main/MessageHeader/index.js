import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { ExitToApp } from "@material-ui/icons";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../../recoil";

const MessageHeader = () => {
  const [selectedUser] = useRecoilState(selectedUserState)
  const { logout } = useAuth0()

  const exitApp = () => {
    if(window.confirm('apakah anda yakin ingin logout?')) {
      logout({
        returnTo: process.env.REACT_APP_BASE_URL
      })
    }
  }
  return (
    <Typography variant="h6" noWrap style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%'
    }}>
      {selectedUser?.name}
        <Button style={{
          cursor: 'pointer',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
        }} color="inherit" onClick={exitApp} >
          <ExitToApp />
          <p style={{margin: '0',padding: '0 5px', fontSize: '0.9rem'}}>Logout</p>
        </Button>
    </Typography>
  )
}

export default MessageHeader