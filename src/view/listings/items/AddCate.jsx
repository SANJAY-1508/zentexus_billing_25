// AddCategoryModal.jsx
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddCate({ show, onHide }) {
//   const [categoryName, setCategoryName] = useState("");

//   const handleCreate = () => {
//     if (categoryName.trim() === "") return;
//     console.log("Category created:", categoryName);
//     setCategoryName("");
//     onHide();
//   };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" dialogClassName="category" >
     
<Modal.Header className="border-0 d-flex justify-content-between align-items-center p-3">
  <Modal.Title className="fw-bold m-0">Add Category</Modal.Title>
  <Button variant="light" className="text-dark fs-3 p-0 m-3" onClick={onHide}>
    ×
  </Button>
</Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label className="text-muted">Enter Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Groceries"
            className="bg-white "
            // value={categoryName}
            // onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer className="border-0 align-items-center justify-content-center p-4 ">
        <Button
          variant="danger"
        //   onClick={handleCreate}
          style={{ borderRadius: "20px" ,alignItems:"center",width:"80%",padding:"10px"}}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCate;
