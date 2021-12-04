import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Container>
      <h1>Error Occured... Oooooooooops! </h1>
      <h6>...i did it again :)</h6>
      <Link to="/" className="btn">
        Back Home
      </Link>
    </Container>
  );
};

export default Error;
