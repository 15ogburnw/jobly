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
import "./LoginForm.css";

const LoginForm = ({ login }) => {
  const INITIAL = {
    username: "",
    password: "",
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
    const res = await login(formData.username, formData.password);

    if (res.success) {
      history.push("/");
    } else {
      setErrors(res.errors);
    }
  }

  return (
    <div className="LoginForm container">
      <h1>Login</h1>

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
                id="password"
                placeholder="Enter Your Password"
                type="password"
                onChange={handleChange}
                value={formData.password}
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
              Login
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginForm;
