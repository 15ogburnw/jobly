import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import "./JobCard.css";
import UserContext from "./UserContext";
import api from "./api";

const JobCard = ({ job }) => {
  const [applied, setApplied] = useState();
  const currUser = useContext(UserContext);

  useEffect(() => {
    for (let item of currUser.applications) {
      if (item === job.id) {
        setApplied(true);
      }
    }
  }, [currUser.applications, job.id]);

  async function apply() {
    await api.applyForJob(currUser.username, job.id);
    setApplied(true);
  }

  return (
    <div className="JobCard my-4">
      <Card>
        <CardBody>
          <CardTitle tag="h5">{job.title}</CardTitle>

          <CardSubtitle tag="h6">{job.companyName}</CardSubtitle>
          <br />
          <p>Salary: {job.salary}</p>
          <p>Equity: {job.equity}</p>
          {!applied && (
            <Button color="primary" onClick={apply}>
              Apply
            </Button>
          )}
          {applied && (
            <Button color="success" disabled>
              Applied
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default JobCard;
