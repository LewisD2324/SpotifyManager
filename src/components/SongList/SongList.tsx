import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";

export interface SongListProps {
  tracks: any;
  addtoplaylist?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
  removefromplaylist?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 1000,
      backgroundColor: theme.palette.background.paper,
    },
    // audiocontrols: {
    //   width: "100%",
    //   maxWidth: 600,
    // },
  })
);

const SongList = (props: SongListProps) => {
  const classes = useStyles();

  const rendersongs = () => {
    return props.tracks.map((items: any) => {
      return (
        <ListItem role={undefined} dense button>
          <ListItemIcon>
            <img src={items.album.images[2].url}></img>
          </ListItemIcon>
          <ListItemText
            primary={items.name}
            secondary={items.artists[0].name}
          />
          <audio id="audioPlayer" controls>
            <source src={items.preview_url} type="audio/mpeg" />
            Your browser does not support HTML5 Audio
          </audio>
          {/* TODO use material ui play controls */}
          <ListItemSecondaryAction>
            <button onClick={props.addtoplaylist} id={items.uri}>
              Add
            </button>

            {/* <Icon
              color="secondary"
              onClick={props.addtoplaylist}
              id={items.uri}
            ></Icon> */}
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  return <List className={classes.root}>{rendersongs()}</List>;
};

export default SongList;
