// import React, { useState } from "react";
// import { Modal, Button, Form, Row, Col } from "react-bootstrap";

// function AddUnit({ show, onHide }) {
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

//   return (
//     <div className="unit">
//     <Modal 
//       show={show}
//       onHide={onHide}
//       centered={false}
//       backdrop="static"
//       dialogClassName="w-100" // full width
//   contentClassName="h-100 m-0"
//       style={{width:"100%",backgroundColor:"grey" ,marginRight:"0" }}
      
//     >
//       {/* Header */}
//       <Modal.Header className="border-0 d-flex justify-content-between align-items-center p-3 border-bottom">
//         <Modal.Title className="fw-bold m-0">New Unit</Modal.Title>
//         <Button variant="light" className="text-dark fs-3 p-0" onClick={onHide}>
//           ×
//         </Button>
//       </Modal.Header>

//       {/* Body */}
//       <Modal.Body>
//         <Form>
//           <Row className="mb-3">
//             <Col md={6} className="d-flex flex-column">
//               <Form.Label className="mb-1 text-primary">Unit Name</Form.Label>
//               <Form.Control
//                 type="text"
               
//                 value={unitName}
//                 onChange={(e) => setUnitName(e.target.value)}
//                 style={{ border: "none", borderBottom: "1px solid #000", borderRadius: 0 }}
//               />
//             </Col>
//             <Col md={6} className="d-flex flex-column">
//               <Form.Label className="mb-1 text-primary">Short Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Short Name"
//                 value={shortName}
//                 onChange={(e) => setShortName(e.target.value)}
//                 style={{ border: "none", borderBottom: "1px solid #000", borderRadius: 0 }}
//               />
//             </Col>
//           </Row>
//         </Form>
//       </Modal.Body>

//       {/* Footer */}
//       <Modal.Footer className="border-0 justify-content-end">
//         <Button
//           variant="success"
//           className="me-2"
//           onClick={handleSaveNew}
//         >
//           Save & New
//         </Button>
//         <Button
//           variant="success"
//           onClick={handleSave}
//         >
//           Save
//         </Button>
//       </Modal.Footer>
//     </Modal>
//     </div>
//   );
// }

// export default AddUnit;


// import React, { useState } from "react";
// import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import "./items.css"; // import your CSS

// function AddUnit({ show, onHide }) {
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

//   return (
//   <Modal
//   show={show}
//   onHide={onHide}
//   centered={false}          // not vertically centered, top margin handles it
//   backdrop="static"
//   dialogClassName="unit-modal"  // use your CSS class
// >
//   <Modal.Body>
//     {/* Header */}
//     <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
//       <h5 className="fw-bold m-0">New Unit</h5>
//       <Button variant="light" className="text-dark fs-3 p-0" onClick={onHide}>
//         ×
//       </Button>
//     </div>

//     {/* Body */}
//     <Form>
//       <Row className="mb-3">
//         <Col md={6} className="d-flex flex-column">
//           <Form.Label className="mb-1 text-primary">Unit Name</Form.Label>
//           <Form.Control
//             type="text"
//             value={unitName}
//             onChange={(e) => setUnitName(e.target.value)}
//           />
//         </Col>
//         <Col md={6} className="d-flex flex-column">
//           <Form.Label className="mb-1 text-primary">Short Name</Form.Label>
//           <Form.Control
//             type="text"
//             value={shortName}
//             onChange={(e) => setShortName(e.target.value)}
//           />
//         </Col>
//       </Row>
//     </Form>

//     {/* Footer */}
//     <div className="modal-footer mt-3">
//       <Button variant="success" className="me-2" onClick={handleSaveNew}>
//         Save & New
//       </Button>
//       <Button variant="success" onClick={handleSave}>
//         Save
//       </Button>
//     </div>
//   </Modal.Body>
// </Modal>

//   )}
//   export default AddUnit

import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./items.css"; // your CSS

function AddUnit({ show, onHide }) {
  const [unitName, setUnitName] = useState("");
  const [shortName, setShortName] = useState("");

  const handleSave = () => {
    if (!unitName.trim() || !shortName.trim()) return;
    console.log("Saved:", { unitName, shortName });
    setUnitName("");
    setShortName("");
    onHide();
  };

  const handleSaveNew = () => {
    if (!unitName.trim() || !shortName.trim()) return;
    console.log("Saved & New:", { unitName, shortName });
    setUnitName("");
    setShortName("");
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered={false} // top margin handles vertical position
      backdrop="static"
      dialogClassName="unit-modal"
    >
      <Modal.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h5 className="fw-bold m-0">New Unit</h5>
          <Button
            variant="light"
            className="text-dark fs-3 p-0"
            onClick={onHide}
          >
            ×
          </Button>
        </div>

        {/* Body */}
        <Form>
          <Row className="mb-3">
            <Col md={6} className="d-flex flex-column">
              <Form.Label className="mb-1 text-primary">Unit Name</Form.Label>
              <Form.Control
                type="text"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                className="unit-input bg-white"
              />
            </Col>
            <Col md={6} className="d-flex flex-column">
              <Form.Label className="mb-1 text-primary">Short Name</Form.Label>
              <Form.Control
                type="text"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                className="unit-input bg-white"
              />
            </Col>
          </Row>
        </Form>

        {/* Footer */}
        <div className="modal-footer mt-3" >
          <Button  className="me-2 p-3 " style={{backgroundColor:"#4a93dcff", color:"white"}} onClick={handleSaveNew}>
            Save & New
          </Button>
          <Button className="me-2 p-3 "  style={{backgroundColor:"#4a93dcff",color:"white"}} onClick={handleSave}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddUnit;
