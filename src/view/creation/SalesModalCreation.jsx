// Updated creations/SalesModalCreation.js (now full screen with button at bottom)
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
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  fetchSales,
  fetchParties,
  createSale,
  updateSale,
} from "../../slice/saleSlice";
import {
  TextInputform,
  TextArea,
  DropDown,
  Calender,
} from "../../components/Forms";
import NotifyData from "../../components/NotifyData";

// STATIC OPTIONS
const units = ["NONE", "KG", "Litre", "Piece"];
const priceUnitTypes = ["Without Tax", "With Tax"];
const initialRows = [
  {
    id: 1,
    item: "",
    qty: "",
    unit: "NONE",
    priceUnitType: "Without Tax",
    price: "",
    discountPercent: "",
    discountAmount: "0.00",
    taxPercent: "",
    taxAmount: "0.00",
    amount: "0.00",
  },
];
const taxOptionsFormatted = [
  { value: "", label: "Select" },
  { value: 0, label: "0%" },
  { value: 5, label: "5%" },
  { value: 12, label: "12%" },
  { value: 18, label: "18%" },
  { value: 28, label: "28%" },
];
const unitsOptions = units.map((u) => ({ value: u, label: u }));
const priceUnitTypesOptions = priceUnitTypes.map((pt) => ({
  value: pt,
  label: pt,
}));
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

const SaleCreation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { parties, partiesStatus, sales, status } = useSelector(
    (state) => state.sale
  );
  const isEditMode = location.pathname.startsWith("/sale/edit");
  const isViewMode = location.pathname.startsWith("/sale/view");
  const isCreateMode = location.pathname === "/sale/create";

  const [formData, setFormData] = useState({});
  const [credit, setCredit] = useState(true);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [stateOfSupply, setStateOfSupply] = useState("");
  const [rows, setRows] = useState(initialRows);
  const [roundOff, setRoundOff] = useState(0);
  const [isRoundOffEnabled, setIsRoundOffEnabled] = useState(false);
  const [customers, setCustomers] = useState([
    { value: "", label: "Select Party" },
  ]);
  const [paymentType, setPaymentType] = useState("");

  const saleToEdit = id ? sales.find((s) => s.sale_id == id) : null;

  // FETCH SALES FOR EDIT/VIEW
  useEffect(() => {
    if ((isEditMode || isViewMode) && status === "idle") {
      dispatch(fetchSales());
    }
  }, [isEditMode, isViewMode, status, dispatch]);

  // FETCH PARTIES
  useEffect(() => {
    if (partiesStatus === "idle") dispatch(fetchParties());
  }, [partiesStatus, dispatch]);

  useEffect(() => {
    const customerOptions = parties.map((p) => ({
      value: p.id,
      label: p.name,
    }));
    setCustomers([
      { value: "", label: "Select Party" },
      { value: "add_party", label: "+ Add Party" },
      ...customerOptions,
    ]);
  }, [parties]);

  // PREFILL IF EDIT OR VIEW
  useEffect(() => {
    if (!saleToEdit) return;
    setCustomer(saleToEdit.parties_id || "");
    setInvoiceNumber(saleToEdit.invoice_no || "");
    setInvoiceDate(
      saleToEdit.invoice_date || new Date().toISOString().split("T")[0]
    );
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
            taxPercent: Number(item.taxPercent) || 0,
            taxAmount: String(item.taxAmount || "0.00"),
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
    if (selectedOption.value === "add_party") return; // Handle modal separately if needed
    const selectedParty = parties.find((p) => p.id === selectedOption.value);
    setCustomer(selectedOption.value);
    setPhone(selectedParty?.phone || "");
    setBillingAddress(selectedParty?.billing_address || "");
    setShippingAddress(selectedParty?.shipping_address || "");
    setStateOfSupply(selectedParty?.state_of_supply || "");
  };

  const toggleCredit = () => setCredit(!credit);

  // ROW OPERATIONS
  const deleteRow = (id) => setRows(rows.filter((r) => r.id !== id));
  const addRow = () => {
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    setRows([...rows, { ...initialRows[0], id: newId }]);
  };

  const onRowChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id !== id) return row;
        let actualValue = value;
        if (value && typeof value === "object" && value.value !== undefined) {
          actualValue = value.value;
        } else if (
          value &&
          typeof value === "object" &&
          value.target?.value !== undefined
        ) {
          actualValue = value.target.value;
        }
        const updatedRow = { ...row, [field]: actualValue };
        let taxPercentValue = updatedRow.taxPercent;
        if (
          field !== "taxPercent" &&
          typeof taxPercentValue === "object" &&
          taxPercentValue?.value !== undefined
        ) {
          taxPercentValue = taxPercentValue.value;
        }
        const taxPercent = Number(taxPercentValue) || 0;
        const qty = Number(updatedRow.qty) || 0;
        const price = Number(updatedRow.price) || 0;
        const discountPercent = Number(updatedRow.discountPercent) || 0;
        const priceUnitType = String(updatedRow.priceUnitType || "Without Tax");
        let basicTotal = qty * price;
        const discountAmount = (basicTotal * discountPercent) / 100;
        let taxableAmount = basicTotal - discountAmount;
        let taxAmount = 0;
        let finalAmount = taxableAmount;
        if (priceUnitType === "Without Tax") {
          taxAmount = (taxableAmount * taxPercent) / 100;
          finalAmount = taxableAmount + taxAmount;
        } else {
          const totalWithTax = taxableAmount;
          taxAmount = (totalWithTax * taxPercent) / (100 + taxPercent);
          finalAmount = totalWithTax;
        }
        return {
          ...updatedRow,
          taxPercent: taxPercent,
          discountAmount: discountAmount.toFixed(2),
          taxAmount: taxAmount.toFixed(2),
          amount: finalAmount.toFixed(2),
        };
      })
    );
  };

  // TOTALS
  const totalQty = rows.reduce((a, r) => a + (Number(r.qty) || 0), 0);
  const totalDiscount = rows.reduce(
    (a, r) => a + (Number(r.discountAmount) || 0),
    0
  );
  const totalTax = rows.reduce((a, r) => a + (Number(r.taxAmount) || 0), 0);
  const totalAmountRaw = rows.reduce((a, r) => a + (Number(r.amount) || 0), 0);
  const finalRound = isRoundOffEnabled ? Number(roundOff) : 0;
  const totalAmount = totalAmountRaw + finalRound;

  // UPDATE FORM DATA
  useEffect(() => {
    const productsArray = rows.map((r) => ({
      item: r.item,
      qty: r.qty,
      unit: r.unit,
      price: r.price,
      priceUnitType: r.priceUnitType,
      discountPercent: r.discountPercent,
      discountAmount: r.discountAmount,
      taxPercent: Number(r.taxPercent || 0),
      taxAmount: r.taxAmount,
      amount: r.amount,
    }));
    setFormData({
      invoice_no: invoiceNumber,
      parties_id: customer,
      name: parties.find((p) => p.id === customer)?.name || "",
      phone,
      billing_address: billingAddress,
      shipping_address: shippingAddress,
      invoice_date: invoiceDate,
      state_of_supply: stateOfSupply,
      products: JSON.stringify(productsArray),
      round_off: finalRound,
      total: totalAmount.toFixed(2),
      payment_type: paymentType,
      ...(isEditMode && { edit_sales_id: saleToEdit?.sale_id }),
    });
  }, [
    customer,
    phone,
    billingAddress,
    shippingAddress,
    invoiceDate,
    stateOfSupply,
    invoiceNumber,
    rows,
    roundOff,
    isRoundOffEnabled,
    paymentType,
    isEditMode,
    saleToEdit,
    parties,
    totalAmount,
  ]);

  const handleSave = async () => {
    if (!customer) return alert("Please select or add a customer.");
    if (!invoiceNumber) return alert("Please enter a unique Invoice Number.");
    try {
      if (isEditMode) {
        await dispatch(updateSale(formData)).unwrap();
        NotifyData("Sale Updated Successfully", "success");
      } else {
        await dispatch(createSale(formData)).unwrap();
        NotifyData("Sale Created Successfully", "success");
      }
      navigate("/Sale");
    } catch (error) {
      NotifyData(
        isEditMode ? "Sale Update Failed" : "Sale Creation Failed",
        "error"
      );
    }
  };

  const handleBack = () => {
    navigate("/Sale");
  };

  const title = isViewMode
    ? "View Sale"
    : isEditMode
    ? "Edit Sale"
    : "Create Sale";

  return (
    <div id="main">
      <Container fluid className="py-5">
        {/* Scrollable Content */}
        <Row className="py-3">
          <Col>
            {/* CUSTOMER INFO */}
            <Row className="mb-3">
              <Col md={9}>
                <Row className="mb-3">
                  <Col md={6}>
                    <label>Customer Name</label>
                    <div className="d-flex gap-2">
                      <Select
                        options={customers}
                        value={
                          customers.find((o) => o.value === customer) || null
                        }
                        onChange={isViewMode ? undefined : handlePartySelect}
                        placeholder="Select Customer"
                        isClearable
                        isDisabled={isViewMode}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <TextInputform
                      formLabel="Phone Number"
                      formtype="tel"
                      value={phone}
                      onChange={
                        isViewMode ? undefined : (e) => setPhone(e.target.value)
                      }
                      readOnly={isViewMode}
                    />
                  </Col>
                </Row>
                {credit && (
                  <Row className="mb-3">
                    <Col md={6}>
                      <TextArea
                        textlabel="Billing Address"
                        value={billingAddress}
                        onChange={
                          isViewMode
                            ? undefined
                            : (e) => setBillingAddress(e.target.value)
                        }
                        readOnly={isViewMode}
                      />
                    </Col>
                    <Col md={6}>
                      <TextArea
                        textlabel="Shipping Address"
                        value={shippingAddress}
                        onChange={
                          isViewMode
                            ? undefined
                            : (e) => setShippingAddress(e.target.value)
                        }
                        readOnly={isViewMode}
                      />
                    </Col>
                  </Row>
                )}
              </Col>
              <Col md={3} style={{ zIndex: 100 }}>
                <TextInputform
                  formLabel="Invoice Number"
                  value={invoiceNumber}
                  onChange={
                    isViewMode
                      ? undefined
                      : (e) => setInvoiceNumber(e.target.value)
                  }
                  readOnly={isViewMode}
                />
                <Calender
                  calenderlabel="Invoice Date"
                  initialDate={invoiceDate}
                  setLabel={isViewMode ? undefined : setInvoiceDate}
                />
                <DropDown
                  textlabel="State of supply"
                  value={stateOfSupply}
                  onChange={isViewMode ? undefined : setStateOfSupply}
                  options={stateOfSupplyOptions}
                  disabled={isViewMode}
                />
              </Col>
            </Row>

            {/* Credit Toggle */}
            {!isViewMode && (
              <div className="mb-3">
                <label className="me-2">Credit</label>
                <input
                  type="checkbox"
                  checked={credit}
                  onChange={toggleCredit}
                />
              </div>
            )}

            {/* ITEMS TABLE */}
            <Row className="item-table-row mt-4">
              <Col style={{ overflow: "visible", zIndex: 10 }}>
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
                    {rows.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <TextInputform
                            value={row.item}
                            onChange={
                              isViewMode
                                ? undefined
                                : (e) =>
                                    onRowChange(row.id, "item", e.target.value)
                            }
                            readOnly={isViewMode}
                          />
                        </td>
                        <td>
                          <TextInputform
                            formtype="number"
                            value={row.qty}
                            onChange={
                              isViewMode
                                ? undefined
                                : (e) =>
                                    onRowChange(row.id, "qty", e.target.value)
                            }
                            readOnly={isViewMode}
                          />
                        </td>
                        <td>
                          <DropDown
                            value={row.unit}
                            onChange={
                              isViewMode
                                ? undefined
                                : (v) => onRowChange(row.id, "unit", v)
                            }
                            options={unitsOptions}
                            disabled={isViewMode}
                          />
                        </td>
                        <td>
                          <TextInputform
                            formtype="number"
                            value={row.price}
                            onChange={
                              isViewMode
                                ? undefined
                                : (e) =>
                                    onRowChange(row.id, "price", e.target.value)
                            }
                            readOnly={isViewMode}
                          />
                        </td>
                        <td>
                          <DropDown
                            value={row.priceUnitType}
                            onChange={
                              isViewMode
                                ? undefined
                                : (v) => onRowChange(row.id, "priceUnitType", v)
                            }
                            options={priceUnitTypesOptions}
                            disabled={isViewMode}
                          />
                        </td>
                        <td>
                          <InputGroup size="sm">
                            <FormControl
                              type="number"
                              placeholder="%"
                              value={row.discountPercent}
                              onChange={
                                isViewMode
                                  ? undefined
                                  : (e) =>
                                      onRowChange(
                                        row.id,
                                        "discountPercent",
                                        e.target.value
                                      )
                              }
                              readOnly={isViewMode}
                            />
                            <FormControl value={row.discountAmount} readOnly />
                          </InputGroup>
                        </td>
                        <td>
                          <Select
                            value={
                              taxOptionsFormatted.find(
                                (opt) =>
                                  String(opt.value) === String(row.taxPercent)
                              ) || taxOptionsFormatted[0]
                            }
                            onChange={(v) =>
                              onRowChange(row.id, "taxPercent", v)
                            }
                            options={taxOptionsFormatted}
                            isDisabled={isViewMode}
                            menuPortalTarget={document.body}
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                minHeight: "30px",
                              }),
                              valueContainer: (provided) => ({
                                ...provided,
                                padding: "0 8px",
                              }),
                              input: (provided) => ({
                                ...provided,
                                margin: "0px",
                              }),
                              indicatorsContainer: (provided) => ({
                                ...provided,
                                height: "30px",
                              }),
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                          />
                          <TextInputform
                            readOnly
                            value={row.taxAmount || "0.00"}
                          />
                        </td>
                        <td>
                          <TextInputform readOnly value={row.amount} />
                        </td>
                        <td>
                          {!isViewMode && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => deleteRow(row.id)}
                            >
                              <FaTimes />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {!isViewMode && (
                      <tr>
                        <td colSpan="9">
                          <Button size="sm" onClick={addRow}>
                            <FaPlus /> ADD ROW
                          </Button>
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
                <Form.Select
                  value={paymentType}
                  onChange={
                    isViewMode
                      ? undefined
                      : (e) => setPaymentType(e.target.value)
                  }
                  disabled={isViewMode}
                >
                  <option value="Phone Pay">Phone Pay</option>
                  <option value="Cash">Cash</option>
                  <option value="G-pay">G-pay</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-end align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={isRoundOffEnabled}
                  onChange={
                    isViewMode
                      ? undefined
                      : (e) => setIsRoundOffEnabled(e.target.checked)
                  }
                  disabled={isViewMode}
                />
                <Form.Label>Round Off</Form.Label>
                <TextInputform
                  formtype="number"
                  value={roundOff}
                  readOnly={!isRoundOffEnabled || isViewMode}
                  onChange={
                    isViewMode ? undefined : (e) => setRoundOff(e.target.value)
                  }
                />
                <strong>Total</strong>
                <TextInputform readOnly value={totalAmount.toFixed(2)} />
              </Col>
            </Row>
            {/* Footer with Save Button */}
            {!isViewMode && (
              <Row className="py-3">
                <Col className="d-flex justify-content-between align-items-end">
                  <Button variant="secondary" onClick={handleBack} size="lg">
                    Back
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={handleSave}
                    size="lg"
                  >
                    {isEditMode ? "Update Sale" : "Save Sale"}
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SaleCreation;
