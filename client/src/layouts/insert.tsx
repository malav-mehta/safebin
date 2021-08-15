import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { APP_URL, EXPIRATION_LENGTHS, LANGUAGES } from "../constants";
import { Paste, useInput } from "../lib";

const Insert = () => {
  const title = useInput("");
  const password = useInput("");
  const expirationLength = useInput(EXPIRATION_LENGTHS[0].value.toString());
  const language = useInput(LANGUAGES[0].value);
  const pasteContent = useInput("");

  let history = useHistory();

  const [modalData, setModalData] = useState<{
    hasError?: boolean;
    err?: any;
    paste?: TServerPaste;
  }>({
    hasError: true,
    err: {
      code: "RequestNotSent",
    },
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const clearPasteData = () => {
    title.reset();
    password.reset();
    expirationLength.reset();
    language.reset();
    pasteContent.reset();
  };

  const isPasteDataValid = () => {
    return title.value !== "" && pasteContent.value !== "";
  };

  const handleSubmit = async () => {
    const paste: TClientPaste = {
      title: title.value,
      password: password.value,
      hasPassword: password.value !== "",
      expirationLength: parseInt(expirationLength.value),
      language: language.value,
      pasteContent: pasteContent.value,
    };

    const result = await Paste.insert(paste);
    setModalData(result);
    handleModalOpen();
    clearPasteData();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalData.hasError ? (
              "Error"
            ) : (
              <>
                Created paste <code>{modalData.paste?.short_link}</code>
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData.hasError ? (
            <p>
              There was an error creating the paste. Error code: $
              {modalData.err?.code}
            </p>
          ) : (
            <>
              <p>
                Your paste (code <code>{modalData.paste?.short_link}</code>) was
                successfully created.
              </p>
              <Form.Group>
                <Form.Label>Paste URL</Form.Label>
                <Form.Control
                  value={`${APP_URL}/${modalData.paste?.short_link}`}
                  disabled={true}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={modalData.hasError ? "primary" : "secondary"}
            onClick={handleModalClose}
            className="me-2"
          >
            Close
          </Button>
          {!modalData.hasError && (
            <Button
              variant="primary"
              onClick={() => {
                history.push(`/${modalData.paste?.short_link}`);
              }}
            >
              View Paste
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Container>
        <div className="p-4 mb-4 bg-light rounded-3">
          <div className="mt-2 pt-1">
            <h3 className="display-6" style={{ fontSize: 25, fontWeight: 600 }}>
              New Paste
            </h3>
          </div>

          <div className="pt-1">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Paste Title</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      name="title"
                      placeholder="example title"
                      {...title.bind}
                      style={{
                        fontFamily: "monospace",
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Password <i>(not required)</i>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="example password"
                      {...password.bind}
                      style={{
                        fontFamily: "monospace",
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Expiration Length</Form.Label>
                    <Form.Select
                      name="expirationLength"
                      {...expirationLength.bindSelect}
                      style={{
                        fontFamily: "monospace",
                      }}
                    >
                      {EXPIRATION_LENGTHS.map((entry) => (
                        <option
                          key={entry.value.toString()}
                          value={entry.value.toString()}
                        >
                          {entry.caption}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Content Language</Form.Label>
                    <Form.Select
                      name="language"
                      {...language.bindSelect}
                      style={{
                        fontFamily: "monospace",
                      }}
                    >
                      {LANGUAGES.map((entry) => (
                        <option key={entry.value} value={entry.value}>
                          {entry.caption}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Paste Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="pasteContent"
                    rows={10}
                    style={{ fontFamily: "monospace" }}
                    placeholder={'print("Hello World")'}
                    {...pasteContent.bind}
                  />
                </Form.Group>
              </Row>
            </Form>

            <Row>
              <Col>
                <Button
                  size="lg"
                  variant="danger"
                  className="me-3"
                  onClick={clearPasteData}
                >
                  Clear Form
                </Button>
                <Button
                  size="lg"
                  disabled={!isPasteDataValid()}
                  onClick={handleSubmit}
                >
                  Create Paste
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Insert;
