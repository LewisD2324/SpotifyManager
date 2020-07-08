import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./Search.module.css";

export interface SearchProps {
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchclick(): void;
  suggestions: any;
  handleOnSelect: any;
}

const Search = (props: SearchProps) => {
  return (
    <div className="Search">
      <Autocomplete
        className="SearchBox"
        freeSolo
        id="searchbox"
        disableClearable
        // options={top100Films.map((option) => option.title)}
        options={props.suggestions}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            margin="normal"
            variant="outlined"
            onChange={props.handleChangeValue}
            InputProps={{ ...params.InputProps, type: "search" }}
            onSelect={props.handleOnSelect}
          />
        )}
      />
      <button onClick={props.searchclick}>Search</button>
    </div>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: "The Shawshank Redemption", year: 1994 },
//   { title: "The Godfather", year: 1972 },
//   { title: "The Godfather: Part II", year: 1974 },
//   { title: "The Dark Knight", year: 2008 },
// ];

export default Search;
