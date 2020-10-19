import React from 'react';
import { FormGroup, FormControlLabel, Switch, Theme, createStyles, makeStyles } from '@material-ui/core';

export interface SearchSwitchesProps {
    artistchecked: boolean;
    trackschecked: boolean;
    albumschecked: boolean;
    handleSwitchChange: (e: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // position: "absolute",
            // top: "50%",
            // left: "50%",
        },
    })
);

const SearchSwitches = (props: SearchSwitchesProps) => {
    const classes = useStyles();

    return (
        <div style={{ display: 'flex' }}>
            <FormGroup row className={classes.root}>
                <FormControlLabel
                    control={
                        <Switch checked={props.artistchecked} onChange={props.handleSwitchChange} name="artistcheck" />
                    }
                    label="Artist"
                />
                <FormControlLabel
                    control={
                        <Switch checked={props.trackschecked} onChange={props.handleSwitchChange} name="trackscheck" />
                    }
                    label="Tracks"
                />
                <FormControlLabel
                    control={
                        <Switch checked={props.albumschecked} onChange={props.handleSwitchChange} name="albumscheck" />
                    }
                    label="Albums"
                />
            </FormGroup>
        </div>
    );
};

export default SearchSwitches;
