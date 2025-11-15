// // src/services/saleService.js
// import axios from 'axios';

// const API_BASE_URL = "http://localhost/zentexus_billing_api";

// // Fetch parties
// export const getsale = async () => {
//     try {
//         const url = `${API_BASE_URL}/get_sale.php`;
//         const response = await axios.get(url);

//         if (response.status !== 200) {
//             throw new Error(`HTTP Error: ${response.status}`);
//         }

//         const data = response.data;

//         if (data.head.code === 200) {
//             return data.body.parties || [];
//         } else {
//             console.error("API Response Error:", data.head.msg);
//             throw new Error(data.head.msg);
//         }
//     } catch (error) {
//         console.error("Error fetching parties:", error.message);
//         throw error;
//     }
// };

// // Add a new party
// export const addParty = async (partyData) => {
//     const response = await axios.post(`${API_BASE_URL}/add_party.php`, partyData);

//     if (response.data.head.code === 200) {
//         return response.data.body.newParty;
//     } else {
//         throw new Error(response.data.head.msg);
//     }
// };


// // src/services/saleService.js
// import axios from 'axios';

// const API_BASE_URL = "http://localhost/zentexus_billing_api";
// // NOTE: Your PHP files use "http://localhost/billing_api" in some places. 
// // I've kept the original for consistency but be mindful of the actual API root.

// // ⭐️ UPDATED: Renamed getsale to getParties, as it fetches parties.
// export const getParties = async () => {
//     try {
//         // Correcting the endpoint name for clarity, assuming it returns parties
//         const url = `${API_BASE_URL}/get_sale.php`; // Assuming a correct party endpoint
//         // NOTE: The original code used /get_sale.php but returned 'parties'. 
//         // I will assume for now that get_sale.php is meant to return parties.
        
//         const response = await axios.get(url);

//         if (response.status !== 200) {
//             throw new Error(`HTTP Error: ${response.status}`);
//         }

//         const data = response.data;

//         // The original logic checked for data.head.code === 200 and returned data.body.parties
//         if (data.head.code === 200) {
//             return data.body.parties || [];
//         } else {
//             console.error("API Response Error:", data.head.msg);
//             throw new Error(data.head.msg);
//         }
//     } catch (error) {
//         // ⚠️ NOTE: The original error message here was "Error fetching parties:", 
//         // confirming this function's intent is to fetch parties.
//         console.error("Error fetching parties:", error.message);
//         throw error;
//     }
// };

// // Add a new party (No change)
// export const addParty = async (partyData) => {
//     const response = await axios.post(`${API_BASE_URL}/add_party.php`, partyData);

//     if (response.data.head.code === 200) {
//         return response.data.body.newParty;
//     } else {
//         throw new Error(response.data.head.msg);
//     }
// };

// // ⭐️ NEW: Function to save a sale
// export const addsale = async (saleData) => {
//     try {
//         const url = `http://localhost/billing_api/save_sale.php`; // Use the URL from DashboardSale.jsx
        
//         // This will post the saleData object to the PHP endpoint
//         const response = await axios.post(url, saleData); 
        
//         if (response.status !== 200) {
//             throw new Error(`HTTP Error: ${response.status}`);
//         }
        
//         const data = response.data;

//         // Check the status returned by savesale.php
//         if (data.status === "success") {
//             return data;
//         } else {
//             console.error("API Response Error:", data.message);
//             throw new Error(data.message);
//         }
//     } catch (error) {
//         console.error("Error saving sale:", error.message);
//         throw error;
//     }
// }


// saleService.jsx
import axios from 'axios';

// ⚠️ VERIFY THESE BASE URLs!
const API_BASE_URL = "http://localhost/zentexus_billing_api"; // Used for Party APIs
const PHP_API_BASE_URL = "http://localhost/billing_api";      // Used for Sale APIs (savesale.php, getsale.php)

// 1. Fetches the list of Parties (Customers) for the dropdown.
export const getParties = async () => {
    try {
        // Assuming your party list endpoint is /get_party.php
        const url = `${API_BASE_URL}/get_party.php`; 
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = response.data;

        if (data.head.code === 200) {
            // The original logic expected 'parties' in the body
            return data.body.parties || []; 
        } else {
            console.error("API Response Error (getParties):", data.head.msg);
            throw new Error(data.head.msg);
        }
    } catch (error) {
        console.error("Error fetching parties:", error.message);
        throw error;
    }
};

// 2. Adds a new party from the modal.
export const addParty = async (partyData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add_party.php`, partyData);

        if (response.data.head.code === 200) {
            return response.data.body.newParty;
        } else {
            throw new Error(response.data.head.msg);
        }
    } catch (error) {
        console.error("Error adding party:", error.message);
        throw error;
    }
};

// 3. Saves a sale (calls savesale.php)
export const addsale = async (saleData) => {
    try {
        const url = `${PHP_API_BASE_URL}/savesale.php`; 
        const response = await axios.post(url, saleData); 
        
        if (response.status !== 200) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = response.data;

        // Expects { status: "success", ... } from savesale.php
        if (data.status === "success") {
            return data;
        } else {
            console.error("API Response Error (addsale):", data.message);
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error saving sale:", error.message);
        throw error;
    }
}

// 4. Gets the list of all sales (calls getsale.php)
export const getSales = async () => {
    try {
        const url = `${PHP_API_BASE_URL}/getsale.php`; 
        const response = await axios.get(url); 
        
        if (response.status !== 200) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = response.data;

        // Expects { status: "success", sales: [...] } from getsale.php
        if (data.status === "success") {
            return data.sales || [];
        } else {
            console.error("API Response Error (getSales):", data.message);
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error fetching sales:", error.message);
        throw error;
    }
}