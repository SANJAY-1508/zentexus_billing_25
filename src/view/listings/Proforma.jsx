// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Container, Row, Col, Button, Table } from "react-bootstrap";
// import { FaSearch, FaChartBar, FaFileExcel, FaPrint } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { searchProforma, deleteProforma } from "../../slice/ProformaSlice";
// import { TextInputform } from "../../components/Forms";
// import TableUI from "../../components/TableUI";
// import { ActionButton } from "../../components/Buttons";
// import { MdOutlineDelete } from "react-icons/md";
// import { TbCircleLetterI } from "react-icons/tb";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import NotifyData from "../../components/NotifyData";
// import { FiPrinter, FiShare2 } from "react-icons/fi";
// import { FaWhatsapp, FaChevronDown, FaRegCalendarAlt } from "react-icons/fa";
// import { SiGmail } from "react-icons/si";
// import { MdSms } from "react-icons/md";
// import { Form, InputGroup } from "react-bootstrap";
// // IMPORT THE Proforma CREATION COMPONENT
// import ProformaCreation from "../creation/ProformaCreation";

// // ADD THIS IMPORT - date-fns for filtering
// import {
//   isToday,
//   isYesterday,
//   startOfWeek,
//   endOfWeek,
//   startOfMonth,
//   endOfMonth,
//   startOfYear,
//   endOfYear,
//   isWithinInterval,
//   parseISO,
// } from "date-fns";

// const Proforma = () => {
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // FIXED: Access Redux state with correct case
//   const ProformaState = useSelector((state) => state.Proforma) || {};
//   const ProformaList = ProformaState.Proforma || [];
  
//   const [open, setOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [openShareId, setOpenShareId] = useState(null);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
//   const [customFromDate, setCustomFromDate] = useState("");
//   const [customToDate, setCustomToDate] = useState("");
  
//   // Date filter states
//   const [selectedPeriod, setSelectedPeriod] = useState("This Year");
//   const [periodOpen, setPeriodOpen] = useState(false);
//   const [selectedFirm, setSelectedFirm] = useState("All Firms");
//   const [firmOpen, setFirmOpen] = useState(false);

//   // Fetch estimates on search change
//   useEffect(() => {
//     dispatch(searchProforma(searchTerm));
//   }, [dispatch, searchTerm]);

//   // Get status from data (for status filter) - FIXED for Proforma
//   const getStatusFromData = (item) => {
//     // Use the status from database if available
//     if (item.status) {
//       return item.status;
//     }
    
//     // Fallback calculation if status is not in data
//     const balance = Number(item.balance_due || 0);
//     const received = Number(item.received_amount || 0);
//     const isCancelled = item.delete_at === 1; // Changed from is_cancelled

//     if (isCancelled) return "Cancelled";
//     if (balance === 0) return "Paid";
//     if (received === 0 && balance > 0) return "Unpaid";
//     if (received > 0 && balance > 0) return "Partially Paid";
//     return "Unpaid";
//   };

//   // MAIN FILTERING LOGIC - Status + Date Period + Custom Range
//   const filteredProforma = useMemo(() => {
//     if (!ProformaList || !Array.isArray(ProformaList)) return [];

//     let filtered = [...ProformaList];

//     // Apply Status Filter
//     if (statusFilter !== "All") {
//       filtered = filtered.filter((item) => getStatusFromData(item) === statusFilter);
//     }

//     // Check if custom dates are selected
//     const hasCustomDates = customFromDate || customToDate;

//     // If no period and no custom dates → return filtered (after status)
//     if (!selectedPeriod && !hasCustomDates) return filtered;

//     return filtered.filter((item) => {
//       if (!item.Proforma_date) return false;

//       let ProformaDate;
//       try {
//         ProformaDate = parseISO(item.Proforma_date);
//       } catch (error) {
//         console.error("Invalid date:", item.Proforma_date);
//         return false;
//       }

//       // Handle Custom Date Range FIRST (highest priority)
//       if (hasCustomDates) {
//         let matches = true;

//         if (customFromDate) {
//           const from = parseISO(customFromDate);
//           matches = matches && ProformaDate >= from;
//         }

//         if (customToDate) {
//           const to = parseISO(customToDate);
//           // Include full end day
//           to.setHours(23, 59, 59, 999);
//           matches = matches && ProformaDate <= to;
//         }

//         return matches;
//       }

//       // Handle Predefined Periods
//       if (selectedPeriod === "All Time") return true;

//       const now = new Date();

//       switch (selectedPeriod) {
//         case "Today":
//           return isToday(ProformaDate);
//         case "Yesterday":
//           return isYesterday(ProformaDate);
//         case "This Week":
//           return isWithinInterval(ProformaDate, {
//             start: startOfWeek(now),
//             end: endOfWeek(now),
//           });
//         case "This Month":
//           return isWithinInterval(ProformaDate, {
//             start: startOfMonth(now),
//             end: endOfMonth(now),
//           });
//         case "This Year":
//           return isWithinInterval(ProformaDate, {
//             start: startOfYear(now),
//             end: endOfYear(now),
//           });
//         case "Last Year":
//           const lastYear = new Date(now.getFullYear() - 1, 0, 1);
//           return isWithinInterval(ProformaDate, {
//             start: startOfYear(lastYear),
//             end: endOfYear(lastYear),
//           });
//         default:
//           return true;
//       }
//     });
//   }, [ProformaList, statusFilter, selectedPeriod, customFromDate, customToDate]);
  
//   const totals = useMemo(() => {
//     if (!filteredProforma || !Array.isArray(filteredProforma)) {
//       return { /* default */ };
//     }

//     const totalQuotations = filteredProforma.reduce((sum, s) => sum + parseFloat(s.total || 0), 0);
//     const totalReceived = filteredProforma.reduce((sum, s) => sum + parseFloat(s.received_amount || 0), 0);
//     const totalBalance = filteredProforma.reduce((sum, s) => sum + parseFloat(s.balance_due || 0), 0);

//     const convertedProforma = filteredProforma.filter(item => 
//       item.converted_to_sale === 1 || item.converted_to_sale === "1"
//     );

//     const openProforma = filteredProforma.filter(item => 
//       (item.converted_to_sale !== 1 && item.converted_to_sale !== "1") &&
//       getStatusFromData(item) !== "Cancelled"
//     );

//     const totalConverted = convertedProforma.reduce((sum, s) => sum + parseFloat(s.total || 0), 0);
//     const totalOpen = openProforma.reduce((sum, s) => sum + parseFloat(s.total || 0), 0);

//     return {
//       totalQuotations: totalQuotations.toFixed(2),
//       totalReceived: totalReceived.toFixed(2),
//       totalBalance: totalBalance.toFixed(2),
//       totalConverted: totalConverted.toFixed(2),
//       totalOpen: totalOpen.toFixed(2),
//     };
//   }, [filteredProforma]);

//   // Calculate percentage change vs last year
//   const comparisonTotals = useMemo(() => {
//     if (selectedPeriod !== "This Year") return null;
//     if (!ProformaList || !Array.isArray(ProformaList)) return 0;

//     const lastYearStart = new Date(new Date().getFullYear() - 1, 0, 1);
//     const lastYearEnd = new Date(new Date().getFullYear() - 1, 11, 31);

//     const lastYearProforma = ProformaList.filter((item) => {
//       if (!item.Proforma_date) return false;
//       try {
//         const date = parseISO(item.Proforma_date);
//         return date >= lastYearStart && date <= lastYearEnd;
//       } catch (error) {
//         console.error("Error parsing date for comparison:", error);
//         return false;
//       }
//     });

//     return lastYearProforma.reduce((sum, s) => sum + parseFloat(s.total || 0), 0);
//   }, [ProformaList, selectedPeriod]);

//   const percentageChange = comparisonTotals !== null && comparisonTotals > 0
//     ? ((parseFloat(totals.totalQuotations) - comparisonTotals) / comparisonTotals) * 100
//     : totals.totalQuotations > 0 ? 100 : 0;

//   const statusDisplay = (item) => {
//     const status = getStatusFromData(item);
//     const colorMap = {
//       Paid: "#27ae60",
//       Unpaid: "#e74c3c",
//       "Partially Paid": "#f39c12",
//       Cancelled: "#0be0f0ff",
//     };
//     return <span style={{ color: colorMap[status], fontWeight: "600" }}>{status}</span>;
//   };

//   // Navigation - FIXED for Proforma
//   const handleCreate = () => navigate("/Proforma/create");
//   const handleEdit = (Proforma) => navigate(`/Proforma/edit/${Proforma.Proforma_id}`);
//   const handleView = (Proforma) => navigate(`/Proforma/view/${Proforma.Proforma_id}`);

//   const handleDelete = async (ProformaId) => {
//     if (!window.confirm("Are you sure you want to delete this Proforma?")) return;
//     try {
//       await dispatch(deleteProforma(ProformaId)).unwrap();
//       NotifyData("Proforma Deleted Successfully", "success");
//     } catch {
//       NotifyData("Proforma Deletion Failed", "error");
//     }
//   };
  
//   const handleConvertToSale = (item) => {
//     navigate("/sale/create", {
//       state: {
//         fromProforma: true,
//         ProformaData: item,
//       },
//     });
//   };

//   // Handle Convert to Order
//   const handleConvertToOrder = (Proforma) => {
//     NotifyData(`Converting Proforma ${Proforma.Proforma_no} to order`, "info");
//     setOpenShareId(null);
//   };

//   // Table headers
//   const ProformaHead = [
//     "Date",
//     "Proforma No",
//     "Party Name",
//     "Transaction",
//     "Payment Type",
//     "Amount",
//     "Balance",
//     <div key="status" style={{ position: "relative", display: "inline-block" }} onClick={(e) => e.stopPropagation()}>
//       <span
//         style={{ cursor: "pointer", fontWeight: "bold", color: "#212529" }}
//         onClick={(e) => {
//           const dropdown = e.currentTarget.nextElementSibling;
//           dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
//         }}
//       >
//         Status<FaChevronDown style={{ marginLeft: "8px", fontSize: "16px", color: "#212529" }} />
//       </span>

//       <div style={{
//         display: "none",
//         position: "absolute",
//         top: "100%",
//         left: "50%",
//         transform: "translateX(-50%)",
//         background: "white",
//         border: "1px solid #ddd",
//         borderRadius: "10px",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
//         zIndex: 9999,
//         minWidth: "160px",
//         marginTop: "8px",
//         overflow: "hidden"
//       }}>
//         {["All", "Paid", "Unpaid", "Partially Paid", "Cancelled"].map((status) => (
//           <div
//             key={status}
//             onClick={() => setStatusFilter(status)}
//             style={{
//               padding: "12px 18px",
//               cursor: "pointer",
//               backgroundColor: statusFilter === status ? "#3498db" : "white",
//               color: statusFilter === status ? "white" : "#2c3e50",
//               fontWeight: statusFilter === status ? "bold" : "500",
//               transition: "all 0.2s"
//             }}
//             onMouseEnter={(e) => statusFilter !== status && (e.currentTarget.style.backgroundColor = "#f8f9fa")}
//             onMouseLeave={(e) => statusFilter !== status && (e.currentTarget.style.backgroundColor = "white")}
//           >
//             {status}
//           </div>
//         ))}
//       </div>
//     </div>,
//     "Actions",
//     " Proforma Status"
//   ];

//   // Close dropdown on outside click
//   useEffect(() => {
//     const close = () => {
//       document.querySelectorAll('div[style*="z-index: 9999"]').forEach(d => d.style.display = "none");
//     };
//     document.addEventListener("click", close);
//     return () => document.removeEventListener("click", close);
//   }, []);

//   // Prepare table data with useMemo
//   const EstimateData = useMemo(() => {
//      if (!filteredProforma || !Array.isArray(filteredProforma) || filteredProforma.length === 0) {
//        return [];
//      }
     
//      return filteredProforma.map((item) => {
//        const total = Number(item.total || 0).toFixed(2);
//        const balance = Number(item.balance_due || 0).toFixed(2);
//        const isConverted = item.converted_to_sale === 1 || item.converted_to_sale === "1";
//        const balanceDisplay = balance > 0 ? (
//          <span style={{ color: "#d63031", fontWeight: "bold" }}>₹ {balance}</span>
//        ) : (
//          <span style={{ color: "#27ae60" }}>₹ 0.00</span>
//        );
 
//        return {
//          icon: <TbCircleLetterI />,
//          values: [
//            item.estimate_date || "-",
//            item.estimate_no || "-",
//            item.name || "-",
//            "Estimate",
//            item.payment_type || "Cash",
//            `₹ ${total}`,
//            balanceDisplay,
//            statusDisplay(item),
//            <div
//              key={item.estimate_id}
//              style={{
//                position: "relative",
//                display: "flex",
//                alignItems: "center",
//                gap: "12px",
//              }}
//            >
//              {/* Convert Dropdown */}
//              <div className="position-relative">
               
//                <button
//    disabled={isConverted}
//    className={`btn btn-sm ${isConverted ? 'btn-secondary' : 'btn-primary'} rounded-pill`}
//    onClick={() => !isConverted && handleConvertToSale(item)}
//  >
//    {isConverted ? 'Converted' : 'Select'} <FaChevronDown />
//  </button>
 
//                {openShareId === item.estimate_id && (
//                  <div
//                    style={{
//                      position: "absolute",
//                      top: "100%",
//                      left: 0,
//                      marginTop: "5px",
//                      background: "white",
//                      borderRadius: "8px",
//                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                      zIndex: 1000,
//                      minWidth: "160px",
//                      border: "1px solid #dee2e6",
//                    }}
//                  >
//                    <div
//                      onClick={() => handleConvertToSale(item)}
//                      style={{
//                        padding: "10px 15px",
//                        cursor: "pointer",
//                        borderBottom: "1px solid #f1f3f4",
//                        color: "#2c3e50",
//                        fontWeight: "500",
//                      }}
//                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
//                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
//                    >
//                      Convert to Sale
//                    </div>
//                    <div
//                      onClick={() => handleConvertToOrder(item)}
//                      style={{
//                        padding: "10px 15px",
//                        cursor: "pointer",
//                        color: "#2c3e50",
//                        fontWeight: "500",
//                      }}
//                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
//                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
//                    >
//                      Convert to Order
//                    </div>
//                  </div>
//                )}
//              </div>
 
//              <ActionButton
//                options={[
//                  { label: "View", icon: <TbCircleLetterI />, onClick: () => handleView(item) },
//                  { label: "Edit", icon: <TbCircleLetterI />, onClick: () => handleEdit(item) },
//                  { label: "Delete", icon: <MdOutlineDelete />, onClick: () => handleDelete(item.estimate_id) },
//                  { label: "Duplicate", icon: <TbCircleLetterI />},
//                  { label: "Open PDF", icon: <TbCircleLetterI />},
//                  { label: "Preview", icon: <TbCircleLetterI />},
//                  { label: "Print", icon: <TbCircleLetterI />}
//                ]}
//                label={<HiOutlineDotsVertical />}
//              />
//            </div>,
//          ],
//        };
//      });
//    }, [filteredProforma, openShareId]);
//   return (
//     <div id="main" style={{ backgroundColor: "#DEE2E6", minHeight: "100vh" }}>
//       <Container fluid className="py-5">
//         <Row>
//           <Col xl={12}>
//             {/* Business Name Header */}
//             <div className="d-flex align-items-center">
//               <span style={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}>•</span>
//               {isEditing ? (
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "8px" }}>
//                   <input
//                     type="text"
//                     value={businessName}
//                     onChange={(e) => setBusinessName(e.target.value)}
//                     placeholder="Enter Business Name"
//                     autoFocus
//                     style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "5px 10px", fontSize: "1rem", width: "250px" }}
//                     onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
//                   />
//                   <Button variant="info" onClick={() => setIsEditing(false)}>
//                     Save
//                   </Button>
//                 </div>
//               ) : (
//                 <span className="ms-2 text-muted" style={{ cursor: "pointer" }} onClick={() => setIsEditing(true)}>
//                   {businessName || "Enter Business Name"}
//                 </span>
//               )}
//               <div className="ms-auto d-flex align-items-center gap-2">
//                  <Button variant="danger" onClick={() => navigate("/sale/create")}>+Add Sale</Button>
//                  <Button variant="success" onClick={handleCreate}>+Add Purchase</Button>
//                   <Button variant="info">+Add More</Button>
//                   <Button variant="light">:</Button>
//               </div>
//             </div>
            
//             {/* Header -proforma Dropdown with Navigation */}
//             <Row className="align-items-center mb-4">
//               <Col>
//                 <h5 
//                   style={{ cursor: "pointer" }} 
//                   onClick={() => setOpen(!open)}
//                 >
//                   Proforma Invoices<FaChevronDown />
//                 </h5>

//                 {open && (
//                   <div style={{
//                     position: "absolute",
//                     background: "white",
//                     border: "1px solid #ddd",
//                     borderRadius: "6px",
//                     padding: "5px 0",
//                     width: "220px",
//                     zIndex: 999,
//                     boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                   }}>
//                     {[
//                       { label: "Sale Invoices", path: "/sale" },
//                       { label: "Estimate/Quotation", path: "/estimate" },
//                       { label: "Proforma Invoice", path: "/Proforma" },
//                     ].map((item) => (
//                       <div 
//                         key={item.label}
//                         onClick={() => {
//                           setOpen(false);
//                           if (item.path !== "/Proforma") {
//                             navigate(item.path);  // Navigate to the correct listing page
//                           }
//                         }} 
//                         style={{ 
//                           padding: "10px 16px", 
//                           cursor: "pointer",
//                           fontWeight: item.path === "/Proforma" ? "bold" : "normal",
//                           backgroundColor: item.path === "/Proforma" ? "#f0f8ff" : "transparent",
//                         }}
//                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
//                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = item.path === "/Proforma" ? "#f0f8ff" : "transparent"}
//                       >
//                         {item.label}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </Col>
//               <Col className="text-end">
//                 <Button
//                   variant="danger"
//                   className="btn-sm px-3 py-1 shadow rounded-pill fw-bold"
//                   style={{ fontSize: "0.85rem" }}
//                   onClick={() => navigate("/Proforma/create")}
//                 >
//                   + Add Proforma
//                 </Button>
//               </Col>
//             </Row>

//             {/* Filter Card */}
//             <Row className="mb-3">
//               <Col lg={12} className="p-3 pb-3 d-flex align-items-center flex-wrap gap-3 bg-white rounded shadow-sm border">
//                 <span className="text-muted fw-medium">Filter by :</span>

//                 {/* Period Dropdown */}
//                 <div className="position-relative">
//                   <button
//                     onClick={() => setPeriodOpen(!periodOpen)}
//                     className="btn rounded-pill border-0 shadow-sm d-flex align-items-center gap-2"
//                     style={{
//                       backgroundColor: "#e3f2fd",
//                       color: "#1565c0",
//                       fontWeight: "500",
//                       padding: "8px 20px",
//                     }}
//                   >
//                     {selectedPeriod} <FaChevronDown className={`transition-transform ${periodOpen ? 'rotate-180' : ''}`} size={12} />
//                   </button>

//                   {periodOpen && (
//                     <div className="position-absolute top-100 start-0 mt-2 bg-white rounded-3 shadow-lg border" style={{ zIndex: 1000, minWidth: "200px" }}>
//                       {["All Time", "Today", "Yesterday", "This Week", "This Month", "This Year", "Last Year", "Custom Range"].map((item) => (
//                         <div
//                           key={item}
//                           onClick={() => {
//                             setSelectedPeriod(item);
//                             setPeriodOpen(false);
//                           }}
//                           className="px-4 py-2 hover-bg-light cursor-pointer"
//                           style={{ cursor: "pointer" }}
//                         >
//                           {item === selectedPeriod ? <strong>{item}</strong> : item}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Date Range Display */}
//                 {/* Custom Date Range Picker */}
//                 <div className="d-flex align-items-center gap-2">
//                   <InputGroup size="sm" className="w-auto">
//                     <Form.Control
//                       type="date"
//                       value={customFromDate}
//                       onChange={(e) => setCustomFromDate(e.target.value)}
//                       className="border-0"
//                       style={{ backgroundColor: "#e3f2fd", color: "#1565c0", minWidth: "160px" }}
//                     />
//                     <InputGroup.Text className="bg-transparent border-0 text-primary">
                      
//                     </InputGroup.Text>
//                   </InputGroup>

//                   <span className="text-muted mx-2">To</span>

//                   <InputGroup size="sm" className="w-auto">
//                     <Form.Control
//                       type="date"
//                       value={customToDate}
//                       min={customFromDate}
//                       onChange={(e) => setCustomToDate(e.target.value)}
//                       className="border-0"
//                       style={{ backgroundColor: "#e3f2fd", color: "#1565c0", minWidth: "160px" }}
//                     />
//                     <InputGroup.Text className="bg-transparent border-0 text-primary">
                      
//                     </InputGroup.Text>
//                   </InputGroup>

//                   {(customFromDate || customToDate) && (
//                     <Button
//                       variant="outline-secondary"
//                       size="sm"
//                       className="ms-2 rounded-circle"
//                       style={{ width: "32px", height: "32px", padding: 0 }}
//                       onClick={() => {
//                         setCustomFromDate("");
//                         setCustomToDate("");
//                       }}
//                     >
//                       ×
//                     </Button>
//                   )}
//                 </div>

//                 {/* Firm Dropdown */}
//                 <div className="position-relative">
//                   <button
//                     onClick={() => setFirmOpen(!firmOpen)}
//                     className="btn rounded-pill border-0 shadow-sm d-flex align-items-center gap-2"
//                     style={{
//                       backgroundColor: "#e3f2fd",
//                       color: "#1565c0",
//                       fontWeight: "500",
//                       padding: "8px 24px",
//                     }}
//                   >
//                     {selectedFirm} <FaChevronDown className={`transition-transform ${firmOpen ? 'rotate-180' : ''}`} size={12} />
//                   </button>

//                   {firmOpen && (
//                     <div className="position-absolute top-100 start-0 mt-2 bg-white rounded-3 shadow-lg border" style={{ zIndex: 1000, minWidth: "220px" }}>
//                       {["All Firms", "My Company Pvt Ltd", "ABC Traders", "XYZ Enterprises", "Global Exports"].map((firm) => (
//                         <div
//                           key={firm}
//                           onClick={() => {
//                             setSelectedFirm(firm);
//                             setFirmOpen(false);
//                           }}
//                           className="px-4 py-2 hover-bg-light cursor-pointer"
//                           style={{ cursor: "pointer" }}
//                         >
//                           {firm === selectedFirm ? <strong>{firm}</strong> : firm}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </Col>
//             </Row>

//             {/* Totals Card - FIXED */}
//             <Row className="mb-4">
//               <Col>
//                 <div className="p-4 bg-white rounded shadow-sm border" style={{ maxWidth: "500px" }}>
//                   <h5 className="mb-1">
//                     Total quotations: <strong style={{ fontSize: "1.8rem" }}>₹{totals.totalQuotations}</strong>
//                   </h5>
//                   <small className="opacity-75 d-block mb-2">
//                     {percentageChange > 0 ? (
//                       <span style={{ color: "#27ae60" }}>↑ {percentageChange.toFixed(0)}% up</span>
//                     ) : percentageChange < 0 ? (
//                       <span style={{ color: "#e74c3c" }}>↓ {Math.abs(percentageChange).toFixed(0)}% down</span>
//                     ) : (
//                       <span>No change</span>
//                     )}{" "}
//                     vs last year
//                   </small>

//                   <div className="text-muted mt-3">
//                     <div className="d-flex justify-content-between">
//                       <span>Converted:</span>
//                       <strong style={{ color: "#27ae60" }}>₹{totals.totalConverted}</strong>
//                     </div>
//                     <div className="d-flex justify-content-between">
//                       <span>Open:</span>
//                       <strong style={{ color: "#e74c3c" }}>₹{totals.totalOpen}</strong>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//             </Row>

//             {/* Simple Table - Direct rendering (safer approach) */}
//             {filteredProforma.length > 0 ? (
//                <Table striped bordered hover responsive>
//               <thead className="table-light">
//                 <tr>
//                   <th>Date</th>
//                   <th>Reference No</th>
//                   <th>Party Name</th>
//                   <th>Transaction</th>
//                   <th>Payment Type</th>
//                   <th>Amount</th>
//                   <th>Balance</th>
//                   <th>Status</th>
//                   <th>Proforma Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProforma.map((item) => {
//                   const amount = Number(item.total || 0).toFixed(2);
//                   const received = Number(item.received_amount || 0);
//                   const balance = (Number(item.total || 0) - received).toFixed(2);
//                   const status = getStatusFromData(item);
//                   const isConverted = item.status === 'converted';

//                   return (
//                     <tr key={item.proforma_id}>
//                       <td>{item.invoice_date || "-"}</td>
//                       <td>{item.reference_no || "-"}</td>
//                       <td>{item.name || "-"}</td>
//                       <td>Proforma</td>
//                       <td>{item.payment_type || "-"}</td>
//                       <td>₹ {amount}</td>
//                       <td style={{ color: balance > 0 ? "#d63031" : "#27ae60", fontWeight: "bold" }}>
//                         ₹ {balance}
//                       </td>
//                       <td>
//                         {statusDisplay(
//                           status,
//                           status === "Paid" ? "#27ae60" :
//                           status === "Unpaid" ? "#e74c3c" :
//                           status === "Partially Paid" ? "#f39c12" : "#95a5a6"
//                         )}
//                       </td>
//                       <td style={{ color: isConverted ? "#0795f3" : "#e74c3c", fontWeight: "600" }}>
//                         {isConverted ? "Converted" : "Open"}
//                       </td>
//                       <td>
//                         <div className="d-flex align-items-center gap-2">
//                           <div className="position-relative">
//                             <Button
//                               size="sm"
//                               variant={isConverted ? "secondary" : "primary"}
//                               disabled={isConverted}
//                               onClick={() => handleConvertToSale(item)}
//                             >
//                               {isConverted ? "Converted" : "Convert to Sale"}
//                             </Button>
//                           </div>
//                           <ActionButton
//                             options={[
//                               { label: "View", onClick: () => handleView(item) },
//                               { label: "Edit", onClick: () => handleEdit(item) },
//                               { label: "Delete", icon: <MdOutlineDelete />, onClick: () => handleDelete(item.proforma_id) },
//                             ]}
//                             label={<HiOutlineDotsVertical />}
//                           />
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </Table>
//             ) : (
//               <div className="d-flex justify-content-center align-items-center"
//                 style={{ minHeight: "60vh" }}
//               >
//                 <div className="text-center">
//                   <p className="text-muted mb-4">No Proforma found</p>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     className="px-5 py-3 shadow-lg rounded-pill fw-bold"
//                     style={{
//                       fontSize: "1.2rem",
//                       letterSpacing: "0.5px",
//                     }}
//                     onClick={() => navigate("/Proforma/create")}
//                   >
//                     + Add Proforma
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Proforma;

// Proforma.jsx - Fully Updated & Merged Version
// Includes: Filter Card, Totals Card, Proper Table with all columns, 
// Add Sale / Add Purchase buttons, Working Filters, Convert to Sale, etc.
// Matches Sale.jsx / Estimate.jsx style exactly.

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  InputGroup,
  Form,
} from "react-bootstrap";
import {
  FaSearch,
  FaChevronDown,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { searchProforma, deleteProforma } from "../../slice/ProformaSlice";
import { ActionButton } from "../../components/Buttons";
import { MdOutlineDelete } from "react-icons/md";
import { TbCircleLetterI } from "react-icons/tb";
import { HiOutlineDotsVertical } from "react-icons/hi";
import NotifyData from "../../components/NotifyData";
import {
  isToday,
  isYesterday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isWithinInterval,
  parseISO,
} from "date-fns";

const Proforma = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state - adjust slice name if different (Proforma or proforma)
  const { proforma: ProformaList = [], status: proformaStatus } = useSelector(
    (state) => state.Proforma || state.proforma || {}
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPeriod, setSelectedPeriod] = useState("This Year");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState("All Firms");
  const [firmOpen, setFirmOpen] = useState(false);
  const [customFromDate, setCustomFromDate] = useState("");
  const [customToDate, setCustomToDate] = useState("");
  const [openShareId, setOpenShareId] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [businessName, setBusinessName] = useState("");

  // Fetch proforma on search change
  useEffect(() => {
    dispatch(searchProforma(searchTerm));
  }, [dispatch, searchTerm]);

  // Status calculation
  const getStatusFromData = (item) => {
    const isCancelled = item.delete_at == 1;
    const received = Number(item.received_amount || 0);
    const total = Number(item.total || 0);
    const balance = total - received;

    if (isCancelled) return "Cancelled";
    if (balance === 0) return "Paid";
    if (received > 0 && balance > 0) return "Partially Paid";
    return "Unpaid";
  };

  const getProformaStatus = (item) => {
    return item.status === "converted" ? "Converted" : "Open";
  };

  // Filtering
  const filteredProforma = useMemo(() => {
    let filtered = ProformaList || [];

    // Status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((item) => getStatusFromData(item) === statusFilter);
    }

    // Date filtering
    const hasCustomDates = customFromDate || customToDate;
    if (selectedPeriod !== "All Time" || hasCustomDates) {
      filtered = filtered.filter((item) => {
        if (!item.invoice_date) return false;
        let date;
        try {
          date = parseISO(item.invoice_date);
        } catch {
          return false;
        }

        if (hasCustomDates) {
          if (customFromDate && date < parseISO(customFromDate)) return false;
          if (customToDate) {
            const to = parseISO(customToDate);
            to.setHours(23, 59, 59, 999);
            if (date > to) return false;
          }
          return true;
        }

        const now = new Date();
        switch (selectedPeriod) {
          case "Today":
            return isToday(date);
          case "Yesterday":
            return isYesterday(date);
          case "This Week":
            return isWithinInterval(date, { start: startOfWeek(now), end: endOfWeek(now) });
          case "This Month":
            return isWithinInterval(date, { start: startOfMonth(now), end: endOfMonth(now) });
          case "This Year":
            return isWithinInterval(date, { start: startOfYear(now), end: endOfYear(now) });
          case "Last Year":
            const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
            const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31);
            return isWithinInterval(date, { start: lastYearStart, end: lastYearEnd });
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [ProformaList, statusFilter, selectedPeriod, customFromDate, customToDate]);

  // Totals
  const totals = useMemo(() => {
    const totalQuotations = filteredProforma.reduce((sum, item) => sum + Number(item.total || 0), 0);
    const totalConverted = filteredProforma
      .filter((item) => item.status === "converted")
      .reduce((sum, item) => sum + Number(item.total || 0), 0);
    const totalOpen = totalQuotations - totalConverted;

    return {
      totalQuotations: totalQuotations.toFixed(2),
      totalConverted: totalConverted.toFixed(2),
      totalOpen: totalOpen.toFixed(2),
    };
  }, [filteredProforma]);

  // Comparison vs last year (for This Year only)
  const comparisonTotal = useMemo(() => {
    if (selectedPeriod !== "This Year") return null;
    const lastYearStart = new Date(new Date().getFullYear() - 1, 0, 1);
    const lastYearEnd = new Date(new Date().getFullYear() - 1, 11, 31);

    return (ProformaList || []).reduce((sum, item) => {
      if (!item.invoice_date) return sum;
      let date;
      try {
        date = parseISO(item.invoice_date);
      } catch {
        return sum;
      }
      if (date >= lastYearStart && date <= lastYearEnd) {
        return sum + Number(item.total || 0);
      }
      return sum;
    }, 0);
  }, [ProformaList, selectedPeriod]);

  const percentageChange =
    comparisonTotal !== null && comparisonTotal > 0
      ? ((parseFloat(totals.totalQuotations) - comparisonTotal) / comparisonTotal) * 100
      : totals.totalQuotations > 0
      ? 100
      : 0;

  // Actions
  const handleView = (item) => navigate(`/proforma/view/${item.proforma_id}`);
  const handleEdit = (item) => navigate(`/proforma/edit/${item.proforma_id}`);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Proforma?")) return;
    try {
      await dispatch(deleteProforma(id)).unwrap();
      NotifyData("Proforma Deleted Successfully", "success");
    } catch {
      NotifyData("Deletion Failed", "error");
    }
  };

  const handleConvertToSale = (item) => {
    navigate("/sale/create", {
      state: { fromProforma: true, proformaData: item },
    });
    setOpenShareId(null);
  };

  return (
    <div id="main" style={{ backgroundColor: "#DEE2E6", minHeight: "100vh" }}>
      <Container fluid className="py-5">
        <Row>
          <Col xl={12}>
            {/* Business Name Header */}
            <div className="d-flex align-items-center mb-4">
              <span style={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}>•</span>
              {isEditingBusiness ? (
                <div className="d-flex align-items-center gap-2 ms-2">
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Enter Business Name"
                    autoFocus
                    className="form-control"
                    style={{ width: "250px" }}
                    onKeyDown={(e) => e.key === "Enter" && setIsEditingBusiness(false)}
                  />
                  <Button variant="info" size="sm" onClick={() => setIsEditingBusiness(false)}>
                    Save
                  </Button>
                </div>
              ) : (
                <span
                  className="ms-2 text-muted"
                  style={{ cursor: "pointer", fontSize: "1.1rem" }}
                  onClick={() => setIsEditingBusiness(true)}
                >
                  {businessName || "Enter Business Name"}
                </span>
              )}

              <div className="ms-auto d-flex align-items-center gap-2">
                <Button variant="danger" onClick={() => navigate("/sale/create")}>
                  + Add Sale
                </Button>
                <Button variant="success" onClick={() => navigate("/purchase/create")}>
                  + Add Purchase
                </Button>
                <Button variant="info">+ Add More</Button>
                <Button variant="light">:</Button>
              </div>
            </div>

            {/* Header Dropdown */}
            <Row className="align-items-center mb-4">
              <Col>
                <h5 style={{ cursor: "pointer" }} onClick={() => setOpenDropdown(!openDropdown)}>
                  Proforma Invoices <FaChevronDown />
                </h5>
                {openDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      background: "white",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "5px 0",
                      width: "220px",
                      zIndex: 999,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    {[
                      { label: "Sale Invoices", path: "/sale" },
                      { label: "Estimate/Quotation", path: "/estimate" },
                      { label: "Proforma Invoice", path: "/proforma" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        onClick={() => {
                          setOpenDropdown(false);
                          if (item.path !== "/proforma") navigate(item.path);
                        }}
                        style={{
                          padding: "10px 16px",
                          cursor: "pointer",
                          fontWeight: item.path === "/proforma" ? "bold" : "normal",
                          backgroundColor: item.path === "/proforma" ? "#f0f8ff" : "transparent",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            item.path === "/proforma" ? "#f0f8ff" : "transparent")
                        }
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                )}
              </Col>
              <Col className="text-end">
                <Button
                  variant="danger"
                  className="px-4 py-2 shadow rounded-pill fw-bold"
                  onClick={() => navigate("/proforma/create")}
                >
                  + Add Proforma
                </Button>
              </Col>
            </Row>

            {/* Filter Card */}
            <Row className="mb-3">
              <Col
                lg={12}
                className="p-3 d-flex align-items-center flex-wrap gap-3 bg-white rounded shadow-sm border"
              >
                <span className="text-muted fw-medium">Filter by :</span>

                {/* Period Dropdown */}
                <div className="position-relative">
                  <button
                    onClick={() => setPeriodOpen(!periodOpen)}
                    className="btn rounded-pill border-0 shadow-sm d-flex align-items-center gap-2"
                    style={{ backgroundColor: "#e3f2fd", color: "#1565c0", fontWeight: "500" }}
                  >
                    {selectedPeriod} <FaChevronDown className={periodOpen ? "rotate-180" : ""} size={12} />
                  </button>
                  {periodOpen && (
                    <div
                      className="position-absolute top-100 start-0 mt-2 bg-white rounded-3 shadow-lg border"
                      style={{ zIndex: 1000, minWidth: "200px" }}
                    >
                      {["All Time", "Today", "Yesterday", "This Week", "This Month", "This Year", "Last Year", "Custom Range"].map(
                        (item) => (
                          <div
                            key={item}
                            onClick={() => {
                              setSelectedPeriod(item);
                              setPeriodOpen(false);
                            }}
                            className="px-4 py-2 cursor-pointer"
                            style={{ cursor: "pointer" }}
                          >
                            {item === selectedPeriod ? <strong>{item}</strong> : item}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Custom Date Range */}
                <div className="d-flex align-items-center gap-2">
                  <InputGroup size="sm">
                    <Form.Control
                      type="date"
                      value={customFromDate}
                      onChange={(e) => setCustomFromDate(e.target.value)}
                      style={{ backgroundColor: "#e3f2fd", color: "#1565c0", minWidth: "160px" }}
                    />
                  </InputGroup>
                  <span className="text-muted">To</span>
                  <InputGroup size="sm">
                    <Form.Control
                      type="date"
                      value={customToDate}
                      min={customFromDate}
                      onChange={(e) => setCustomToDate(e.target.value)}
                      style={{ backgroundColor: "#e3f2fd", color: "#1565c0", minWidth: "160px" }}
                    />
                  </InputGroup>
                  {(customFromDate || customToDate) && (
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="rounded-circle"
                      onClick={() => {
                        setCustomFromDate("");
                        setCustomToDate("");
                      }}
                    >
                      ×
                    </Button>
                  )}
                </div>

                {/* Firm Dropdown */}
                <div className="position-relative">
                  <button
                    onClick={() => setFirmOpen(!firmOpen)}
                    className="btn rounded-pill border-0 shadow-sm d-flex align-items-center gap-2"
                    style={{ backgroundColor: "#e3f2fd", color: "#1565c0", fontWeight: "500" }}
                  >
                    {selectedFirm} <FaChevronDown className={firmOpen ? "rotate-180" : ""} size={12} />
                  </button>
                  {firmOpen && (
                    <div
                      className="position-absolute top-100 start-0 mt-2 bg-white rounded-3 shadow-lg border"
                      style={{ zIndex: 1000, minWidth: "220px" }}
                    >
                      {["All Firms", "My Company Pvt Ltd", "ABC Traders", "XYZ Enterprises"].map((firm) => (
                        <div
                          key={firm}
                          onClick={() => {
                            setSelectedFirm(firm);
                            setFirmOpen(false);
                          }}
                          className="px-4 py-2 cursor-pointer"
                        >
                          {firm === selectedFirm ? <strong>{firm}</strong> : firm}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Col>
            </Row>

            {/* Totals Card */}
            <Row className="mb-4">
              <Col>
                <div className="p-4 bg-white rounded shadow-sm border" style={{ maxWidth: "500px" }}>
                  <h5 className="mb-1">
                    Total Proforma: <strong style={{ fontSize: "1.8rem" }}>₹{totals.totalQuotations}</strong>
                  </h5>
                  <small className="opacity-75 d-block mb-2">
                    {percentageChange > 0 ? (
                      <span style={{ color: "#27ae60" }}>↑ {percentageChange.toFixed(0)}% up</span>
                    ) : percentageChange < 0 ? (
                      <span style={{ color: "#e74c3c" }}>↓ {Math.abs(percentageChange).toFixed(0)}% down</span>
                    ) : (
                      <span>No change</span>
                    )}{" "}
                    vs last year
                  </small>
                  <div className="text-muted mt-3">
                    <div className="d-flex justify-content-between">
                      <span>Converted:</span>
                      <strong style={{ color: "#27ae60" }}>₹{totals.totalConverted}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Open:</span>
                      <strong style={{ color: "#e74c3c" }}>₹{totals.totalOpen}</strong>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Table */}
            {filteredProforma.length > 0 ? (
              <Table striped bordered hover responsive className="bg-white">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Reference No</th>
                    <th>Party Name</th>
                    <th>Transaction</th>
                    <th>Payment Type</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>Status</th>
                    <th>Proforma Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProforma.map((item) => {
                    const amount = Number(item.total || 0).toFixed(2);
                    const received = Number(item.received_amount || 0);
                    const balance = (Number(item.total || 0) - received).toFixed(2);
                    const status = getStatusFromData(item);
                    const proformaStatus = getProformaStatus(item);
                    const isConverted = proformaStatus === "Converted";

                    return (
                      <tr key={item.proforma_id}>
                        <td>{item.invoice_date || "-"}</td>
                        <td>{item.reference_no || "-"}</td>
                        <td>{item.name || "-"}</td>
                        <td>Proforma</td>
                        <td>{item.payment_type || "-"}</td>
                        <td>₹ {amount}</td>
                        <td style={{ color: balance > 0 ? "#d63031" : "#27ae60", fontWeight: "bold" }}>
                          ₹ {balance}
                        </td>
                        <td>
                          <span
                            style={{
                              color:
                                status === "Paid"
                                  ? "#27ae60"
                                  : status === "Unpaid"
                                  ? "#e74c3c"
                                  : status === "Partially Paid"
                                  ? "#f39c12"
                                  : "#95a5a6",
                              fontWeight: "600",
                            }}
                          >
                            {status}
                          </span>
                        </td>
                        <td style={{ color: isConverted ? "#0795f3" : "#e74c3c", fontWeight: "600" }}>
                          {proformaStatus}
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="position-relative">
                              <Button
                                size="sm"
                                variant={isConverted ? "secondary" : "primary"}
                                disabled={isConverted}
                                onClick={() => handleConvertToSale(item)}
                                className="rounded-pill"
                              >
                                {isConverted ? "Converted" : "Convert to Sale"}
                              </Button>
                            </div>
                            <ActionButton
                              options={[
                                { label: "View", icon: <TbCircleLetterI />, onClick: () => handleView(item) },
                                { label: "Edit", icon: <TbCircleLetterI />, onClick: () => handleEdit(item) },
                                { label: "Delete", icon: <MdOutlineDelete />, onClick: () => handleDelete(item.proforma_id) },
                              ]}
                              label={<HiOutlineDotsVertical />}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <div className="text-center py-5">
                <p className="text-muted mb-4">No Proforma found</p>
                <Button
                  variant="danger"
                  className="px-5 py-3 shadow-lg rounded-pill fw-bold"
                  onClick={() => navigate("/proforma/create")}
                >
                  + Add Proforma
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Proforma;