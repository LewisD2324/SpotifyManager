import { createStyles, FormControlLabel, FormGroup, makeStyles, Switch, Theme } from '@material-ui/core';
import React from 'react';
import { Toggle } from '../../models/toggle';

export interface SearchSwitchesProps {
    searchToggles: Toggle[];
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
                {props.searchToggles.map((toggle: Toggle) => {
                    return (
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={toggle.checked}
                                    id={toggle.id.toString()}
                                    onChange={props.handleSwitchChange}
                                    name={toggle.name}
                                />
                            }
                            label={toggle.label}
                            id={toggle.id.toString()}
                            key={toggle.name}
                        />
                    );
                })}
            </FormGroup>
        </div>
    );
};

export default SearchSwitches;
