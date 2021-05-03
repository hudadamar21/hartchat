
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Contact from "./Contact";
import Message from "./Message"

import MessageHeader from "./MessageHeader"
import MessageForm from "./MessageForm";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "calc(100% - 40px)",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: "#3C99DC",
    color: "white",
    boxShadow: "unset",
    borderBottom: "1px solid rgba(0,0,0,.12)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    position: 'relative',
    width: '100%',
    display: "flex",
    flexDirection: 'column',
    height: "100vh",
    background: '#E5F3FE',
  },
  chatFooter: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    background: "white",
  },
  chatContent: {
    width: "100%",
    height: '100%',
    paddingLeft: theme.spacing(6),
    overflowY: "scroll",
    overflowX: 'hidden',
  }
}));

const Main = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div >
      <div className={classes.toolbar} style={{
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.8rem',
        color: '#3C99DC',
        paddingLeft: '1.5rem',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        letterSpacing: '2px'
      }}>
        HartChat
      </div>
      <Contact/>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <MessageHeader />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div className={classes.chatContent}>
          <Message></Message>
        </div>
          
        <div className={classes.toolbar} />
        <div className={classes.chatFooter}>
          <MessageForm></MessageForm>
        </div>
      </main>
    </div>
  );
};

export default Main;
