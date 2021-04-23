import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
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
    overflow: "hidden",
    margin: "20px",
    padding: "0",
  },
}));

const MessageForm = () => {
  const classes = useStyles();
  const {user} = useAuth0()
  const [message, setMessage] = useState('')
  const [selectedUser] = useRecoilState(selectedUserState)
  const [insertMessage] = useMutation(INSERT_MESSAGE, {
    variables: {
      toUserId: selectedUser?.id,
      message,
      fromUserId: user?.sub 
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    insertMessage()
    setMessage('')
  }

  return (
    <form className={classes.messageForm} noValidate autoComplete="off" onSubmit={handleSubmit}>  
      <TextField
        id="input-message"
        variant="outlined"
        placeholder="type your message..."
        fullWidth={true}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ background: "#fff" }}
      />
    </form>
  )
}

export default MessageForm