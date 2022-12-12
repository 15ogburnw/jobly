import React, { useState } from "react";
import { Form, Row, Col, Label, Input, Button } from "reactstrap";

const SearchBar = ({ search }) => {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // if (query) {
    search(query);
    setQuery("");
    // }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center">
        <Col>
          <Label className="visually-hidden" for="search">
            Search
          </Label>
          <Input
            id="search"
            name="search"
            placeholder="Enter a Search Term"
            type="text"
            onChange={handleChange}
            value={query}
          />
        </Col>
        <Col>
          <Button color="success" style={{ width: "100px" }}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
