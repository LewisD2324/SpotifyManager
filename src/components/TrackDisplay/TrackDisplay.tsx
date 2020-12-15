import Card from '@material-ui/core/Card';
import { createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import styled from 'styled-components';
import TrackList from '../../components/TrackList/TrackList';
import { Album } from '../../models/album';
import { Toggle } from '../../models/toggle';
import { Track } from '../../models/track';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        trackdisplay: {
            // position: "absolute",
            // left: "450px",
            display: "flex",
            flexDirection: "column",
            height: "700px",
            width: "600px"
        },
    })
);

interface TrackDisplayProps {
    searchToggles : Toggle[]
    filtered_tracks: Track[];
    handleAddtoPlaylist: any;
    albums: Album[];
    selected_album_id: string;
}

const TrackDisplay = ({searchToggles, filtered_tracks, handleAddtoPlaylist, albums, selected_album_id} :  TrackDisplayProps)  => {
    const classes = useStyles();
    return (
        <div>
        <Card className = {classes.trackdisplay} >
        <div>
        <TrackDisplayText>Track List</TrackDisplayText>
        <LineBreak/>
        </div>
        <TrackContainer>
                {searchToggles[0].checked || searchToggles[1].checked ? (
                    <TrackList
                        tracks={filtered_tracks}
                        addtoplaylist={handleAddtoPlaylist}
                        showPlaylistTrackControls={false}
                    />
                ) : searchToggles[2].checked ? (
                    <TrackList
                        tracks={filtered_tracks}
                        addtoplaylist={handleAddtoPlaylist}
                        showPlaylistTrackControls={false}
                        album_image={albums.find((album: Album) => album.id === selected_album_id)}
                    />
                ) : null}
                </TrackContainer>
        </Card>
        </div>
    )
}

export default TrackDisplay

const TrackDisplayText = styled.h3`
    font-family: 'Open Sans', sans-serif;
    font-size: 1.4em;
    margin-left: 25px;
    

`;

const TrackContainer = styled.div`
display: flex;

`;

const LineBreak = styled.hr`
    width: 90%;
    border-radius: 100px;
    height: 2px;
    background-color: grey;
    opacity: 0.12;
    margin-top: -15px;
`;