import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./home";
import Paste from "./paste";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:shortLink">
          <Paste />
        </Route>

        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
