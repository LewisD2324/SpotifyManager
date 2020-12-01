import React, { useEffect } from 'react';
import { get_playlist, userinfo } from '../../app/state/app.actions';
import { useAppContext } from '../../app/state/app.store';
import HomePage from './HomePage';
import { useHome } from './state/home.store';

const Home: React.FC = () => {
    const appContext = useAppContext();
    const homeContext = useHome();

    useEffect(() => {
        if (appContext.state.userinfo !== null) {
            appContext.dispatch(get_playlist(appContext.state.userinfo.id));
        }
    }, [appContext.state.userinfo]);

    useEffect(() => {
        //TO-DO fix this dependancy
        appContext.dispatch(userinfo());
    }, []);

    return (
        <>
            <HomePage />
        </>
    );
};

export default Home;
