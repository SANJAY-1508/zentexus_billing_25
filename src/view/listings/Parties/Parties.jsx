
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
