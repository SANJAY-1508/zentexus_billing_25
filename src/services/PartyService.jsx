// PartyService.jsx (Refactored to match AgentService.jsx structure)
import axios from "axios";
const BASE_URL = "http://localhost/zentexus_billing_api";
const API_ENDPOINT = `${BASE_URL}/parties.php`;

// Helper to check for common error structure
const checkApiResponse = (data, defaultMsg) => {
  if (data.head && data.head.code !== 200) {
    throw new Error(data.head.msg || defaultMsg);
  }
};

// Fetch all parties
export const getParties = async (searchText = "") => {
  const payload = {
    search_text: searchText,
  };

  const response = await axios.post(API_ENDPOINT, payload);
  const data = response.data;
  console.log("fetch list", data);
  return data.body.parties;

  checkApiResponse(data, "Failed to fetch parties");
  return data.body.parties;
};

// Add a new party
export const addParty = async (partyData) => {
  // console.log("enter add party")
  // Use the partyData directly as the payload, plus the action key
  const payload = {
    ...partyData,
  };
  // console.log("payload",payload);
  const response = await axios.post(API_ENDPOINT, payload);
  const data = response.data;
  checkApiResponse(data, "Failed to add party");
  // console.log("add Party:", data);

  // Return the newly created party object(s).
  // Returning the array is consistent with agentSlice's 'data.body.agents' return.
  return data || [partyData];
};

// Update an existing party
export const updateParty = async (partyData) => {
  const payload = {
    ...partyData,
    edit_parties_id: partyData.id || partyData.parties_id, // Ensure correct ID key for edit
  };

  const response = await axios.post(API_ENDPOINT, payload);
  const data = response.data;

  checkApiResponse(data, "Failed to update party");
  console.log("response", data);

  // Return the updated party data itself, which is needed by Redux to update the state item.
  // We cannot rely on data.head.id as updateAgentApi does, because partyData is a complex object.
  return partyData;
};

// Delete a party
export const deleteParty = async (parties_id) => {
  const payload = {
    delete_parties_id: parties_id, // PHP expects this specific key for deletion
  };

  const response = await axios.post(API_ENDPOINT, payload);
  const data = response.data;

  checkApiResponse(data, "Failed to delete party");
  console.log("Delete API response:", data);

  // Return the ID of the deleted party, consistent with AgentService.jsx's delete function.
  return parties_id;
};
