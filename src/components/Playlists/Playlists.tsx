import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { Paper } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      margin: "40px",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    gridListTile: {
      transition: "ease 0.4s all",
      "&:hover": {
        background: "#f00",
        cursor: "pointer",
      },
    },
    title: {
      color: theme.palette.primary.light,
      textAlign: "center",
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    playlistimage: {
      height: "180px",
      width: "180px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      // "&:hover": {
      //   height: "250px",
      //   width: "250px",
      // },
    },
  })
);

interface SongListProps {
  playlists: any[];
  onClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
}
const Playlists = (props: SongListProps) => {
  const classes = useStyles();
  const renderplaylists = () => {
    return props.playlists.map((items) => {
      let image: string = "";
      if (items.images.length < 3) {
        image = "No image";
      } else {
        image = items.images[0].url;
      }
      return (
        <GridListTile
          onClick={props.onClick}
          id={items.id}
          className={classes.gridListTile}
          key={items.id}
        >
          <img
            src={items.images[0].url}
            alt={items.name}
            className={classes.playlistimage}
          />
          <GridListTileBar
            title={items.name}
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            // actionIcon={
            //   <IconButton aria-label={`star ${tile.title}`}>
            //   </IconButton>
            // }
          />
        </GridListTile>
      );
    });
  };

  return (
    <Paper className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {renderplaylists()}
      </GridList>
    </Paper>
  );
};

export default Playlists;
