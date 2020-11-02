import { RouteComponentProps, Router } from '@reach/router';
import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import NavBar from '../components/NavBar/NavBar';
import './App.css';

const App: React.FC = () => {
    const AuthPage = React.lazy(() => import('../pages/AuthPage/AuthPage'));
    const Home = React.lazy(() => import('../pages/HomePage/Home'));
    const PageNotFound = React.lazy(() => import('../pages/PageNotFound/PageNotFound'));

    const Playlist = React.lazy(() => import('../pages/PlaylistPage/Playlist'));

    const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent;

    return (
        <div className="App">
            <div className="page-contents">
                <Suspense fallback={<div>...loading</div>}>
                    <header style={{ position: 'absolute' }}>{location.pathname === '/' ? null : <NavBar />}</header>
                    <Router>
                        <RouterPage path="/" pageComponent={<AuthPage />} />
                        <RouterPage path="/Landing" pageComponent={<Home />} />
                        <RouterPage path="/Playlist" pageComponent={<Playlist />} />
                        <RouterPage default pageComponent={<PageNotFound />} />
                    </Router>
                </Suspense>
            </div>
            {/* {location.pathname === "/" ? null : <Footer />} */}

            <ToastContainer autoClose={1000} />
        </div>
    );
};

export default App;
