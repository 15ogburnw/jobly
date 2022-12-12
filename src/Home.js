import React, { useContext } from "react";
import "./Home.css";
import UserContext from "./UserContext";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Home = () => {
  const currUser = useContext(UserContext);
  const history = useHistory();

  if (!currUser) {
    return (
      <div className="Home container">
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        <div>
          <Button
            onClick={() => {
              history.push("/login");
            }}
            color="primary"
            outline
            size="lg"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              history.push("/register");
            }}
            color="primary"
            outline
            size="lg"
          >
            Register
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Home container">
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        <h3>
          Welcome back {currUser.firstName} {currUser.lastName}!
        </h3>

        <div className="mt-2">
          <Button
            onClick={() => {
              history.push("/jobs");
            }}
            color="primary"
            outline
            size="lg"
          >
            Browse Available Jobs
          </Button>
          <Button
            onClick={() => {
              history.push("/companies");
            }}
            color="primary"
            outline
            size="lg"
          >
            Find a Company
          </Button>
        </div>
      </div>
    );
  }
};

export default Home;
