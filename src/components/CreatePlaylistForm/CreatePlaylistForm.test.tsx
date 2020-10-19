import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CreatePlaylistForm from './CreatePlaylistForm';

const setup = () => {
    const onSubmit = jest
        .fn()
        .mockResolvedValueOnce({ data: { playlistName: 'Test Playlist', description: 'testing' } });
    const utils = render(<CreatePlaylistForm onSubmit={onSubmit} />);

    const PlaylistName = utils.getByTestId('playlistname-input') as HTMLInputElement;
    const Description = utils.getByTestId('playlistdescription-input') as HTMLInputElement;
    const Submit = utils.getByText('SUBMIT');
    return {
        PlaylistName,
        Description,
        Submit,
        onSubmit,
        ...utils,
    };
};

test('renders playlist form', () => {
    const { PlaylistName, Description, Submit } = setup();

    expect(PlaylistName).toBeInTheDocument();
    expect(Description).toBeInTheDocument();
    expect(Submit).toBeInTheDocument();
});

test('Submits with Playlist Inputs', () => {
    const { PlaylistName, Description, Submit, onSubmit } = setup();

    fireEvent.change(PlaylistName, { target: { value: 'Test Playlist' } });
    fireEvent.change(Description, { target: { value: 'testing' } });

    fireEvent.click(Submit);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(PlaylistName.value, Description.value);
});
