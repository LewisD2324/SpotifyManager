import { createStyles, FormControlLabel, FormGroup, makeStyles, Switch, Theme } from '@material-ui/core';
import React from 'react';

export interface SearchSwitchesProps {
    // artistchecked: boolean;
    // trackschecked: boolean;
    // albumschecked: boolean;
    searchToggles: any[];
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
                {/* <FormControlLabel
                    control={
                        <Switch checked={props.artistchecked} onChange={props.handleSwitchChange} name="artistcheck" />
                    }
                    label="Artist"
                /> */}
                {
          props.searchToggles.map((toggle : any) => {
            return ( <FormControlLabel
                control={
                    <Switch checked={toggle.checked} id = {toggle.id} onChange={props.handleSwitchChange} name={toggle.name} />
                }
                label={toggle.label}
                id = {toggle.id}
                key = {toggle.name}
            />)
          })
        }
                {/* <FormControlLabel
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
                /> */}
            </FormGroup>
        </div>
    );
};

export default SearchSwitches;
