import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./home";
import Paste from "./paste";

import { Footer, Navbar } from "../layouts";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/:shortLink">
            <Paste />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Router;
