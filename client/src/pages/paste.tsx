import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Highlight from "react-highlight";

import { Paste } from "../lib";

const PasteContent = ({
  text,
  language,
}: {
  text: string | undefined;
  language: string;
}) => {
  if (text === undefined) return <p className="m-0">Paste Content</p>;
  else if (language === "raw") return <p className="m-0">{text}</p>;
  else if (language === "markdown") return <ReactMarkdown children={text} />;
  else return <Highlight className={language}>{text}</Highlight>;
};

const PastePage = () => {
  const { shortLink } = useParams<{ shortLink: string }>();
  let history = useHistory();

  const [initialComplete, setInitialComplete] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("password");

  const [data, setData] = useState<{
    hasError: boolean;
    err?: any;
    paste?: TServerPaste;
  }>({
    hasError: false,
    err: {
      code: "RequestNotSent",
    },
    paste: {
      password: "",
      paste_path: "loading...",
      expiration_time: Date.now(),
      created_at: Date.now(),
      language: "raw",
      title: "Loading...",
      short_link: "loading...",
      has_password: false,
      read_count: 0,
      paste_content: "loading...",
    },
  });

  const getFormattedTime = (time: number) => {
    return new Date(time).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const fetchPaste = async () => {
    setInitialComplete(true);
    let result = await Paste.get({ shortLink, password });
    if (!result.paste) {
      result.paste = data.paste;
    }
    setData(result);
  };

  const submitPassword = () => {
    fetchPaste();
  };

  const pasteNotExists = () => {
    const exists = !(
      data.err?.code === "PasteDoesNotExist" ||
      data.err?.code === "PasteExpired"
    );
    if (!exists) {
      console.log(data);
      history.push("/404");
    }
    return false;
  };

  useEffect(() => {
    if (!initialComplete) {
      fetchPaste();
    }
  });

  return (
    <>
      {pasteNotExists() && <></>}

      <Modal show={data.hasError && data.err?.code !== "IncorrectPassword"}>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="m-0">
            <b>Code</b>: {data.err?.code || "ServerError"}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              history.push("/");
            }}
          >
            Back Home
          </Button>
          <Button variant="primary" onClick={fetchPaste}>
            Retry
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={data.err?.code === "IncorrectPassword"}>
        <Modal.Header>
          <Modal.Title>Incorrect Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>A password is required to view this paste.</p>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder={"enter password here..."}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              style={{
                fontFamily: "monospace",
              }}
            />
          </Form.Group>
          <small className="text-danger">Incorrect password.</small>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setPassword("")}
            disabled={password === ""}
          >
            Clear Password
          </Button>
          <Button
            variant="primary"
            onClick={submitPassword}
            disabled={password === ""}
          >
            Submit Password
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="mb-4">
        <div className="p-4 mb-4 bg-light rounded-3">
          <div className="pt-1">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Paste Title</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      size="lg"
                      value={data.paste?.title || "Paste Title"}
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
                    <Form.Label>Read Count</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="readCount"
                      value={data.paste?.read_count || 0}
                      style={{
                        fontFamily: "monospace",
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Creation Time</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="creationTime"
                      value={getFormattedTime(data.paste?.created_at || 0)}
                      style={{
                        fontFamily: "monospace",
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Expiration Time</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      name="expirationTime"
                      value={getFormattedTime(data.paste?.expiration_time || 0)}
                      style={{
                        fontFamily: "monospace",
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Paste Content</Form.Label>
                  <div
                    className="w-100 bg-white rounded-3 border py-3 px-3"
                    style={{ fontFamily: "monospace" }}
                  >
                    <PasteContent
                      text={
                        data.paste?.has_password
                          ? Paste.decryptData(
                              data.paste?.paste_content,
                              password
                            )
                          : data.paste?.paste_content
                      }
                      language={data.paste?.language || "raw"}
                    />
                  </div>
                </Form.Group>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PastePage;
