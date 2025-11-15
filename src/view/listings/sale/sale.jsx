// import React, { useState,useEffect } from "react";
// import {Container,Row, Col, Button, Dropdown, InputGroup,FormControl,Table,Form,}from "react-bootstrap";
// import {FaFilter,FaSearch,FaChartBar,FaPrint,FaFileExcel,FaEllipsisV,FaReply,} from "react-icons/fa";
// import "./sale.css";
// import { useNavigate } from "react-router-dom";
// // import { getParties } from "../../../services/saleService";
// import { getSales } from "../../../services/saleService";
// const Sale = () => {
// const navigate = useNavigate();
// const [isEditing, setIsEditing] = useState(false);
// const [businessName, setBusinessName] = useState("");
// const [invoiceType, setInvoiceType] = useState("Sale Invoices");
// const [selectedPeriod, setSelectedPeriod] = useState("This Month");
// const [selectedFirm, setSelectedFirm] = useState("All Firms");
//   const [salesList, setSalesList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

// const fetchSales = async () => {
//     setLoading(true);
//     try {
//       const data = await getSales(); 
//       setSalesList(data);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching sales list:", err);
//       setError("Failed to fetch sales data. Check API/DB connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSales();
//   }, []);


// return (
//     <div id="main" style={{ backgroundColor: "#DEE2E6", minHeight: "100vh" }}>
//       <Container className="mt-5">
//         <Row>
//           <Col xl={12}>
//             {/* Business Name Row */}
//             <div className="mb-2 d-flex align-items-center">
//               <span
//                style={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}> •</span>
//               {isEditing ? (
//                 <div style={{display: "flex",alignItems: "center", gap: "8px", marginLeft: "8px",}}>
//                  <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Enter Business Name" autoFocus
//                     style={{border: "1px solid #ccc", borderRadius: "6px",padding: "5px 10px",fontSize: "1rem", width: "250px",}}
//                     onKeyDown={(e) => {if (e.key === "Enter") setIsEditing(false);}}/>
//                   {/* Save Button */}
//                   <Button variant="info" onClick={() => {console.log("Saved business:", businessName);
//                     setIsEditing(false);}}
//                   style={{ borderRadius: "6px", fontWeight: 600, color: "white" }}>Save</Button>
//                 </div>):(
//                 <span className="ms-2 text-muted" style={{ cursor: "pointer" }} onClick={() => setIsEditing(true)}>
//                 {businessName || "Enter Business Name"}</span>)}
//               {/* Buttons Section */}
//               <div className="ms-auto d-flex align-items-center gap-2">
//                 <Button variant="danger"
//                   style={{ fontWeight: 600,borderRadius: "20px",minWidth: "110px",}}
//                    onClick={() => navigate("/dashboardsale")}> +Add Sale</Button>
//                 <Button
//                   variant="success"
//                   style={{fontWeight: 600,borderRadius: "20px", minWidth: "110px",}}
//                   onClick={() => navigate("/dashboardpurchase")}>+Add Purchase</Button>
//                 <Button
//                   variant="info"
//                   style={{fontWeight: 600,borderRadius: "20px",minWidth: "110px",color: "white",}}> +Add More</Button>
//                 <Button
//                   variant="light"
//                   style={{ borderRadius: "50%",padding: "0 10px",minWidth: "20px",}}>: </Button>
//               </div>
//             </div>
//             {/* Sale invoices heading */}
//             <Row className="sale-invoice-header align-items-center mb-3">
//               <Col className="d-flex align-items-center gap-1">
//                 <h5 className="m-0">{invoiceType}</h5>
//                 <Dropdown>
//                   <Dropdown.Toggle as="span" className="arrow-dropdown">▼</Dropdown.Toggle>
//                   <Dropdown.Menu>
//                     <Dropdown.Item onClick={() => setInvoiceType("Sale Invoices")}>Sale Invoices</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setInvoiceType("Estimate/Quotation")}> Estimate/Quotation</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setInvoiceType("Proforma Invoice")}>Proforma Invoice</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setInvoiceType("Payment-in")}>Payment-in</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setInvoiceType("Sale Order")}>Sale Order</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setInvoiceType("Delivery Challan")}>Delivery Challan</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setInvoiceType("Sale return")}>Sale Return</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setInvoiceType("Purchase Bill")}> Purchase Bill</Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               </Col>
//             </Row>
//             {/* Filters */}
//             <Row className="filters align-items-center mb-3">
//               <Col xs="auto" className="d-flex align-items-center gap-2">
//                 <Dropdown>
//                   <Dropdown.Toggle as="span" className="arrow-dropdown d-flex align-items-center gap-1">
//                     <span className="text-period">{selectedPeriod}</span> ▼ </Dropdown.Toggle>
//                   <Dropdown.Menu>
//                     <Dropdown.Item onClick={() => setSelectedPeriod("Today")}> Today </Dropdown.Item>
//                     <Dropdown.Item onClick={() => setSelectedPeriod("This Week")}>This Week</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setSelectedPeriod("This Month")}>This Month</Dropdown.Item> 
//                     <Dropdown.Item onClick={() => setSelectedPeriod("This Year")}>This Year</Dropdown.Item>  
//                   </Dropdown.Menu>
//                 </Dropdown>
//               </Col>
//               <Col xs="auto">
//                 <InputGroup size="sm" className="date-range">
//                   <FormControl type="date" defaultValue="2025-11-01" />
//                   <InputGroup.Text>To</InputGroup.Text>
//                   <FormControl type="date" defaultValue="2025-11-30" />
//                 </InputGroup>
//               </Col>
//               <Col xs="auto" className="firm-dropdown">
//                 <Dropdown>
//                   <Dropdown.Toggle as="span" className="custom-dropdown">
//                     {selectedFirm} <span className="dropdown-arrow">▼</span></Dropdown.Toggle>
//                   <Dropdown.Menu>
//                     <Dropdown.Item onClick={() => setSelectedFirm("All Firms")}> All Firms</Dropdown.Item>
//                     <Dropdown.Item onClick={() => setSelectedFirm("My Company")}>My Company </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               </Col>
//             </Row>
//             {/* Sales amount card */}
//             <Row className="mb-4 sale-amount-card">
//               <Col>
//                 <div className="amount-card">
//                   <div className="card-title">Total Sales Amount</div>
//                   <div className="total-amount">₹ 1,000</div>
//                   <div className="growth-label">100% ↑
//                     <div className="growth-subtext">vs last month</div>
//                   </div>
//                   <div className="received-balance">
//                     Received: <b>₹ 1,000 </b> | Balance: <b>₹ 0</b>
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//             {/* Transactions section */}
//             <Row className="transactions-header align-items-center mb-2">
//               <Col>
//                 <div className="transactions-title">Transactions</div>
//               </Col>
//               <Col className="d-flex justify-content-end gap-2">
//                 <Button size="sm" title="Search" className="icon-btn"><FaSearch/></Button>
//                 <Button size="sm" title="Analytics" className="icon-btn"><FaChartBar/></Button>
//                 <Button size="sm" title="Export XLS" className="icon-btn"> <FaFileExcel/></Button>
//                 <Button size="sm" title="Print" className="icon-btn"><FaPrint/></Button>
//               </Col>
//             </Row>
//             <Row>
//               <Col>
//                 <Table responsive  bordered  hover  size="sm" className="transactions-table">
//                 <thead>
//                     <tr>
//                       <th>Date <FaFilter className="filter-icon"/></th>
//                       <th>Invoice No <FaFilter className="filter-icon"/></th>
//                       <th>Party Name <FaFilter className="filter-icon"/></th> 
//                       <th>Transaction <FaFilter className="filter-icon"/></th>
//                       <th>Payment Type <FaFilter className="filter-icon"/></th>
//                       <th>Amount <FaFilter className="filter-icon"/></th>
//                       <th>Balance <FaFilter className="filter-icon"/></th>
//                       <th>Status <FaFilter className="filter-icon"/></th>
//                       <th>Actions <FaFilter className="filter-icon"/></th>
//                     </tr>
//                   </thead>
//                   <tbody>
                    
//                       {loading ? (
//                       <tr><td colSpan="6" className="text-center">Loading sales...</td></tr>
//                     ) : error ? (
//                       <tr><td colSpan="6" className="text-center text-danger">{error}</td></tr>
//                     ) : salesList.length === 0 ? (
//                       <tr><td colSpan="6" className="text-center">No sales found.</td></tr>
//                     ) : (
//                       salesList.map((sale) => (
//                         <tr key={sale.id}>
//                           <td>{sale.invoice_number}</td>
//                           <td>{sale.invoice_date}</td>
//                           {/* Display the customer ID from the DB */}
//                           <td>{sale.customer_id}</td> 
//                           <td>{parseFloat(sale.total_amount).toFixed(2)}</td>
//                           <td>
//                             <Form.Select size="sm" defaultValue={sale.payment_type === 'Credit' ? 'Unpaid' : 'Paid'}>
//                               <option value="Paid">Paid</option>
//                               <option value="Unpaid">Unpaid</option>
//                             </Form.Select>
                       
//                       </td>
//                       <td className="d-flex gap-2 actions-cell">
//                         <Button size="sm" title="Print" className="icon-btn"
//                           style={{backgroundColor: "transparent",border: "none",padding: 0,}}><FaPrint/></Button>
//                         <Button size="sm" title="Share" className="icon-btn"
//                           style={{backgroundColor: "transparent",border: "none",padding: 0,}}><FaReply/></Button>
//                         <Dropdown align="end">
//                           <Dropdown.Toggle size="sm" className="icon-btn dropdown-toggle"
//                             style={{backgroundColor: "transparent", border: "none",padding: 0,}}><FaEllipsisV/>
//                           </Dropdown.Toggle>
//                           <Dropdown.Menu>
//                             <Dropdown.Item>View</Dropdown.Item>
//                             <Dropdown.Item>Edit</Dropdown.Item>
//                             <Dropdown.Item>Delete</Dropdown.Item>
//                           </Dropdown.Menu>
//                         </Dropdown>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Sale;

import React, { useState,useEffect } from "react";
import {Container,Row, Col, Button, Dropdown, InputGroup,FormControl,Table,Form,}from "react-bootstrap";
import {FaFilter,FaSearch,FaChartBar,FaPrint,FaFileExcel,FaEllipsisV,FaReply,} from "react-icons/fa";
import "./sale.css";
import { useNavigate } from "react-router-dom";
// ⭐️ Ensure this path is correct and the function is defined in saleService.jsx
import { getSales } from "../../../services/saleService";

const Sale = () => {
const navigate = useNavigate();
const [isEditing, setIsEditing] = useState(false);
const [businessName, setBusinessName] = useState("");
const [invoiceType, setInvoiceType] = useState("Sale Invoices");
const [selectedPeriod, setSelectedPeriod] = useState("This Month");
const [selectedFirm, setSelectedFirm] = useState("All Firms");
  const [salesList, setSalesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


const fetchSales = async () => {
    setLoading(true);
    try {
      
      const data = await getSales(); 
      setSalesList(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching sales list:", err);
      setError("Failed to fetch sales data. Check API/DB connection.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSales();
  }, []);


return (
    <div id="main" style={{ backgroundColor: "#DEE2E6", minHeight: "100vh" }}>
      <Container className="mt-5">
        <Row>
          <Col xl={12}>
            {/* Business Name Row */}
            <div className="mb-2 d-flex align-items-center">
              <span
               style={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}> •</span>
              {isEditing ? (
                <div style={{display: "flex",alignItems: "center", gap: "8px", marginLeft: "8px",}}>
                 <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Enter Business Name" autoFocus
                    style={{border: "1px solid #ccc", borderRadius: "6px",padding: "5px 10px",fontSize: "1rem", width: "250px",}}
                    onKeyDown={(e) => {if (e.key === "Enter") setIsEditing(false);}}/>
                  {/* Save Button */}
                  <Button variant="info" onClick={() => {console.log("Saved business:", businessName);
                    setIsEditing(false);}}
                  style={{ borderRadius: "6px", fontWeight: 600, color: "white" }}>Save</Button>
                </div>):(
                <span className="ms-2 text-muted" style={{ cursor: "pointer" }} onClick={() => setIsEditing(true)}>
                {businessName || "Enter Business Name"}</span>)}
              {/* Buttons Section */}
              <div className="ms-auto d-flex align-items-center gap-2">
                <Button variant="danger"
                  style={{ fontWeight: 600,borderRadius: "20px",minWidth: "110px",}}
                   onClick={() => navigate("/dashboardsale")}> +Add Sale</Button>
                <Button
                  variant="success"
                  style={{fontWeight: 600,borderRadius: "20px", minWidth: "110px",}}
                  onClick={() => navigate("/dashboardpurchase")}>+Add Purchase</Button>
                <Button
                  variant="info"
                  style={{fontWeight: 600,borderRadius: "20px",minWidth: "110px",color: "white",}}> +Add More</Button>
                <Button
                  variant="light"
                  style={{ borderRadius: "50%",padding: "0 10px",minWidth: "20px",}}>: </Button>
              </div>
            </div>
            {/* Sale invoices heading */}
            <Row className="sale-invoice-header align-items-center mb-3">
              <Col className="d-flex align-items-center gap-1">
                <h5 className="m-0">{invoiceType}</h5>
                <Dropdown>
                  <Dropdown.Toggle as="span" className="arrow-dropdown">▼</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setInvoiceType("Sale Invoices")}>Sale Invoices</Dropdown.Item>
                    <Dropdown.Item onClick={() => setInvoiceType("Estimate/Quotation")}> Estimate/Quotation</Dropdown.Item>
                    <Dropdown.Item onClick={() => setInvoiceType("Proforma Invoice")}>Proforma Invoice</Dropdown.Item>
                    <Dropdown.Item onClick={() => setInvoiceType("Payment-in")}>Payment-in</Dropdown.Item>
                    <Dropdown.Item onClick={() => setInvoiceType("Sale Order")}>Sale Order</Dropdown.Item>
                    <Dropdown.Item onClick={() => setInvoiceType("Delivery Challan")}>Delivery Challan</Dropdown.Item>
                    <Dropdown.Item onClick={() => setInvoiceType("Sale return")}>Sale Return</Dropdown.Item>
                    <Dropdown.Item onClick={() => setInvoiceType("Purchase Bill")}> Purchase Bill</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            {/* Filters */}
            <Row className="filters align-items-center mb-3">
              <Col xs="auto" className="d-flex align-items-center gap-2">
                <Dropdown>
                  <Dropdown.Toggle as="span" className="arrow-dropdown d-flex align-items-center gap-1">
                    <span className="text-period">{selectedPeriod}</span> ▼ </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedPeriod("Today")}> Today </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedPeriod("This Week")}>This Week</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedPeriod("This Month")}>This Month</Dropdown.Item> 
                    <Dropdown.Item onClick={() => setSelectedPeriod("This Year")}>This Year</Dropdown.Item>  
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs="auto">
                <InputGroup size="sm" className="date-range">
                  <FormControl type="date" defaultValue="2025-11-01" />
                  <InputGroup.Text>To</InputGroup.Text>
                  <FormControl type="date" defaultValue="2025-11-30" />
                </InputGroup>
              </Col>
              <Col xs="auto" className="firm-dropdown">
                <Dropdown>
                  <Dropdown.Toggle as="span" className="custom-dropdown">
                    {selectedFirm} <span className="dropdown-arrow">▼</span></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedFirm("All Firms")}> All Firms</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedFirm("My Company")}>My Company </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            {/* Sales amount card */}
            <Row className="mb-4 sale-amount-card">
              <Col>
                <div className="amount-card">
                  <div className="card-title">Total Sales Amount</div>
                  <div className="total-amount">₹ 1,000</div>
                  <div className="growth-label">100% ↑
                    <div className="growth-subtext">vs last month</div>
                  </div>
                  <div className="received-balance">
                    Received: <b>₹ 1,000 </b> | Balance: <b>₹ 0</b>
                  </div>
                </div>
              </Col>
            </Row>
            {/* Transactions section */}
            <Row className="transactions-header align-items-center mb-2">
              <Col>
                <div className="transactions-title">Transactions</div>
              </Col>
              <Col className="d-flex justify-content-end gap-2">
                <Button size="sm" title="Search" className="icon-btn"><FaSearch/></Button>
                <Button size="sm" title="Analytics" className="icon-btn"><FaChartBar/></Button>
                <Button size="sm" title="Export XLS" className="icon-btn"> <FaFileExcel/></Button>
                <Button size="sm" title="Print" className="icon-btn"><FaPrint/></Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table responsive  bordered  hover  size="sm" className="transactions-table">
                <thead>
                    <tr>
                      <th>Date <FaFilter className="filter-icon"/></th>
                      <th>Invoice No <FaFilter className="filter-icon"/></th>
                      <th>Party Name <FaFilter className="filter-icon"/></th> 
                      <th>Transaction <FaFilter className="filter-icon"/></th>
                      <th>Payment Type <FaFilter className="filter-icon"/></th>
                      <th>Amount <FaFilter className="filter-icon"/></th>
                      <th>Balance <FaFilter className="filter-icon"/></th>
                      <th>Status <FaFilter className="filter-icon"/></th>
                      <th>Actions <FaFilter className="filter-icon"/></th>
                    </tr>
                  </thead>
                

                 <tbody>
  {loading ? (
    <tr><td colSpan="9" className="text-center">Loading sales...</td></tr>
  ) : error ? (
    <tr><td colSpan="9" className="text-center text-danger">{error}</td></tr>
  ) : salesList.length === 0 ? (
    <tr><td colSpan="9" className="text-center">No sales found.</td></tr>
  ) : (
    salesList.map((sale) => (
      <tr key={sale.id}>
        <td>{sale.invoice_date}</td>
        <td>{sale.invoice_number}</td>
        <td>{sale.customer_id}</td>
        <td>Sale Invoice</td>
        <td>{sale.payment_type}</td>
        <td>₹ {parseFloat(sale.total_amount).toFixed(2)}</td>
        <td>₹ 0</td>
        <td>
          <Form.Select size="sm" defaultValue={sale.payment_type === 'Credit' ? 'Unpaid' : 'Paid'}>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </Form.Select>
        </td>
        <td className="d-flex gap-2 actions-cell">
          <Button size="sm" style={{background:"transparent",border:"none",padding:0}}><FaPrint/></Button>
          <Button size="sm" style={{background:"transparent",border:"none",padding:0}}><FaReply/></Button>
          <Dropdown align="end">
            <Dropdown.Toggle size="sm" className="icon-btn dropdown-toggle"
              style={{background:"transparent",border:"none",padding:0}}>
              <FaEllipsisV/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>View</Dropdown.Item>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    ))
  )}
</tbody>

                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sale;