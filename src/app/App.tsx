import React, { Suspense, useEffect } from "react";
import "./App.css";
import { Router, RouteComponentProps, Redirect } from "@reach/router";
import NavBar from "../components/NavBar/NavBar";
const App: React.FC = () => {
  const AuthPage = React.lazy(() => import("../pages/AuthPage/AuthPage"));
  const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
  const PlaylistPage = React.lazy(() =>
    import("../pages/PlaylistPage/PlaylistPage")
  );

  const RouterPage = (
    props: { pageComponent: JSX.Element } & RouteComponentProps
  ) => props.pageComponent;

  let authRedirect = null;

  useEffect(() => {
    let hashParams: any = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if (!hashParams.access_token) {
      console.log(hashParams.access_token);
      authRedirect = <Redirect noThrow to="/Auth" />;
    } else {
      console.log(hashParams.access_token);
      authRedirect = <Redirect noThrow to="/" />;
      //dispatch(actions.set_token(hashParams.access_token));
    }
  }, []);

  return (
    <div className="App">
      {authRedirect}
      <Suspense fallback={<div>...loading</div>}>
        <header style={{ position: "absolute" }}>
          <NavBar />
        </header>
        <Router>
          <RouterPage path="/" pageComponent={<AuthPage />} />
          <RouterPage path="/Landing" pageComponent={<HomePage />} />
          <RouterPage path="/Playlist" pageComponent={<PlaylistPage />} />
        </Router>
        {/* <NotFound default //TODO add notfound page default /> */}
      </Suspense>
    </div>
  );
};

export default App;
