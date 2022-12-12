import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./RegisterForm.css";

const RegisterForm = ({ register }) => {
  const INITIAL = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(INITIAL);
  const [errors, setErrors] = useState();
  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await register(formData);

    if (res.success) {
      history.push("/");
    } else {
      setErrors(res.errors);
    }
  }

  return (
    <div className="LoginForm container">
      <h1>Register</h1>

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                id="username"
                placeholder="Enter Your Username"
                type="text"
                onChange={handleChange}
                value={formData.username}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="Password"
                placeholder="Enter Your Password"
                type="password"
                onChange={handleChange}
                value={formData.password}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                name="firstName"
                id="firstName"
                placeholder="Enter Your First Name"
                type="text"
                onChange={handleChange}
                value={formData.firstName}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                name="lastName"
                id="lastName"
                placeholder="Enter Your Last Name"
                type="text"
                onChange={handleChange}
                value={formData.lastName}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                placeholder="Enter Your Email"
                type="email"
                onChange={handleChange}
                value={formData.email}
              />
            </FormGroup>
            {errors
              ? errors.map((error) => (
                  <div className="alert alert-danger" key={error}>
                    {error}
                  </div>
                ))
              : null}
            <Button color="success" outline>
              Register
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterForm;
