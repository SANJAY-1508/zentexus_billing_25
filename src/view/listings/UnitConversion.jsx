// AddConvo.jsx
import React, { useState,useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";

function AddConvo({ show, onHide, units = [], onSave }) {
  const [baseUnit, setBaseUnit] = useState("None");
  const [secondaryUnit, setSecondaryUnit] = useState("None");
  const [rate, setRate] = useState("");
  const [showBaseDropdown, setShowBaseDropdown] = useState(false);
  const [showSecondaryDropdown, setShowSecondaryDropdown] = useState(false);
// Add this useEffect right after your state declarations
useEffect(() => {
  if (show) {
    setBaseUnit("None");
    setSecondaryUnit("None");
    setRate("");
  }
}, [show]);
  const getShortCode = (name) => {
    if (!name || name === "None") return "";
    const match = name.match(/\(([^)]+)\)/);
    if (match) return match[1];
    return name.split(" ")[0].toUpperCase();
  };

  const resetForm = () => {
    setBaseUnit("None");
    setSecondaryUnit("None");
    setRate("");
  };

  const handleSave = (andNew = false) => {
    // Validation
    if (baseUnit === "None") {
      toast.error("Please select Base Unit");
      return;
    }
    if (baseUnit === secondaryUnit && secondaryUnit !== "None") {
      toast.error("Base Unit and Secondary Unit cannot be the same!");
      return;
    }
    if (secondaryUnit !== "None" && (!rate || Number(rate) <= 0)) {
      toast.error("Please enter a valid rate");
      return;
    }

    const conversionData = {
      baseUnit,
      secondaryUnit: secondaryUnit === "None" ? null : secondaryUnit,
      rate: secondaryUnit !== "None" ? Number(rate) : null,
      displayText:
        secondaryUnit !== "None"
          ? `1 ${getShortCode(baseUnit)} = ${rate} ${getShortCode(secondaryUnit)}`
          : getShortCode(baseUnit) || baseUnit,
    };

    onSave(conversionData); // This will be handled by parent to add to transaction table
    toast.success("Conversation added successfully!");

    if (andNew) {
      resetForm();
    } else {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="convo">
      {/* Header */}
      <Modal.Header
        className="text-muted border-0 d-flex justify-content-between align-items-center p-3 mb-4"
        style={{ backgroundColor: "rgba(139, 174, 227, 1)" }}
      >
        <Modal.Title className="fw-bold m-0">Add Conversation</Modal.Title>
        <Button
          variant="light"
          className="fs-4 p-0 bg-transparent border-0"
          onClick={onHide}
        >
          ×
        </Button>
      </Modal.Header>

      {/* Body */}
      <Modal.Body>
        <Form>
          <Row className="align-items-center mb-4">
            {/* Base Unit Dropdown */}
            <Col>
              <div className="position-relative">
                <div
                  className="form-control d-flex justify-content-between align-items-center pe-2"
                  style={{ cursor: "pointer", height: 48 }}
                  onClick={() => setShowBaseDropdown(!showBaseDropdown)}
                >
                  <span className={baseUnit === "None" ? "text-muted" : ""}>
                    {baseUnit === "None" ? "Base Unit" : baseUnit}
                  </span>
                  <FaChevronDown />
                </div>
                {showBaseDropdown && (
                  <div
                    className="position-absolute w-100 bg-white border shadow rounded mt-1"
                    style={{ zIndex: 9999, maxHeight: 200, overflow: "auto" }}
                  >
                    {units.map((u) => (
                      <div
                        key={u.unit_id}
                        className="px-3 py-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setBaseUnit(u.unit_name);
                          setShowBaseDropdown(false);
                        }}
                      >
                        {u.unit_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Col>

            <Col xs="auto" className="text-center fw-bold">
              =
            </Col>

            {/* Rate Input */}
            <Col>
              <Form.Control
                type="number"
                placeholder="Rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                min="0.01"
                step="0.01"
              />
            </Col>

            {/* Secondary Unit Dropdown */}
            <Col>
              <div className="position-relative">
                <div
                  className="form-control d-flex justify-content-between align-items-center pe-2"
                  style={{ cursor: "pointer", height: 48 }}
                  onClick={() => setShowSecondaryDropdown(!showSecondaryDropdown)}
                >
                  <span className={secondaryUnit === "None" ? "text-muted" : ""}>
                    {secondaryUnit === "None" ? "Secondary Unit" : secondaryUnit}
                  </span>
                  <FaChevronDown />
                </div>
                {showSecondaryDropdown && (
                  <div
                    className="position-absolute w-100 bg-white border shadow rounded mt-1"
                    style={{ zIndex: 9999, maxHeight: 200, overflow: "auto" }}
                  >
                    <div
                      className="px-3 py-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSecondaryUnit("None");
                        setShowSecondaryDropdown(false);
                        // setRate("");
                      }}
                    >
                      None
                    </div>
                    {units.map((u) => (
                      <div
                        key={u.unit_id}
                        className="px-3 py-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSecondaryUnit(u.unit_name);
                          setShowSecondaryDropdown(false);
                        }}
                      >
                        {u.unit_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button
            className="add-unit-btn px-4 py-2"
            onClick={() => handleSave(true)}
          >
            Save & New
          </Button>
          <Button className="add-unit-btn px-4 py-2" onClick={() => handleSave(false)}>
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default AddConvo;