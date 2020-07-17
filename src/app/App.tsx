import React, { Suspense, useEffect } from "react";
import "./App.css";
import { Router, RouteComponentProps, Redirect } from "@reach/router";
import NavBar from "../components/NavBar/NavBar";
const App: React.FC = () => {
  const AuthPage = React.lazy(() => import("../pages/AuthPage/AuthPage"));
  const LandingPage = React.lazy(() =>
    import("../pages/LandingPage/LandingPage")
  );
  const PlaylistPage = React.lazy(() =>
    import("../pages/PlaylistPage/PlaylistPage")
  );
  const CreatePlaylistPage = React.lazy(() =>
    import("../pages/CreatePlaylistPage/CreatePlaylistPage")
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
        <Router>
          <RouterPage path="/" pageComponent={<AuthPage />} />
          <RouterPage path="/Landing" pageComponent={<LandingPage />} />
          <RouterPage path="/Playlist" pageComponent={<PlaylistPage />} />
          <RouterPage
            path="/CreatePlaylist"
            pageComponent={<CreatePlaylistPage />}
          />
        </Router>
        {/* <NotFound default //TODO add notfound page default /> */}
      </Suspense>
    </div>
  );
};

export default App;
