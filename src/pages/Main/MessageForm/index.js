import { makeStyles } from "@material-ui/core/styles";
import { IconButton, TextField } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../../recoil";

const INSERT_MESSAGE = gql`
  mutation MyMutation(
    $toUserId: String = ""
    $message: String = "", 
    $fromUserId: String = "", 
  ) {
    insert_messages_one(
      object: {
        fromUserId: $fromUserId, 
        toUserId: $toUserId
        message: $message, 
      }
    ) {
      id
    }
  }
`

const useStyles = makeStyles(() => ({
  messageForm: {
    display: 'flex',
    alignItems: 'center',
    background: 'white  ',
    justifyContent: 'end',
    padding: '8px 15px'
  },
}));

const MessageForm = () => {
  const classes = useStyles();
  const {user} = useAuth0()
  const [message, setMessage] = useState('')
  const [selectedUser] = useRecoilState(selectedUserState)
  const [isError, setIsError] = useState(false) 
  const [insertMessage] = useMutation(INSERT_MESSAGE, {
    variables: {
      toUserId: selectedUser?.id,
      message,
      fromUserId: user?.sub 
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if(message){
      insertMessage()
      setMessage('')
    } else {
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
      }, 1000);
    }
  }

  return (
    <form className={classes.messageForm} noValidate autoComplete="off" onSubmit={handleSubmit}>  
      <TextField
        id="input-message"
        placeholder={isError ? 'message is required' : 'type your message...'}
        fullWidth={true}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          '::placeholder': {
            color: '#ff4137'
          }
        }}
      />
      <IconButton style={{cursor: 'pointer', color: '#3C99DC'}} onClick={handleSubmit} >
        <SendIcon color="inherit" />
      </IconButton>
    </form>
  )
}

export default MessageForm