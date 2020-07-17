import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Paper,
  Avatar,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Paper: {
      marginTop: 100,
      padding: 20,
      flexDirection: "column",
      alignItems: "center",
    },

    ErrorText: {
      color: "#f50057",
      marginBottom: 5,
      textAlign: "center",
    },
  })
);

interface CreatePlaylistFormProps {
  onSubmit: (playlistName: string, description: string) => void;
  //  errormessage: string;
}

const CreatePlaylistForm = ({
  // errormessage,
  onSubmit,
}: CreatePlaylistFormProps) => {
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
    <Container component="main" maxWidth="xs">
      <Paper className={classes.Paper}>
        <Typography component="h1" variant="h5">
          Create A Playlist:
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="PlaylistName"
          label="Playlist Name"
          name="Playlist Name"
          placeholder="Name"
          onChange={handlePlaylistNameChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="Description"
          label="Description"
          id="Description"
          placeholder="Description"
          onChange={handleDescriptionChange}
        />

        {/* <Typography component="p" className={classes.ErrorText}>
          {errormessage}
        </Typography> */}

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => onSubmit(playlistName, description)}
        >
          SUBMIT
        </Button>
      </Paper>
    </Container>
  );
};

export default CreatePlaylistForm;
