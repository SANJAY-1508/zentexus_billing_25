import React, { useEffect } from "react";
import { Row, Col, Card, Table, Form } from "react-bootstrap";
import { Buttons } from "../../../components/Buttons";
import { FaEdit,  } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addParty } from "../../../slice/partySlice";

function Parties() {
  const dispatch = useDispatch();
  const parties = useSelector((state) => state.party.parties);
useEffect(() => {
  if (parties.length === 0) {
    const staticParties = [
      {
        name: "Yash",
        phone: "9342606037",
        email: "yasvindhini@gmail.com",
        transactions: [
          { type: "Sale", number: 1, date: "09/11/2025", total: "₹ 100.00", balance: "₹ 100.00" },
        ],
      },
    ];

    staticParties.forEach((party) => dispatch(addParty(party)));
  }
}, [dispatch, parties]);

 

   

  return (
    <div className="  p-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-muted ">
          <span className="text-danger">•</span> Enter Business Name
        </h5>
         <div className="d-flex gap-2"> 
          <Buttons type="button" className="btn btn-danger rounded-pill px-3" btnlabel="+ Add Sale" />
          <Buttons type="button" className="btn btn-primary rounded-pill px-3" btnlabel="+ Add Purchase" />
          <Buttons type="button" className="btn btn-danger rounded-pill px-3" btnlabel="+ Add Party" />
        </div>
      </div>

      <Row>
        {/* Left Side: Party List */}
        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-bottom fw-semibold">Parties ▼</Card.Header>
            <Card.Body className="p-2">
              <Form.Control type="text" placeholder="Search Party Name" className="mb-2" />

              {parties.map((party, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between border-bottom py-2 px-2 bg-light align-items-center"
                >
                  <span>{party.name}</span>
                  <span className="text-success fw-semibold">
                    {party.transactions[0].balance.replace("₹ ", "")}
                  </span>
                </div>
              ))}

              {/* <div className="mt-3 bg-light p-2 rounded text-center small text-muted">
                Easily convert your <b>Phone contacts</b> into parties
              </div> */}
            </Card.Body>
          </Card>
        </Col>

        {/* Right Side: Party Details */}
        <Col md={9}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              {parties.map((party, index) => (
                <div key={index}>
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                    <h6 className="fw-semibold mb-0">
                      {party.name} <FaEdit className="text-primary ms-2" />
                    </h6>
                  </div>

                  <div className="mb-3">
                    <p className="mb-1"><b>Phone Number:</b> {party.phone}</p>
                    <p className="mb-0"><b>Email:</b> {party.email}</p>
                  </div>

                  <h6 className="fw-semibold border-bottom pb-2">Transactions</h6>
                  <Table hover responsive className="align-middle text-center">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Number</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {party.transactions.map((txn, i) => (
                        <tr key={i} className="bg-light">
                          <td>{txn.type}</td>
                          <td>{txn.number}</td>
                          <td>{txn.date}</td>
                          <td>{txn.total}</td>
                          <td>{txn.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ))}

              {/* Buttons */}
              {/* <div className="d-flex justify-content-end gap-2">
                <ActionButton
                  label={<FaPrint />}
                  options={[{ label: "Print", onClick: () => alert("Print clicked") }]}
                />
                <Buttons type="button" className="btn btn-success" btnlabel="xls" />
              </div> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Parties;
// import React, { useEffect } from "react";
// import { Row, Col, Card, Table, Form } from "react-bootstrap";
// import { Buttons } from "../../../components/Buttons";
// import { FaEdit,  } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { addParty } from "../../../slice/partySlice";
// import PartyModal from "../Parties/PartyModal"; 


// function Parties() {
//   const dispatch = useDispatch();
//   const parties = useSelector((state) => state.party.parties);
//   const [showModal, setShowModal] = useState(false);

// const handleOpenModal = () => setShowModal(true);
// const handleCloseModal = () => setShowModal(false);

// useEffect(() => {
//   if (parties.length === 0) {
//     const staticParties = [
//       {
//         name: "Yash",
//         phone: "9342606037",
//         email: "yasvindhini@gmail.com",
//         transactions: [
//           { type: "Sale", number: 1, date: "09/11/2025", total: "₹ 100.00", balance: "₹ 100.00" },
//         ],
//       },
//     ];

//     staticParties.forEach((party) => dispatch(addParty(party)));
//   }
// }, [dispatch, parties]);

 

   

//   return (
//     <div className="  p-3">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="fw-bold text-muted ">
//           <span className="text-danger">•</span> Enter Business Name
//         </h5>
//          <div className="d-flex gap-2"> 
//           <Buttons type="button" className="btn btn-danger rounded-pill px-3" btnlabel="+ Add Sale" />
//           <Buttons type="button" className="btn btn-primary rounded-pill px-3" btnlabel="+ Add Purchase" />
//           <Buttons type="button" className="btn btn-danger rounded-pill px-3" btnlabel="+ " />
         

//         </div>
//       </div>
// <div></div>
//       <Row>
//         {/* Left Side: Party List */}
//         <Col md={4}>
//           <Card className="shadow-sm border-0">
//             <Card.Header className="bg-white border-bottom fw-semibold d-flex width-100">Parties ▼
//              <Buttons
//   type="button"
//   className="btn btn-danger rounded-pill px-3"
//   btnlabel="+ Add Party"
//   onClick={handleOpenModal}
// />
// <PartyModal show={showModal} handleClose={handleCloseModal} /></Card.Header>
//             <Card.Body className="p-2">
//               <Form.Control type="text" placeholder="Search Party Name" className="mb-2" />

//               {parties.map((party, index) => (
//                 <div
//                   key={index}
//                   className="d-flex justify-content-between border-bottom py-2 px-2 bg-light align-items-center"
//                 >
//                   <span>{party.name}</span>
//                   <span className="text-success fw-semibold">
//                     {party.transactions[0].balance.replace("₹ ", "")}
//                   </span>
//                 </div>
//               ))}

//               {/* <div className="mt-3 bg-light p-2 rounded text-center small text-muted">
//                 Easily convert your <b>Phone contacts</b> into parties
//               </div> */}
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Right Side: Party Details */}
//         <Col md={8}>
//           <Card className="shadow-sm border-0">
//             <Card.Body>
//               {parties.map((party, index) => (
//                 <div key={index}>
//                   <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
//                     <h6 className="fw-semibold mb-0">
//                       {party.name} <FaEdit className="text-primary ms-2" />
//                     </h6>
//                   </div>

                  // <div className="mb-3">
                  //   <p className="mb-1"><b>Phone Number:</b> {party.phone}</p>
                  //   <p className="mb-0"><b>Email:</b> {party.email}</p>
                  // </div>

                //   <h6 className="fw-semibold border-bottom pb-2">Transactions</h6>
                //   <Table hover responsive className="align-middle text-center">
                //     <thead>
                //       <tr>
                //         <th>Type</th>
                //         <th>Number</th>
                //         <th>Date</th>
                //         <th>Total</th>
                //         <th>Balance</th>
                //       </tr>
                //     </thead>
                //     <tbody>
                //       {party.transactions.map((txn, i) => (
                //         <tr key={i} className="bg-light">
                //           <td>{txn.type}</td>
                //           <td>{txn.number}</td>
                //           <td>{txn.date}</td>
                //           <td>{txn.total}</td>
                //           <td>{txn.balance}</td>
                //         </tr>
                //       ))}
                //     </tbody>
                //   </Table>
                // </div>
//               ))}

//               {/* Buttons */}
//               {/* <div className="d-flex justify-content-end gap-2">
//                 <ActionButton
//                   label={<FaPrint />}
//                   options={[{ label: "Print", onClick: () => alert("Print clicked") }]}
//                 />
//                 <Buttons type="button" className="btn btn-success" btnlabel="xls" />
//               </div> */}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default Parties;
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addParty, selectParty } from "../../../slice/partySlice";
// import { FaPen } from "react-icons/fa";
// import PartyModal from "../Parties/PartyModal";

// function Parties() {
//   const dispatch = useDispatch();
//   const { parties, selectedParty } = useSelector((state) => state.party);
//   const [showModal, setShowModal] = useState(false);

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);

//   // Add default party if none exist
//   useEffect(() => {
//     if (parties.length === 0) {
//       const staticParties = [
//         {
//           id: 1,
//           name: "Yash",
//           phone: "9342606037",
//           email: "yasvindhini@gmail.com",
//           address: "123, Main Street",
//           amount: 100,
//           transactions: [
//             { type: "Sale", number: 1, date: "09/11/2025", total: 100, balance: 100 },
//           ],
//         },
//       ];
//       staticParties.forEach((party) => dispatch(addParty(party)));
//     }
//   }, [dispatch, parties]);

//   return (
//     <div className="d-flex vh-100">
//       <div className="flex-grow-1 p-3 bg-light m-2">
//         {/* Header */}
//         <div className="d-flex justify-content-end align-items-center mb-4 gap-4">
//           <h6 className="text-danger m-0 mt-3 me-auto">• Enter Business Name</h6>
//           <button className="btn btn-danger rounded-pill mt-3" style={{ backgroundColor: "#f8d7da", color: "red", border: "transparent" }}>
//             + Add Sale
//           </button>
//           <button className="btn btn-primary rounded-pill mt-3" style={{ backgroundColor: "#cce7f3", color: "blue", border: "transparent" }}>
//             + Add Purchase
//           </button>
//           <button className="btn btn-primary rounded-pill mt-3" style={{ backgroundColor: "#cce7f3", color: "blue", border: "transparent" }}>
//             +
//           </button>
//         </div>

//         {/* Main Card */}
//         <div className="card" style={{ border: "5px solid #cce7f3", borderTop: "transparent" }}>
//           {/* Card Header */}
//           <div className="bg-white d-flex justify-content-between align-items-center" style={{ borderBottom: "5px solid #cce7f3" }}>
//             <h5 className="m-4" style={{ borderTop: "transparent" }}>Parties</h5>
//             <button className="btn btn-danger rounded-pill px-3 mx-4" onClick={handleShow}>
//               + Add Party
//             </button>
//           </div>

//           <div className="d-flex">
//             {/* Left: Party List */}
//             <div className="bg-white" style={{ width: "25%", height: "100vh" }}>
//               <div style={{ width: "90%", margin: "30px" }}>
//                 <input type="text" className="form-control" style={{ borderColor: "black" }} placeholder="Search Party Name" />
//                 <table className="table table-hover table-sm mt-3">
//                   <thead>
//                     <tr>
//                       <th className="fw-normal text-secondary">Party Name</th>
//                       <th className="fw-normal text-secondary">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {parties.map((p) => (
//                       <tr
//                         key={p.id}
//                         onClick={() => dispatch(selectParty(p.id))}
//                         className={selectedParty?.name === p.name ? "table-active" : ""}
//                         style={{ cursor: "pointer", backgroundColor: selectedParty?.name === p.name ? "#d7ecff" : "" }}
//                       >
//                         <td>{p.name}</td>
//                         <td>{p.amount.toFixed(2)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Right: Party Details */}
//             <div className="flex-grow-1" style={{ borderLeft: "5px solid #cce7f3" }}>
//               {selectedParty ? (
//                 <>
//                   <div className="d-flex justify-content-between align-items-center m-3">
//                     <h6 className="m-0">
//                       {selectedParty.name} <FaPen className="text-primary ms-2" />
//                     </h6>
//                   </div>

//                   <div className="d-flex gap-5 m-3">
//                     <p className="mb-0"><strong>Phone Number:</strong> {selectedParty.phone}</p>
//                     <p className="mb-0"><strong>Email:</strong> {selectedParty.email}</p>
//                     <p className="mb-0"><strong>Billing Address:</strong> {selectedParty.address}</p>
//                   </div>

//                   {/* Transactions */}
//                   <div>
//                     <h6 className="m-3">Transactions</h6>
//                     <table className="table mt-4 align-middle text-center" style={{ borderTop: "none", borderBottom: "5px solid #cce7f3" }}>
//                       <thead className="table table-sm">
//                         <tr>
//                           <th>Type</th>
//                           <th>Number</th>
//                           <th>Date</th>
//                           <th>Total</th>
//                           <th>Balance</th>
//                         </tr>
//                       </thead>
//                     </table>
//                     <div className="text-secondary py-5 align-middle text-center">
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/512/4076/4076503.png"
//                         alt="no-data"
//                         style={{ width: "60px", opacity: "0.5" }}
//                       />
//                       <p className="fw-bold mb-0 mt-2">No Transactions to show</p>
//                       <small>You haven't added any transactions yet.</small>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 // <div className="text-center py-5">Select a party to see details</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Party Modal */}
//       <PartyModal show={showModal} handleClose={handleClose} />
//     </div>
//   );
// }

// export default Parties;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addParty } from "../../../slice/partySlice";
import { FaPen } from "react-icons/fa";
import PartyModal from "../Parties/PartyModal";

function Parties() {
  const dispatch = useDispatch();
  const { parties, selectedParty } = useSelector((state) => state.party);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Add default static party
  useEffect(() => {
    if (parties.length === 0) {
      const defaultParty = {
        id: 1,
        name: "Yash",
        phone: "9342606037",
        email: "yas@gmail.com",
        address: "123, Main Street",
        amount: 100,
        transactions: [
          { type: "Sale", number: 1, date: "09/11/2025", total: 100, balance: 100 },
        ],
      };
      dispatch(addParty(defaultParty));
    }
  }, [dispatch, parties]);

  return (
    <div id="main">
    <div className="d-flex vh-100">
      <div className="flex-grow-1 p-3 bg-light m-2">
        {/* Header */}
        {/* <div className="d-flex justify-content-end align-items-center mb-2 gap-4">
          <h6 className="text-danger m-0 mt-3 me-auto">• Enter Business Name</h6>
          <button className="btn btn-danger rounded-pill mt-3" style={{ backgroundColor: "#f8d7da", color: "red", border: "transparent" }}>+ Add Sale</button>
          <button className="btn btn-primary rounded-pill mt-3" style={{ backgroundColor: "#cce7f3", color: "blue", border: "transparent" }}>+ Add Purchase</button>
          <button className="btn btn-primary rounded-pill mt-3" style={{ backgroundColor: "#cce7f3", color: "blue", border: "transparent" }}>+</button>
        </div> */}
        <div className="d-flex justify-content-end align-items-center mb-2 gap-4">
  <h6 className="text-danger m-0 me-auto mt-3" style={{ lineHeight: "2.2" }}>• Enter Business Name</h6>
  
  <button
    type="button"
    className="rounded-pill mt-3"
    style={{
      backgroundColor: "#f8d7da",
      color: "red",
      border: "none",
      boxShadow: "none",
    }}
  >
    + Add Sale
  </button>
  
  <button
    type="button"
    className="rounded-pill mt-3"
    style={{
      backgroundColor: "#cce7f3",
      color: "blue",
      border: "none",
      boxShadow: "none",
    }}
  >
    + Add Purchase
  </button>
  
  <button
    type="button"
    className="rounded-pill mt-3"
    style={{
      backgroundColor: "#cce7f3",
      color: "blue",
      border: "none",
      boxShadow: "none",
    }}
  >
    +
  </button>
</div>


        {/* Main Card */}
        <div className="card" style={{ border: "5px solid #cce7f3", borderTop: "transparent" }}>
          {/* Card Header */}
          <div className="bg-white d-flex justify-content-between align-items-center" style={{ borderBottom: "5px solid #cce7f3" }}>
            <h5 className="m-4" style={{ borderTop: "transparent" }}>Parties</h5>
            <button className="btn btn-danger rounded-pill px-3 mx-4" onClick={handleShow}>+ Add Party</button>
          </div>

          <div className="d-flex">
            {/* Left Party List */}
            <div className="bg-white" style={{ width: "35%", height: "100vh" }}>
              <div style={{ width: "90%", margin: "20px" }}>
                <input type="text" className="form-control  " style={{ borderColor: "black" ,width:"100%"}} placeholder="Search Party Name" />
                <table className="table table-hover table-sm mt-2">
                  <thead>
                    <tr>
                      <th className="fw-normal text-secondary">Party Name</th>
                      <th className="fw-normal text-secondary">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parties.map((p) => (
                      <tr key={p.id} className="table-active" style={{ cursor: "pointer", backgroundColor: "#d7ecff" }}>
                        <td>{p.name}</td>
                        <td>{p.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Party Details */}
            <div className="flex-grow-1" style={{ borderLeft: "5px solid #cce7f3" }}>
              {selectedParty && (
                <>
                  <div className="d-flex justify-content-between align-items-center m-3">
                    <h6 className="m-0">{selectedParty.name} <FaPen className="text-primary ms-2" /></h6>
                  </div>
                  <div className="d-flex gap-5 m-3" >
                    <p className="mb-0"><strong>Phone Number:</strong> {selectedParty.phone}</p>
                    <p className="mb-0"><strong>Email:</strong> {selectedParty.email}</p>
                    <p className="mb-0"><strong>Billing Address:</strong> {selectedParty.address}</p>
                  </div>

                  {/* Transactions */}
                  <div style={{ borderTop: "5px solid #cce7f3"}}>
                    <h6 className="m-3">Transactions</h6>
                    <table className="table mt-4 align-middle text-center" style={{ borderTop: "none" }}>
                      <thead className="table table-sm">
                        <tr>
                          <th>Type</th>
                          <td>sale</td>
                          <th>Number</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="text-secondary py-5 align-middle text-center">
                      <img src="https://cdn-icons-png.flaticon.com/512/4076/4076503.png" alt="no-data" style={{ width: "60px", opacity: "0.5" }} />
                      <p className="fw-bold mb-0 mt-2">No Transactions to show</p>
                      <small>You haven't added any transactions yet.</small>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Party Modal */}
      <PartyModal show={showModal} handleClose={handleClose} />
    </div></div>
  );
}

export default Parties;
