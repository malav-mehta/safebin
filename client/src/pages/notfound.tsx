import { Container } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <Container>
      <div className="p-4 mb-4 bg-light rounded-3">
        <div className="py-3">
          <h3 className="display-4 mb-3">
            <b>
              <i>404. Paste not found.</i>
            </b>
          </h3>
          <p className="lead m-0">
            <b>
              <i>safebin</i>
            </b>{" "}
            is a paste bin that offers secure storage of paste content with
            client-side AES 256 encryption/decryption. To learn more about how{" "}
            <b>
              <i>safebin</i>
            </b>{" "}
            works, take a look at the source code on{" "}
            <a href="https://github.com/malav-mehta/safebin">GitHub</a>.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default NotFoundPage;
