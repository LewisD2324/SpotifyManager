import { Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import styled from 'styled-components';
import { Toggle } from '../../models/toggle';
import SearchToggles from '../SearchToggles/SearchToggles';

export interface SearchProps {
    handleChangeValue: (event: any, value: string) => void;
    searchclick(): void;
    suggestions: any;
    searchToggles: Toggle[];
    handleSwitchChange: (e: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchButton: {
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            transition: "all 0.3s ease 0s",
            // textTransform: "none",
            backgroundColor: "rgb(29 29 30 / 52%)",
            color:  "white",
            fontSize: "1.1em",
            margin: "auto",
            padding: "10px 20px 10px 20px",
            
        },
        root: {
            width: '500px',
            transition: 'background-color .2s eas',
           
        },
        inputRoot: {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              }
            //   "&:hover .MuiOutlinedInput-notchedOutline": {
            //     borderColor: "white",
            //   },
        },
    })
);

const Search = (props: SearchProps) => {
    const classes = useStyles();

    return (
        <SearchRoot>
                <Autocomplete
                    className={classes.root}
                    classes={{ inputRoot: classes.inputRoot } }
                    freeSolo
                    id="searchbox"
                    disableClearable
                    placeholder="Search by ...."
                    onInputChange={props.handleChangeValue}
                    options={props.suggestions}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Track, Artist or Album..."
                            margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                    )}
                />
            <SearchControlsContainer>
            <Button onClick={props.searchclick} className={classes.searchButton}>
                Search
            </Button>
            <SearchToggles searchToggles={props.searchToggles} handleSwitchChange={props.handleSwitchChange} />
            </SearchControlsContainer>
        </SearchRoot>
    );
};

export default Search;

const SearchRoot = styled.div`
display: flex;
justify-content: space-between;
    align-content: center;
    padding: 150px 23% 0px 70px;
`;

const SearchControlsContainer = styled.div`
display:flex;
padding: 20px;
`;


