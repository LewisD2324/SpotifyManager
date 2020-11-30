import React, { useEffect } from 'react';
import { get_playlist } from '../../app/state/app.actions';
import { useAppContext } from '../../app/state/app.store';
import PlaylistPage from './PlaylistPage';
import { useMyPlaylists } from './state/myplaylists.store';

const Playlist = () => {
    const appContext = useAppContext();
    const myPlaylistsContext = useMyPlaylists();

    useEffect(() => {
        appContext.dispatch(get_playlist(appContext.state.userinfo.id));
    }, []);

    return (
        <>
            <PlaylistPage appContext={appContext} myPlaylistsContext={myPlaylistsContext} />
        </>
    );
};

export default Playlist;
