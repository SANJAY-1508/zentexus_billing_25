// src/features/party/partySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getsale } from '../services/saleService';
import { getParties } from '../services/saleService';

// Thunk to fetch parties asynchronously
// export const fetchParties = createAsyncThunk(
//   'party/fetchParties',
//   async (_, { rejectWithValue }) => {
//     try {
//       // The getParties function handles the PHP JSON envelope parsing
//       const parties = await getsale(); 
//       return parties;
//     } catch (error) {
//       // Return the error message to the rejected action payload
//       return rejectWithValue(error.message); 
//     }
//   }
// );
export const fetchParties = createAsyncThunk(
  'party/fetchParties',
  async (_, { rejectWithValue }) => {
    try {
      // ⭐️ UPDATED: Use getParties
      const parties = await getParties(); 
      return parties;
    } catch (error) {
      // Return the error message to the rejected action payload
      return rejectWithValue(error.message); 
    }
  }
);
const saleSlice = createSlice({
  name: 'party',
  initialState: {
    list: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Add any synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParties.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchParties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload; // array of party objects
      })
      .addCase(fetchParties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Error message from rejectWithValue
      });
  },
});

// Selector to format party data for the DashboardSale DropDown component
export const selectPartyOptions = (state) => {
  return state.party.list.map(party => ({
    value: party.id.toString(), // Ensure ID is a string for dropdown value
    label: party.name,
    phone: party.phone,
    billingAddress: party.billingaddress,
    shippingAddress: party.shippingaddress,
    // Add other fields you might need
  }));
};

export default saleSlice.reducer;