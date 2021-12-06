import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./features/auth/Login";
import Error from "./pages/Error";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyTokenAsync } from "./features/auth/asyncActions";

function App() {
  const { isAuthenticated, verifyStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyTokenAsync());
  }, []);

  if (verifyStatus === "loading") {
    return (
      <Container>
        <Container className="mx-auto">Checking authentication</Container>
      </Container>
    );
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute auth={isAuthenticated} />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          path="/dashboard"
          element={<PrivateRoute auth={isAuthenticated} />}
        >
          <Route path="/dashboard:access_token" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
