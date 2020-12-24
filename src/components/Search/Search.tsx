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
            "& .MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined": {
                  color: "white"
            }
        },
        inputRoot: {
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "purple"
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "purple"
              },
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
                    ListboxProps={
                        {
                          style:{
                              maxHeight: '140px',
                          }
                        }
                      }
                    renderInput={(params) => (
                        <TextField
                            style= {{color: "white"}}
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
    position: absolute;
    top: 150px;
    left: 75px;
`;

const SearchControlsContainer = styled.div`
display:flex;
padding: 20px;
`;


