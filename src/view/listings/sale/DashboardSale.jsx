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
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getParties, addOrUpdateSale } from "../../../services/saleService";
import Select from "react-select";
import PartyModal from "../Parties/PartyModal";
import { useDispatch, useSelector } from 'react-redux';
import { fetchParties } from "../../../slice/saleSlice";

import {
  TextInputform,
  TextArea,
  DropDown,
  Calender,
} from "../../../components/Forms";

// STATIC OPTIONS
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

const unitsOptions = units.map((u) => ({ value: u, label: u }));
const priceUnitTypesOptions = priceUnitTypes.map((pt) => ({ value: pt, label: pt }));
const taxOptionsFormatted = taxOptions.map((t) => ({
  value: t === "Select" ? "" : t,
  label: t,
}));

const defaultCustomers = [{ value: "", label: "Select Party" }];
const stateOfSupplyOptions = [
  { value: "", label: "Select" },
  { value: "AndraPradesh", label: "AndraPradesh" },
  { value: "Kerala", label: "Kerala" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Maharastra", label: "Maharastra" },
  { value: "Delhi", label: "Delhi" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "punjab", label: "punjab" },
  { value: "bihar", label: "bihar" },
];

const DashboardSale = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const saleToEdit = location.state?.sale || location.state?.saleData || null;
  const isViewMode = location.state?.isViewMode || location.state?.readOnly || false;

  // STATES
  const [credit, setCredit] = useState(true);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("2025-11-10");
  const [stateOfSupply, setStateOfSupply] = useState("");
  const [rows, setRows] = useState(initialRows);
  const [roundOff, setRoundOff] = useState(0);
  const [isRoundOffEnabled, setIsRoundOffEnabled] = useState(false);
  const [customers, setCustomers] = useState(defaultCustomers);
  const [allParties, setAllParties] = useState([]);
  const [showPartyModal, setShowPartyModal] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [isEditMode, setIsEditMode] = useState(!!saleToEdit && !isViewMode);

  const dispatch = useDispatch();
  const partyStatus = useSelector(state => state.parties?.status || "idle");

  // FETCH PARTIES FROM API
  const fetchAndSetParties = useCallback(async () => {
    try {
      const parties = await getParties();
      setAllParties(parties);

      const customerOptions = parties.map(p => ({
        value: p.id,
        label: p.name,
      }));

      setCustomers([
        { value: "", label: "Select Party" },
        { value: "add_party", label: "+ Add Party" },
        ...customerOptions,
      ]);
    } catch (err) {
      console.error("Failed to fetch parties:", err);
      setCustomers(defaultCustomers);
    }
  }, []);

  useEffect(() => { fetchAndSetParties(); }, [fetchAndSetParties]);
  useEffect(() => { if (partyStatus === "idle") dispatch(fetchParties()); }, [partyStatus, dispatch]);

  // PREFILL FIELDS IF EDIT / VIEW
  useEffect(() => {
    if (!saleToEdit) return;

    setCustomer(saleToEdit.parties_id || "");
    setInvoiceNumber(saleToEdit.invoice_no || "");
    setInvoiceDate(saleToEdit.invoice_date || "2025-11-10");
    setBillingAddress(saleToEdit.billing_address || "");
    setShippingAddress(saleToEdit.shipping_address || "");
    setStateOfSupply(saleToEdit.state_of_supply || "");
    setPhone(saleToEdit.phone || "");
    setPaymentType(saleToEdit.payment_type || "");

    const roundOffValue = Number(saleToEdit.round_off) || 0;
    setRoundOff(roundOffValue);
    setIsRoundOffEnabled(roundOffValue !== 0);

    if (saleToEdit.products) {
      try {
        const itemsArray = JSON.parse(saleToEdit.products);
        if (Array.isArray(itemsArray) && itemsArray.length > 0) {
          const rowsWithId = itemsArray.map((item, index) => ({
            id: index + 1,
            item: String(item.item || ""),
            qty: String(item.qty || ""),
            unit: String(item.unit || "NONE"),
            priceUnitType: String(item.priceUnitType || "Without Tax"),
            price: String(item.price || ""),
            discountPercent: String(item.discountPercent || ""),
            discountAmount: String(item.discountAmount || ""),
            taxPercent: item.taxPercent ? `${item.taxPercent}%` : "",
            taxAmount: String(item.taxAmount || ""),
            amount: String(item.amount || ""),
          }));
          setRows(rowsWithId);
        } else setRows(initialRows);
      } catch (err) {
        console.error("Failed to parse products JSON:", err);
        setRows(initialRows);
      }
    }
  }, [saleToEdit]);

  // PARTY SELECT
  const handlePartySelect = (selectedOption) => {
    if (!selectedOption) return setCustomer("");
    if (selectedOption.value === "add_party") return setShowPartyModal(true);

    const selectedParty = allParties.find(p => p.id === selectedOption.value);
    setCustomer(selectedOption.value);
    setPhone(selectedParty?.phone || "");
    setBillingAddress(selectedParty?.billing_address || "");
    setShippingAddress(selectedParty?.shipping_address || "");
    setStateOfSupply(selectedParty?.state_of_supply || "");
  };

  const closePartyModel = (added = false) => { setShowPartyModal(false); if (added) fetchAndSetParties(); };
  const toggleCredit = () => setCredit(!credit);

  // ADD / DELETE ROWS
  const deleteRow = (id) => setRows(rows.filter(r => r.id !== id));
  const addRow = () => {
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    setRows([...rows, { ...initialRows[0], id: newId }]);
  };

  const onRowChange = (id, field, value) => {
  setRows((prevRows) =>
    prevRows.map((row) => {
      if (row.id !== id) return row;

      // === SAFELY EXTRACT THE REAL VALUE FROM DROPDOWN ===
      let actualValue = value;

      // DropDown components (Tax, Unit, Price Type) send { value: "...", label: "..." }
      if (value && typeof value === "object" && value !== null && "value" in value) {
        actualValue = value.value ?? "";
      }
      // If user clears the dropdown, value might be null/undefined
      if (actualValue === null || actualValue === undefined) {
        actualValue = "";
      }

      const updatedRow = { ...row, [field]: actualValue };

      // === NOW DO CALCULATIONS ===
      const qty = Number(updatedRow.qty) || 0;
      const price = Number(updatedRow.price) || 0;
      const discountPercent = Number(updatedRow.discountPercent) || 0;

      // Discount Amount
      const discountAmount = discountPercent
        ? (qty * price * discountPercent) / 100
        : 0;

      // Taxable Amount (after discount)
      const taxableAmount = qty * price - discountAmount;

      // === SAFELY EXTRACT TAX PERCENT ===
      let taxPercentStr = updatedRow.taxPercent || "";
      // In case it's still an object (edge case)
      if (typeof taxPercentStr === "object" && taxPercentStr?.value !== undefined) {
        taxPercentStr = taxPercentStr.value || "";
      }
      // Remove % and convert to number
      const taxPercent = Number(taxPercentStr.toString().replace("%", "")) || 0;

      // Tax Amount & Final Amount
      const taxAmount = (taxableAmount * taxPercent) / 100;
      const amount = taxableAmount + taxAmount;

      // Update row
      updatedRow.discountAmount = discountAmount.toFixed(2);
      updatedRow.taxAmount = taxAmount.toFixed(2);
      updatedRow.amount = amount.toFixed(2);

      return updatedRow;
    })
  );
};

  // TOTALS
  const totalQty = rows.reduce((a, r) => a + (Number(r.qty) || 0), 0);
  const totalDiscount = rows.reduce((a, r) => a + (Number(r.discountAmount) || 0), 0);
  const totalTax = rows.reduce((a, r) => a + (Number(r.taxAmount) || 0), 0);
  const totalAmountRaw = rows.reduce((a, r) => a + (Number(r.amount) || 0), 0);
  const finalRound = isRoundOffEnabled ? Number(roundOff) : 0;
  const totalAmount = totalAmountRaw + finalRound;

  // SAVE SALE
  const handleSave = async () => {
    if (!customer) return alert("Please select or add a customer.");
    if (!invoiceNumber) return alert("Please enter a unique Invoice Number.");

    const productsArray = rows.map(r => ({
      item: r.item,
      qty: Number(r.qty),
      unit: r.unit,
      price: Number(r.price),
      discountPercent: Number(r.discountPercent),
      discountAmount: Number(r.discountAmount),
      taxPercent: Number(r.taxPercent.replace("%", "")),
      taxAmount: Number(r.taxAmount),
      amount: Number(r.amount),
    }));

    const saleData = {
      invoice_no: invoiceNumber,
      parties_id: customer,
      name: allParties.find(p => p.id === customer)?.name || "",
      phone,
      billing_address: billingAddress,
      shipping_address: shippingAddress,
      invoice_date: invoiceDate,
      state_of_supply: stateOfSupply,
      products: JSON.stringify(productsArray),
      round_off: finalRound,
      total: totalAmount.toFixed(2),
      payment_type: paymentType,
    };

    if (isEditMode) saleData.edit_sales_id = saleToEdit.sale_id;

    try {
      const result = await addOrUpdateSale(saleData);
      if (result?.head?.code === 200) {
        alert(`Sale ${isEditMode ? "updated" : "saved"} successfully!`);
        navigate("/sale");
      } else alert("Failed to save sale.");
    } catch (err) {
      console.error("Error:", err);
      alert("Network error occurred while saving sale.");
    }
  };

  return (
    <div id="main" style={{ backgroundColor: "#DEE2E6", minHeight: "100vh" }}>
      <Container fluid className="dashboard-sale-container">
        {/* HEADER */}
        <Row className="sale-header align-items-center mt-5">
          <Col xs="auto" className="d-flex align-items-center">
            <h5 className="mb-0 me-2" style={{ fontWeight: "bold" }}>
              {isViewMode ? "View Sale" : isEditMode ? "Edit Sale" : "Sale"}
            </h5>
            {!isViewMode && (
              <>
                <div className="d-flex align-items-center" onClick={toggleCredit} style={{ cursor: "pointer" }}>
                  <input type="checkbox" checked={credit} onChange={toggleCredit} />
                </div>
                <span onClick={toggleCredit} style={{ cursor: "pointer", marginLeft: "5px" }}>Credit</span>
                <span onClick={() => setCredit(false)} style={{ cursor: "pointer", marginLeft: "15px" }}>Cash</span>
              </>
            )}
          </Col>
          <Col xs="auto" className="ms-auto">
            <Button variant="light" onClick={() => navigate("/sale")}><FaTimes /></Button>
          </Col>
        </Row>

        {/* CUSTOMER INFO */}
        <Row className="mb-3">
          <Col md={9}>
            <Row className="mb-3">
              <Col md={6}>
                <label>Customer Name</label>
                <div className="d-flex gap-2">
                  <Select
                    options={customers}
                    value={customers.find(o => o.value === customer) || null}
                    onChange={isViewMode ? undefined : handlePartySelect}
                    placeholder="Select Customer"
                    isClearable
                    isDisabled={isViewMode}
                  />
                  {!isViewMode && <Button onClick={() => setShowPartyModal(true)}><FaPlus /></Button>}
                </div>
              </Col>
              <Col md={6}>
                <TextInputform
                  formLabel="Phone Number"
                  formtype="tel"
                  value={phone}
                  onChange={isViewMode ? undefined : (e) => setPhone(e.target.value)}
                  readOnly={isViewMode}
                />
              </Col>
            </Row>
            {credit && (
              <Row className="mb-3">
                <Col md={6}>
                  <TextArea textlabel="Billing Address" value={billingAddress} onChange={isViewMode ? undefined : (e) => setBillingAddress(e.target.value)} readOnly={isViewMode} />
                </Col>
                <Col md={6}>
                  <TextArea textlabel="Shipping Address" value={shippingAddress} onChange={isViewMode ? undefined : (e) => setShippingAddress(e.target.value)} readOnly={isViewMode} />
                </Col>
              </Row>
            )}
          </Col>
          <Col md={3}>
            <TextInputform formLabel="Invoice Number" value={invoiceNumber} onChange={isViewMode ? undefined : (e) => setInvoiceNumber(e.target.value)} readOnly={isViewMode} />
            <Calender calenderlabel="Invoice Date" initialDate={invoiceDate} setLabel={isViewMode ? undefined : setInvoiceDate} />
            <DropDown textlabel="State of supply" value={stateOfSupply} onChange={isViewMode ? undefined : setStateOfSupply} options={stateOfSupplyOptions} disabled={isViewMode} />
          </Col>
        </Row>

        {/* ITEMS TABLE */}
        <Row className="item-table-row mt-4">
          <Col>
            <Table bordered hover size="sm" responsive>
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
                {rows.map(row => (
                  <tr key={row.id}>
                    <td><TextInputform value={row.item} onChange={isViewMode ? undefined : e => onRowChange(row.id, "item", e.target.value)} readOnly={isViewMode} /></td>
                    <td><TextInputform formtype="number" value={row.qty} onChange={isViewMode ? undefined : e => onRowChange(row.id, "qty", e.target.value)} readOnly={isViewMode} /></td>
                    <td><DropDown value={row.unit} onChange={isViewMode ? undefined : v => onRowChange(row.id, "unit", v)} options={unitsOptions} disabled={isViewMode} /></td>
                    <td><TextInputform formtype="number" value={row.price} onChange={isViewMode ? undefined : e => onRowChange(row.id, "price", e.target.value)} readOnly={isViewMode} /></td>
                    <td><DropDown value={row.priceUnitType} onChange={isViewMode ? undefined : v => onRowChange(row.id, "priceUnitType", v)} options={priceUnitTypesOptions} disabled={isViewMode} /></td>
                    <td>
                      <InputGroup size="sm">
                        <FormControl type="number" placeholder="%" value={row.discountPercent} onChange={isViewMode ? undefined : e => onRowChange(row.id, "discountPercent", e.target.value)} readOnly={isViewMode}/>
                        <FormControl value={row.discountAmount} readOnly />
                      </InputGroup>
                    </td>
                    <td>
                      <DropDown value={row.taxPercent} onChange={isViewMode ? undefined : v => onRowChange(row.id, "taxPercent", v)} options={taxOptionsFormatted} disabled={isViewMode} />
                      <TextInputform readOnly value={row.taxAmount} />
                    </td>
                    <td><TextInputform readOnly value={row.amount} /></td>
                    <td>
                      {!isViewMode && <Button variant="danger" size="sm" onClick={() => deleteRow(row.id)}><FaTimes /></Button>}
                    </td>
                  </tr>
                ))}
                {!isViewMode && (
                  <tr>
                    <td colSpan="9">
                      <Button size="sm" onClick={addRow}><FaPlus /> ADD ROW</Button>
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan="2">TOTAL</td>
                  <td>{totalQty}</td>
                  <td colSpan="2"></td>
                  <td>{totalDiscount.toFixed(2)}</td>
                  <td>{totalTax.toFixed(2)}</td>
                  <td>{totalAmountRaw.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* PAYMENT + TOTAL */}
        <Row className="additional-actions mt-3 align-items-center">
          <Col xs={3}>
            <Form.Label>Payment Type</Form.Label>
            <Form.Select value={paymentType} onChange={isViewMode ? undefined : (e) => setPaymentType(e.target.value)} disabled={isViewMode}>
              <option value="Phone Pay">Phone Pay</option>
              <option value="Cash">Cash</option>
              <option value="G-pay">G-pay</option>
            </Form.Select>
          </Col>
         


          <Col className="d-flex justify-content-end align-items-center gap-2">
            <input type="checkbox" checked={isRoundOffEnabled} onChange={isViewMode ? undefined : (e) => setIsRoundOffEnabled(e.target.checked)} disabled={isViewMode} />
            <Form.Label>Round Off</Form.Label>
            <TextInputform formtype="number" value={roundOff} readOnly={!isRoundOffEnabled || isViewMode} onChange={isViewMode ? undefined : (e) => setRoundOff(e.target.value)} />
            <strong>Total</strong>
            <TextInputform readOnly value={totalAmount.toFixed(2)} />
          </Col>
        </Row>

        {/* SAVE BUTTON */}
        {!isViewMode && (
          <Row className="actions-row mt-4">
            <Col className="text-end">
              <Button variant="outline-primary" onClick={handleSave}>
                {isEditMode ? "Update Sale" : "Save"}
              </Button>
            </Col>
          </Row>
        )}
      </Container>

      <PartyModal show={showPartyModal} handleClose={closePartyModel} />
    </div>
  );
};

export default DashboardSale;


// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   InputGroup,
//   FormControl,
//   Table,
// } from "react-bootstrap";
// import { FaTimes, FaPlus } from "react-icons/fa";
// import { useNavigate, useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { getParties, addOrUpdateSale } from "../../../services/saleService";
// import Select from "react-select";
// import PartyModal from "../Parties/PartyModal";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchParties } from "../../../slice/saleSlice";

// import {
//   TextInputform,
//   TextArea,
//   DropDown,
//   Calender,
// } from "../../../components/Forms";

// // STATIC OPTIONS
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
//     discountAmount: "0.00",
//     taxPercent: "",
//     taxAmount: "0.00",
//     amount: "0.00",
//   },
// ];

// const unitsOptions = units.map((u) => ({ value: u, label: u }));
// const priceUnitTypesOptions = priceUnitTypes.map((pt) => ({ value: pt, label: pt }));
// const taxOptionsFormatted = taxOptions.map((t) => ({
//   value: t === "Select" ? "" : t,
//   label: t,
// }));

// const defaultCustomers = [{ value: "", label: "Select Party" }];
// const stateOfSupplyOptions = [
//   { value: "", label: "Select" },
//   { value: "AndraPradesh", label: "AndraPradesh" },
//   { value: "Kerala", label: "Kerala" },
//   { value: "Karnataka", label: "Karnataka" },
//   { value: "Maharastra", label: "Maharastra" },
//   { value: "Delhi", label: "Delhi" },
//   { value: "Mumbai", label: "Mumbai" },
//   { value: "punjab", label: "punjab" },
//   { value: "bihar", label: "bihar" },
// ];

// const DashboardSale = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const saleToEdit = location.state?.sale || location.state?.saleData || null;
//   const isViewMode = location.state?.isViewMode || location.state?.readOnly || false;

//   const [credit, setCredit] = useState(true);
//   const [customer, setCustomer] = useState("");
//   const [phone, setPhone] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [invoiceNumber, setInvoiceNumber] = useState("");
//   const [invoiceDate, setInvoiceDate] = useState("");
//   const [stateOfSupply, setStateOfSupply] = useState("");
//   const [rows, setRows] = useState(initialRows);
//   const [roundOff, setRoundOff] = useState(0);
//   const [isRoundOffEnabled, setIsRoundOffEnabled] = useState(false);
//   const [customers, setCustomers] = useState(defaultCustomers);
//   const [allParties, setAllParties] = useState([]);
//   const [showPartyModal, setShowPartyModal] = useState(false);
//   const [paymentType, setPaymentType] = useState("");
//   const [isEditMode, setIsEditMode] = useState(!!saleToEdit && !isViewMode);

//   const dispatch = useDispatch();
//   const partyStatus = useSelector((state) => state.parties?.status || "idle");

//   // Set today's date by default
//   useEffect(() => {
//     if (!invoiceDate && !saleToEdit) {
//       setInvoiceDate(new Date().toISOString().split("T")[0]); // Today: 2025-11-18
//     }
//   }, [invoiceDate, saleToEdit]);

//   const fetchAndSetParties = useCallback(async () => {
//     try {
//       const parties = await getParties();
//       setAllParties(parties);
//       const customerOptions = parties.map((p) => ({
//         value: p.id,
//         label: p.name,
//       }));
//       setCustomers([
//         { value: "", label: "Select Party" },
//         { value: "add_party", label: "+ Add Party" },
//         ...customerOptions,
//       ]);
//     } catch (err) {
//       console.error("Failed to fetch parties:", err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAndSetParties();
//   }, [fetchAndSetParties]);

//   useEffect(() => {
//     if (partyStatus === "idle") dispatch(fetchParties());
//   }, [partyStatus, dispatch]);

//   // PREFILL ON EDIT/VIEW
//   useEffect(() => {
//     if (!saleToEdit) return;

//     setCustomer(saleToEdit.parties_id || "");
//     setInvoiceNumber(saleToEdit.invoice_no || "");
//     setInvoiceDate(saleToEdit.invoice_date || "");
//     setBillingAddress(saleToEdit.billing_address || "");
//     setShippingAddress(saleToEdit.shipping_address || "");
//     setStateOfSupply(saleToEdit.state_of_supply || "");
//     setPhone(saleToEdit.phone || "");
//     setPaymentType(saleToEdit.payment_type || "");

//     const roundOffVal = Number(saleToEdit.round_off || saleToEdit.rount_off || 0);
//     setRoundOff(roundOffVal);
//     setIsRoundOffEnabled(roundOffVal !== 0);

//     if (saleToEdit.products) {
//       try {
//         const items = JSON.parse(saleToEdit.products);
//         if (Array.isArray(items)) {
//           const loaded = items.map((it, i) => ({
//             id: i + 1,
//             item: it.item || "",
//             qty: String(it.qty || ""),
//             unit: it.unit || "NONE",
//             priceUnitType: it.priceUnitType || "Without Tax",
//             price: String(it.price || ""),
//             discountPercent: String(it.discountPercent || ""),
//             discountAmount: String(it.discountAmount || "0.00"),
//             taxPercent: it.taxPercent > 0 ? `${it.taxPercent}%` : "",
//             taxAmount: String(it.taxAmount || "0.00"),
//             amount: String(it.amount || "0.00"),
//           }));
//           setRows(loaded.length > 0 ? loaded : initialRows);
//         }
//       } catch (e) {
//         console.error("Parse error:", e);
//       }
//     }
//   }, [saleToEdit]);

//   const handlePartySelect = (opt) => {
//     if (!opt) return setCustomer("");
//     if (opt.value === "add_party") return setShowPartyModal(true);
//     const party = allParties.find((p) => p.id === opt.value);
//     setCustomer(opt.value);
//     setPhone(party?.phone || "");
//     setBillingAddress(party?.billing_address || "");
//     setShippingAddress(party?.shipping_address || "");
//     setStateOfSupply(party?.state_of_supply || "");
//   };

//   const closePartyModel = (added = false) => {
//     setShowPartyModal(false);
//     if (added) fetchAndSetParties();
//   };

//   const toggleCredit = () => setCredit(!credit);

//   const addRow = () => {
//     const newId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
//     setRows([...rows, { ...initialRows[0], id: newId }]);
//   };

//   const deleteRow = (id) => setRows(rows.filter((r) => r.id !== id));

//   // FIXED: Perfect calculation + handles DropDown objects
//   const onRowChange = (id, field, value) => {
//     setRows((prev) =>
//       prev.map((row) => {
//         if (row.id !== id) return row;

//         let val = value;
//         if (value && typeof value === "object" && value.value !== undefined) {
//           val = value.value;
//         }

//         const r = { ...row, [field]: val };

//         const qty = Number(r.qty) || 0;
//         const price = Number(r.price) || 0;
//         const discPct = Number(r.discountPercent) || 0;

//         const discAmt = discPct ? (qty * price * discPct) / 100 : 0;
//         r.discountAmount = discAmt.toFixed(2);

//         const taxable = qty * price - discAmt;

//         let taxStr = r.taxPercent || "";
//         if (typeof taxStr === "object") taxStr = taxStr.value || "";
//         const taxPct = Number(taxStr.toString().replace("%", "")) || 0;

//         const taxAmt = (taxable * taxPct) / 100;
//         const amt = taxable + taxAmt;

//         r.taxAmount = taxAmt.toFixed(2);
//         r.amount = amt.toFixed(2);

//         return r;
//       })
//     );
//   };

//   // TOTALS
//   const totalQty = rows.reduce((a, r) => a + (Number(r.qty) || 0), 0);
//   const totalDiscount = rows.reduce((a, r) => a + Number(r.discountAmount || 0), 0);
//   const totalTax = rows.reduce((a, r) => a + Number(r.taxAmount || 0), 0);
//   const totalAmountRaw = rows.reduce((a, r) => a + Number(r.amount || 0), 0);
//   const finalRound = isRoundOffEnabled ? Number(roundOff || 0) : 0;
//   const grandTotal = totalAmountRaw + finalRound;

//   // FIXED: Correct payload for secure backend
//   const handleSave = async () => {
//     if (!customer) return alert("Please select customer");
//     if (!invoiceNumber) return alert("Invoice number required");

//     const productsArray = rows.map((r) => ({
//       item: r.item || "",
//       qty: Number(r.qty) || 0,
//       unit: r.unit || "NONE",
//       price: Number(r.price) || 0,
//       priceUnitType: r.priceUnitType || "Without Tax",
//       discountPercent: Number(r.discountPercent) || 0,
//       discountAmount: Number(r.discountAmount) || 0,
//       taxPercent: Number((r.taxPercent || "").replace("%", "")) || 0,
//       taxAmount: Number(r.taxAmount) || 0,
//       amount: Number(r.amount) || 0,
//     }));

//     const payload = {
//       invoice_no: invoiceNumber,
//       parties_id: customer,
//       name: allParties.find((p) => p.id === customer)?.name || "",
//       phone: phone || "",
//       billing_address: billingAddress || "",
//       shipping_address: shippingAddress || "",
//       invoice_date: invoiceDate || "",
//       state_of_supply: stateOfSupply || "",
//       products: JSON.stringify(productsArray),
//       round_off: finalRound,           // Correct field name
//       payment_type: paymentType || "",
//     };

//     if (isEditMode) {
//       payload.edit_sales_id = saleToEdit.sale_id;
//     }

//     try {
//       const result = await addOrUpdateSale(payload);
//       if (result?.head?.code === 200) {
//         alert(`Sale ${isEditMode ? "updated" : "created"} successfully!`);
//         navigate("/sale");
//       } else {
//         alert(result?.head?.msg || "Failed to save sale");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Network error");
//     }
//   };

//   return (
//     <div id="main" style={{ backgroundColor: "#DEE2E6", minHeight: "100vh" }}>
//       <Container fluid className="dashboard-sale-container">
//         {/* HEADER */}
//         <Row className="sale-header align-items-center mt-5">
//           <Col xs="auto" className="d-flex align-items-center">
//             <h5 className="mb-0 me-2" style={{ fontWeight: "bold" }}>
//               {isViewMode ? "View Sale" : isEditMode ? "Edit Sale" : "Sale"}
//             </h5>
//             {!isViewMode && (
//               <>
//                 <input type="checkbox" checked={credit} onChange={toggleCredit} />
//                 <span onClick={toggleCredit} style={{ cursor: "pointer", marginLeft: "5px" }}>Credit</span>
//                 <span onClick={() => setCredit(false)} style={{ cursor: "pointer", marginLeft: "15px" }}>Cash</span>
//               </>
//             )}
//           </Col>
//           <Col xs="auto" className="ms-auto">
//             <Button variant="light" onClick={() => navigate("/sale")}><FaTimes /></Button>
//           </Col>
//         </Row>

//         {/* CUSTOMER INFO */}
//         <Row className="mb-3">
//           <Col md={9}>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <label>Customer Name</label>
//                 <div className="d-flex gap-2">
//                   <Select
//                     options={customers}
//                     value={customers.find((o) => o.value === customer) || null}
//                     onChange={isViewMode ? undefined : handlePartySelect}
//                     placeholder="Select Customer"
//                     isClearable
//                     isDisabled={isViewMode}
//                   />
//                   {!isViewMode && <Button onClick={() => setShowPartyModal(true)}><FaPlus /></Button>}
//                 </div>
//               </Col>
//               <Col md={6}>
//                 <TextInputform formLabel="Phone Number" formtype="tel" value={phone} onChange={isViewMode ? undefined : (e) => setPhone(e.target.value)} readOnly={isViewMode} />
//               </Col>
//             </Row>
//             {credit && (
//               <Row className="mb-3">
//                 <Col md={6}>
//                   <TextArea textlabel="Billing Address" value={billingAddress} onChange={isViewMode ? undefined : (e) => setBillingAddress(e.target.value)} readOnly={isViewMode} />
//                 </Col>
//                 <Col md={6}>
//                   <TextArea textlabel="Shipping Address" value={shippingAddress} onChange={isViewMode ? undefined : (e) => setShippingAddress(e.target.value)} readOnly={isViewMode} />
//                 </Col>
//               </Row>
//             )}
//           </Col>
//           <Col md={3}>
//             <TextInputform formLabel="Invoice Number" value={invoiceNumber} onChange={isViewMode ? undefined : (e) => setInvoiceNumber(e.target.value)} readOnly={isViewMode} />
//             <Calender calenderlabel="Invoice Date" initialDate={invoiceDate} setLabel={isViewMode ? undefined : setInvoiceDate} />
//             <DropDown textlabel="State of supply" value={stateOfSupply} onChange={isViewMode ? undefined : setStateOfSupply} options={stateOfSupplyOptions} disabled={isViewMode} />
//           </Col>
//         </Row>

//         {/* TABLE */}
//         <Row className="item-table-row mt-4">
//           <Col>
//             <Table bordered hover size="sm" responsive>
//               <thead>
//                 <tr>
//                   <th>Item</th>
//                   <th>Qty</th>
//                   <th>Unit</th>
//                   <th>Price/Unit</th>
//                   <th>Price Unit Type</th>
//                   <th>Discount %</th>
//                   <th>Tax</th>
//                   <th>Amount</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row) => (
//                   <tr key={row.id}>
//                     <td><TextInputform value={row.item} onChange={isViewMode ? undefined : (e) => onRowChange(row.id, "item", e.target.value)} readOnly={isViewMode} /></td>
//                     <td><TextInputform formtype="number" value={row.qty} onChange={isViewMode ? undefined : (e) => onRowChange(row.id, "qty", e.target.value)} readOnly={isViewMode} /></td>
//                     <td><DropDown value={row.unit} onChange={isViewMode ? undefined : (v) => onRowChange(row.id, "unit", v)} options={unitsOptions} disabled={isViewMode} /></td>
//                     <td><TextInputform formtype="number" value={row.price} onChange={isViewMode ? undefined : (e) => onRowChange(row.id, "price", e.target.value)} readOnly={isViewMode} /></td>
//                     <td><DropDown value={row.priceUnitType} onChange={isViewMode ? undefined : (v) => onRowChange(row.id, "priceUnitType", v)} options={priceUnitTypesOptions} disabled={isViewMode} /></td>
//                     <td>
//                       <InputGroup size="sm">
//                         <FormControl type="number" value={row.discountPercent} onChange={isViewMode ? undefined : (e) => onRowChange(row.id, "discountPercent", e.target.value)} readOnly={isViewMode} />
//                         <FormControl value={row.discountAmount} readOnly />
//                       </InputGroup>
//                     </td>
//                     <td>
//                       <DropDown value={row.taxPercent} onChange={isViewMode ? undefined : (v) => onRowChange(row.id, "taxPercent", v)} options={taxOptionsFormatted} disabled={isViewMode} />
//                       <TextInputform readOnly value={row.taxAmount} />
//                     </td>
//                     <td><TextInputform readOnly value={row.amount} /></td>
//                     <td>{!isViewMode && <Button variant="danger" size="sm" onClick={() => deleteRow(row.id)}><FaTimes /></Button>}</td>
//                   </tr>
//                 ))}
//                 {!isViewMode && (
//                   <tr>
//                     <td colSpan="9"><Button size="sm" onClick={addRow}><FaPlus /> ADD ROW</Button></td>
//                   </tr>
//                 )}
//                 <tr>
//                   <td colSpan="2"><strong>TOTAL</strong></td>
//                   <td><strong>{totalQty}</strong></td>
//                   <td colSpan="2"></td>
//                   <td><strong>{totalDiscount.toFixed(2)}</strong></td>
//                   <td><strong>{totalTax.toFixed(2)}</strong></td>
//                   <td><strong>{totalAmountRaw.toFixed(2)}</strong></td>
//                   <td></td>
//                 </tr>
//               </tbody>
//             </Table>
//           </Col>
//         </Row>

//         <Row className="mt-4 align-items-center">
//           <Col md={3}>
//             <Form.Label>Payment Type</Form.Label>
//             <Form.Select value={paymentType} onChange={isViewMode ? undefined : (e) => setPaymentType(e.target.value)} disabled={isViewMode}>
//               <option>Phone Pay</option>
//               <option>Cash</option>
//               <option>G-pay</option>
//             </Form.Select>
//           </Col>
//           <Col className="d-flex justify-content-end gap-3 align-items-center">
//             <div className="d-flex align-items-center gap-2">
//               <input type="checkbox" checked={isRoundOffEnabled} onChange={(e) => !isViewMode && setIsRoundOffEnabled(e.target.checked)} disabled={isViewMode} />
//               <span>Round Off</span>
//             </div>
//             <TextInputform formtype="number" value={roundOff} readOnly={!isRoundOffEnabled || isViewMode} onChange={(e) => setRoundOff(e.target.value)} />
//             <strong>Total: </strong>
//             <TextInputform readOnly value={grandTotal.toFixed(2)} style={{ width: "120px" }} />
//           </Col>
//         </Row>

//         {!isViewMode && (
//           <Row className="mt-4">
//             <Col className="text-end">
//               <Button variant="outline-primary" size="lg" onClick={handleSave}>
//                 {isEditMode ? "Update Sale" : "Save"}
//               </Button>
//             </Col>
//           </Row>
//         )}
//       </Container>

//       <PartyModal show={showPartyModal} handleClose={closePartyModel} />
//     </div>
//   );
// };

// export default DashboardSale;


