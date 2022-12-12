import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import api from "./api";
import JobCard from "./JobCard";
import SearchBar from "./SearchBar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getJobs() {
      try {
        const res = await api.getAllJobs();
        setJobs(res);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    getJobs();
  }, []);

  async function searchJobs(query) {
    try {
      const res = await api.searchJobs(query);
      setJobs(res);
      setActiveSearch(true);
    } catch (e) {
      console.error(e);
    }
  }

  async function viewAll() {
    try {
      const res = await api.getAllJobs();
      setJobs(res);
    } catch (e) {
      console.error(e);
    }

    setActiveSearch(false);
  }

  if (isLoading) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  }
  return (
    <div className="Jobs">
      <div className="Jobs-list container mt-5">
        <SearchBar search={searchJobs} />

        {jobs.length ? (
          jobs.map((job) => <JobCard job={job} key={job.id} />)
        ) : (
          <h1>Sorry, no jobs found!</h1>
        )}
        {activeSearch && (
          <Button color="primary" onClick={viewAll}>
            View All Jobs
          </Button>
        )}
      </div>
    </div>
  );
};

export default Jobs;
