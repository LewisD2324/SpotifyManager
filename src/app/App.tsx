import { RouteComponentProps, Router } from '@reach/router';
import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import './App.css';

const App: React.FC = () => {
    const AuthPage = React.lazy(() => import('../pages/AuthPage/AuthPage'));
    const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'));
    const PageNotFound = React.lazy(() => import('../pages/PageNotFound/PageNotFound'));

    const PlaylistPage = React.lazy(() => import('../pages/PlaylistPage/PlaylistPage'));

    const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent;

    return (
        <div className="App">
            <div className="page-contents">
                <Suspense fallback={<div>...loading</div>}>
                    {location.pathname === '/' ? null : <NavBar />}
                    <Router>
                        <RouterPage path="/" pageComponent={<AuthPage />} />
                        <RouterPage path="/Landing" pageComponent={<HomePage />} />
                        <RouterPage path="/Playlist" pageComponent={<PlaylistPage />} />
                        <RouterPage default pageComponent={<PageNotFound />} />
                    </Router>
                    {location.pathname === "/" ? null : <Footer />}
                </Suspense>
            </div>

            <ToastContainer autoClose={1000} />
        </div>
    );
};

export default App;
