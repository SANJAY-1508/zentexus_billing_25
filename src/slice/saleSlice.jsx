
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getParties, addOrUpdateSale } from "../services/saleService";


// FETCH PARTIES
export const fetchParties = createAsyncThunk(
  "party/fetchParties",
  async (_, { rejectWithValue }) => {
    try {
      const parties = await getParties();
      return parties;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// SAVE SALE (Create or Update)
export const saveSale = createAsyncThunk(
  "party/saveSale",
  async (saleData, { rejectWithValue }) => {
    try {
      const response = await addOrUpdateSale(saleData);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// SLICE
const saleSlice = createSlice({
  name: "party",
  initialState: {
    list: [],
    status: "idle",
    error: null,

    saleStatus: "idle",
    saleError: null,
    saleResponse: null,
  },
  reducers: {},
  extraReducers: (builder) => {  
    // Fetch Parties
    builder
      .addCase(fetchParties.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchParties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchParties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Save Sale
    builder
      .addCase(saveSale.pending, (state) => {
        state.saleStatus = "loading";
        state.saleError = null;
        state.saleResponse = null;
      })
      .addCase(saveSale.fulfilled, (state, action) => {
        state.saleStatus = "succeeded";
        state.saleResponse = action.payload;
      })
      .addCase(saveSale.rejected, (state, action) => {
        state.saleStatus = "failed";
        state.saleError = action.payload;
      });
  },
});

// SELECTOR
export const selectPartyOptions = (state) =>
  state.party.list.map((p) => ({
    value: p.id.toString(),
    label: p.name,
    phone: p.phone,
    billingAddress: p.billingaddress,
    shippingAddress: p.shippingaddress,
  }));

export default saleSlice.reducer;
