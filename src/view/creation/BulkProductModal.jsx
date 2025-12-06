// // src/components/modals/BulkProductModal.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   Button,
//   Form,
//   Table,
//   InputGroup,
//   Badge,
// } from "react-bootstrap";
// import { FaSearch } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { bulkUpdateProductStatus } from "../../slice/ProductSlice" // adjust path if needed

// const BulkProductModal = ({
//   show,
//   onHide,
//   title = "Bulk Action",
//   actionButtonText = "Apply",
//   actionButtonVariant = "primary",
//   loading: externalLoading = false,
//   isBulkInactive = false,
//   mode = "custom", // new: "inactive" | "active" | "custom"
// }) => {
//   const dispatch = useDispatch();
//   const { products = [], status } = useSelector((state) => state.product);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Determine the status code of the products we *want* to display for bulk action
//   // If mode is "inactive", we show active products (status_code == 0) to change them to inactive.
//   // If mode is "active", we show inactive products (status_code == 1) to change them to active.
//   const targetStatusCode = mode === "active" ? 1 : 0; 
//   const targetStatusName = targetStatusCode === 1 ? "inactive" : "active";

//   // Filter products based on the target status code AND search term
//   // Filter products based on the target status code AND search term
// const filteredProducts = products
//   .filter(p => p.status_code == targetStatusCode) // Filter based on target status
//   .filter((item) =>
//     item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleToggleItem = (productId) => {
//     setSelectedItems((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedItems([]);
//     } else {
//       setSelectedItems(filteredProducts.map((p) => p.product_id));
//     }
//     setSelectAll(!selectAll);
//   };

//   useEffect(() => {
//     const allVisibleSelected = filteredProducts.length > 0 &&
//       filteredProducts.every((p) => selectedItems.includes(p.product_id));
//     setSelectAll(allVisibleSelected && filteredProducts.length > 0);
//   }, [selectedItems, filteredProducts]);

//   const handleClose = () => {
//     setSearchTerm("");
//     setSelectedItems([]);
//     setSelectAll(false);
//     onHide();
//   };

// const handleConfirm = async () => {
//   if (selectedItems.length === 0) return alert("Please select at least one item.");

//   setLoading(true);

//   const statusCode = mode === "inactive" ? 1 : 0;
//   const statusName = statusCode === 1 ? "inactive" : "active";

//   try {
//     await dispatch(
//       bulkUpdateProductStatus({
//         product_ids: selectedItems,
//         status_code: statusCode,
//         status_name: statusName,
//       })
//     ).unwrap();

//     alert("Bulk update successful!");
//     handleClose();
//   } catch (err) {
//     alert("Error: " + err);
//   } finally {
//     setLoading(false);
//   }
// };



//   return (
//     <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
//       <Modal.Header closeButton className="bg-light">
//         <Modal.Title className="fw-bold">{title}</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         {/* Search + Count */}
//         <div className="mb-3">
//           <InputGroup>
//             <InputGroup.Text><FaSearch /></InputGroup.Text>
//             <Form.Control
//               placeholder="Search items..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </InputGroup>
//           <div className="mt-2 text-muted small">
//             Showing <strong>{filteredProducts.length}</strong> {targetStatusName} items
//             {selectedItems.length > 0 && (
//               <span className="ms-3">
//                 • <Badge bg="primary">{selectedItems.length} selected</Badge>
//               </span>
//             )}
//           </div>
//         </div>

//         <div style={{ maxHeight: "420px", overflowY: "auto" }}>
//           <Table hover bordered size="sm">
//             <thead className="table-light sticky-top">
//               <tr>
//                 <th style={{ width: "50px" }}>
//                   <Form.Check checked={selectAll} onChange={handleSelectAll} />
//                 </th>
//                 <th>Item Name</th>
//                 <th className="text-center">Qty</th>
//                 {isBulkInactive && <th className="text-center">Sold (90d)</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map((product) => {
//                 const stock = product.stock ? JSON.parse(product.stock) : {};
//                 const qty = parseFloat(stock.current_qty ?? stock.opening_qty ?? 0);
//                 const soldLast90 = stock.quantity_sold_last_90_days || 0;

//                 return (
//                   <tr key={product.product_id}>
//                     <td>
//                       <Form.Check
//                         checked={selectedItems.includes(product.product_id)}
//                         onChange={() => handleToggleItem(product.product_id)}
//                       />
//                     </td>
//                     <td className="fw-medium">{product.product_name}</td>
//                     <td className="text-center">{qty}</td>
//                     {isBulkInactive && (
//                       <td className="text-center text-danger fw-bold">{soldLast90}</td>
//                     )}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </div>
//       </Modal.Body>

//       <Modal.Footer className="bg-light">
//         <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//         <Button
//           variant={actionButtonVariant}
//           onClick={handleConfirm}
//           disabled={loading || externalLoading || selectedItems.length === 0}
//         >
//           {loading ? "Processing..." : actionButtonText} ({selectedItems.length})
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default BulkProductModal;



// src/components/modals/BulkProductModal.jsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Table,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { bulkUpdateProductStatus, bulkAssignProductCode,bulkAssignUnits } from "../../slice/ProductSlice";
import SelectUnitModal from "./SelectUnitModal";
import { fetchUnits } from "../../slice/UnitSlice";


const BulkProductModal = ({
  show,
  onHide,
  mode = "custom", // "inactive" | "active" | "assignCode"
}) => {
  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.product);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
const { units } = useSelector((state) => state.unit); // ← use your existing unit slice
const [showUnitModal, setShowUnitModal] = useState(false);
  // Main filter: only active products by default
  let filteredProducts = products.filter(p => p.status_code == 0);

  // Mode-specific filtering
  if (mode === "assignCode") {
    filteredProducts = filteredProducts.filter(p => 
      !p.product_code || String(p.product_code).trim() === ""
    );
  } else if (mode === "active") {
    filteredProducts = products.filter(p => p.status_code == 1);
  } else if (mode === "inactive") {
    filteredProducts = products.filter(p => p.status_code == 0);
  }
else if (mode === "assignUnits") {
  filteredProducts = products.filter(p => 
    p.status_code == 0 && 
    (!p.unit_value || p.unit_value === "" || p.unit_value === "{}" || p.unit_value === "null")
  );
}
  // Search filter
  filteredProducts = filteredProducts.filter(item =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleItem = (productId) => {
    setSelectedItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(selectAll ? [] : filteredProducts.map(p => p.product_id));
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    const allSelected = filteredProducts.length > 0 &&
      filteredProducts.every(p => selectedItems.includes(p.product_id));
    setSelectAll(allSelected);
  }, [selectedItems, filteredProducts]);
useEffect(() => {
  if (show && mode === "assignUnits") {
    dispatch(fetchUnits()); // This calls unit.php
  }
}, [show, mode, dispatch]);

  const handleClose = () => {
    setSearchTerm("");
    setSelectedItems([]);
    setSelectAll(false);
    onHide();
  };

 const handleConfirm = async () => {
  if (selectedItems.length === 0) return alert("Please select at least one item.");
  
  if (mode === "assignUnits") {
    if (units.length === 0) {
      toast.info("Loading units...");
      dispatch(fetchUnits()).unwrap().finally(() => {
        setShowUnitModal(true);
      });
    } else {
      setShowUnitModal(true);
    }
    return;
  }

  // ← ADD THIS LINE TO PREVENT unit.php CALL FOR NON-UNIT MODES
  if (mode !== "assignCode" && mode !== "inactive" && mode !== "active") return;

  setLoading(true);
  try {
    if (mode === "assignCode") {
      await dispatch(bulkAssignProductCode({ product_ids: selectedItems })).unwrap();
      toast.success(`Assigned codes to ${selectedItems.length} items!`);
    } else {
      const status_code = mode === "inactive" ? 1 : 0;
      const status_name = mode === "inactive" ? "inactive" : "active";
      await dispatch(bulkUpdateProductStatus({
        product_ids: selectedItems,
        status_code,
        status_name,
      })).unwrap();
      toast.success(`Marked ${selectedItems.length} items as ${status_name}!`);
    }
    handleClose();
  } catch (err) {
    toast.error("Failed: " + (err.message || err));
  } finally {
    setLoading(false);
  }
};

const handleSaveUnit = (mapping) => {
  const baseUnitName = mapping.baseUnit;
  const baseUnitObj = units.find(u => u.unit_name === baseUnitName);
  
  if (!baseUnitObj) return toast.error("Unit not found!");

  const payload = {
    bulk_assign_units: true,           // ← ADD THIS
    product_ids: selectedItems,
    unit_value: baseUnitName,
    unit_id: baseUnitObj.unit_id       // ← THIS WAS MISSING!
  };

  dispatch(bulkAssignUnits(payload))
    .unwrap()
    .then(() => {
      toast.success("Units assigned!");
      setShowUnitModal(false);
      handleClose();
    })
    .catch(() => toast.error("Failed"));
};

 const getTitle = () => {
  if (mode === "assignUnits") return "Bulk Assign Units";
  if (mode === "assignCode") return "Bulk Assign Code";
  if (mode === "inactive") return "Bulk Mark Inactive";
  if (mode === "active") return "Bulk Mark Active";
  return "Bulk Action";
};

  const getButtonText = () => {
  if (mode === "assignUnits") return "Assign Units";
  if (mode === "assignCode") return "Assign Code";
  if (mode === "inactive") return "Mark as Inactive";
  return "Mark as Active";
};  

  const getButtonVariant = () => {
    switch (mode) {
      case "assignCode": return "warning";
      case "inactive": return "danger";
      default: return "success";
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold">{getTitle()}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <Form.Control
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <div className="mt-2 text-muted small">
            Showing <strong>{filteredProducts.length}</strong> items
            {selectedItems.length > 0 && (
              <span className="ms-3">
                • <Badge bg="primary">{selectedItems.length} selected</Badge>
              </span>
            )}
          </div>
        </div>

        <div style={{ maxHeight: "480px", overflowY: "auto" }}>
          <Table hover bordered size="sm">
    <thead className="table-light sticky-top">
      <tr>
        <th style={{ width: "50px" }}>
          <Form.Check checked={selectAll} onChange={handleSelectAll} />
        </th>
        <th>Item Name</th>
        {mode === "assignUnits" ? (
          <>
            <th className="text-center">Qty</th>
            <th className="text-center">Current Unit</th>
          </>
        ) : (
          <th>Current Code</th>
        )}
      </tr>
    </thead>
    <tbody>
      {filteredProducts.length === 0 ? (
        <tr>
          <td colSpan={mode === "assignUnits" ? 4 : 3} className="text-center text-muted py-4">
            {mode === "assignUnits"
              ? "All active items already have units assigned"
              : mode === "assignCode"
              ? "All items already have a code"
              : "No items found"}
          </td>
        </tr>
      ) : (
        filteredProducts.map((product) => {
          // Calculate quantity (same logic you already use everywhere)
          const stock = product.stock ? JSON.parse(product.stock) : {};
          const qty = parseFloat(stock.current_qty ?? stock.opening_qty ?? 0).toFixed(2);

          return (
            <tr key={product.product_id}>
              <td>
                <Form.Check
                  checked={selectedItems.includes(product.product_id)}
                  onChange={() => handleToggleItem(product.product_id)}
                />
              </td>
              <td className="fw-medium">{product.product_name}</td>

              {mode === "assignUnits" ? (
                <>
                  <td className="text-center">{qty}</td>
                  <td className="text-center text-muted">
                    {product.unit_value && product.unit_value !== "{}" && product.unit_value !== "null" ? (
                      (() => {
                        try {
                          const parsed = JSON.parse(product.unit_value);
                          return parsed.shortText || "Set";
                        } catch (e) {
                          return "Set";
                        }
                      })()
                    ) : (
                      <em>None</em>
                    )}
                  </td>
                </>
              ) : (
                <td className="text-muted">
                  {product.product_code ? product.product_code : <em>None</em>}
                </td>
              )}
            </tr>
          );
        })
      )}
    </tbody>
  </Table>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button
          variant={getButtonVariant()}
          onClick={handleConfirm}
          disabled={loading || selectedItems.length === 0}
        >
          {loading ? "Processing..." : getButtonText()} ({selectedItems.length})
        </Button>
      </Modal.Footer>
      {/* THIS IS THE CORRECT PLACE */}
      <SelectUnitModal
        show={showUnitModal}
        onHide={() => setShowUnitModal(false)}
        units={units}
        unitMapping={null}
        onSaveMapping={handleSaveUnit}
      />
    </Modal>
    
  );
  
};

export default BulkProductModal;








