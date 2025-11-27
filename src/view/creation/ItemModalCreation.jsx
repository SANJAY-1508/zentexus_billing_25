import React, { useState, useEffect, useRef } from "react";
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
import { FaCamera, FaCog, FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnits } from "../../slice/UnitSlice";
import { fetchCategories } from "../../slice/CategorySlice";
import { createProduct } from "../../slice/ProductSlice";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";

function AddItem({ show, onHide, activeTab = "PRODUCT" }) {
  const dispatch = useDispatch();
  const { units = [], status: unitStatus } = useSelector((state) => state.unit);
  const { categories = [], status: categoryStatus } = useSelector((state) => state.category);
  const { status: productStatus } = useSelector((state) => state.product);

  const [type, setType] = useState("add"); // "add" = Product, "reduce" = Service
  const [activePricingTab, setActivePricingTab] = useState("pricing");

  // Image Upload States
  const [imagePreview, setImagePreview] = useState("");
  const [imageBase64, setImageBase64] = useState(""); // Sent to backend
  const [imageFileName, setImageFileName] = useState("");
  const [hasUserUploadedImage, setHasUserUploadedImage] = useState(false);

  // Main Form Fields
  const [itemName, setItemName] = useState("");
  const [hsn, setHsn] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Pricing & Stock
  const [salePriceDetails, setSalePriceDetails] = useState({
    price: "",
    tax_type: "Without Tax",
    discount: "",
    discount_type: "Percentage",
  });

  const [purchasePriceDetails, setPurchasePriceDetails] = useState({
    price: "",
    tax_type: "Without Tax",
    tax_rate: "None",
  });

  const [stockDetails, setStockDetails] = useState({
    opening_qty: "",
    at_price: "",
    stock_date: new Date().toISOString().split("T")[0],
    min_stock: "",
    location: "",
  });

  // Dropdown refs
  const unitRef = useRef();
  const categoryRef = useRef();
  const [showUnitMenu, setShowUnitMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const isProduct = type === "add";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (unitRef.current && !unitRef.current.contains(e.target)) setShowUnitMenu(false);
      if (categoryRef.current && !categoryRef.current.contains(e.target)) setShowCategoryMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set type based on activeTab (PRODUCT or SERVICE)
  useEffect(() => {
    if (activeTab === "SERVICE") setType("reduce");
    else setType("add");
  }, [activeTab, show]);

  // Fetch units & categories when modal opens
  useEffect(() => {
    if (show) {
      if (unitStatus === "idle") dispatch(fetchUnits());
      if (categoryStatus === "idle") dispatch(fetchCategories());
    }
  }, [show, unitStatus, categoryStatus, dispatch]);

  // Auto-select first unit and category
  useEffect(() => {
    if (units.length > 0 && !selectedUnit) {
      setSelectedUnit(units[0].unit_name);
    }
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [units, categories]);

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setImageFileName(file.name);
    setHasUserUploadedImage(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImagePreview(base64);
      setImageBase64(base64); // This will be sent to backend
    };
    reader.readAsDataURL(file);
  };

  // Final Save Function
  const handleSave = async () => {
    if (!itemName.trim()) {
      alert("Item/Service Name is required");
      return;
    }
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }
    if (!selectedUnit) {
      alert("Please select a unit");
      return;
    }

    // Find unit_id and category_name
    const unitObj = units.find((u) => u.unit_name === selectedUnit) || {};
    const categoryObj = categories.find((c) => c.id == selectedCategory) || {};

    const sale_price = JSON.stringify({
      price: salePriceDetails.price || "0",
      tax_type: salePriceDetails.tax_type,
      discount: salePriceDetails.discount || "0",
      discount_type: salePriceDetails.discount_type,
    });

    const purchase_price = isProduct
      ? JSON.stringify({
          price: purchasePriceDetails.price || "0",
          tax_type: purchasePriceDetails.tax_type,
          tax_rate: purchasePriceDetails.tax_rate,
        })
      : null;

    const stock = isProduct
      ? JSON.stringify({
          opening_qty: stockDetails.opening_qty || "0",
          at_price: stockDetails.at_price || "0",
          stock_date: stockDetails.stock_date,
          min_stock: stockDetails.min_stock || "0",
          location: stockDetails.location || "",
        })
      : null;

    const data = {
      item_name: itemName.trim(),
      hsn_code: hsn || null,
      category_id: selectedCategory,
      category_name: categoryObj.category_name || "",
      unit_value: selectedUnit,
      unit_id: unitObj.units_id || null,
      add_image: imageBase64 || "", // Base64 image
      sale_price,
      purchase_price,
      stock,
      type: isProduct ? "product" : "service",
    };

    try {
      await dispatch(createProduct(data)).unwrap();
      alert("Saved Successfully!");
      onHide();
      // Optional: Reset form if needed
    } catch (err) {
      console.error("Save failed:", err);
      alert(err.message || "Failed to save item. Check console.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="xl">
      <Modal.Header className="border-0 pb-1 align-items-start">
        <div className="w-100 d-flex justify-content-between align-items-start">
          <Modal.Title className="h5 fw-bold d-flex align-items-center gap-3">
            {isProduct ? "Add Item" : "Add Service"}
            <div
              className="d-flex position-relative bg-light border rounded-pill overflow-hidden"
              style={{ width: "180px", height: "36px" }}
            >
              <div
                className="position-absolute bg-primary rounded-pill transition-all"
                style={{
                  width: "50%",
                  height: "100%",
                  transition: "transform 0.3s",
                  transform: type === "add" ? "translateX(0%)" : "translateX(100%)",
                }}
              />
              <Button
                variant="transparent"
                className={`flex-grow-1 py-2 rounded-pill ${type === "add" ? "text-white" : "text-primary"}`}
                onClick={() => setType("add")}
              >
                Product
              </Button>
              <Button
                variant="transparent"
                className={`flex-grow-1 py-2 rounded-pill ${type === "reduce" ? "text-white" : "text-primary"}`}
                onClick={() => setType("reduce")}
              >
                Service
              </Button>
            </div>
          </Modal.Title>
          <div className="d-flex gap-3 align-items-center">
            <Button variant="light" className="p-2"><FaCog /></Button>
            <Button variant="light" className="fs-3 lh-1" onClick={onHide}>×</Button>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="pt-2">
        <Row className="mb-4 g-3 align-items-end">
          <Col md={3}>
            <Form.Control
              className="white-input"
              placeholder={isProduct ? "Item Name *" : "Service Name *"}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              className="white-input"
              placeholder={isProduct ? "HSN/SAC Code" : "SAC Code"}
              value={hsn}
              onChange={(e) => setHsn(e.target.value)}
            />
          </Col>

          {/* Unit Dropdown */}
          <Col md={2} ref={unitRef}>
            <div className="position-relative">
              <div
                className="form-control white-input d-flex align-items-center justify-content-between pe-2"
                style={{ backgroundColor: "#cce7f3", cursor: "pointer", height: "38px" }}
                onClick={() => setShowUnitMenu(!showUnitMenu)}
              >
                <span className={!selectedUnit ? "text-muted" : ""}>
                  {selectedUnit || "Select Unit"}
                </span>
                <FaChevronDown className="text-primary" />
              </div>
              {showUnitMenu && (
                <div
                  className="position-absolute start-0 end-0 bg-white border shadow-sm rounded mt-1"
                  style={{ zIndex: 9999, maxHeight: "200px", overflowY: "auto" }}
                >
                  {units.map((u) => (
                    <div
                      key={u.units_id}
                      className="px-3 py-2 hover-bg-light"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedUnit(u.unit_name);
                        setShowUnitMenu(false);
                      }}
                    >
                      {u.unit_name} ({u.short_name})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>

          {/* Image Upload */}
          <Col md={4}>
            <label
              htmlFor="item-image-upload"
              className="btn btn-link text-primary p-0 m-0 d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}
            >
              <FaCamera size={20} /> {imageFileName || "Add Item Image"}
            </label>
            <input
              id="item-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Item preview"
                  style={{
                    maxWidth: "120px",
                    maxHeight: "120px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}
          </Col>
        </Row>

        <Row className="mb-4 g-3">
          {/* Category Dropdown */}
          <Col md={5} ref={categoryRef}>
            <div className="position-relative">
              <div
                className="form-control white-input d-flex align-items-center justify-content-between pe-2"
                style={{ cursor: "pointer", height: "38px" }}
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              >
                <span>
                  {selectedCategory
                    ? categories.find((c) => c.id == selectedCategory)?.category_name
                    : "-- Select Category --"}
                </span>
                <FaChevronDown className="text-primary" />
              </div>
              {showCategoryMenu && (
                <div
                  className="position-absolute start-0 end-0 bg-white border shadow-sm rounded mt-1"
                  style={{ zIndex: 9999, maxHeight: "200px", overflowY: "auto" }}
                >
                  {categories.map((c) => (
                    <div
                      key={c.id}
                      className="px-3 py-2 hover-bg-light"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedCategory(c.id);
                        setShowCategoryMenu(false);
                      }}
                    >
                      {c.category_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>

          <Col md={4}>
            <div className="position-relative">
              <Form.Control
                placeholder={isProduct ? "Item Code (Optional)" : "Service Code (Optional)"}
                className="white-input pe-5"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
              />
              <Button
                variant="light"
                size="sm"
                className="position-absolute end-0 top-50 translate-middle-y me-2"
                style={{ backgroundColor: "#cce7f3" }}
              >
                Auto
              </Button>
            </div>
          </Col>
        </Row>

        {/* Tabs: Pricing & Stock */}
        <Tabs
          activeKey={activePricingTab}
          onSelect={setActivePricingTab}
          className="mb-4"
          justify
        >
          <Tab
            eventKey="pricing"
            title={
              <span style={{ color: activePricingTab === "pricing" ? "#dc3545" : "#6c757d" }}>
                Pricing
              </span>
            }
          >
            <div className="pt-3">
              <Card className="p-4 mb-4 shadow-sm" style={{ backgroundColor: "#f8f9fa" }}>
                <h6 className="mb-4 text-dark">Sale Price</h6>
                <Row className="g-3">
                  <Col md={3}>
                    <Form.Control
                      placeholder="Sale Price"
                      value={salePriceDetails.price}
                      onChange={(e) =>
                        setSalePriceDetails({ ...salePriceDetails, price: e.target.value })
                      }
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      value={salePriceDetails.tax_type}
                      onChange={(e) =>
                        setSalePriceDetails({ ...salePriceDetails, tax_type: e.target.value })
                      }
                    >
                      <option>Without Tax</option>
                      <option>With Tax</option>
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      placeholder="Discount (Optional)"
                      value={salePriceDetails.discount}
                      onChange={(e) =>
                        setSalePriceDetails({ ...salePriceDetails, discount: e.target.value })
                      }
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      value={salePriceDetails.discount_type}
                      onChange={(e) =>
                        setSalePriceDetails({ ...salePriceDetails, discount_type: e.target.value })
                      }
                    >
                      <option>Percentage</option>
                      <option>Amount</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Card>

              {isProduct && (
                <Row className="g-3">
                  <Col md={6}>
                    <Card className="p-4 shadow-sm h-100" style={{ backgroundColor: "#f8f9fa" }}>
                      <h6>Purchase Price</h6>
                      <Row className="g-3 mt-2">
                        <Col md={6}>
                          <Form.Control
                            placeholder="Purchase Price"
                            value={purchasePriceDetails.price}
                            onChange={(e) =>
                              setPurchasePriceDetails({ ...purchasePriceDetails, price: e.target.value })
                            }
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Select
                            value={purchasePriceDetails.tax_type}
                            onChange={(e) =>
                              setPurchasePriceDetails({ ...purchasePriceDetails, tax_type: e.target.value })
                            }
                          >
                            <option>Without Tax</option>
                            <option>With Tax</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="p-4 shadow-sm h-100" style={{ backgroundColor: "#f8f9fa" }}>
                      <h6>Tax Rate</h6>
                      <Form.Select
                        className="mt-2"
                        value={purchasePriceDetails.tax_rate}
                        onChange={(e) =>
                          setPurchasePriceDetails({ ...purchasePriceDetails, tax_rate: e.target.value })
                        }
                      >
                        <option>None</option>
                        <option>IGST @5%</option>
                        <option>IGST @12%</option>
                        <option>IGST @18%</option>
                        <option>IGST @28%</option>
                      </Form.Select>
                    </Card>
                  </Col>
                </Row>
              )}
            </div>
          </Tab>

          {isProduct && (
            <Tab eventKey="stock" title="Stock">
              <Card className="p-4 mt-3" style={{ backgroundColor: "#f8f9fa" }}>
                <Row className="g-3">
                  <Col md={2}>
                    <Form.Control
                      placeholder="Opening Qty"
                      value={stockDetails.opening_qty}
                      onChange={(e) => setStockDetails({ ...stockDetails, opening_qty: e.target.value })}
                    />
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      placeholder="At Price"
                      value={stockDetails.at_price}
                      onChange={(e) => setStockDetails({ ...stockDetails, at_price: e.target.value })}
                    />
                  </Col>
                  <Col md={3}>
                    <DatePicker
                      selected={new Date(stockDetails.stock_date)}
                      onChange={(date) =>
                        setStockDetails({
                          ...stockDetails,
                          stock_date: date.toISOString().split("T")[0],
                        })
                      }
                      className="form-control"
                      dateFormat="dd/MM/yyyy"
                    />
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      placeholder="Min Stock"
                      value={stockDetails.min_stock}
                      onChange={(e) => setStockDetails({ ...stockDetails, min_stock: e.target.value })}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      placeholder="Location (Optional)"
                      value={stockDetails.location}
                      onChange={(e) => setStockDetails({ ...stockDetails, location: e.target.value })}
                    />
                  </Col>
                </Row>
              </Card>
            </Tab>
          )}
        </Tabs>
      </Modal.Body>

      <Modal.Footer className="border-0 bg-light justify-content-end">
        <Button variant="outline-secondary" onClick={handleSave} disabled={productStatus === "loading"}>
          Save & New
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={productStatus === "loading"}>
          {productStatus === "loading" ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddItem;