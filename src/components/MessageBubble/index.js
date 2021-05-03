
import { makeStyles } from "@material-ui/core";
import React from "react";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: "0 16px 4px",
    marginTop: "40px",
  },

  img: {
    position: "absolute",
    left: "-25px",
    margin: "0",
    height: "30px",
    width: "30px",
    top: "0",
    borderRadius: '50%'
  },

  bubble: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    padding: "10px",
    maxWidth: "100%",
    borderRadius: props => props.isMe ? "10px 0 10px 10px" : "0 10px 10px",
    backgroundColor: props => props.isMe ? "#3C99DC" : "white",
    color: props => props.isMe ? "#fff" : "rgba(0,0,0,.87)",
    marginLeft: props => props.isMe ? "auto" : "initial",
  },

  timestamp: {
    position: "absolute",
    fontSize: "11px",
    marginTop: "8px",
    top: "100%",
    right: props => props.isMe ? "0" : false,
    left: props => props.isMe ? false : '0',
    whiteSpace: "nowrap",
    color: "#666",
    textAlign: props => props.isMe ? "right" : "left",
  }
}));

const MessageBubble = (props) => {
  const classes = useStyles(props);
  const { isMe, message } = props;
  return (
    <div className={classes.root} >
      {!isMe &&
        <img className={classes.img} alt="" src={message.fromUser.picture} />
      }
      <div className={classes.bubble}>
        <div>
          {message.message}
        </div>
        <div className={classes.timestamp}>
          {dayjs(message.message.createdAt).format('HH:mm A | DD-MMM-YYYY')}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
