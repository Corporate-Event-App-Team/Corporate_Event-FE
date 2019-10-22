import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import styled from "styled-components";
import uuid from "uuid";

import image from "../imgs/register_back.jpg";
import logo from "../imgs/corporate_logo.png";
import Axios from "axios";
import Form from "./Form";


const RegisterStyle = styled.div`
  height: 100vh;

  nav {
    display: flex;
    justify-content: space-between;
    background-color: #c4c4c4;

    img {
      width: 5%;
    }
    a {
      background-color: #090429;
      text-decoration: none;
      border-radius: 5px;
      width: 120px;
      height: 35px;
      text-align: center;
      margin-top: 12px;
      margin-bottom: 12px;
      margin-right: 15px;
      padding-top: 10px;
      color: white;
      &:hover {
        background-color: #fbab06;
      }
    }
  }
  div {
    display: flex;
    align-items: center;
    background-color: #e5e5e5;

    img {
      width: 50%;
      height: 100vh;
    }
    section {
      text-align: center;

      margin: 0;
    }
  }
`;

const initialFormValues = {
  company: "",
  email: "",
  id: uuid(),
  password: "",
  role: "",
  username: ""
};

export default function Register(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const onNameChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e, formValues) => {
    e.preventDefault();
    if (formValues.password.length > 8 && formValues.password.length < 12) {
      Axios.post(
        "https://cors-anywhere.herokuapp.com/https://corporate-event-planner-build.herokuapp.com/api/auth/register",
        formValues
      )
        .then(response => {
          NotificationManager.success("Registration successful");
          console.log("response from Register endpoint",response);
          props.history.push("/");
        })
        .catch(err => {
          NotificationManager.error(
            err.message,
            "Something went terribly wrong!"
          );
          console.log("error from Register endpoint",err);
        });
    } else {
      setFormValues({ ...formValues, password: "" });
      alert("password must be more than 8 characters but less than 12!!");
    }
  };

  return (
    <RegisterStyle>
      <nav>
        <img src={logo} alt="corporate-logo" />
        <a href="/">LOGIN</a>
      </nav>

      <div>
        <img src={image} alt="for-register" />

        <section>
          <h3>
            We offer centralised management for your event planning needs and
            allow you meet all your client’s requirements with ease. Fill in
            your information below to get started.
          </h3>

          <Form
            onNameChange={onNameChange}
            onFormSubmit={onFormSubmit}
            formValues={formValues}
          />
        </section>
      </div>
    </RegisterStyle>
  );
}
