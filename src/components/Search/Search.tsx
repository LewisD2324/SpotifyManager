import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export interface SearchProps {
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchclick(): void;
  suggestions: any;
  handleOnSelect: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchButton: {
      marginTop: "170px",
      marginLeft: "40px",
    },
    inputRoot: {
      '&&[class*="MuiOutlinedInput-root"] $input': {
        backgroundColour: "white",
      },
    },
  })
);

// const Autocomplete : any= withStyles({
//   root: {
//     width: "500px",
//           transition: "background-color .2s eas",
//           border: "1px solid #f3f3f5",
//           marginLeft: "40px",
//           marginTop: "160px",
//   },
//   label: {
//     textTransform: 'capitalize',
//   },
// })(Autocomplete);

const Search = (props: SearchProps) => {
  const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      <div className={classes.inputRoot}>
        <Autocomplete
          style={{
            width: "500px",
            transition: "background-color .2s eas",
            border: "1px solid #f3f3f5",
            marginLeft: "40px",
            marginTop: "160px",
          }}
          classes={{ inputRoot: classes.inputRoot }}
          freeSolo
          id="searchbox"
          disableClearable
          placeholder="Search by ...."
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
      </div>
      <Button onClick={props.searchclick} className={classes.searchButton}>
        Search
      </Button>
    </div>
  );
};

export default Search;
