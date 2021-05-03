
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../recoil";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '12px 15px'
  },
  img: {
    height: "40px",
    marginRight: theme.spacing(2),
    borderRadius: '50%'
  }
}));

const ContactList = (props) => {
  const classes = useStyles(props);
  const { user } = props;
  const [selectedUser] = useRecoilState(selectedUserState)

  return (
    <ListItem selected={user.id === selectedUser?.id} button key={user.id} className={classes.root}>
      <img alt="" src={user.picture} className={classes.img}></img>
      <ListItemText primary={user.name} />
    </ListItem>
  );
};

export default ContactList;
