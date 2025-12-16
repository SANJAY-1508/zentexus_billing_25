// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   searchProformaApi,
//   createProformaApi,
//   updateProformaApi,
//   deleteProformaApi,
//   fetchPartiesApi,
// } from "../services/ProformaService";

// export const fetchProforma= createAsyncThunk(
//   "Proforma/fetchProforma",
//   async (_, { rejectWithValue }) => {
//     try {
//       const Proforma = await searchProformaApi("");
//       return Array.isArray(Proforma) ? Proforma : [];
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const searchProforma = createAsyncThunk(
//   "Proforma/searchProforma",
//   async (searchText, { rejectWithValue }) => {
//     try {
//       const Proforma = await searchProformaApi(searchText);
//       return Array.isArray(Proforma) ? Proforma : [];
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchParties = createAsyncThunk(
//   "Proforma/fetchParties",
//   async (searchText = "", { rejectWithValue }) => {
//     try {
//       const parties = await fetchPartiesApi(searchText);
//       return Array.isArray(parties) ? parties : [];
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const createProforma = createAsyncThunk(
//   "Proforma/createProforma",
//   async (ProformaData, { rejectWithValue }) => {
//     try {
//       const response = await createProformaApi(ProformaData);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updateProforma= createAsyncThunk(
//   "Proforma/updateProforma",
//   async (ProformaData, { rejectWithValue }) => {
//     try {
//       const response = await updateProformaApi(ProformaData);
//       return { ...ProformaData, response };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteProforma = createAsyncThunk(
//   "Proforma/deleteProforma",
//   async (ProformaId, { rejectWithValue }) => {
//     try {
//       await deleteProformaApi(ProformaId);
//       return { ProformaId };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   Proforma: [],
//   parties: [],
//   status: "idle",
//   partiesStatus: "idle",
//   error: null,
//   ProformaResponse: null,
// };

// const ProformaSlice = createSlice({
//   name: "Proforma",
//   initialState,
//   reducers: {
//     clearProformaResponse: (state) => {
//       state.ProformaResponse = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Proforma
//       .addCase(fetchProforma.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProforma.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.Proforma = action.payload;
//       })
//       .addCase(fetchProforma.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || action.error.message;
//       })
//       // Search Proforma
//       .addCase(searchProforma.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(searchProforma.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.Proforma = action.payload;
//       })
//       .addCase(searchProforma.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || action.error.message;
//       })
//       // Fetch parties
//       .addCase(fetchParties.pending, (state) => {
//         state.partiesStatus = "loading";
//       })
//       .addCase(fetchParties.fulfilled, (state, action) => {
//         state.partiesStatus = "succeeded";
//         state.parties = action.payload;
//       })
//       .addCase(fetchParties.rejected, (state, action) => {
//         state.partiesStatus = "failed";
//         state.error = action.payload || action.error.message;
//       })
//       // Create proforma
//       .addCase(createProforma.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(createProforma.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.saleResponse = action.payload;
//       })
//       .addCase(createProforma.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || action.error.message;
//       })
//       // Update Proforma
//       .addCase(updateProforma.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(updateProforma.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.ProformaResponse = action.payload.response;
//         const { edit_Proforma_id } = action.meta.arg;
//         const index = state.Proforma.findIndex(
//           (Proforma) => Proforma.Proforma_id === edit_Proforma_id
//         );
//         if (index !== -1) {
//           state.Proforma[index] = { ...state.Proforma[index], ...action.meta.arg };
//         }
//       })
//       .addCase(updateProforma.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || action.error.message;
//       })
//       // Delete sale
//       .addCase(deleteProforma.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteProforma.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.Proforma = state.Proforma.filter(
//           (Proforma) => Proforma.Proforma_id !== action.payload.ProformaId
//         );
//       })
//       .addCase(deleteProforma.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export const { clearProformaResponse } = ProformaSlice.actions;
// export default ProformaSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  searchProformaApi,
  createProformaApi,
  updateProformaApi,
  deleteProformaApi,
  fetchPartiesApi,
} from "../services/ProformaService";

export const fetchProforma = createAsyncThunk(
  "proforma/fetchProforma",
  async (_, { rejectWithValue }) => {
    try {
      const proforma = await searchProformaApi("");
      return Array.isArray(proforma) ? proforma : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchProforma = createAsyncThunk(
  "proforma/searchProforma",
  async (searchText, { rejectWithValue }) => {
    try {
      const proforma = await searchProformaApi(searchText);
      return Array.isArray(proforma) ? proforma : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchParties = createAsyncThunk(
  "proforma/fetchParties",
  async (searchText = "", { rejectWithValue }) => {
    try {
      const parties = await fetchPartiesApi(searchText);
      return Array.isArray(parties) ? parties : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProforma = createAsyncThunk(
  "proforma/createProforma",
  async (proformaData, { rejectWithValue }) => {
    try {
      const response = await createProformaApi(proformaData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProforma = createAsyncThunk(
  "proforma/updateProforma",
  async (proformaData, { rejectWithValue }) => {
    try {
      const response = await updateProformaApi(proformaData);
      return { ...proformaData, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProforma = createAsyncThunk(
  "proforma/deleteProforma",
  async (proformaId, { rejectWithValue }) => {
    try {
      await deleteProformaApi(proformaId);
      return { proformaId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  proforma: [],
  parties: [],
  status: "idle",
  partiesStatus: "idle",
  error: null,
  proformaResponse: null,
};

const proformaSlice = createSlice({
  name: "proforma",
  initialState,
  reducers: {
    clearProformaResponse: (state) => {
      state.proformaResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch proforma
      .addCase(fetchProforma.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProforma.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.proforma = action.payload;
      })
      .addCase(fetchProforma.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Search proforma
      .addCase(searchProforma.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProforma.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.proforma = action.payload;
      })
      .addCase(searchProforma.rejected, (state, action) => {
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
      // Create proforma
      .addCase(createProforma.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProforma.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.proformaResponse = action.payload;
      })
      .addCase(createProforma.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Update proforma
      .addCase(updateProforma.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProforma.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.proformaResponse = action.payload.response;
        const { edit_proforma_id } = action.meta.arg;
        const index = state.proforma.findIndex(
          (proforma) => proforma.proforma_id === edit_proforma_id
        );
        if (index !== -1) {
          state.proforma[index] = { ...state.proforma[index], ...action.meta.arg };
        }
      })
      .addCase(updateProforma.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Delete proforma
      .addCase(deleteProforma.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProforma.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.proforma = state.proforma.filter(
          (proforma) => proforma.proforma_id !== action.payload.proformaId
        );
      })
      .addCase(deleteProforma.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearProformaResponse } = proformaSlice.actions;
export default proformaSlice.reducer;
