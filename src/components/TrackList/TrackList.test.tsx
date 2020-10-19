import { trackData } from '../../config/jest/trackMockData';
import { render } from '@testing-library/react';
import React from 'react';
import Tracklist from './TrackList';
test('renders tracklist', () => {
    const tracks = trackData;
    const addToPlaylist = jest.fn();
    const { getAllByTestId } = render(
        <Tracklist tracks={tracks} addtoplaylist={addToPlaylist} showPlaylistTrackControls={false} />
    );
    const trackItems = getAllByTestId('tracklist-item');
    const trackNames = trackItems.map((item) => item.textContent);
    const trackIds = trackItems.map((item) => item.id);

    const expectedTrackNames = tracks.map((item) => item.name);
    const expectedArtistName = tracks.map((item) => item.artists[0].name);

    const expectedTrackIds = tracks.map((item) => item.id);

    expect(trackNames[0]).toContain(expectedTrackNames[0]);
    expect(trackNames[1]).toContain(expectedTrackNames[1]);

    expect(trackNames[0]).toContain(expectedArtistName[0]);
    expect(trackNames[1]).toContain(expectedArtistName[1]);

    expect(trackIds).toEqual(expectedTrackIds);
});
