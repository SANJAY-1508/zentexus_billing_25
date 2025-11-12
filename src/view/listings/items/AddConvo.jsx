// AddConvo.jsx
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./items.css";

function AddConvo({ show, onHide }) {
  const [baseUnit, setBaseUnit] = useState("");
  const [rate, setRate] = useState("");
  const [secondaryUnit, setSecondaryUnit] = useState("");

  const handleSave = () => {
    if (!baseUnit || !rate || !secondaryUnit) return;
    console.log({ baseUnit, rate, secondaryUnit });
    setBaseUnit(""); setRate(""); setSecondaryUnit("");
    onHide();
  };

  return (
    <Modal
  show={show}
  onHide={onHide}
  centered
  dialogClassName="square-modal"
  backdropClassName="transparent-backdrop" // <-- add this
  backdrop="static" // optional: prevent clicking outside to close
>

      {/* Header */}
      <Modal.Header className="bg-primary text-white">
        <Modal.Title className="fw-bold m-0">Add Conversation</Modal.Title>
        <Button variant="light" className="text-dark fs-4 p-0" onClick={onHide}>×</Button>
      </Modal.Header>

      {/* Body */}
      <Modal.Body>
        <Form>
          <Row className="align-items-center">
            <Col>
              <Form.Select value={baseUnit} onChange={(e) => setBaseUnit(e.target.value)}>
                <option value="">Base Unit</option>
                <option value="Bag">Bag</option>
                <option value="Bottle">Bottle</option>
              </Form.Select>
            </Col>

            <Col xs="auto" className="text-center fw-bold">=</Col>

            <Col>
              <Form.Control
                type="number"
                placeholder="Rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Col>

            <Col>
              <Form.Select value={secondaryUnit} onChange={(e) => setSecondaryUnit(e.target.value)}>
                <option value="">Secondary Unit</option>
                <option value="Bag">Bag</option>
                <option value="Bottle">Bottle</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddConvo;
