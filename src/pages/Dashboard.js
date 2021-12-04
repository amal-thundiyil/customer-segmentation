import { useDispatch, useSelector } from "react-redux";
import {
  userLogoutAsync,
  verifyTokenAsync,
} from "../features/auth/asyncActions";
import { useEffect } from "react";
import moment from "moment";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../features/auth/services";

const Dashboard = () => {
  const { expiredAt, token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let history = useNavigate();

  const handleLogout = () => {
    dispatch(userLogoutAsync());
  };

  useEffect(() => {
    setAuthToken(token);
    const verifyTokenTimer = setTimeout(() => {
      dispatch(verifyTokenAsync(true));
    }, moment(expiredAt).diff() - 10 * 1000);
    return () => {
      clearTimeout(verifyTokenTimer);
    };
  }, [expiredAt, token]);

  return (
    <Container>
      <h1>Hello there {user}!</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
