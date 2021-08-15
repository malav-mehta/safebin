import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="sticky-bottom bg-white py-3 border-top">
      <Container>
        <p>
          <i>safebin.</i> Copyright © 2021. Author:{" "}
          <a href="https://malavmehta.herokuapp.com">Malav Mehta</a>. Source
          code available on{" "}
          <a href="https://github.com/malav-mehta/safebin">GitHub</a>.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
