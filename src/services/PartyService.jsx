import axiosInstance from "../config/API";
const API_ENDPOINT = "/parties.php";
const checkApiResponse = (data, defaultMsg) => {
  if (data.head && data.head.code !== 200) {
    throw new Error(data.head.msg || defaultMsg);
  }
};

// Fetch all parties
// export const getParties = async (searchText = "") => {
//   const payload = {
//     search_text: searchText,
//   };

//   const response = await axiosInstance.post(API_ENDPOINT, payload);
//   const data = response.data;
//   console.log("fetch list", data);
//   return data.body.parties;

 
// };

// services/PartyService.js


export const getParties = async (searchText = "") => {
  const payload = {
    search_text: searchText || "",
  };

  const response = await axiosInstance.post(API_ENDPOINT, payload);
  const data = response.data;

  const parties = data.body?.parties || [];
  const sales   = data.body?.sales   || [];

  // Map transactions to correct party
  const partiesWithTransactions = parties.map(party => {
    // Start with the transactions array already prepared by parties.php (contains Opening Balance)
    let finalTransactions = party.transactions || [];

    // Map sales transactions (if any) and append them
    const salesTransactions = sales
      .filter(sale =>
        String(sale.party_id) === String(party.id) ||
        String(sale.parties_id) === String(party.id)
      )
      .map(sale => ({
        type:    sale.type || "Sale",
        number:  sale.invoice_no || sale.id || "-",
        date:    sale.date || sale.created_at || "-",
        total:   Number(sale.grand_total || sale.amount || 0),
        balance: Number(sale.due_amount || sale.grand_total || sale.amount || 0),
        // NOTE: These fields are needed by Parties.jsx but require proper ledger logic for sales
        balance_label: "Sale",
        color: "blue",
      }));
    
    // Combine opening balance with sales transactions
    finalTransactions = finalTransactions.concat(salesTransactions);

    return {
      ...party,
      transactions: finalTransactions, // Use the combined array
    };
  });

  return partiesWithTransactions;
};

// Add a new party
export const addParty = async (partyData) => {
  const payload = {
    ...partyData,
  };

  const response = await axiosInstance.post(API_ENDPOINT, payload);
  const data = response.data;
  checkApiResponse(data, "Failed to add party");
  return data || [partyData];
};

// Update an existing party
export const updateParty = async (partyData) => {
  const payload = {
    ...partyData,
    edit_parties_id: partyData.id || partyData.parties_id, // Ensure correct ID key for edit
  };

  const response = await axiosInstance.post(API_ENDPOINT, payload);
  const data = response.data;

  checkApiResponse(data, "Failed to update party");
  console.log("response", data);
  window.location.reload();
  return partyData;
};

// Delete a party
export const deleteParty = async (parties_id) => {
  const payload = {
    delete_parties_id: parties_id,
  };

  const response = await axiosInstance.post(API_ENDPOINT, payload);
  const data = response.data;

  checkApiResponse(data, "Failed to delete party");
  console.log("Delete API response:", data);
  return parties_id;
};