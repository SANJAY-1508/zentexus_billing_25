// src/slice/partySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as partyService from "../services/PartyService";




// Fetch all parties
export const fetchParties = createAsyncThunk(
  "party/fetchParties",
  // FIX: Accept 'searchText' here
  async (searchText, { rejectWithValue }) => {
    try {
      console.log("enter try fetch")
      const response = await partyService.getParties(searchText); 
      console.log("response",response)
     const partiesArray = response || []; 
      console.log("partiesArray",partiesArray)
      
      // 3. Return only the array to Redux
      return partiesArray; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Add new party
// src/slice/partySlice.js

// ... (other thunks)

// Add new party
export const addNewParty = createAsyncThunk(
  "party/addNewParty",
  async (party, { rejectWithValue }) => {
    try {
      // console.log("enter add try")
      // 1. Call the service (partyService.addParty)
      const response = await partyService.addParty(party);
      return response; // Return only the array to the reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ... (other thunks)

// 🌟 NEW: Update existing party Thunk
export const updateExistingParty = createAsyncThunk(
  "party/updateParty",
  async (party, { rejectWithValue }) => {
    try {
      const data = await partyService.updateParty(party);
      return data; // Returns the updated party object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🌟 NEW: Delete party Thunk
export const deleteExistingParty = createAsyncThunk(
  "party/deleteParty",
  async (parties_id, { rejectWithValue }) => {
    try {
      const data = await partyService.deleteParty(parties_id);
      return data; // Returns the parties_id of the deleted party
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const partySlice = createSlice({
  name: "parties",
  initialState: {
    parties: [],
    loading: false,
    error: null,
  },
 reducer: {  },

 // src/slice/partySlice.js

// ... (existing imports and thunks)

  extraReducers: (builder) => {
    builder
      // ... (fetchParties cases)

      // Add new party
      .addCase(addNewParty.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(addNewParty.fulfilled, (state) => {
        state.loading = false;
        
        // 🌟 THE FIX IS HERE 🌟
        console.log("New party creation fulfilled. Relying on fetchParties for state update.");
        
        // 1. Determine the source array from the payload.
        // We assume the service returns an array of new parties: [ { new party } ]
      //  const newPartyArray = action.payload;
      //  if (newPartyArray && Array.isArray(newPartyArray) && newPartyArray.length > 0) {
      //     // Push the party object (first element of the array) into the state.parties array.
      //     state.parties.unshift(newPartyArray[0]); 
      //   } else {
      //       console.warn("New party array was empty. State not updated.");
      //   }
        
      })
      .addCase(addNewParty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // src/slice/partySlice.js (inside extraReducers)

// ...
    .addCase(fetchParties.fulfilled, (state, action) => {
        state.loading = false;
        // This is where the listing actually happens!
        state.parties = action.payload; 
        state.error = null;
    })
// ...
  },
});


export default partySlice.reducer;
