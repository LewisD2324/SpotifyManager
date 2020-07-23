import React, { useState, useRef } from "react";
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
import { Box, Divider, Paper } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import AudioControl from "../AudioControl/AudioControl";
import { get_playlist_tracks } from "../../actions/spotifyactions";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { FixedSizeList } from "react-window";
import AddCircleIcon from "@material-ui/icons/AddCircle";

interface SongListProps {
  tracks: any;
  addtoplaylist?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
  removefromplaylist?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
  showPlaylistTrackControls: boolean;
  album_image?: any;
}

///https://codesandbox.io/s/material-demo-g0xo5?file=/demo.js:1007-1062

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: "100%",
      // maxWidth: 1000,
      // backgroundColor: theme.palette.background.paper,
      marginRight: "180px",
    },
    // audiocontrols: {
    //   width: "100%",
    //   maxWidth: 600,
    // },
  })
);

const PlaylistSongs = (props: SongListProps) => {
  const classes = useStyles();

  const Row = ({ index, style }: any) => {
    // let image: string = "";
    // if (props.tracks[index].images.length < 1) {
    //   let  image = "No image";
    // } else {
    //  let image = props.tracks[index].images[0].url;
    // }
    return (
      <div style={style}>
        <ListItem role={undefined} dense button key={props.tracks[index].id}>
          {props.album_image ? (
            <ListItemIcon>
              <img src={props.album_image.images[2].url}></img>
            </ListItemIcon>
          ) : (
            <ListItemIcon>
              <img src={props.tracks[index].album.images[2].url}></img>
            </ListItemIcon>
          )}
          <ListItemText
            primary={props.tracks[index].name}
            secondary={props.tracks[index].artists[0].name}
          />
          <AudioControl
            preview_url={props.tracks[index].preview_url}
            id={props.tracks[index].id}
          />
          {/* <ListItemSecondaryAction> */}
          {props.showPlaylistTrackControls ? (
            <div
              onClick={props.removefromplaylist}
              id={props.tracks[index].uri}
            >
              <RemoveCircleIcon />
            </div>
          ) : (
            <div onClick={props.addtoplaylist} id={props.tracks[index].uri}>
              <AddCircleIcon />
            </div>
          )}
          {/* </ListItemSecondaryAction> */}
        </ListItem>
      </div>
    );
  };

  return (
    <div>
      <FixedSizeList
        className={classes.root}
        height={500}
        width={500}
        itemSize={80}
        itemCount={props.tracks.length}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default PlaylistSongs;
