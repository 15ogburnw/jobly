import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "./api";
import JobCard from "./JobCard";

const Company = () => {
  const { handle } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const company = useRef();

  useEffect(() => {
    async function getCompany() {
      try {
        company.current = await api.getCompany(handle);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    getCompany();
  });

  if (isLoading) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  } else {
    return (
      <div className="Company container">
        <h3 className="mt-5">{company.current.name}</h3>
        <p>{company.current.description}</p>
        {company.current.jobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    );
  }
};

export default Company;
