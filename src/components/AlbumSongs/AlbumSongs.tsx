import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  ListItem,
  ListItemSecondaryAction,
  ListItemIcon,
  ListItemText,
  List,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";

export interface AlbumSongsProps {
  tracks: any;
  albums: any;
  addtoplaylist?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
  searchalbumtracks: any;
}

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
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

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    // minHeight: 56,
    // "&$expanded": {
    //   minHeight: 56,
    // },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    flexDirection: "column",
  },
}))(MuiExpansionPanelDetails);

const AlbumSongs = (props: AlbumSongsProps) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (albumid: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    props.searchalbumtracks(albumid);

    setExpanded(newExpanded ? albumid : false);
  };

  const rendersongs = () => {
    return props.tracks.map((items: any) => {
      return (
        <List className={classes.list}>
          <ListItem role={undefined} dense button>
            {/* <ListItemIcon>
              <img src={items.album.images[2].url}></img>
            </ListItemIcon> */}
            <ListItemText
              primary={items.name}
              secondary={items.artists[0].name}
            />
            <audio id="audioPlayer" controls>
              <source src={items.preview_url} type="audio/mpeg" />
              Your browser does not support HTML5 Audio
            </audio>
            <ListItemSecondaryAction>
              <button onClick={props.addtoplaylist} id={items.uri}>
                Add
              </button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      );
    });
  };

  const renderalbums = () => {
    return props.albums.map((items: any) => {
      return (
        <ExpansionPanel
          square
          expanded={expanded === `${items.id}`}
          onChange={handleChange(`${items.id}`)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <img src={items.images[2].url}></img>

            <Typography>{items.name}</Typography>
            <Typography>{items.artists[0].name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{rendersongs()}</ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  };

  return <div>{renderalbums()}</div>;
};

export default AlbumSongs;
