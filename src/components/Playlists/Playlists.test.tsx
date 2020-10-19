import { playlistData } from "../../config/jest/playlistMockData";
import { render } from '@testing-library/react';
import React from "react";
import Playlist from "./Playlists"
test('renders playlists',  () => {
    const playlists = playlistData;
    const onClick = jest.fn();
    const deletePlaylist = jest.fn();

    const {getAllByTestId} = render(<Playlist playlists = {playlists} onClick ={onClick} deletePlaylist = {deletePlaylist}/>)
    const playlistItems = getAllByTestId("playlist-item")
    const playlistNames =playlistItems.map(item => item.textContent);
    const playlistIds =playlistItems.map(item => item.id);
 
    const expectedplaylistNames = playlists.map(item => item.name);
    const expectedplaylistIds = playlists.map(item => item.id);
 
    expect(playlistNames).toEqual(expectedplaylistNames);
    expect(playlistIds).toEqual(expectedplaylistIds);
 
 });