
import React from "react";
import { AlbumData } from "../../config/jest/albumMockData";
import Albums from "../Albums/Albums";
import { render } from '@testing-library/react';
import { Album } from "@material-ui/icons";


test('renders albums',  () => {
   const albums = AlbumData;
   const onClick = jest.fn();
   const {getAllByTestId} = render(<Albums albums = {albums} onClick = {onClick}/>)
   const albumItems = getAllByTestId("album-item")
   const albumNames =albumItems.map(item => item.textContent);
   const albumIds =albumItems.map(item => item.id);

   const expectedAlbumNames = AlbumData.map(item => item.name);
   const expectedAlbumIds = AlbumData.map(item => item.id);

   expect(albumNames).toEqual(expectedAlbumNames);
   expect(albumIds).toEqual(expectedAlbumIds);

});