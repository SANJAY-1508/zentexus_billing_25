
import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./items.css";

function AddUnit({ show, onHide }) {
//   const [unitName, setUnitName] = useState("");
//   const [shortName, setShortName] = useState("");

//   const handleSave = () => {
//     if (!unitName.trim() || !shortName.trim()) return;
//     console.log("Saved:", { unitName, shortName });
//     setUnitName("");
//     setShortName("");
//     onHide();
//   };

//   const handleSaveNew = () => {
//     if (!unitName.trim() || !shortName.trim()) return;
//     console.log("Saved & New:", { unitName, shortName });
//     setUnitName("");
//     setShortName("");
//   };

  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{
        backgroundColor: "grey",
      }}
      // 👈 unique backdrop
      dialogClassName="addunit-top-modal"
      centered={false}
    >
      <Modal.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3 ">
          <h5 className="fw-bold m-0">New Unit</h5>
          <Button
            variant="light"
            className="text-dark fs-3 p-0"
            onClick={onHide}
          >
            ×
          </Button>
        </div>

        {/* Form */}
        <Form>
          <Row className="mb-3 ">
            <Col md={7}>
              <Form.Label className="text-primary">Unit Name</Form.Label>
              <Form.Control
                type="text"
                // value={unitName}
                // onChange={(e) => setUnitName(e.target.value)}
                className="bg-white"
              />
            </Col>
            <Col md={3}>
              <Form.Label className="text-primary">Short Name</Form.Label>
              <Form.Control
                type="text"
                // value={shortName}
                // onChange={(e) => setShortName(e.target.value)}
                placeholder="ShortName"
                className="bg-white"
              />
            </Col>
          </Row>
        </Form>

        {/* Footer */}
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button className="add-unit-btn px-4 py-2" >
            Save & New
          </Button>
          <Button className=" add-unit-btn px-4 py-2" >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddUnit;
