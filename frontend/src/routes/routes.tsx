import React from "react";
import { Box } from "@chakra-ui/react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home, Detail } from "scenes";
import { NavBar } from "components";

export const Routes = () => {
  return (
    <div>
      <NavBar />
      <Box textAlign="center" fontSize="xl">
        <Box minH="100vh" p={3}>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/detail" component={Detail} />
          </Switch>
        </Box>
      </Box>
    </div>
  );
};
