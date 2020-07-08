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
import { Box, Divider } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

interface SongListProps {
  tracks: any;
  addtoplaylist?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
  removefromplaylist?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

///https://codesandbox.io/s/material-demo-g0xo5?file=/demo.js:1007-1062

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 1000,
      backgroundColor: theme.palette.background.paper,
    },
    paginator: {
      justifyContent: "center",
      padding: "10px",
    },
    // audiocontrols: {
    //   width: "100%",
    //   maxWidth: 600,
    // },
  })
);

const PlaylistSongs = (props: SongListProps) => {
  const classes = useStyles();
  const itemsPerPage = 30;
  const [page, setPage] = React.useState(1);

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const rendersongs = () => {
    return props.tracks
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map((items: any) => {
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
            <ListItemSecondaryAction>
              <button onClick={props.removefromplaylist} id={items.uri}>
                Remove
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

  return (
    <div>
      <List className={classes.root}>{rendersongs()}</List>
      {/* <Divider /> */}
      <Box component="span">
        <Pagination
          count={Math.ceil(props.tracks.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
      </Box>
    </div>
  );
};

export default PlaylistSongs;
