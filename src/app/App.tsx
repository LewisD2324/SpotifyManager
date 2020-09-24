import React, { Suspense, useEffect } from "react";
import "./App.css";
import { Router, RouteComponentProps, Redirect } from "@reach/router";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";
const App: React.FC = () => {
  const AuthPage = React.lazy(() => import("../pages/AuthPage/AuthPage"));
  const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
  const PageNotFound = React.lazy(
    () => import("../pages/PageNotFound/PageNotFound")
  );

  const PlaylistPage = React.lazy(
    () => import("../pages/PlaylistPage/PlaylistPage")
  );

  const RouterPage = (
    props: { pageComponent: JSX.Element } & RouteComponentProps
  ) => props.pageComponent;

  return (
    <div className="App">
      <div className="page-contents">
        <Suspense fallback={<div>...loading</div>}>
          <header style={{ position: "absolute" }}>
            {location.pathname === "/" ? null : <NavBar />}
          </header>
          <Router>
            <RouterPage path="/" pageComponent={<AuthPage />} />
            <RouterPage path="/Landing" pageComponent={<HomePage />} />
            <RouterPage path="/Playlist" pageComponent={<PlaylistPage />} />
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
