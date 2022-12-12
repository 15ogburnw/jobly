import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import api from "./api";
import CompanyCard from "./CompanyCard";
import SearchBar from "./SearchBar";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initialLoad() {
      try {
        const res = await api.getAllCompanies();
        setCompanies(res);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    initialLoad();
  }, []);

  async function searchCompanies(query) {
    try {
      const res = await api.searchCompanies(query);
      setCompanies(res);
      setActiveSearch(true);
    } catch (e) {
      console.error(e);
    }
  }

  async function viewAll() {
    try {
      const res = await api.getAllCompanies();
      setCompanies(res);
    } catch (e) {
      console.error(e);
    }

    setActiveSearch(false);
  }

  if (isLoading) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  }
  return (
    <div className="Companies">
      <div className="Companies-list container mt-5">
        <SearchBar search={searchCompanies} />
        {companies.length ? (
          companies.map((company) => (
            <CompanyCard company={company} key={company.handle} />
          ))
        ) : (
          <h1>Sorry, no companies found!</h1>
        )}
        {activeSearch && (
          <Button color="primary" onClick={viewAll}>
            View All Companies
          </Button>
        )}
      </div>
    </div>
  );
};

export default Companies;
