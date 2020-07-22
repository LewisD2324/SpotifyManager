import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Paper,
  Avatar,
  Typography,
  GridListTile,
} from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },

    ErrorText: {
      color: "#f50057",
      marginBottom: 5,
      textAlign: "center",
    },
    createPlaylistTitle: {
      textAlign: "center",
    },
  })
);

interface CreatePlaylistFormProps {
  onSubmit: (playlistName: string, description: string) => void;
  //  errormessage: string;
}

const CreatePlaylistForm = ({
  onSubmit,
}: // errormessage,

CreatePlaylistFormProps) => {
  const classes = useStyles();

  //TODO - change this to be done using 1 state 1 handlechange for both textboxes
  const [playlistName, setPlaylistName] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const handlePlaylistNameChange = (event: any) => {
    const { name, value } = event.target;
    setPlaylistName(value);
  };

  const handleDescriptionChange = (event: any) => {
    const { name, value } = event.target;
    setDescription(value);
  };

  return (
    <div className={classes.root}>
      {/* <Typography component="h6" className={classes.createPlaylistTitle}>
        Create A Playlist:
      </Typography> */}
      <TextField
        id="standard-basic"
        margin="normal"
        label="Playlist Name"
        name="Playlist Name"
        placeholder="Name"
        required
        onChange={handlePlaylistNameChange}
      />
      <TextField
        id="standard-basic"
        margin="normal"
        name="Description"
        label="Description"
        placeholder="Description"
        required
        onChange={handleDescriptionChange}
      />

      {/* <Typography component="p" className={classes.ErrorText}>
          {errormessage}
        </Typography> */}

      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => onSubmit(playlistName, description)}
      >
        SUBMIT
      </Button>
    </div>
  );
};

export default CreatePlaylistForm;
