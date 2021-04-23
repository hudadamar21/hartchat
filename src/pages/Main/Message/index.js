import { useRecoilState } from "recoil"
import { selectedUserState } from "../../../recoil"
import { gql, useSubscription } from "@apollo/client"

import MessageBubble from "../../../components/MessageBubble"
import { useAuth0 } from "@auth0/auth0-react"

const GET_MESSAGE = gql`
  subscription MyQuery($where: messages_bool_exp = {}) {
    messages(where: $where, order_by: { createdAt: asc }) {
      id
      fromUserId
      message
      fromUser {
        name
        picture
      }
      createdAt
    }
  }
`

const Message = () => {
  const [selectedUser] = useRecoilState(selectedUserState)
  const { user } = useAuth0()

  
  let params = { where: {} };
  if (selectedUser && !selectedUser.id) {
    params.where = {
      toUserId: {
        _is_null: true,
      },
    };
  } else if (selectedUser && selectedUser.id) {
    params.where = {
      _or: [
        {
          fromUserId: {
            _eq: user.sub,
          },
          toUserId: {
            _eq: selectedUser.id,
          },
        },
        {
          fromUserId: {
            _eq: selectedUser.id,
          },
          toUserId: {
            _eq: user.sub,
          },
        },
      ],
    };
  }
  const {data} = useSubscription(GET_MESSAGE, { variables: params })

  setTimeout(() => {
    const cb = document.querySelector('#chat-content').parentElement;
    if(cb){
      cb.scrollTop = cb.scrollHeight
    }
  }, 200);

  return (
    <div id="chat-content">
      {
        data?.messages.map((message, index) => {
          return (
            <MessageBubble
              key={index}
              message={message} 
              isMe={user.sub === message.fromUserId}>              
            </MessageBubble>
          ) 
        })  
      }
    </div>
  )
}

export default Message