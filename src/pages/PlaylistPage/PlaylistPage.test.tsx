import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useAppContext } from '../../app/state/app.store';
import PlaylistPage from './PlaylistPage';
import { useMyPlaylists } from './state/myplaylists.store';

// const setup = () => {

//     const utils = render(<PlaylistPage />);

//     // const PlaylistName = utils.getByTestId('playlistname-input') as HTMLInputElement;
//     // const Description = utils.getByTestId('playlistdescription-input') as HTMLInputElement;
//     // const Submit = utils.getByText('SUBMIT');
//     return {
//         // PlaylistName,
//         // Description,
//         // Submit,
//         // onSubmit,
//         ...utils,
//     };
// };

// beforeAll(() =>
//     act(() => {
//         navigate('/Playlist');
//     })
// );

test('renders playlists page', async () => {
    const appContext = useAppContext();
    const myPlaylistsContext = useMyPlaylists();
    const {
        state: { playlists: playlistData },
    } = appContext;

    const {
        dispatch,
        state: {},
    } = myPlaylistsContext;

    const { getByTestId, debug } = render(
        <myPlaylistsContext.ContextProvider>
            <PlaylistPage />
        </myPlaylistsContext.ContextProvider>
    );

    await waitFor(() => expect(screen.getByTestId('playlist-item')).toBeInTheDocument(), { timeout: 5000 });
});
