

// // import React, { useState, useEffect, useCallback } from "react";
// // import {
// //   Container,
// //   Row,
// //   Col,
// //   Form,
// //   Button,
// //   InputGroup,
// //   Table,
// // } from "react-bootstrap";
// // import { FaTimes, FaPlus } from "react-icons/fa";
// // import { useNavigate } from "react-router-dom";
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { getParties } from "../../../services/saleService"; // Kept this import
// // import Select from "react-select";
// // import PartyModal from "../Parties/PartyModal";

// // // REDUX IMPORTS REMOVED
// // // import { useSelector, useDispatch } from 'react-redux';
// // // import { fetchParties, selectPartyOptions } from '../../../slice/';

// // import {
// //   TextInputform,
// //   TextArea,
// //   DropDown,
// //   Calender,
// // } from "../../../components/Forms";

// // const units = ["NONE", "KG", "Litre", "Piece"];
// // const priceUnitTypes = ["Without Tax", "With Tax"];
// // const taxOptions = ["Select", "5%", "12%", "18%", "28%"];

// // const initialRows = [
// //   {
// //     id: 1,
// //     item: "",
// //     qty: "",
// //     unit: "NONE",
// //     priceUnitType: "Without Tax",
// //     price: "",
// //     discountPercent: "",
// //     discountAmount: "",
// //     taxPercent: "",
// //     taxAmount: "",
// //     amount: "",
// //   },
// // ];

// // const unitsOptions = units.map((unit) => ({ value: unit, label: unit }));
// // const priceUnitTypesOptions = priceUnitTypes.map((pt) => ({
// //   value: pt,
// //   label: pt,
// // }));
// // const taxOptionsFormatted = taxOptions.map((option) => ({
// //   value: option === "Select" ? "" : option,
// //   label: option,
// // }));

// // // Default dropdown entry
// // const defaultCustomers = [
// //   { value: "", label: "Select Party" }
// // ];

// // const stateOfSupplyOptions = [
// //   { value: "", label: "Select" },
// //   { value: "AndraPradesh", label: "AndraPradesh" },
// //   { value: "Kerala", label: "Kerala" },
// //   { value: "Karnataka", label: "Karnataka" },
// //   { value: "Maharastra", label: "Maharastra" },
// //   { value: "Delhi", label: "Delhi" },
// //   { value: "Mumbai", label: "Mumbai" },
// // ];

// // const DashboardSale = () => {

// //   // TOP STATES
// //   const [credit, setCredit] = useState(true);
// //   const [customer, setCustomer] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [billingAddress, setBillingAddress] = useState("");
// //   const [shippingAddress, setShippingAddress] = useState("");

// //   const navigate = useNavigate();

// //   // INVOICE
// //   const [invoiceNumber, setInvoiceNumber] = useState("");
// //   const [invoiceDate, setInvoiceDate] = useState("2025-11-10");
// //   const [stateOfSupply, setStateOfSupply] = useState("");

// //   // ROWS TABLE
// //   const [rows, setRows] = useState(initialRows);
// //   const [roundOff, setRoundOff] = useState(0);

// //   // CUSTOMER DROPDOWN MANAGEMENT
// //   const [customers, setCustomers] = useState(defaultCustomers);
// //   const [showPartyModal, setShowPartyModal] = useState(false);
  
// //   // NEW STATE: To hold the raw party data for lookups
// //   const [allParties, setAllParties] = useState([]); 
  
// //   const [transactions, setTransactions] = useState([]);

// //   ////////delete a row
  
   
// //   // Refactor the fetch logic into a reusable function
// //   const fetchAndSetParties = useCallback(async () => {
// //     try {
// //         const parties = await getParties(); // Calls your service
        
// //         // 1. Store raw data for lookup
// //         setAllParties(parties); 

// //         // 2. Format data for the DropDown component
// //         const customerOptions = parties.map((party) => ({
// //             value: party.id,    // Use party ID as the value
// //             label: party.name,  // Use party name as the label
// //         }));
        
// //         // 3. Update the dropdown state
// //         setCustomers([
// //             { value: "", label: "Select Party" },
// //             ...customerOptions,
// //         ]);

// //         // 4. (Your existing transaction logic)
// //         const transactionData = parties.map((party, index) => ({
// //              id: party.id,
// //              date: "06/11/2025",
// //              invoice: index + 1,
// //              partyName: party.name,
// //              transaction: "Lite Sale",
// //              paymentType: "Cash",
// //              amount: 1000,
// //              balance: 0,
// //              status: "Paid",
// //         }));
// //         setTransactions(transactionData);

// //     } catch (error) {
// //         console.error("Failed to fetch parties:", error);
// //         setCustomers(defaultCustomers); // Reset to default on error
// //     }
// //   }, []); 


// //   useEffect(() => {
// //     fetchAndSetParties();
// //   }, [fetchAndSetParties]);


// //   // New function to handle dropdown selection and auto-fill
// //   const handlePartySelect = (partyId) => {
// //     // 1. Handle "Add Party" option
// //     if (partyId === "add_party") {
// //         setShowPartyModal(true);
// //         return;
// //     }

// //     // 2. Set the selected party ID to the main state
// //     setCustomer(partyId);

// //     // 3. Find the full party object using the selected ID
// //     const selectedParty = allParties.find(p => p.id === partyId);

// //     // 4. Auto-fill the other fields
// //     if (selectedParty) {
// //         setPhone(selectedParty.phone || "");
// //         setBillingAddress(selectedParty.billingaddress || "");
// //         setShippingAddress(selectedParty.shippingaddress || "");
// //     } else {
// //         // Clear fields if the "Select Party" or an invalid option is chosen
// //         setPhone("");
// //         setBillingAddress("");
// //         setShippingAddress("");
// //     }
// //   };


// //   // ➕ Modal Handlers
// //   const openPartyModel = () =>setShowPartyModal(true);
  
// //   // UPDATED: Refetch parties when the modal closes (if a party was added)
// //   const closePartyModel = (partyAdded = false) => {
// //     setShowPartyModal(false);
// //     // Only refresh the list if a party was actually added
// //     if (partyAdded) {
// //         fetchAndSetParties();
// //     }
// //   };


// //   // TOGGLE TYPE
// //   const toggleCredit = () => setCredit(!credit);

// //   // ROW CHANGE CALCULATIONS
// //   const onRowChange = (id, field, value) => {
// //     const updatedRows = rows.map((row) => {
// //       if (row.id === id) {
// //         const updatedRow = { ...row, [field]: value };

// //         const qtyNum = Number(updatedRow.qty) || 0;
// //         const priceNum = Number(updatedRow.price) || 0;
// //         const discountPercentNum = Number(updatedRow.discountPercent) || 0;
// //         const discountAmountNum = Number(updatedRow.discountAmount) || 0;
// //         const taxPercentNum =
// //           Number(
// //             updatedRow.taxPercent ? updatedRow.taxPercent.replace("%", "") : 0
// //           ) || 0;

// //         // discount
// //         let discAmt = discountAmountNum;
// //         if (discountPercentNum && !discountAmountNum) {
// //           discAmt = (priceNum * qtyNum * discountPercentNum) / 100;
// //         }

// //         const taxableAmount = priceNum * qtyNum - discAmt;
// //         const taxAmt = (taxableAmount * taxPercentNum) / 100;
// //         const amount = taxableAmount + taxAmt;

// //         updatedRow.discountAmount = discAmt.toFixed(2);
// //         updatedRow.taxAmount = taxAmt.toFixed(2);
// //         updatedRow.amount = amount.toFixed(2);

// //         return updatedRow;
// //       }
// //       return row;
// //     });

// //     setRows(updatedRows);
// //   };

// //   // ADD ROW
// //   const addRow = () => {
// //     const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;

// //     const newRow = {
// //       id: newId,
// //       item: "",
// //       qty: "",
// //       unit: "NONE",
// //       priceUnitType: "Without Tax",
// //       price: "",
// //       discountPercent: "",
// //       discountAmount: "",
// //       taxPercent: "",
// //       taxAmount: "",
// //       amount: "",
// //     };

// //     setRows([...rows, newRow]);
// //   };

// //   // TOTAL CALCULATIONS
// //   const totalQty = rows.reduce((a, r) => a + (Number(r.qty) || 0), 0);
// //   const totalDiscount = rows.reduce((a, r) => a + (Number(r.discountAmount) || 0), 0);
// //   const totalTax = rows.reduce((a, r) => a + (Number(r.taxAmount) || 0), 0);
// //   const totalAmountRaw = rows.reduce((a, r) => a + (Number(r.amount) || 0), 0);
// //   const totalAmount = totalAmountRaw + Number(roundOff);

// //   // SAVE
// //   const handleSave = () => {
// //     const saleData = {
// //       id: Date.now(),
// //       customer,
// //       phone,
// //       billingAddress,
// //       shippingAddress,
// //       invoiceNumber,
// //       invoiceDate,
// //       stateOfSupply,
// //       rows,
// //       totalAmount,
// //       roundOff,
// //       paymentType: credit ? "Credit" : "Cash",
// //     };

// //     const existingSales = JSON.parse(localStorage.getItem("salesData")) || [];
// //     existingSales.push(saleData);

// //     localStorage.setItem("salesData", JSON.stringify(existingSales));

// //     alert("Sale saved successfully!");
// //     navigate("/sale");
// //   };

// //   return (
// //     <div id="main" style={{ backgroundColor: "#DEE2E6", minHeight: "100vh" }}>
// //       <Container fluid className="dashboard-sale-container">

// //         {/* HEADER */}
// //         <Row className="sale-header align-items-center mt-5">
// //           <Col xs="auto" className="d-flex align-items-center">
// //             <h5 className="mb-0 me-2" style={{ fontWeight: "bold" }}>
// //               Sale
// //             </h5>

// //             {/* CREDIT - CASH SWITCH */}
// //             <span
// //               className="me-2"
// //               onClick={() => setCredit(true)}
// //               style={{
// //                 cursor: "pointer",
// //                 color: credit ? "black" : "blue",
// //                 fontWeight: credit ? "normal" : "bold",
// //                 userSelect: "none",
// //               }}
// //             >
// //               Credit
// //             </span>

// //             <Form.Check
// //               type="switch"
// //               id="credit-switch"
// //               checked={credit}
// //               onChange={toggleCredit}
// //               style={{ cursor: "pointer" }}
// //             />

// //             <span
// //               onClick={() => setCredit(false)}
// //               style={{
// //                 cursor: "pointer",
// //                 color: !credit ? "black" : "blue",
// //                 fontWeight: !credit ? "normal" : "bold",
// //                 userSelect: "none",
// //               }}
// //             >
// //               Cash
// //             </span>
// //           </Col>

// //           <Col xs="auto" className="ms-auto">
// //             <Button
// //               variant="light"
// //               onClick={() => navigate("/sale")}
// //               style={{
// //                 border: "1px solid #ccc",
// //                 borderRadius: "50%",
// //                 padding: "4px 8px",
// //               }}
// //             >
// //               <FaTimes />
// //             </Button>
// //           </Col>
// //         </Row>

// //         {/* TOP INPUTS */}
// //         <Row className="mb-3">
// //           <Col xs={12} md={6}>
// //             <Row className="mb-3">

// //               {/* CUSTOMER DROPDOWN WITH + ADD PARTY */}
// //               <Col xs={6} lg={6}>
// //                 <DropDown
// //                   textlabel={
// //                     <span>
// //                       Name <span style={{ color: "red" }}>*</span>
// //                     </span>
// //                   }
// //                   value={customer}
// //                   onChange={(e) => handlePartySelect(e.target.value)} // USE THE NEW HANDLER
// //                   name="customer"
// //                   options={[
// //                     ...customers,
// //                     { value: "add_party", label: "+ Add Party" },
// //                   ]}
// //                 />
// //               </Col>

// //               <Col xs={6} lg={6}>
// //                 <TextInputform
// //                   formLabel="Phone No."
// //                   formtype="text"
// //                   value={phone}
// //                   onChange={(e) => setPhone(e.target.value)}
// //                   readOnly={!!customer} // ADDED readOnly
// //                 />
// //               </Col>
// //             </Row>

// //             {credit && (
// //               <Row className="mb-3">
// //                 <Col xs={6} lg={6}>
// //                   <TextArea
// //                     textlabel="Billing Address"
// //                     value={billingAddress}
// //                     onChange={(e) => setBillingAddress(e.target.value)}
// //                     Row={3}
// //                     readOnly={!!customer} // ADDED readOnly
// //                   />
// //                 </Col>

// //                 <Col xs={6} lg={6}>
// //                   <TextArea
// //                     textlabel="Shipping Address"
// //                     value={shippingAddress}
// //                     onChange={(e) => setShippingAddress(e.target.value)}
// //                     Row={3}
// //                     readOnly={!!customer} // ADDED readOnly
// //                   />
// //                 </Col>
// //               </Row>
// //             )}
// //           </Col>

// //           {/* RIGHT SIDE */}
// //           <Col xs={12} md={6} lg={3} className="ms-auto">
// //             <TextInputform
// //               formLabel="Invoice Number"
// //               formtype="text"
// //               value={invoiceNumber}
// //               onChange={(e) => setInvoiceNumber(e.target.value)}
// //             />

// //             <Calender
// //               calenderlabel="Invoice Date"
// //               initialDate={invoiceDate}
// //               setLabel={setInvoiceDate}
// //             />

// //             <DropDown
// //               textlabel="State of supply"
// //               placeholder="Select"
// //               value={stateOfSupply}
// //               onChange={(e) => setStateOfSupply(e.target.value)}
// //               name="stateOfSupply"
// //               options={stateOfSupplyOptions}
// //             />
// //           </Col>
// //         </Row>

// //         {/* ITEMS TABLE */}
// //         <Row className="items-table-row mb-8">
// //           <Col>
// //             <Table bordered hover size="sm" className="items-table">
// //               <thead>
// //                 <tr>
// //                   <th>#</th>
// //                   <th>ITEM</th>
// //                   <th>QTY</th>
// //                   <th>UNIT</th>
// //                   <th>PRICE/UNIT</th>
// //                   <th>DISCOUNT</th>
// //                   <th>TAX</th>
// //                   <th>AMOUNT</th>
// //                   <th></th>
// //                 </tr>

// //                 {/* PRICE UNIT TYPE FOR ALL */}
// //                 <tr>
// //                   <th colSpan={4}></th>

// //                   <th>
// //                     <DropDown
// //                       placeholder="Select Price Unit Type"
// //                       options={priceUnitTypesOptions}
// //                     />
// //                   </th>

// //                   <th colSpan={4}></th>
// //                 </tr>
// //               </thead>

// //               <tbody>
// //                 {rows.map((row, idx) => (
// //                   <tr key={row.id}>
// //                     <td>{idx + 1}</td>

// //                     <td>
// //                       <TextInputform
// //                         formtype="text"
// //                         value={row.item}
// //                         onChange={(e) =>
// //                           onRowChange(row.id, "item", e.target.value)
// //                         }
// //                       />
// //                     </td>

// //                     <td>
// //                       <TextInputform
// //                         formtype="number"
// //                         min={0}
// //                         value={row.qty}
// //                         onChange={(e) =>
// //                           onRowChange(row.id, "qty", e.target.value)
// //                         }
// //                       />
// //                     </td>

// //                     <td>
// //                       <DropDown
// //                         value={row.unit}
// //                         onChange={(e) =>
// //                           onRowChange(row.id, "unit", e.target.value)
// //                         }
// //                         options={unitsOptions}
// //                         placeholder="Unit"
// //                       />
// //                     </td>

// //                     <td>
// //                       <TextInputform
// //                         formtype="number"
// //                         min={0}
// //                         value={row.price}
// //                         onChange={(e) =>
// //                           onRowChange(row.id, "price", e.target.value)
// //                         }
// //                       />
// //                     </td>

// //                     {/* DISCOUNT */}
// //                     <td>
// //                       <TextInputform
// //                         formtype="number"
// //                         min={0}
// //                         max={100}
// //                         value={row.discountPercent}
// //                         PlaceHolder="%"
// //                         onChange={(e) =>
// //                           onRowChange(row.id, "discountPercent", e.target.value)
// //                         }
// //                       />

// //                       <TextInputform
// //                         formtype="number"
// //                         min={0}
// //                         value={row.discountAmount}
// //                         PlaceHolder="Amount"
// //                         onChange={(e) =>
// //                           onRowChange(row.id, "discountAmount", e.target.value)
// //                         }
// //                       />
// //                     </td>

// //                     {/* TAX */}
// //                     <td>
// //                       <DropDown
// //                         value={row.taxPercent}
// //                         onChange={(e) =>
// //                           onRowChange(row.id, "taxPercent", e.target.value)
// //                         }
// //                         options={taxOptionsFormatted}
// //                         placeholder="Tax"
// //                       />

// //                       <TextInputform
// //                         formtype="number"
// //                         min={0}
// //                         value={row.taxAmount}
// //                         readOnly
// //                       />
// //                     </td>

// //                     {/* AMOUNT */}
// //                     <td>
// //                       <TextInputform
// //                         formtype="number"
// //                         min={0}
// //                         value={row.amount}
// //                         readOnly
// //                       />
// //                     </td>

// //                     <td></td>
// //                   </tr>
// //                 ))}

// //                 {/* ADD ROW */}
// //                 <tr>
// //                   <td colSpan={9}>
// //                     <Button size="sm" onClick={addRow}>
// //                       ADD ROW
// //                     </Button>
// //                   </td>
// //                 </tr>

// //                 {/* TOTALS */}
// //                 <tr>
// //                   <td colSpan={2}>TOTAL</td>
// //                   <td>{totalQty}</td>
// //                   <td></td>
// //                   <td></td>
// //                   <td>{totalDiscount.toFixed(2)}</td>
// //                   <td>{totalTax.toFixed(2)}</td>
// //                   <td>{totalAmount.toFixed(2)}</td>
// //                   <td></td>
// //                 </tr>
// //               </tbody>
// //             </Table>
// //           </Col>
// //         </Row>

// //         {/* ROUND OFF + TOTAL */}
// //         <Row className="additional-actions mt-3 align-items-center">
// //           <Col xs="auto" className="ms-auto d-flex align-items-center gap-2">
// //             <TextInputform
// //               formtype="number"
// //               value={roundOff}
// //               onChange={(e) => setRoundOff(Number(e.target.value))}
// //             />

// //             <div>Total</div>

// //             <TextInputform
// //               formtype="number"
// //               readOnly
// //               value={totalAmount.toFixed(2)}
// //             />
// //           </Col>
// //         </Row>

// //         {/* SAVE BUTTON */}
// //         <Row className="actions-row mt-4">
// //           <Col className="text-end">
// //             <Button variant="outline-primary" onClick={handleSave}>
// //               Save
// //             </Button>
// //           </Col>
// //         </Row>
// //       </Container>

// //       {/* PARTY MODAL */}
// //       <PartyModal
// //         show={showPartyModal}
// //         handleClose={closePartyModel} // Use the updated close handler
// //         isEdit={false}/>
// //     </div>
// //   );
// // };

// // export default DashboardSale;

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Table,
// } from "react-bootstrap";

// import { FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import { getsale } from "../../../services/saleService";
// // import PartyModal from "../Parties/PartyModal";
// // import {  addsale } from "../../../services/saleService";
// // import { getParties, addsale } from "../../../services/saleService"; // Import correct functions
// // import PartyModal from "../Parties/PartyModal";
// import { getParties, addsale, addParty } from "../../../services/saleService"; 
// import Select from "react-select"; 
// import PartyModal from "../Parties/PartyModal";


// import {
//   TextInputform,
//   TextArea,
//   DropDown,
//   Calender,
// } from "../../../components/Forms";
// // export async function getsale() {
// //   const response = await fetch("http://localhost/billing_api/getsale.php");
// //   return response.json();
// // }

// const units = ["NONE", "KG", "Litre", "Piece"];
// const priceUnitTypes = ["Without Tax", "With Tax"];
// const taxOptions = ["Select", "5%", "12%", "18%", "28%"];

// const initialRows = [
//   {
//     id: 1,
//     item: "",
//     qty: "",
//     unit: "NONE",
//     priceUnitType: "Without Tax",
//     price: "",
//     discountPercent: "",
//     discountAmount: "",
//     taxPercent: "",
//     taxAmount: "",
//     amount: "",
//   },
// ];

// const unitsOptions = units.map((unit) => ({ value: unit, label: unit }));
// const priceUnitTypesOptions = priceUnitTypes.map((pt) => ({
//   value: pt,
//   label: pt,
// }));
// const taxOptionsFormatted = taxOptions.map((option) => ({
//   value: option === "Select" ? "" : option,
//   label: option,
// }));

// const defaultCustomer = [
//   { value: "", label: "Select Party" }
// ];

// const stateOfSupplyOptions = [
//   { value: "", label: "Select" },
//   { value: "AndraPradesh", label: "AndraPradesh" },
//   { value: "Kerala", label: "Kerala" },
//   { value: "Karnataka", label: "Karnataka" },
//   { value: "Maharastra", label: "Maharastra" },
//   { value: "Delhi", label: "Delhi" },
//   { value: "Mumbai", label: "Mumbai" },
// ];

// const DashboardSale = () => {
//   const [credit, setCredit] = useState(true);
//   const [customer, setCustomer] = useState("");
//   const [phone, setPhone] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");

//   const navigate = useNavigate();

//   const [invoiceNumber, setInvoiceNumber] = useState("");
//   const [invoiceDate, setInvoiceDate] = useState("2025-11-10");
//   const [stateOfSupply, setStateOfSupply] = useState("");

//   const [rows, setRows] = useState(initialRows);
//   const [roundOff, setRoundOff] = useState(0);

//   // const [customers, setCustomers] = useState(defaultCustomers);
//   // const [showPartyModal, setShowPartyModal] = useState(false);
//   // const [allParties, setAllParties] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [isRoundOffEnabled, setIsRoundOffEnabled] = useState(false);
// const [showPartyModal, setShowPartyModal] = useState(false);
//   const [allParties, setAllParties] = useState([]);
//   // const [customer, setCustomer] = useState(null);
  
//   // Prepare party list for the dropdown
//   const partyOptions = useMemo(() => {
//     return allParties.map(party => ({
//       value: party.id.toString(),
//       label: party.name,
//       partyData: party,
//     }));
//   }, [allParties]);

// const fetchAndSetParties = useCallback(async () => {
//     try {
//       const parties = await getParties(); 
//       setAllParties(parties);
//     } catch (error) {
//       console.error("Failed to fetch parties:", error);
//     }
//   }, []);

//       useEffect(() => {
//     fetchAndSetParties(); 
//   }, [fetchAndSetParties]);

//       const transactionData = parties.map((party, index) => ({
//         id: party.id,
//         date: "06/11/2025",
//         invoice: index + 1,
//         partyName: party.name,
//         transaction: "Lite Sale",
//         paymentType: "Cash",
//         amount: 1000,
//         balance: 0,
//         status: "Paid",
//       }));
//       setTransactions(transactionData);

  

//   const handlePartySave = async (partyData) => {
//     try {
//         const newParty = await addParty(partyData); // Save to DB via saleService
        
//         setShowPartyModal(false); 
//         await fetchAndSetParties(); // Refresh the list to include the new party
        
//         // Auto-select the newly added party
//         if (newParty && newParty.id) {
//             setCustomer(newParty.id.toString());
//         }
//         alert(`Party '${newParty.name}' added and selected successfully!`);
//     } catch (error) {
//         alert(`Failed to save party: ${error.message}`);
//     }
//   };
//   const handleSave = async () => {
//     if (!customer) {
//         alert("Please select or add a customer.");
//         return;
//     }
    
//     // 1. Construct the sale data payload
//     const saleData = {
//         // 'customer' holds the customer_id, which savesale.php expects
//         customer: customer, 
//         phone,
//         billingAddress,
//         shippingAddress,
//         invoiceNumber,
//         invoiceDate,
//         stateOfSupply,
//         rows: rows.map(r => ({
//             // ... (Your existing row mapping logic to convert to clean data)
//             item: r.item,
//             qty: Number(r.qty) || 0,
//             unit: r.unit,
//             price: Number(r.price) || 0,
//             discountPercent: Number(r.discountPercent) || 0,
//             discountAmount: Number(r.discountAmount) || 0,
//             taxPercent: Number(r.taxPercent.replace("%", "").replace("Select", "0")) || 0, 
//             taxAmount: Number(r.taxAmount) || 0,
//             amount: Number(r.amount) || 0,
//         })).filter(r => r.item.trim() !== "" && r.qty > 0), 
        
//         totalAmount: Number(totalAmount.toFixed(2)),
//         roundOff: Number(roundOff).toFixed(2),
//         paymentType: credit ? "Credit" : "Cash",
//     };
    
//     if (saleData.rows.length === 0) {
//         alert("Please add at least one item to the sale.");
//         return;
//     }
//     try {
//         await addsale(saleData); 
//         alert("Sale saved successfully!");
//         navigate("/sale"); // Navigate to the sale listing page
//     } catch (error) {
//         alert(`Failed to save sale: ${error.message}`);
//     }
//   };

//   const openPartyModel = () => setShowPartyModal(true);
//   const closePartyModel = (partyAdded = false) => {
//     setShowPartyModal(false);
//     if (partyAdded) fetchAndSetParties();
//   };

//   const toggleCredit = () => setCredit(!credit);

//   const onRowChange = (id, field, value) => {
//     const updatedRows = rows.map((row) => {
//       if (row.id === id) {
//         const updatedRow = { ...row, [field]: value };

//         const qtyNum = Number(updatedRow.qty) || 0;
//         const priceNum = Number(updatedRow.price) || 0;
//         const discountPercentNum = Number(updatedRow.discountPercent) || 0;
//         const discountAmountNum = Number(updatedRow.discountAmount) || 0;
//         const taxPercentNum =
//           Number(updatedRow.taxPercent ? updatedRow.taxPercent.replace("%", "") : 0) || 0;

//         let discAmt = discountAmountNum;
//         if (discountPercentNum && !discountAmountNum) {
//           discAmt = (priceNum * qtyNum * discountPercentNum) / 100;
//         }

//         const taxableAmount = priceNum * qtyNum - discAmt;
//         const taxAmt = (taxableAmount * taxPercentNum) / 100;
//         const amount = taxableAmount + taxAmt;

//         updatedRow.discountAmount = discAmt.toFixed(2);
//         updatedRow.taxAmount = taxAmt.toFixed(2);
//         updatedRow.amount = amount.toFixed(2);

//         return updatedRow;
//       }
//       return row;
//     });
//     setRows(updatedRows);
//   };

//   const addRow = () => {
//     const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
//     const newRow = {
//       id: newId,
//       item: "",
//       qty: "",
//       unit: "NONE",
//       priceUnitType: "Without Tax",
//       price: "",
//       discountPercent: "",
//       discountAmount: "",
//       taxPercent: "",
//       taxAmount: "",
//       amount: "",
//     };
//     setRows([...rows, newRow]);
//   };

//   // DELETE ROW
//   const deleteRow = (id) => {
//     const updatedRows = rows.filter(row => row.id !== id);
//     setRows(updatedRows);
//   };

//   const totalQty = rows.reduce((a, r) => a + (Number(r.qty) || 0), 0);
//   const totalDiscount = rows.reduce((a, r) => a + (Number(r.discountAmount) || 0), 0);
//   const totalTax = rows.reduce((a, r) => a + (Number(r.taxAmount) || 0), 0);
//   const totalAmountRaw = rows.reduce((a, r) => a + (Number(r.amount) || 0), 0);
//   const totalAmount = totalAmountRaw + Number(roundOff);

// //   const handleSave = async () => {
// //   const saleData = {
// //     customer,
// //     phone,
// //     billingAddress,
// //     shippingAddress,
// //     invoiceNumber,
// //     invoiceDate,
// //     stateOfSupply,
// //     rows,
// //     totalAmount,
// //     roundOff,
// //     paymentType: credit ? "Credit" : "Cash",
// //   };

// //   const res = await fetch("http://localhost/billing_api/save_sale.php", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify(saleData),
// //   });

// //   const result = await res.json();
// //   if (result.status === "success") {
// //     alert("Sale saved successfully!");
// //     navigate("/sale");
// //   } else {
// //     alert("Failed to save sale");
// //   }
// // };

// const handleSave = async () => {
//     const saleData = {
//       customer, // This is the ID of the selected party
//       phone,
//       billingAddress,
//       shippingAddress,
//       invoiceNumber,
//       invoiceDate,
//       stateOfSupply,
//       rows: rows.map(r => ({ // Ensure data sent to PHP is clean
//           item: r.item,
//           qty: Number(r.qty) || 0,
//           unit: r.unit,
//           price: Number(r.price) || 0,
//           discountPercent: Number(r.discountPercent) || 0,
//           discountAmount: Number(r.discountAmount) || 0,
//           taxPercent: Number(r.taxPercent.replace("%", "")) || 0,
//           taxAmount: Number(r.taxAmount) || 0,
//           amount: Number(r.amount) || 0,
//       })),
//       totalAmount: totalAmount.toFixed(2),
//       roundOff: Number(roundOff).toFixed(2),
//       paymentType: credit ? "Credit" : "Cash",
//     };

//     try {
//         // Use the new addsale service function
//         await addsale(saleData); 
//         alert("Sale saved successfully!");
//         navigate("/sale");
//     } catch (error) {
//         alert(`Failed to save sale: ${error.message}`);
//     }
//   };
//   return (
//     <div id="main" style={{ backgroundColor: "#DEE2E6", minHeight: "100vh" }}>
//       <Container fluid className="dashboard-sale-container">
//         {/* HEADER */}
//         <Row className="sale-header align-items-center mt-5">
//           <Col xs="auto" className="d-flex align-items-center">
//             <h5 className="mb-0 me-2" style={{ fontWeight: "bold" }}>
//               Sale
//             </h5>

//             <span
//               className="me-2"
//               onClick={() => setCredit(true)}
//               style={{
//                 cursor: "pointer",
//                 color: credit ? "black" : "blue",
//                 fontWeight: credit ? "normal" : "bold",
//                 userSelect: "none",
//               }}
//             >
//               Credit
//             </span>

//             <Form.Check
//               type="switch"
//               id="credit-switch"
//               checked={credit}
//               onChange={toggleCredit}
//               style={{ cursor: "pointer" }}
//             />

//             <span
//               onClick={() => setCredit(false)}
//               style={{
//                 cursor: "pointer",
//                 color: !credit ? "black" : "blue",
//                 fontWeight: !credit ? "normal" : "bold",
//                 userSelect: "none",
//               }}
//             >
//               Cash
//             </span>
//           </Col>

//           <Col xs="auto" className="ms-auto">
//             <Button
//               variant="light"
//               onClick={() => navigate("/sale")}
//               style={{
//                 border: "1px solid #ccc",
//                 borderRadius: "50%",
//                 padding: "4px 8px",
//               }}
//             >
//               <FaTimes />
//             </Button>
//           </Col>
//         </Row>

//         {/* TOP INPUTS */}
//         <Row className="mb-3">
//           <Row className="mb-3">
//         <Col md={6}>
//           <label>Customer Name</label>
//           <div className="d-flex align-items-center gap-2">
//             <Select
//               options={partyOptions}
//               value={partyOptions.find(option => option.value === customer) || null}
//               onChange={(selectedOption) => {
//                 setCustomer(selectedOption ? selectedOption.value : null);
//                 // Set other customer details (phone, address) if available in partyData
//               }}
//               placeholder="Select Customer"
//               isClearable
//             />
//             {/* Opens the modal */}
//             <Button variant="success" size="sm" onClick={() => setShowPartyModal(true)}>
//                 <FaPlus /> Add Party
//             </Button>

//               <Col xs={6} lg={6}>
//                 <TextInputform
//                   formLabel="Phone No."
//                   formtype="text"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   readOnly={!!customer}
//                 />
//               </Col>
//             </Row>

//             {credit && (
//               <Row className="mb-3">
//                 <Col xs={6} lg={6}>
//                   <TextArea
//                     textlabel="Billing Address"
//                     value={billingAddress}
//                     onChange={(e) => setBillingAddress(e.target.value)}
//                     Row={3}
//                     readOnly={!!customer}
//                   />
//                 </Col>
//                 <Col xs={6} lg={6}>
//                   <TextArea
//                     textlabel="Shipping Address"
//                     value={shippingAddress}
//                     onChange={(e) => setShippingAddress(e.target.value)}
//                     Row={3}
//                     readOnly={!!customer}
//                   />
//                 </Col>
//               </Row>
//             )}
//           </Col>

//           {/* RIGHT SIDE */}
//           <Col xs={12} md={6} lg={3} className="ms-auto">
//             <TextInputform
//               formLabel="Invoice Number"
//               formtype="text"
//               value={invoiceNumber}
//               onChange={(e) => setInvoiceNumber(e.target.value)}
//             />

//             <Calender
//               calenderlabel="Invoice Date"
//               initialDate={invoiceDate}
//               setLabel={setInvoiceDate}
//             />

//             <DropDown
//               textlabel="State of supply"
//               placeholder="Select"
//               value={stateOfSupply}
//               onChange={(e) => setStateOfSupply(e.target.value)}
//               name="stateOfSupply"
//               options={stateOfSupplyOptions}
//             />
//           </Col>
//         </Row>

//         {/* ITEMS TABLE */}
//         <Row className="items-table-row mb-8">
//           <Col>
//             <Table bordered hover size="sm" className="items-table">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>ITEM</th>
//                   <th>QTY</th>
//                   <th>UNIT</th>
//                   <th>PRICE/UNIT</th>
//                   <th>DISCOUNT</th>
//                   <th>TAX</th>
//                   <th>AMOUNT</th>
//                   <th>ACTION</th>
//                 </tr>

//                 <tr>
//                   <th colSpan={4}></th>
//                   <th>
//                     <DropDown
//                       placeholder="Select Price Unit Type"
//                       options={priceUnitTypesOptions}
//                     />
//                   </th>
//                   <th colSpan={4}></th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {rows.map((row, idx) => (
//                   <tr key={row.id}>
//                     <td>{idx + 1}</td>
//                     <td>
//                       <TextInputform
//                         formtype="text"
//                         value={row.item}
//                         onChange={(e) => onRowChange(row.id, "item", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <TextInputform
//                         formtype="number"
//                         min={0}
//                         value={row.qty}
//                         onChange={(e) => onRowChange(row.id, "qty", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <DropDown
//                         value={row.unit}
//                         onChange={(e) => onRowChange(row.id, "unit", e.target.value)}
//                         options={unitsOptions}
//                         placeholder="Unit"
//                       />
//                     </td>
//                     <td>
//                       <TextInputform
//                         formtype="number"
//                         min={0}
//                         value={row.price}
//                         onChange={(e) => onRowChange(row.id, "price", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <TextInputform
//                         formtype="number"
//                         min={0}
//                         max={100}
//                         value={row.discountPercent}
//                         PlaceHolder="%"
//                         onChange={(e) => onRowChange(row.id, "discountPercent", e.target.value)}
//                       />
//                       <TextInputform
//                         formtype="number"
//                         min={0}
//                         value={row.discountAmount}
//                         PlaceHolder="Amount"
//                         onChange={(e) => onRowChange(row.id, "discountAmount", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <DropDown
//                         value={row.taxPercent}
//                         onChange={(e) => onRowChange(row.id, "taxPercent", e.target.value)}
//                         options={taxOptionsFormatted}
//                         placeholder="Tax"
//                       />
//                       <TextInputform
//                         formtype="number"
//                         min={0}
//                         value={row.taxAmount}
//                         readOnly
//                       />
//                     </td>
//                     <td>
//                       <TextInputform
//                         formtype="number"
//                         min={0}
//                         value={row.amount}
//                         readOnly
//                       />
//                     </td>
//                     <td>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         onClick={() => deleteRow(row.id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}

//                 <tr>
//                   <td colSpan={9}>
//                     <Button size="sm" onClick={addRow}>
//                       ADD ROW
//                     </Button>
//                   </td>
//                 </tr>

//                 <tr>
//                   <td colSpan={2}>TOTAL</td>
//                   <td>{totalQty}</td>
//                   <td></td>
//                   <td></td>
//                   <td>{totalDiscount.toFixed(2)}</td>
//                   <td>{totalTax.toFixed(2)}</td>
//                   <td>{totalAmount.toFixed(2)}</td>
//                   <td></td>
//                 </tr>
//               </tbody>
//             </Table>
//           </Col>
//         </Row>

//         {/* ROUND OFF + TOTAL */}
//         <Row className="additional-actions mt-3 align-items-center">
//           <Col xs="auto" className="ms-auto d-flex align-items-center gap-2">
//           <input
//               type="checkbox"
//               checked={isRoundOffEnabled}
//               onChange={(e) => setIsRoundOffEnabled(e.target.checked)}
//                style={{ width: "18px", height: "18px" }}
//           />
//             <TextInputform
//               formtype="number"
//               value={roundOff}
//               onChange={(e) => setRoundOff(Number(e.target.value))}
//             />

//             <div>Total</div>

//             <TextInputform
//               formtype="number"
//               readOnly
//               value={totalAmount.toFixed(2)}
//             />
//           </Col>
//         </Row>

//         {/* SAVE BUTTON */}
//         {/* SAVE BUTTON */}
//       <Row className="actions-row mt-4">
//           <Col className="text-end">
//             <Button variant="outline-primary" onClick={handleSave}>
//               Save
//             </Button>
//           </Col>
//         </Row>
//       </Container>

//      {/* ⭐️ Party Modal Component */}
//       <PartyModal
//         show={showPartyModal}
//         handleClose={() => setShowPartyModal(false)}
//         // The modal must call this function upon successful party save
//         onSave={handlePartySave} 
//       />
//     </div>
//   );
// };

// export default DashboardSale;



import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// ⭐️ UPDATED: Import both getParties and addsale
import { getParties, addsale } from "../../../services/saleService"; 
import Select from "react-select";
import PartyModal from "../Parties/PartyModal";

import {
  TextInputform,
  TextArea,
  DropDown,
  Calender,
} from "../../../components/Forms";

const units = ["NONE", "KG", "Litre", "Piece"];
const priceUnitTypes = ["Without Tax", "With Tax"];
const taxOptions = ["Select", "5%", "12%", "18%", "28%"];

const initialRows = [
  {
    id: 1,
    item: "",
    qty: "",
    unit: "NONE",
    priceUnitType: "Without Tax",
    price: "",
    discountPercent: "",
    discountAmount: "",
    taxPercent: "",
    taxAmount: "",
    amount: "",
  },
];

const unitsOptions = units.map((unit) => ({ value: unit, label: unit }));
const priceUnitTypesOptions = priceUnitTypes.map((pt) => ({
  value: pt,
  label: pt,
}));
const taxOptionsFormatted = taxOptions.map((option) => ({
  value: option === "Select" ? "" : option,
  label: option,
}));

// Default dropdown entry
const defaultCustomers = [
  { value: "", label: "Select Party" }
];

const stateOfSupplyOptions = [
  { value: "", label: "Select" },
  { value: "AndraPradesh", label: "AndraPradesh" },
  { value: "Kerala", label: "Kerala" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Maharastra", label: "Maharastra" },
  { value: "Delhi", label: "Delhi" },
  { value: "Mumbai", label: "Mumbai" },
];

const DashboardSale = () => {

  // TOP STATES
  const [credit, setCredit] = useState(true);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const navigate = useNavigate();

  // INVOICE
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("2025-11-10");
  const [stateOfSupply, setStateOfSupply] = useState("");

  // ROWS TABLE
  const [rows, setRows] = useState(initialRows);
  const [roundOff, setRoundOff] = useState(0);
  const [isRoundOffEnabled, setIsRoundOffEnabled] = useState(false); // Added state for checkbox

  // CUSTOMER DROPDOWN MANAGEMENT
  const [customers, setCustomers] = useState(defaultCustomers);
  const [showPartyModal, setShowPartyModal] = useState(false);
  
  // NEW STATE: To hold the raw party data for lookups
  const [allParties, setAllParties] = useState([]); 
  
  const [transactions, setTransactions] = useState([]); // This state seems unused in this component but kept for continuity

  ////////delete a row
  const deleteRow = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
  };
   
  // Refactor the fetch logic into a reusable function
  const fetchAndSetParties = useCallback(async () => {
    try {
        const parties = await getParties(); // Calls your service
        
        // 1. Store raw data for lookup
        setAllParties(parties); 

        // 2. Format data for the DropDown component
        const customerOptions = parties.map((party) => ({
            value: party.id,    // Use party ID as the value
            label: party.name,  // Use party name as the label
        }));
        
        // 3. Update the dropdown state
        // Add "Add Party" option to the dropdown list
        const partyOptions = [
            { value: "", label: "Select Party" },
            { value: "add_party", label: "+ Add Party" },
            ...customerOptions,
        ];
        
        setCustomers(partyOptions);

    } catch (error) {
        console.error("Failed to fetch parties:", error);
        setCustomers(defaultCustomers); // Reset to default on error
    }
  }, []); 


  useEffect(() => {
    fetchAndSetParties();
  }, [fetchAndSetParties]);


  // Function to handle dropdown selection and auto-fill
  const handlePartySelect = (selectedOption) => {
    const partyId = selectedOption ? selectedOption.value : null;

    // 1. Handle "Add Party" option
    if (partyId === "add_party") {
        setShowPartyModal(true);
        // Set customer to null to clear fields
        setCustomer(""); 
        setPhone("");
        setBillingAddress("");
        setShippingAddress("");
        return;
    }

    // 2. Set the selected party ID to the main state
    setCustomer(partyId);

    // 3. Find the full party object using the selected ID
    const selectedParty = allParties.find(p => p.id === partyId);

    // 4. Auto-fill the other fields
    if (selectedParty) {
        setPhone(selectedParty.phone || "");
        setBillingAddress(selectedParty.billingaddress || "");
        setShippingAddress(selectedParty.shippingaddress || "");
    } else {
        // Clear fields if the "Select Party" or an invalid option is chosen
        setPhone("");
        setBillingAddress("");
        setShippingAddress("");
    }
  };


  // ➕ Modal Handlers
  const openPartyModel = () => setShowPartyModal(true);
  
  // UPDATED: Refetch parties when the modal closes (if a party was added)
  const closePartyModel = (partyAdded = false) => {
    setShowPartyModal(false);
    // Only refresh the list if a party was actually added
    if (partyAdded) {
        fetchAndSetParties();
    }
  };


  // TOGGLE TYPE
  const toggleCredit = () => setCredit(!credit);

  // ROW CHANGE CALCULATIONS
  const onRowChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };

        const qtyNum = Number(updatedRow.qty) || 0;
        const priceNum = Number(updatedRow.price) || 0;
        const discountPercentNum = Number(updatedRow.discountPercent) || 0;
        const discountAmountNum = Number(updatedRow.discountAmount) || 0;
        const taxPercentNum =
          Number(
            updatedRow.taxPercent ? updatedRow.taxPercent.replace("%", "").replace("Select", "0") : 0
          ) || 0;

        // discount
        let discAmt = discountAmountNum;
        if (discountPercentNum && !discountAmountNum) {
          discAmt = (priceNum * qtyNum * discountPercentNum) / 100;
        } else if (field === 'discountPercent') {
             // Recalculate if percent changes
             discAmt = (priceNum * qtyNum * discountPercentNum) / 100;
        }


        const taxableAmount = priceNum * qtyNum - discAmt;
        const taxAmt = (taxableAmount * taxPercentNum) / 100;
        const amount = taxableAmount + taxAmt;

        updatedRow.discountAmount = discAmt.toFixed(2);
        updatedRow.taxAmount = taxAmt.toFixed(2);
        updatedRow.amount = amount.toFixed(2);

        return updatedRow;
      }
      return row;
    });

    setRows(updatedRows);
  };

  // ADD ROW
  const addRow = () => {
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;

    const newRow = {
      id: newId,
      item: "",
      qty: "",
      unit: "NONE",
      priceUnitType: "Without Tax",
      price: "",
      discountPercent: "",
      discountAmount: "",
      taxPercent: "",
      taxAmount: "",
      amount: "",
    };

    setRows([...rows, newRow]);
  };

  // TOTAL CALCULATIONS
  const totalQty = rows.reduce((a, r) => a + (Number(r.qty) || 0), 0);
  const totalDiscount = rows.reduce((a, r) => a + (Number(r.discountAmount) || 0), 0);
  const totalTax = rows.reduce((a, r) => a + (Number(r.taxAmount) || 0), 0);
  const totalAmountRaw = rows.reduce((a, r) => a + (Number(r.amount) || 0), 0);
  const finalRoundOff = isRoundOffEnabled ? Number(roundOff) : 0;
  const totalAmount = totalAmountRaw + finalRoundOff;


  // ⭐️ UPDATED: Handle Save with API call
  const handleSave = async () => {
    console.log("Initiating save with data:", {
      customer,
      phone,})
    if (!customer) {
      alert("Please select or add a customer.");
      return;
    }

    // 1. Construct the sale data payload
    const saleData = {
      // 'customer' holds the customer_id (from allParties), which savesale.php expects
      customer: customer, 
      phone,
      billingAddress,
      shippingAddress,
      invoiceNumber,
      invoiceDate,
      stateOfSupply,
      rows: rows.map(r => ({ // Clean up rows for the API call
          item: r.item,
          qty: Number(r.qty) || 0,
          unit: r.unit,
          price: Number(r.price) || 0,
          discountPercent: Number(r.discountPercent) || 0,
          discountAmount: Number(r.discountAmount) || 0,
          // Clean up taxPercent string to a number
          taxPercent: Number(r.taxPercent ? r.taxPercent.replace("%", "").replace("Select", "0") : 0) || 0, 
          taxAmount: Number(r.taxAmount) || 0,
          amount: Number(r.amount) || 0,
      })).filter(r => r.qty > 0 || r.item), // Only send rows with content
      totalAmount: totalAmount.toFixed(2), // Send as string for precision
      roundOff: finalRoundOff.toFixed(2),
      paymentType: credit ? "Credit" : "Cash",
    };

    try {
      // 2. Call the service function to save the sale
      const result = await addsale(saleData); // Calls save_sale.php
      console.log("Sale saved successfully:", result);
      alert("Sale saved successfully!");
      navigate("/sale");
    } catch (error) {
      console.error("Failed to save sale:", error);
      alert(`Failed to save sale: ${error.message}`);
    }
  };

  return (
    <div id="main" style={{ backgroundColor: "#DEE2E6", minHeight: "100vh" }}>
      <Container fluid className="dashboard-sale-container">

        {/* HEADER */}
        <Row className="sale-header align-items-center mt-5">
          <Col xs="auto" className="d-flex align-items-center">
            <h5 className="mb-0 me-2" style={{ fontWeight: "bold" }}>
              Sale
            </h5>
            <div
              className="d-flex align-items-center"
              onClick={toggleCredit}
              style={{ cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={credit}
                onChange={toggleCredit}
                style={{ width: "18px", height: "18px" }}
              />
            </div>
            <span
              onClick={toggleCredit}
              style={{
                cursor: "pointer",
                color: credit ? "black" : "blue",
                fontWeight: credit ? "bold" : "normal",
                userSelect: "none",
                marginLeft: "5px",
              }}
            >
              Credit
            </span>

            <span
              onClick={() => setCredit(false)}
              style={{
                cursor: "pointer",
                color: !credit ? "black" : "blue",
                fontWeight: !credit ? "normal" : "bold",
                userSelect: "none",
                marginLeft: "15px",
              }}
            >
              {" "}
              Cash{" "}
            </span>
          </Col>
          <Col xs="auto" className="ms-auto">
            <Button
              variant="light"
              onClick={() => navigate("/sale")}
              style={{
                border: "1px solid #ccc",
                borderRadius: "50%",
                padding: "4px 8px",
              }}
            >
              {" "}
              <FaTimes />{" "}
            </Button>
          </Col>
        </Row>

        {/* TOP INPUTS */}
        <Row className="mb-3">
          <Col md={9}>
            {/* CUSTOMER INFO (LEFT SIDE) */}
            <Row className="mb-3">
              <Col md={6}>
                <label>Customer Name</label>
                <div className="d-flex align-items-center gap-2">
                  <Select
                    options={customers} // Use the fetched and formatted list
                    value={customers.find(option => option.value === customer) || null}
                    onChange={handlePartySelect} // Handle the selection
                    placeholder="Select Customer"
                    isClearable
                  />
                  {/* Opens the modal */}
                  <Button variant="outline-primary" onClick={openPartyModel}>
                    <FaPlus />
                  </Button>
                </div>
              </Col>
              <Col md={6}>
                <TextInputform
                  formLabel="Phone Number"
                  formtype="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  readOnly={!!customer} // Read-only if a customer is selected
                />
              </Col>
            </Row>

            {credit && (
              <Row className="mb-3">
                <Col xs={6} lg={6}>
                  <TextArea
                    textlabel="Billing Address"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    Row={3}
                    readOnly={!!customer} // Read-only if a customer is selected
                  />
                </Col>
                <Col xs={6} lg={6}>
                  <TextArea
                    textlabel="Shipping Address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    Row={3}
                    readOnly={!!customer} // Read-only if a customer is selected
                  />
                </Col>
              </Row>
            )}
          </Col>
          {/* RIGHT SIDE */}
          <Col xs={12} md={6} lg={3} className="ms-auto">
            <TextInputform
              formLabel="Invoice Number"
              formtype="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
            <Calender
              calenderlabel="Invoice Date"
              initialDate={invoiceDate}
              setLabel={setInvoiceDate}
            />
            <DropDown
              textlabel="State of supply"
              placeholder="Select"
              value={stateOfSupply}
              onChange={(e) => setStateOfSupply(e.target.value)}
              options={stateOfSupplyOptions}
            />
          </Col>
        </Row>

        {/* ITEMS TABLE */}
        <Row className="item-table-row mt-4">
          <Col xs={12}>
            <Table striped bordered hover size="sm" responsive>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Price/Unit</th>
                  <th>Price Unit Type</th>
                  <th>Discount</th>
                  <th>Tax</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {/* ITEM */}
                    <td>
                      <TextInputform
                        formtype="text"
                        value={row.item}
                        onChange={(e) =>
                          onRowChange(row.id, "item", e.target.value)
                        }
                      />
                    </td>
                    {/* QTY */}
                    <td>
                      <TextInputform
                        formtype="number"
                        min={0}
                        value={row.qty}
                        onChange={(e) =>
                          onRowChange(row.id, "qty", e.target.value)
                        }
                      />
                    </td>
                    {/* UNIT */}
                    <td>
                      <DropDown
                        value={row.unit}
                        onChange={(e) =>
                          onRowChange(row.id, "unit", e.target.value)
                        }
                        options={unitsOptions}
                        placeholder="Unit"
                      />
                    </td>
                    {/* PRICE/UNIT */}
                    <td>
                      <TextInputform
                        formtype="number"
                        min={0}
                        value={row.price}
                        onChange={(e) =>
                          onRowChange(row.id, "price", e.target.value)
                        }
                      />
                    </td>
                    {/* PRICE UNIT TYPE */}
                    <td>
                      <DropDown
                        value={row.priceUnitType}
                        onChange={(e) =>
                          onRowChange(row.id, "priceUnitType", e.target.value)
                        }
                        options={priceUnitTypesOptions}
                        placeholder="Price Unit Type"
                      />
                    </td>
                    {/* DISCOUNT */}
                    <td>
                      <InputGroup size="sm">
                        <FormControl
                          type="number"
                          min={0}
                          placeholder="%"
                          value={row.discountPercent}
                          onChange={(e) =>
                            onRowChange(
                              row.id,
                              "discountPercent",
                              e.target.value
                            )
                          }
                        />
                        <FormControl
                          type="number"
                          min={0}
                          placeholder="Amount"
                          value={row.discountAmount}
                          readOnly
                        />
                      </InputGroup>
                    </td>
                    {/* TAX */}
                    <td>
                      <DropDown
                        value={row.taxPercent}
                        onChange={(e) =>
                          onRowChange(row.id, "taxPercent", e.target.value)
                        }
                        options={taxOptionsFormatted}
                        placeholder="Tax"
                      />
                      <TextInputform
                        formtype="number"
                        min={0}
                        value={row.taxAmount}
                        readOnly
                      />
                    </td>
                    {/* AMOUNT */}
                    <td>
                      <TextInputform
                        formtype="number"
                        min={0}
                        value={row.amount}
                        readOnly
                      />
                    </td>
                    {/* ACTIONS */}
                    <td>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteRow(row.id)}
                        >
                            <FaTimes />
                        </Button>
                    </td>
                  </tr>
                ))}
                {/* ADD ROW */}
                <tr>
                  <td colSpan={9}>
                    <Button size="sm" onClick={addRow}>
                      <FaPlus /> ADD ROW
                    </Button>
                  </td>
                </tr>
                {/* TOTALS */}
                <tr>
                  <td colSpan={2}>TOTAL</td>
                  <td>{totalQty}</td>
                  <td colSpan={2}></td>
                  <td>{totalDiscount.toFixed(2)}</td>
                  <td>{totalTax.toFixed(2)}</td>
                  <td>{totalAmountRaw.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* ROUND OFF + TOTAL */}
        <Row className="additional-actions mt-3 align-items-center">
          <Col xs="auto" className="ms-auto d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={isRoundOffEnabled}
              onChange={(e) => setIsRoundOffEnabled(e.target.checked)}
              style={{ width: "18px", height: "18px" }}
            />
            <Form.Label className="mb-0">Round Off</Form.Label>
            <TextInputform
              formtype="number"
              value={roundOff}
              onChange={(e) => setRoundOff(Number(e.target.value))}
              readOnly={!isRoundOffEnabled}
              style={{ width: "100px" }}
            />

            <div style={{ fontWeight: "bold" }}>Total</div>

            <TextInputform
              formtype="number"
              readOnly
              value={totalAmount.toFixed(2)}
              style={{ width: "150px" }}
            />
          </Col>
        </Row>

        {/* SAVE BUTTON */}
        <Row className="actions-row mt-4">
          <Col className="text-end">
            <Button variant="outline-primary" onClick={handleSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Container>

      {/* ⭐️ Party Modal Component */}
      <PartyModal
        show={showPartyModal}
        handleClose={closePartyModel}
        // The modal must call handleClose(true) upon successful party addition
      />
    </div>
  );
};

export default DashboardSale;