import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  searchEstimatesApi,
  createEstimateApi,
  updateEstimateApi,
  deleteEstimateApi,
  fetchPartiesApi,
} from "../services/EstimateService";

export const fetchEstimates = createAsyncThunk(
  "estimate/fetchEstimates",
  async (_, { rejectWithValue }) => {
    try {
      const estimates = await searchEstimatesApi("");
      return Array.isArray(estimates) ? estimates : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchEstimates = createAsyncThunk(
  "estimate/searchEstimates",
  async (searchText, { rejectWithValue }) => {
    try {
      const estimates = await searchEstimatesApi(searchText);
      return Array.isArray(estimates) ? estimates : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchParties = createAsyncThunk(
  "estimate/fetchParties",
  async (searchText = "", { rejectWithValue }) => {
    try {
      const parties = await fetchPartiesApi(searchText);
      return Array.isArray(parties) ? parties : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEstimate = createAsyncThunk(
  "estimate/createEstimate",
  async (estimateData, { rejectWithValue }) => {
    try {
      const response = await createEstimateApi(estimateData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEstimate = createAsyncThunk(
  "estimate/updateEstimate",
  async (estimateData, { rejectWithValue }) => {
    try {
      const response = await updateEstimateApi(estimateData);
      return { ...estimateData, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEstimate = createAsyncThunk(
  "estimate/deleteEstimate",
  async (estimateId, { rejectWithValue }) => {
    try {
      await deleteEstimateApi(estimateId);
      return { estimateId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  estimates: [],
  parties: [],
  status: "idle",
  partiesStatus: "idle",
  error: null,
  estimateResponse: null,
};

const estimateSlice = createSlice({
  name: "estimate",
  initialState,
  reducers: {
    clearEstimateResponse: (state) => {
      state.estimateResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch estimates
      .addCase(fetchEstimates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEstimates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.estimates = action.payload;
      })
      .addCase(fetchEstimates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Search estimates
      .addCase(searchEstimates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchEstimates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.estimates = action.payload;
      })
      .addCase(searchEstimates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Fetch parties
      .addCase(fetchParties.pending, (state) => {
        state.partiesStatus = "loading";
      })
      .addCase(fetchParties.fulfilled, (state, action) => {
        state.partiesStatus = "succeeded";
        state.parties = action.payload;
      })
      .addCase(fetchParties.rejected, (state, action) => {
        state.partiesStatus = "failed";
        state.error = action.payload || action.error.message;
      })
      // Create estimate
      .addCase(createEstimate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEstimate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.estimateResponse = action.payload;
      })
      .addCase(createEstimate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Update estimate
      .addCase(updateEstimate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEstimate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.estimateResponse = action.payload.response;
        const { edit_estimates_id } = action.meta.arg;
        const index = state.estimates.findIndex(
          (estimate) => estimate.estimate_id === edit_estimates_id
        );
        if (index !== -1) {
          state.estimates[index] = { ...state.estimates[index], ...action.meta.arg };
        }
      })
      .addCase(updateEstimate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Delete estimate
      .addCase(deleteEstimate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEstimate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.estimates = state.estimates.filter(
          (estimate) => estimate.estimate_id !== action.payload.estimateId
        );
      })
      .addCase(deleteEstimate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearestimateResponse } = estimateSlice.actions;
export default estimateSlice.reducer;
