import React, { Suspense } from "react";
import { useAppContext } from "./state/app.store";
import { LogIn } from "./state/app.actions";
import { Router, RouteComponentProps, Redirect } from "@reach/router";

const App = () => {
  const LandingPage = React.lazy(() =>
    import("../pages/LandingPage/LandingPage")
  );

  const AuthPage = React.lazy(() => import("../pages/AuthPage/AuthPage"));

  const RouterPage = (
    props: { pageComponent: JSX.Element } & RouteComponentProps
  ) => props.pageComponent;

  return (
    <div>
      <Suspense fallback={<div>...loading</div>}>
        <Router>
          <RouterPage path="/" pageComponent={<AuthPage />} />
          <RouterPage path="/Landing" pageComponent={<LandingPage />} />
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
