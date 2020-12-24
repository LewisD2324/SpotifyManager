import { Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },

        ErrorText: {
            color: '#f50057',
            marginBottom: 5,
            textAlign: 'center',
        },
        createPlaylistTitle: {
            textAlign: 'center',
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

    const [playlistName, setPlaylistName] = useState<string>('');

    const [description, setDescription] = useState<string>('');

    const handleTextChange = (
        event:
          | React.ChangeEvent<HTMLInputElement>
      ) => {
        const { name, value, type } = event.target;
        name === "PlaylistName" ? setPlaylistName(value) : setDescription(value); 
      };

    return (
        <div className={classes.root}>
            <TextField
                id="standard-basic"
                margin="normal"
                label="Playlist Name"
                name="PlaylistName"
                inputProps={{ 'data-testid': 'playlistname-input' }}
                placeholder="Name"
                required
                onChange={handleTextChange}
            />
            <TextField
                id="standard-basic"
                margin="normal"
                name="Description"
                inputProps={{ 'data-testid': 'playlistdescription-input' }}
                label="Description"
                placeholder="Description"
                onChange={handleTextChange}
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
