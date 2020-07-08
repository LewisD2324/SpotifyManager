import React from "react";
import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";

export interface SearchSwitchesProps {
  artistchecked: boolean;
  trackschecked: boolean;
  albumschecked: boolean;
  handleSwitchChange: (e: any) => void;
}

const SearchSwitches = (props: SearchSwitchesProps) => {
  return (
    <div>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={props.artistchecked}
              onChange={props.handleSwitchChange}
              name="artistcheck"
            />
          }
          label="Artist"
        />
        <FormControlLabel
          control={
            <Switch
              checked={props.trackschecked}
              onChange={props.handleSwitchChange}
              name="trackscheck"
            />
          }
          label="Tracks"
        />
        <FormControlLabel
          control={
            <Switch
              checked={props.albumschecked}
              onChange={props.handleSwitchChange}
              name="albumscheck"
            />
          }
          label="Albums"
        />
      </FormGroup>
    </div>
  );
};

export default SearchSwitches;
