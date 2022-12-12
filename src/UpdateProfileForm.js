import React, { useState, useContext } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import "./UpdateProfileForm.css";
import UserContext from "./UserContext";
import api from "./api";

const UpdateProfileForm = () => {
  const currUser = useContext(UserContext);
  const INITIAL = {
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
  };

  const [formData, setFormData] = useState(INITIAL);
  const [errors, setErrors] = useState();
  const [updateSucceeded, setUpdateSucceeded] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    try {
      await api.updateProfile(currUser.username, formData);
      setUpdateSucceeded(true);
    } catch (errors) {
      setErrors(errors);
      setFormData(INITIAL);
    }
  }

  return (
    <div className="UpdateProfileForm container">
      <h1>Update Profile Info</h1>

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
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
            {updateSucceeded ? (
              <div className="alert alert-success">
                Profile info successfully updated!
              </div>
            ) : null}
            <Button color="success" outline>
              Update Profile
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateProfileForm;
