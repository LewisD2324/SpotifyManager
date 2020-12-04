import { createStyles, FormControlLabel, FormGroup, makeStyles, Switch, Theme } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { Toggle } from '../../models/toggle';

export interface SearchTogglesProps {
    searchToggles: Toggle[];
    handleSwitchChange: (e: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: "rgb(244 231 246 / 95%)"
            // position: "absolute",
            // top: "50%",
            // left: "50%",
        },
    })
);

const SearchToggles = (props: SearchTogglesProps) => {
    const classes = useStyles();

    return (
        <SearchTogglesRoot>
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
        </SearchTogglesRoot>
    );
};

export default SearchToggles;

const SearchTogglesRoot = styled.div`
display: flex;
margin-left: 25px;
`;
