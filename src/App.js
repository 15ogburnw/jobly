import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import api from "./api";
import jwt from "jsonwebtoken";
import UserContext from "./UserContext";
import UpdateProfileForm from "./UpdateProfileForm";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage("joblyUserToken");

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          api.token = token;
          const payload = jwt.decode(token);
          const username = payload.username;
          const res = await api.getUserInfo(username);
          setCurrUser(res);
        } catch (e) {
          setCurrUser(null);
          console.error(e);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function login(username, password) {
    try {
      const token = await api.login(username, password);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Login failed:", errors);
      return { success: false, errors };
    }
  }

  async function register(user) {
    try {
      const token = await api.register(user);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Signup Failed:", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setToken(null);
    setCurrUser(null);
  }

  if (!infoLoaded) return <h1 className="text-center mt-5">Loading...</h1>;

  return (
    <BrowserRouter>
      <UserContext.Provider value={currUser}>
        <div className="App">
          <NavBar logout={logout} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/companies">
              {currUser ? <Companies /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/companies/:handle">
              {currUser ? <Company /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/jobs">
              {currUser ? <Jobs /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/login">
              <LoginForm login={login} />
            </Route>
            <Route exact path="/register">
              <RegisterForm register={register} />
            </Route>
            <Route exact path="/profile">
              <UpdateProfileForm />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
