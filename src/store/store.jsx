// import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "../slice/authSlice";
// import LoginMiddleware from "../middleware/LoginMiddleware";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(LoginMiddleware),
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import partyReducer from "../slice/partySlice"; // ✅ added
import LoginMiddleware from "../middleware/LoginMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    party: partyReducer, // ✅ added
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LoginMiddleware),
});

export default store;
