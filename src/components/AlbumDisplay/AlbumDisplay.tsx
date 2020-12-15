import Card from '@material-ui/core/Card/Card';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import React from 'react';
import styled from 'styled-components';
import Albums from '../../components/Albums/Albums';
import { Album } from '../../models/album';
import { Toggle } from '../../models/toggle';

interface AlbumDisplayProps {
    searchToggles : Toggle[]
    handleSearchAlbumTracks: any;
    albums: Album[];
}

const AlbumDisplay = ({searchToggles, albums, handleSearchAlbumTracks} : AlbumDisplayProps) => {
    const classes = useStyles();
    return (
        <div>
        <Card className = {classes.albumdisplay} >
        <div>
        <AlbumDisplayText>Album List</AlbumDisplayText>
        <LineBreak/>
        </div>
        <AlbumContainer>
        {searchToggles[2].checked ? <Albums albums={albums} onClick={handleSearchAlbumTracks} /> : null}
                </AlbumContainer>
        </Card>
        </div>
    )
}

export default AlbumDisplay

const LineBreak = styled.hr`
    width: 90%;
    border-radius: 100px;
    height: 2px;
    background-color: grey;
    opacity: 0.12;
    margin-top: -15px;
`;

const AlbumContainer = styled.div`
display: flex;
`;

const AlbumDisplayText = styled.h3`
    font-family: 'Open Sans', sans-serif;
    font-size: 1.4em;
    margin-left: 25px;

`;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        albumdisplay: {
            // position: "absolute",
            display: "flex",
            flexDirection: "column",
            height: "1000px",
           // width: "290px",
            width: "240px",
            
            marginLeft:"70px"
        },
    })
);