// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Row,
//   Col,
//   Modal,
//   Form,
//   Tabs,
//   Tab,
//   Card,
// } from "react-bootstrap";
// import { FaCamera, FaCog } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "./items.css";

// function AddItem({ show, onHide, activeTab = "PRODUCT" }) {
//   // 'type' matches the toggle style you asked for: "add" => product, "reduce" => service
//   const [type, setType] = useState("add");
//   const [activePricingTab, setActivePricingTab] = useState("pricing");
//   const [stockDate, setStockDate] = useState(new Date());

//   // sync initial mode with parent activeTab
//   useEffect(() => {
//     if (activeTab === "SERVICE") setType("reduce");
//     else setType("add");
//   }, [activeTab, show]);

//   const isProduct = type === "add";
//   const namePlaceholder = isProduct ? "Item Name *" : "Service Name *";
//   const hsnPlaceholder = isProduct ? "Item HSN" : "Service HSN";
//   const codePlaceholder = isProduct ? "Item Code" : "Service Code";

//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       centered
//       backdrop="static"
//       dialogClassName="add-item"
//     >
//       <Modal.Header className="border-0 pb-1 align-items-start">
//         <div className="w-100 d-flex justify-content-between align-items-start">
//           <Modal.Title className="h5 fw-bold d-flex align-items-center gap-2">
//             {isProduct ? "Add Item" : "Add Service"}

//             <div
//               className="d-flex position-relative "
//               style={{
//                 width: "180px", // a little wider for spacing
//                 borderRadius: "50px",
//                 padding: "2px",
//                 gap: "6px", // add gap between buttons
//                 border: "transparent",
//               }}
//             >
//               {/* sliding background */}
//               <div
//                 className="position-absolute bg-primary"
//                 style={{
//                   width: "calc(50% - 2px)", // reduce width to leave gap
//                   height: "100%",
//                   borderRadius: "50px",
//                   transition: "transform 0.3s",
//                   transform:
//                     type === "add" ? "translateX(0%)" : "translateX(100%)",
//                   border: "transparent",
//                 }}
//               />

//               {/* Buttons */}
//               <Button
//                 variant="transparent"
//                 className={`flex-grow-1 ${
//                   type === "add" ? "text-white" : "text-primary"
//                 }`}
//                 onClick={() => setType("add")}
//                 style={{ zIndex: 1, borderRadius: "50px" }}
//               >
//                 Product
//               </Button>
//               <Button
//                 variant="transparent"
//                 className={`flex-grow-1 ${
//                   type === "reduce" ? "text-white" : "text-primary"
//                 }`}
//                 onClick={() => setType("reduce")}
//                 style={{ zIndex: 1, borderRadius: "50px" }}
//               >
//                 Service
//               </Button>
//             </div>

//             {/* ================================ */}
//           </Modal.Title>

//           <div className="d-flex gap-3">
//             <Button variant="light" className="text-dark p-0  bg-white">
//               <FaCog />
//             </Button>
//             <Button
//               variant="light"
//               className="text-dark fs-2  bg-white"
//               onClick={onHide}
//             >
//               ×
//             </Button>
//           </div>
//         </div>
//       </Modal.Header>

//       <Modal.Body className="pt-2">
//         {/* Top Row */}
//         <Row className="mb-4 g-3">
//           <Col md={3}>
//             <Form.Control
//               className="white-input"
//               placeholder={namePlaceholder}
//             />
//           </Col>
//           <Col md={3}>
//             <Form.Control
//               className="white-input"
//               placeholder={hsnPlaceholder}
//             />
//           </Col>
//           <Col md={2}>
//             <Button
//               variant="light"
//               className="w-100 text-primary"
//               style={{ backgroundColor: "#cce7f3" }}
//             >
//               Select Unit
//             </Button>
//           </Col>
//           <Col md={3}>
//             <Button
//               variant="link"
//               className="text-primary d-flex align-items-center gap-1"
//             >
//               <FaCamera /> Add Item Image
//             </Button>
//           </Col>
//         </Row>

//         {/* Category & Code */}
//         <Row className="mb-4 g-3">
//           <Col md={3}>
//             <Form.Select className="white-input">
//               <option>Category</option>
//             </Form.Select>
//           </Col>
//           <Col md={3} className="position-relative">
//             <Form.Control
//               placeholder={codePlaceholder}
//               className="white-input"
//             />
//             <Button
//               variant="light"
//               size="sm"
//               className="position-absolute end-0 top-0 me-1 m-1 text-primary border p-1"
//               style={{ backgroundColor: "#cce7f3" }}
//             >
//               Assign Code
//             </Button>
//           </Col>
//         </Row>

//         {/* Tabs: show Stock tab only for products */}
//         <Tabs
//           activeKey={activePricingTab}
//           onSelect={(k) => setActivePricingTab(k)}
//           className="mb-3 border-bottom"
//           justify
//         >
//           {/* Pricing tab always present */}
//           <Tab
//             eventKey="pricing"
//             title={
//               <span
//                 style={{
//                   color: activePricingTab === "pricing" ? "#dc3545" : "#6c757d",
//                 }}
//               >
//                 Pricing
//               </span>
//             }
//           >
//             <div className="pt-3">
//               {/* Sale Price card (present for both product & service) */}
//               <Card
//                 className="p-5 mb-3 shadow-sm"
//                 style={{ backgroundColor: "#f2f2f2" }}
//               >
//                 <h6 className="mb-3">Sale Price</h6>
//                 <Row className="g-2 p-3">
//                   <Col md={3}>
//                     <Form.Control
//                       className="white-input"
//                       placeholder="Sale Price"
//                     />
//                   </Col>
//                   <Col md={3}>
//                     <Form.Select className="white-input">
//                       <option>Without Tax</option>
//                       <option>With Tax</option>
//                     </Form.Select>
//                   </Col>
//                   <Col md={3}>
//                     <Form.Control
//                       className="white-input"
//                       placeholder="Disc. On Sale Price"
//                     />
//                   </Col>
//                   <Col md={3}>
//                     <Form.Select className="white-input">
//                       <option>Percentage</option>
//                       <option>Amount</option>
//                     </Form.Select>
//                   </Col>

//                   <Button
//                     variant="link"
//                     className="text-primary d-flex align-items-end gap-1"
//                   >
//                     + Add wholesale price
//                   </Button>
//                 </Row>
//               </Card>

//               {/* If product: show Purchase + Taxes (two cards) */}
//               {isProduct ? (
//                 <>
//                   <Row className="g-3">
//                     <Col md={6}>
//                       <Card
//                         className="p-4 shadow-sm h-100"
//                         style={{ backgroundColor: "#f2f2f2" }}
//                       >
//                         <h6 className="mb-3">Purchase Price</h6>
//                         <Row className="g-2 p-2">
//                           <Col md={6}>
//                             <Form.Control
//                               className="white-input"
//                               placeholder="Purchase Price"
//                             />
//                           </Col>
//                           <Col md={6}>
//                             <Form.Select className="white-input">
//                               <option>Without Tax</option>
//                               <option>With Tax</option>
//                             </Form.Select>
//                           </Col>
//                         </Row>
//                       </Card>
//                     </Col>

//                     <Col md={6}>
//                       <Card
//                         className="p-4 shadow-sm h-100"
//                         style={{ backgroundColor: "#f2f2f2" }}
//                       >
//                         <h6 className="mb-3">Taxes</h6>
//                         <Form.Select className="white-input">
//                           <option>Tax Rate</option>
//                           <option>None</option>
//                           <option>IGST @0.25%</option>
//                         </Form.Select>
//                       </Card>
//                     </Col>
//                   </Row>
//                 </>
//               ) : (
//                 /* service: show Taxes card only next to sale price (no Purchase) */
//                 <Row className="g-3 ">
//                   <Col md={12}>
//                     <Card
//                       className="p-4 shadow-sm h-100"
//                       style={{ backgroundColor: "#f2f2f2" }}
//                     >
//                       <h6 className="mb-3">Taxes</h6>
//                       <Form.Select
//                         className="white-input "
//                         style={{ width: "10%" }}
//                       >
//                         <option>Tax Rate</option>
//                         <option>None</option>
//                         <option>IGST @0.25%</option>
//                       </Form.Select>
//                     </Card>
//                   </Col>
//                 </Row>
//               )}
//             </div>
//           </Tab>

//           {/* Stock tab only when adding product */}
//           {isProduct && (
//             <Tab eventKey="stock" title="Stock">
//               <div className="pt-4">
//                 <Card className="p-4 " style={{ border: "none" }}>
//                   <Row className="g-3">
//                     <Col md={2}>
//                       <Form.Control
//                         className="white-input"
//                         placeholder="Opening Qty"
//                       />
//                     </Col>
//                     <Col md={2}>
//                       <Form.Control
//                         className="white-input"
//                         placeholder="At Price"
//                       />
//                     </Col>
//                     <Col md={3}>
//                       <DatePicker
//                         selected={stockDate}
//                         onChange={(date) => setStockDate(date)}
//                         className="form-control white-input"
//                         dateFormat="dd/MM/yyyy"
//                       />
//                     </Col>
//                     <Col md={2}>
//                       <Form.Control
//                         className="white-input"
//                         placeholder="Min Stock"
//                       />
//                     </Col>
//                     <Col md={3}>
//                       <Form.Control
//                         className="white-input"
//                         placeholder="Location"
//                       />
//                     </Col>
//                   </Row>
//                 </Card>
//               </div>
//             </Tab>
//           )}
//         </Tabs>
//       </Modal.Body>

//       <Modal.Footer className="border-0 justify-content-end bg-light">
//         <Button variant="outline-secondary" className="me-2">
//           Save & New
//         </Button>
//         <Button variant="primary">Save</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default AddItem;




import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Modal,
  Form,
  Tabs,
  Tab,
  Card,
} from "react-bootstrap";
import { FaCamera, FaCog } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../listings/Items/items.css";


// 💡 Added units prop
function AddItem({ show, onHide, activeTab = "PRODUCT", categories = [], units = [] }) { 
  // 'type' matches the toggle style you asked for: "add" => product, "reduce" => service
  const [type, setType] = useState("add");
  const [activePricingTab, setActivePricingTab] = useState("pricing");
  const [stockDate, setStockDate] = useState(new Date());
  // New state to hold the selected unit
  const [selectedUnit, setSelectedUnit] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("");




  
  // sync initial mode with parent activeTab
  useEffect(() => {
    if (activeTab === "SERVICE") setType("reduce");
    else setType("add");
  }, [activeTab, show]);

  // Set the first unit as default when units change and modal opens
  useEffect(() => {
    if (show && units.length > 0) {
        setSelectedUnit(units[0].unit_name);
    }
  }, [show, units]);

  const isProduct = type === "add";
  const namePlaceholder = isProduct ? "Item Name *" : "Service Name *";
  const hsnPlaceholder = isProduct ? "Item HSN" : "Service HSN";
  const codePlaceholder = isProduct ? "Item Code" : "Service Code";

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      dialogClassName="add-item"
    >
      <Modal.Header className="border-0 pb-1 align-items-start">
        <div className="w-100 d-flex justify-content-between align-items-start">
          <Modal.Title className="h5 fw-bold d-flex align-items-center gap-2">
            {isProduct ? "Add Item" : "Add Service"}

            <div
              className="d-flex position-relative "
              style={{
                width: "180px", // a little wider for spacing
                borderRadius: "50px",
                padding: "2px",
                gap: "6px", // add gap between buttons
                border: "transparent",
              }}
            >
              {/* sliding background (unchanged) */}
              <div
                className="position-absolute bg-primary"
                style={{
                  width: "calc(50% - 2px)", // reduce width to leave gap
                  height: "100%",
                  borderRadius: "50px",
                  transition: "transform 0.3s",
                  transform:
                    type === "add" ? "translateX(0%)" : "translateX(100%)",
                  border: "transparent",
                }}
              />

              {/* Buttons (unchanged) */}
              <Button
                variant="transparent"
                className={`flex-grow-1 ${
                  type === "add" ? "text-white" : "text-primary"
                }`}
                onClick={() => setType("add")}
                style={{ zIndex: 1, borderRadius: "50px" }}
              >
                Product
              </Button>
              <Button
                variant="transparent"
                className={`flex-grow-1 ${
                  type === "reduce" ? "text-white" : "text-primary"
                }`}
                onClick={() => setType("reduce")}
                style={{ zIndex: 1, borderRadius: "50px" }}
              >
                Service
              </Button>
            </div>
          </Modal.Title>

          <div className="d-flex gap-3">
            <Button variant="light" className="text-dark p-0  bg-white">
              <FaCog />
            </Button>
            <Button
              variant="light"
              className="text-dark fs-2  bg-white"
              onClick={onHide}
            >
              ×
            </Button>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="pt-2">
        {/* Top Row */}
        <Row className="mb-4 g-3">
          <Col md={3}>
            <Form.Control
              className="white-input"
              placeholder={namePlaceholder}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              className="white-input"
              placeholder={hsnPlaceholder}
            />
          </Col>
          {/* Unit Dropdown - Updated to display fetched units */}
          <Col md={2}>
            <Form.Select 
              className="white-input text-primary"
              style={{ backgroundColor: "#cce7f3" }}
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              <option value="" disabled>Select Unit</option>
              {units.map((unit, index) => (
                <option key={index} value={unit.unit_name}>
                  {unit.unit_name} ({unit.short_name})
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button
              variant="link"
              className="text-primary d-flex align-items-center gap-1"
            >
              <FaCamera /> Add Item Image
            </Button>
          </Col>
        </Row>

        {/* Category & Code (unchanged) */}
        <Row className="mb-4 g-3">
       <Col md={4}>
                    {/* <Form.Label className="text-primary">Category</Form.Label> */}
                    <Form.Select 
                      className="white-input"
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)} 
                    >
                      <option value="">-- Select Category --</option>
                      {/* ✅ Safe Mapping: Uses the categories prop */}
                      {categories.map((category) => (
                        <option 
                          key={category.id} 
                          value={category.id} 
                        >
                          {category.category_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
          <Col md={3} className="position-relative">
            <Form.Control
              placeholder={codePlaceholder}
              className="white-input"
            />
            <Button
              variant="light"
              size="sm"
              className="position-absolute end-0 top-0 me-1 m-1 text-primary border p-1"
              style={{ backgroundColor: "#cce7f3" }}
            >
              Assign Code
            </Button>
          </Col>
        </Row>

        {/* Tabs: Pricing & Stock (unchanged) */}
        <Tabs
          activeKey={activePricingTab}
          onSelect={(k) => setActivePricingTab(k)}
          className="mb-3 border-bottom"
          justify
        >
          {/* Pricing tab always present (unchanged content) */}
          <Tab
            eventKey="pricing"
            title={
              <span
                style={{
                  color: activePricingTab === "pricing" ? "#dc3545" : "#6c757d",
                }}
              >
                Pricing
              </span>
            }
          >
            <div className="pt-3">
              {/* Sale Price card (unchanged) */}
              <Card
                className="p-5 mb-3 shadow-sm"
                style={{ backgroundColor: "#f2f2f2" }}
              >
                <h6 className="mb-3">Sale Price</h6>
                <Row className="g-2 p-3">
                  <Col md={3}>
                    <Form.Control
                      className="white-input"
                      placeholder="Sale Price"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Select className="white-input">
                      <option>Without Tax</option>
                      <option>With Tax</option>
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      className="white-input"
                      placeholder="Disc. On Sale Price"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Select className="white-input">
                      <option>Percentage</option>
                      <option>Amount</option>
                    </Form.Select>
                  </Col>

                  <Button
                    variant="link"
                    className="text-primary d-flex align-items-end gap-1"
                  >
                    + Add wholesale price
                  </Button>
                </Row>
              </Card>

              {/* Purchase + Taxes or Taxes only (unchanged) */}
              {isProduct ? (
                <>
                  <Row className="g-3">
                    <Col md={6}>
                      <Card
                        className="p-4 shadow-sm h-100"
                        style={{ backgroundColor: "#f2f2f2" }}
                      >
                        <h6 className="mb-3">Purchase Price</h6>
                        <Row className="g-2 p-2">
                          <Col md={6}>
                            <Form.Control
                              className="white-input"
                              placeholder="Purchase Price"
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Select className="white-input">
                              <option>Without Tax</option>
                              <option>With Tax</option>
                            </Form.Select>
                          </Col>
                        </Row>
                      </Card>
                    </Col>

                    <Col md={6}>
                      <Card
                        className="p-4 shadow-sm h-100"
                        style={{ backgroundColor: "#f2f2f2" }}
                      >
                        <h6 className="mb-3">Taxes</h6>
                        <Form.Select className="white-input">
                          <option>Tax Rate</option>
                          <option>None</option>
                          <option>IGST @0.25%</option>
                        </Form.Select>
                      </Card>
                    </Col>
                  </Row>
                </>
              ) : (
                /* service: show Taxes card only next to sale price (no Purchase) */
                <Row className="g-3 ">
                  <Col md={12}>
                    <Card
                      className="p-4 shadow-sm h-100"
                      style={{ backgroundColor: "#f2f2f2" }}
                    >
                      <h6 className="mb-3">Taxes</h6>
                      <Form.Select
                        className="white-input "
                        style={{ width: "10%" }}
                      >
                        <option>Tax Rate</option>
                        <option>None</option>
                        <option>IGST @0.25%</option>
                      </Form.Select>
                    </Card>
                  </Col>
                </Row>
              )}
            </div>
          </Tab>

          {/* Stock tab only when adding product (unchanged content) */}
          {isProduct && (
            <Tab eventKey="stock" title="Stock">
              <div className="pt-4">
                <Card className="p-4 " style={{ border: "none" }}>
                  <Row className="g-3">
                    <Col md={2}>
                      <Form.Control
                        className="white-input"
                        placeholder="Opening Qty"
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        className="white-input"
                        placeholder="At Price"
                      />
                    </Col>
                    <Col md={3}>
                      <DatePicker
                        selected={stockDate}
                        onChange={(date) => setStockDate(date)}
                        className="form-control white-input"
                        dateFormat="dd/MM/yyyy"
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        className="white-input"
                        placeholder="Min Stock"
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        className="white-input"
                        placeholder="Location"
                      />
                    </Col>
                  </Row>
                </Card>
              </div>
            </Tab>
          )}
        </Tabs>
      </Modal.Body>

      <Modal.Footer className="border-0 justify-content-end bg-light">
        <Button variant="outline-secondary" className="me-2">
          Save & New
        </Button>
        <Button variant="primary">Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddItem;