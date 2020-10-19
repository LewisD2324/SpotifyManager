import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import path from 'path';
import { render, RenderResult, act } from '@testing-library/react';
import App from '../../app/App';
import { AppProvider } from '../../app/state/app.store';
import { selected_playlist } from '../../pages/HomePage/state/home.actions';

export const mockStore = (storeRelativePath: string, exportName: string, mockOverrides: Object = {}) => {
    const storeAbsolutePath = path.join(process.cwd(), '/src/', storeRelativePath);
    const store = jest.requireActual(storeAbsolutePath);

    const storeMock = {
        ...store,
        [exportName]: jest.spyOn(store, exportName),
    };

    const {
        result: { current },
    } = renderHook(() => store[exportName]());

    const dispatchSpy = jest.spyOn(current, 'dispatch');

    storeMock[exportName].mockReturnValue({ ...current, ...mockOverrides });

    jest.mock(storeAbsolutePath, () => storeMock);

    return { dispatch: dispatchSpy, storeMock };
};

export const mockAppStore = () => {
    const state = {
        userinfo: {
            country: 'GB',
            display_name: 'Test User',
            email: 'test@hotmail.co.uk',
            explicit_content: {
                filter_enabled: false,
                filter_locked: false,
            },
            external_urls: {
                spotify: 'https://open.spotify.com/user/1',
            },
            followers: {
                href: null,
                total: 10,
            },

            href: 'https://api.spotify.com/v1/users/1',

            id: '1',
            images: {
                height: null,
                url:
                    'https://scontent.flux1-1.fna.fbcdn.net/v/t1.0-1/p320x320/13906822_10209372977776921_6915171336165266008_n.jpg?_nc_cat=102&_nc_sid=0c64ff&_nc_ohc=XVx14Qvdq6IAX8K-vsu&_nc_ht=scontent.flux1-1.fna&tp=6&oh=0fa850d35c32d7f88674200adb810316&oe=5FA1053A',
                width: null,
            },
            product: 'premium',

            type: 'user',
            uri: 'spotify:user:1',
        },
        selected_playlist: '',
        playlists: [],
    };
    return mockStore('/app/state/app.store', 'useAppContext', { state });
};

export const renderApp = () => {
    let rendered: RenderResult = {} as RenderResult;

    act(() => {
        rendered = render(
            <AppProvider>
                <App />
            </AppProvider>
        );
    });

    return { ...rendered };
};
