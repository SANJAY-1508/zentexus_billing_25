import React, { useState } from "react";
import { Button, Table, Row, Col, Nav, Card } from "react-bootstrap";
import { FaSearch,FaFilter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./items.css"
 import { FaFileExcel } from "react-icons/fa";
 import ProModal from "./AdjustItem";
 import AddItem from "./AddItem";
 import AddCate from "./AddCate";
import AddUnit from "./AddUnit";
import AddConvo from "./AddConvo";





function Items() {
  const [activeTab, setActiveTab] = useState("PRODUCT");
  const [showProModal, setShowProModal] = useState(false);
const [showAddItem, setShowAddItem] = useState(false);
const [showCategoryModal, setShowCategoryModal] = useState(false);
const [showUnitModal, setShowUnitModal] = useState(false);
const [showConvoModal, setShowConvoModal] = useState(false);

  return (
    <div id="main" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Top Tabs */}
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
        className="d-flex justify-content-between px-2"
        style={{ height: "50px", alignItems: "center", marginTop: "50px" }}
      >
        {["PRODUCT", "SERVICE", "CATEGORY", "UNITS"].map((tab) => (
          <Nav.Item key={tab}>
            <Nav.Link eventKey={tab} className="text-center flex-grow-1">
              {tab}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <Row
        className="m-0"
        style={{ height: "calc(100vh - 50px)", backgroundColor: "#e9ecef" }}
      >
        {/* Left Panel */}
        <Col md={3} className="d-flex flex-column p-3">
          <Card className="vh-100">
            <Card.Body className="d-flex flex-column p-0">
              <div className="p-3 d-flex justify-content-between align-items-center">
               <FaSearch 
                     
                    />
               
               
                {/* <Button
  variant="warning"
  className="text-white fw-bold px-3"
  onClick={() => {
    if (activeTab === "CATEGORY") setShowCategoryModal(true);
    else setShowAddModal(true);
  }}
>
  {activeTab === "PRODUCT"
    ? "+ Add Item"
    : activeTab === "SERVICE"
    ? "+ Add Service"
    : activeTab === "CATEGORY"
    ? "+ Add Category"
    : `+ Add ${activeTab}`}
</Button> */}
<Button
  variant="warning"
  className="text-white fw-bold px-3"
  onClick={() => {
    if (activeTab === "CATEGORY") setShowCategoryModal(true);
    else if (activeTab === "UNITS") setShowUnitModal(true); // <-- new
    else setShowAddItem(true);
  }}
>
  {activeTab === "PRODUCT"
    ? "+ Add Item"
    : activeTab === "SERVICE"
    ? "+ Add Service"
    : activeTab === "CATEGORY"
    ? "+ Add Category"
    : activeTab === "UNITS"
    ? "+ Add Unit"
    : `+ Add ${activeTab}`}
</Button>


              </div>

              {/* <div className="flex-grow-1 overflow-auto">
                <Table responsive bordered hover size="sm" className="mb-0 text-center" >
                  <thead>
                    <tr>
                      <th>ITEM</th>
                      <th>QUANTITY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>sampleee</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </Table>
              </div> */}
        <Table responsive bordered hover size="sm" className="mb-0 text-start">
  <thead>
    <tr>
      {activeTab === "PRODUCT" ? (
        <>
          <th>ITEM</th>
          <th>QUANTITY</th>
        </>
      ) : activeTab === "SERVICE" ? (
        <th>ITEM</th>
      ) : activeTab === "CATEGORY" ? (
        <>
          <th>CATEGORY</th>
          <th>ITEM</th>
        </>
      ):(
        <>
        <th>FULL NAME</th>
        <th>SHORT NAME</th>
        </>
      )}
    </tr>
  </thead>

  <tbody>
    {activeTab === "PRODUCT" ? (
      <tr>
        <td>sampleee</td>
        <td>0</td>
      </tr>
    ) : activeTab === "SERVICE" ? (
      <tr>
        <td>serviceee</td>
      </tr>
    ) : activeTab === "CATEGORY" ? (
      <tr>
        <td>Items not in category</td>
       <td>2</td>
      </tr>
    ):(
      <>
      <tr>
        <td>Bags</td>
        <td>Bag</td>
      </tr>
       <tr>
        <td>Bottles</td>
        <td>Btl</td>
      </tr>
      
      </>
    )}
  </tbody>
</Table>


            </Card.Body>
          </Card>
        </Col>

        {/* Right Panel */}
        <Col
          md={9}
          className="p-3 d-flex flex-column"
          style={{ height: "100%" }}
        >
          {/* Details Card */}
          {activeTab === "PRODUCT" && (
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3  mt-0">
                  <div>
                    <h6 className="fw-bold mb-1">SAMPLEEE</h6>
                    <div className="small mb-1">
                      SALE PRICE: <span className="text-success"> ₹ 0.00 </span>
                      (excl)
                    </div>
                    <div className="small mb-1">
                      PURCHASE PRICE:{" "}
                      <span className="text-success"> ₹ 0.00 </span>(excl)
                    </div>
                  </div>
                  <div className="text-end">
                    
                    <Button
  variant="primary bg-primary p-3"
  className="mb-2 fw-semibold text-white"
  style={{ borderRadius: "6px" }}
  onClick={() => setShowProModal(true)} // <-- show modal
>
  ADJUST ITEM
</Button>

                    <div className="small fw-normal">
                      <span className="text-danger"> ⚠ </span> STOCK QUANTITY:{" "}
                      <span className="text-danger">0</span>
                    </div>
                    <div className="small fw-normal">
                      STOCK VALUE:{" "}
                      <span className="text-success"> ₹ 0.00 </span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {activeTab === "SERVICE" && (
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3  mt-0">
                  <div>
                    <h6 className="fw-bold mb-1">SAMPLE SERVICE</h6>
                    <div className="small mb-1">
                      Sale Price: <span className="text-success"> ₹ 0.00 </span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
          {activeTab === "CATEGORY" && (
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3 mt-0">
                  <div>
                    <h6 className="fw-bold mb-1">ITEMS NOT IN ANY CATEGORY</h6>
                    <div className="small mb-1">2</div>
                  </div>
                  <div className="text-end">
                    <Button
                      variant="primary bg-primary p-3"
                      className="mb-2 fw-semibold text-white"
                      style={{ borderRadius: "6px" }}
                    >
                      ADJUST ITEM
                    </Button>
                  </div>
                  {/* No adjust button or stock info */}
                </div>
              </Card.Body>
            </Card>
          )}
          {activeTab === "UNITS" && (
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3 mt-0">
                  <div>
                    <h6 className="fw-bold mb-1">BAGS</h6>
                  </div>
                  <div className="text-end">
                    <Button
                      variant="primary bg-primary p-3"
                      className="mb-2 fw-semibold text-white"
                      style={{ borderRadius: "6px" }}
                       onClick={() => setShowConvoModal(true)} 
                    >
                      ADD CONVERSATION
                    </Button>
                  </div>
                  {/* No adjust button or stock info */}
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Transactions Card */}
          <Card className="flex-grow-1 d-flex flex-column ">
            <Card.Body className="d-flex flex-column h-100 p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">TRANSACTIONS</h5>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "8px" }}
                >
                  {/* Search Input with icon inside */}
                  <div style={{ position: "relative", width: "200px" }}>
                    <FaSearch
                      style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "gray",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      type="text"
                      className="form-control form-control-sm bg-white"
                      style={{
                        paddingLeft: "30px",
                        borderColor: "transparent",
                      }}
                    />
                  </div>
           

<Button variant="light">
  <FaFileExcel size={20} color="#217346" />
</Button>

                </div>
              </div>

              {/* Tables for each tab */}
              {activeTab === "PRODUCT" && (
                <Table responsive bordered hover size="sm" className="pro-table text-center mt-auto" >
                  <thead >
                    <tr >
                      <th >TYPE<FaFilter className="fa-filter"/></th>
                      <th>INVOICE <FaFilter className="fa-filter"/></th>
                      <th>NAME<FaFilter className="fa-filter"/></th>
                      <th>DATE<FaFilter className="fa-filter"/></th>
                      <th>QUANTITY<FaFilter className="fa-filter"/></th>
                      <th>PRICE<FaFilter className="fa-filter"/></th>
                      <th>STATUS<FaFilter className="fa-filter"/></th>
                    </tr>
                  </thead>
                </Table>
              )}

              {activeTab === "SERVICE" && (
                <Table responsive bordered hover size="sm" className="pro-table text-center mt-auto">
                  <thead>
                    <tr>
                      <th>TYPE <FaFilter className="fa-filter"/></th>
                      <th>INVOICE <FaFilter className="fa-filter"/></th>
                      <th>NAME <FaFilter className="fa-filter"/></th>
                      <th>DATE <FaFilter className="fa-filter"/></th>
                      <th>QUANTITY <FaFilter className="fa-filter"/></th>
                      <th>PRICE <FaFilter className="fa-filter"/></th>
                      <th>STATUS <FaFilter className="fa-filter"/></th>
                    </tr>
                  </thead>
                </Table>
              )}

              {activeTab === "CATEGORY" && (
                <Table responsive bordered
                  hover
                  size="sm"
                  className="pro-table text-center mt-auto text-muted"
                >
                  <thead>
                    <tr>
                      <th>NAME <FaFilter className="fa-filter"/></th>
                      <th>QUANTITY <FaFilter className="fa-filter"/></th>
                      <th>STOCK VALUE <FaFilter className="fa-filter"/></th>
                    </tr>
                    <tr>
                      <td>Sampleee</td>
                      <td className="text-danger">0</td>
                      <td className="text-success">₹ 0.00</td>
                    </tr>
                    <tr>
                      <td>Service</td>
                      <td className="text-danger">0</td>
                      <td className="text-success">₹ 0.00</td>
                    </tr>
                  </thead>
                </Table>
              )}

              {activeTab === "UNITS" && (
                <Table responsive bordered hover size="sm" className="pro-table mt-auto">
                  <thead>
                    <tr>
                      <th>CONVERSION </th>
                    </tr>
                  </thead>
                </Table>
              )}

              {/* Centered No Rows */}
              <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <span className="text-muted">No Rows to Show</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ProModal
  show={showProModal}
  onHide={() => setShowProModal(false)}
  itemName="SAMPLEEE" 
/>
{/* <AddModal show={showAddModal} onHide={() => setShowAddModal(false)} />
 */}
 <AddItem
  show={showAddItem}
  onHide={() => setShowAddItem(false)}
  activeTab={activeTab}
/>


<AddCate
  show={showCategoryModal}
  onHide={() => setShowCategoryModal(false)}
/>
<AddUnit
  show={showUnitModal}
  onHide={() => setShowUnitModal(false)}
/>
<AddConvo
  show={showConvoModal}
  onHide={() => setShowConvoModal(false)}
/>

    </div>
  );
}

export default Items;
