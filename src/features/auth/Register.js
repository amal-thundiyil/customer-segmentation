import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Input1 from "../../components/form/Input1";
import Input2 from "../../components/form/Input2";
import Input3 from "../../components/form/Input3";
import useFormInput from "../../hooks/useFormInput";
import { useDispatch } from "react-redux";

const Login = () => {
  const email = useFormInput("");
  const password = useFormInput("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(email.value, password.value));
  };

  return (
    <Container width="100vw" height="100vh">
      <Container className="mx-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control {...emai}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control {...password}></Form.Control>
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </Container>
  );
};

export default Login;
