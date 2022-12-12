import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ company }) => {
  const BASE_IMG_URL = "http://joelburton-jobly.surge.sh";
  return (
    <div className="CompanyCard my-4">
      <Link to={`/companies/${company.handle}`}>
        <Card>
          <CardBody>
            <CardTitle tag="h5">
              {company.logoUrl && (
                <img
                  src={`${BASE_IMG_URL}${company.logoUrl}`}
                  className="float-right"
                  alt={company.name}
                ></img>
              )}
              {company.name}{" "}
            </CardTitle>

            <CardText>{company.description}</CardText>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default CompanyCard;
