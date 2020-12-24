import { Paper } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import * as actions from '../../app/state/app.actions';
import { useAppContext } from '../../app/state/app.store';
import CreatePlaylistForm from '../CreatePlaylistForm/CreatePlaylistForm';
//const no_image = require("../../../public/assets/No_image_available.png");

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '75px',
            display: 'flex',
            overflow: 'hidden'
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        gridListTile: {
            width: '180px !important',
            transition: 'ease 0.4s all',
            '&:hover': {
                background: '#a19393',
                cursor: 'pointer',
          //      transform: 'scale(1.1, 1.1)'
            },
            // '&:active': {
            //     backgroundColor: '#f00'
            // },
            "& .MuiGridListTile-tile": {
                // width: '180px',
                 '&:hover': {
            transition: 'ease 0.4s all',
                transform: 'scale(1.1, 1.1)'
            },
              },
            //   "& .MuiGridListTile-root": {
            //     width: '180px',
            //   },
        },
        gridListTileCreatePlaylist: {
            backgroundColor: "white"
        },
        createPlaylistTitle: {
            textAlign: 'center',
        },
        title: {
            color: 'rgb(255 236 255)',
            textAlign: 'center',
        },
        titleBar: {
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        playlistimage: {
            height: '180px',
            width: '180px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            // '&:hover': {
            //     transform: 'scale(1.1, 1.1)'
            // },
        },
    })
);

interface PlaylistsProps {
    playlists: any[];
    onClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
    deletePlaylist: (playlist_id: string) => any;
    showPlaylistControls?: string;
}
const Playlists = React.memo((props: PlaylistsProps) => {
    const classes = useStyles();
    const createPlaylistRef = useRef<any>();
    const { dispatch, state } = useAppContext();

    useEffect(() => {
        // add when mounted
        document.addEventListener('mousedown', handleCreatePlaylistClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener('mousedown', handleCreatePlaylistClick);
        };
    }, []);

    const [showPlaylistControls, setshowPlaylistControls] = useState('');
    const [showCreatePlaylistForm, setshowCreatePlaylistForm] = useState(false);

    const handleShowPlaylistControls = (playlist_id: string) => {
        setshowPlaylistControls(playlist_id);
    };

    const handleSubmit = async (playlistName: string, description: string) => {
        await dispatch(actions.createplaylist(state.userinfo.id, playlistName, description));
        toast.success('Playlist Created');
        await dispatch(actions.get_playlist(state.userinfo.id));
        setshowCreatePlaylistForm(false);
    };

    const handleCreatePlaylistClick = (e: any) => {
        if (createPlaylistRef.current.contains(e.target)) {
            // inside click
            setshowCreatePlaylistForm(true);
            return;
        }
        //outside click
        setshowCreatePlaylistForm(false);
    };

    const renderplaylists = () => {
        return props.playlists.map((items) => {
            let image = '';
            if (items.images.length < 1) {
                image = 'no_image';
            } else {
                image = items.images[0].url;
            }
            return (
                //TODO - Fix issue with showing controls and delete playlists firing more than once

                // <div onClick={() => handleShowPlaylistControls(items.id)}>
                <GridListTile
                    onClick={props.onClick}
                    id={items.id}
                    className={classes.gridListTile}
                    key={items.id}
                    data-testid="playlist-item"
                >
                    <ImageContainer>
                    {showPlaylistControls === items.id ? (
                        <div onClick={props.deletePlaylist(items.id)}>
                            <RemoveCircleIcon />
                        </div>
                    ) : null}
                    <img src={image} className={classes.playlistimage} />
                    </ImageContainer>     
                    <GridListTileBar
                        title={items.name}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                    />
                </GridListTile>
                // </div>
            );
        });
    };

    return (
        <Paper className={classes.root}>
            <GridList className={classes.gridList} cols={6}>
                <GridListTile className = {classes.gridListTileCreatePlaylist} onClick={handleCreatePlaylistClick} ref={createPlaylistRef}>
                    {showCreatePlaylistForm ? (
                        <CreatePlaylistForm onSubmit={handleSubmit} />
                    ) : (
                        
                        <div>
                        <CreatePlaylistText>Create a Playlist</CreatePlaylistText>
                        </div>
                    )}
                </GridListTile>

                {renderplaylists()}
            </GridList>
        </Paper>
    );
});

export default Playlists;


const CreatePlaylistText = styled.h4`
        text-align: center;
    font-size: 1.3em;
    /* font-family: 'Open Sans',sans-serif; */
`;

const ImageContainer = styled.div`
/* &:hover {
                transform: 'scale(1.1, 1.1)'
            } */
`

