import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Landing from "./routes/Landing";
import Reg from "./routes/Reg";
import Log from "./routes/Log";
import Dashboard from "./routes/Dashboard";
import Update from "./routes/Update";
import Mypost from "./routes/Mypost";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

toast.configure();

export default function App() {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  function Auth(boolean) {
    setAuth(boolean);
  }

  function checkAuth() {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user",
    }).then((res) => {
      setUserInfo(res.data);
      res.data ? Auth(true) : Auth(false);
    });
  }

  useEffect(() => {
    checkAuth(); //eslint-disable-next-line
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Landing />} />
        <Route
          exact
          path="/Reg"
          render={(props) =>
            !auth ? (
              <Reg {...props} Auth={Auth} />
            ) : (
              <Redirect to="/Dashboard" />
            )
          }
        />
        <Route
          exact
          path="/Log"
          render={(props) =>
            !auth ? (
              <Log {...props} Auth={Auth} />
            ) : (
              <Redirect to="/Dashboard" />
            )
          }
        />
        <Route
          exact
          path="/Dashboard"
          render={(props) =>
            auth ? (
              <Dashboard {...props} user={userInfo} auth={Auth} />
            ) : (
              <Redirect to="/Log" />
            )
          }
        />
        <Route
          exact
          path="/update-profile"
          render={(props) =>
            auth ? (
              <Update {...props} user={userInfo} />
            ) : (
              <Redirect to="/Log" />
            )
          }
        />
       <Route
          exact
          path="/Myposts"
          render={(props) =>
            auth ? (
              <Mypost {...props} user={userInfo} />
            ) : (
              <Redirect to="/Log" />
            )
          }
        />
      </Switch>
    </Router>
  );
}
