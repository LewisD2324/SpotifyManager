import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Redirect, Link } from "@reach/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    title: {
      // flexGrow: 1,
      marginLeft: "40px",
      color: "white",
    },
  })
);

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid={"nav-bar"}>
      {/* <nav> */}
      <Typography variant="h6" className={classes.title}>
        Spotify Manager
      </Typography>
      <Button color="inherit">
        <Link
          to="/Landing"
          style={{
            textDecoration: "none",
            color: "white",
            marginLeft: "1080px",
          }}
        >
          Home
        </Link>
      </Button>
      <Button color="inherit">
        <Link to="/Playlist" style={{ textDecoration: "none", color: "white" }}>
          My Playlists
        </Link>
      </Button>
      {/* </nav> */}
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Spotify Manager
          </Typography>
          <Button color="inherit">
            <Link
              to="/Landing"
              style={{ textDecoration: "none", color: "white" }}
            >
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/Playlist"
              style={{ textDecoration: "none", color: "white" }}
            >
              My Playlists
            </Link>
          </Button>
        </Toolbar>
      </AppBar> */}
    </div>
  );
};

export default NavBar;
