import { useState } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import useFormInput from "../../hooks/useFormInput";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAsync } from "./asyncActions";
import LoginContainer from "../../components/styles/LoginContainer.styled";

const Login = () => {
  const authObj = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { userLoginLoading, loginError } = authObj;

  const email = useFormInput("");
  const password = useFormInput("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLoginAsync(email.value, password.value));
  };

  return (
    <LoginContainer>
      <LoginContainer>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control {...email}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control {...password} type="password"></Form.Control>
          </Form.Group>
          <Row className="justify-content-center">
            <Button style={{ width: "90%" }} type="submit" variant="primary">
              Submit
            </Button>
          </Row>
          <Row>
            <a
              href={
                "https://github.com/login/oauth/authorize?client_id=98ee0df678a994f53a01&redirect_uri=http://localhost:5000/login/oauth"
              }
            >
              Login with Github
            </a>
          </Row>
        </Form>
      </LoginContainer>
    </LoginContainer>
  );
};

export default Login;
