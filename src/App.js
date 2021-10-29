import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter, withRouter, Route, NavLink, Redirect, BrowserRouter } from "react-router-dom";
import { connect, Provider } from "react-redux";
import store from "./Redux/store";
import { compose } from "redux";
import HeaderContainer from "./Components/Header/HeaderContainer";
import { initializeApp } from "./Redux/apps-reducer";
import Loader from "./loader/Loader";
import clsx from "clsx";

import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SettingsIcon from "@material-ui/icons/Settings";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

import { useStyles } from "./useStyle";

const ProfileContainer = React.lazy(() =>
  import("./Components/Article/Profile/ProfileContainer")
);
const UsersContainer = React.lazy(() =>
  import("./Components/Article/Users/UsersContaier")
);
const SettingsContainer = React.lazy(() =>
  import("./Components/Article/Settings/SettingsContainer")
);
const Login = React.lazy(() => import("./Components/Article/Login/Login"));

function AppSet(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.initializeApp();
  }, []);
  if (!props.initialized) {
    return <Loader />;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const CreateNav = (props) => {
    return (
      <NavLink className="links" to={props.path}>
        <ListItem button>
          <ListItemIcon>
            <props.icon />
          </ListItemIcon>
          <ListItemText>
             {props.name}         
          </ListItemText>
        </ListItem>
      </NavLink>
    );
  };

   const  withSuspense= (Component)=>{
    return (props)=>{
      return <React.Suspense fallback={<Loader/>}>
        <Component {...props}/>
        </React.Suspense>
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <HeaderContainer />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <CreateNav icon={PermIdentityIcon} name="Profile" path="/profile" />
          <CreateNav icon={SettingsIcon} name="Settings" path="/settings" />
          <CreateNav icon={MusicNoteIcon} name="Music" path="/music" />
          <CreateNav icon={PeopleOutlineIcon} name="Users" path="/users" />
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
         
        <Route  path='/' render={() => <Redirect from="/" to="/profile" />}/>
        
            <Route
              path="/profile/:userId?"
              render={ withSuspense( ProfileContainer )}
            />
            <Route path="/users" render={withSuspense (UsersContainer )} />
            <Route
                
              path="/settings"
              render={withSuspense (SettingsContainer )}
            />
            <Route exact path="/login" render={withSuspense(Login)} />
 

      
        </Typography>
      </main>
    </div>
  );
}
const mapStateToProps = (state) => ({
  initialized: state.appReducer.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(AppSet)

const App = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};
export default App;