import { NetworkConfig } from "./interface";

const base_url_backend = import.meta.env.VITE_BASE_URL_BACKEND;

export const ApiEndpoint: Record<string, any> = {
  AiPrompt: {
    apiId: 1,
    withAuth: true,
    url: `${base_url_backend}/ai/getPrompt`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Welcome",
    successMessage: "Success",
    errorMessage: "Error Getting Response"
  },

  // PAYMENT
  INITIATE_PAYMENT: {
    apiId: 3,
    withAuth: true,
    url: `${base_url_backend}/payment/checkout`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Processing Payment",
    successMessage: "Payment Initiated",
    errorMessage: "Error Initiating Payment"
  },
  CHECK_PAYMENT: {
    apiId: 4,
    withAuth: true,
    url: `${base_url_backend}/payment/check-payment`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Checking Payment",
    successMessage: "Payment Status Checked",
    errorMessage: "Error Checking Payment"
  },
  VERIFY_PAYMENT: {
    apiId: 5,
    withAuth: true,
    url: `${base_url_backend}/payment/verify-payment`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Verifying Payment",
    successMessage: "Payment Verified",
    errorMessage: "Error Verifying Payment"
  },

  // PASSWORDLESS LOGIN
  REGISTER_NUMBER_PASSWORDLESS: {
    apiId: 6,
    withAuth: false,
    url: `${base_url_backend}/passwordless/login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Logging In",
    successMessage: "",
    errorMessage: "Error Logging In"
  },
  REGISTER_NUMBER_OTP_PASSWORDLESS: {
    apiId: 7,
    withAuth: false,
    url: `${base_url_backend}/passwordless/verifyOtp`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Verifying OTP",
    successMessage: "",
    errorMessage: "Error Verifying OTP"
  },
  REGISTER_USER_PASSWORDLESS: {
    apiId: 8,
    withAuth: false,
    url: `${base_url_backend}/passwordless/registerUser`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Registering User",
    successMessage: "",
    errorMessage: "Error Registering User"
  },
  GET_ALL_USERS: { 
    apiId: 6, 
    withAuth: true, 
    url: `${base_url_backend}/getAllUsers`, 
    method: 'GET', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading user",
    successMessage: "",
    errorMessage: "Error loading users"
  },
  // MEETING ENDPOINTS
  BOOK_MEETING: {
    apiId: 60,
    withAuth: true,
    url: `${base_url_backend}/meetings`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Booking your meeting",
    successMessage: "Meeting booked successfully",
    errorMessage: "Error booking meeting"
  },
  GET_MEETING_BY_ID: {
    apiId: 61,
    withAuth: true,
    url: `${base_url_backend}/meetings/`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading meeting details",
    successMessage: "",
    errorMessage: "Error loading meeting"
  },
  GET_CLIENT_MEETINGS: {
    apiId: 62,
    withAuth: true,
    url:  `${base_url_backend}/clientmeetings/client`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading client meetings",
    successMessage: "",
    errorMessage: "Error loading client meetings"
  },
  GET_CHILD_MEETINGS: {
    apiId: 63,
    withAuth: true,
    url: `${base_url_backend}/meetings/parent/children/`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading child meetings",
    successMessage: "",
    errorMessage: "Error loading child meetings"
  },
  UPDATE_MEETING_STATUS: {
    apiId: 64,
    withAuth: true,
    url: `${base_url_backend}/meetings`,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Updating meeting status",
    successMessage: "Meeting status updated successfully",
    errorMessage: "Error updating meeting status"
  },
  RESCHEDULE_MEETING: {
    apiId: 65,
    withAuth: true,
    url: `${base_url_backend}/meetings`,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Rescheduling meeting",
    successMessage: "Meeting rescheduled successfully",
    errorMessage: "Error rescheduling meeting"
  },
  CANCEL_MEETING: {
    apiId: 66,
    withAuth: true,
    url: `${base_url_backend}/meetings`,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Canceling meeting",
    successMessage: "Meeting canceled successfully",
    errorMessage: "Error canceling meeting"
  },
  GET_ALL_MEETINGS: {
    apiId: 67,
    withAuth: true,
    url: `${base_url_backend}/meetings`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading all meetings",
    successMessage: "",
    errorMessage: "Error loading meetings"
  },
  DELETE_MEETING: {
    apiId: 68,
    withAuth: true,
    url: `${base_url_backend}/meetings`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Deleting meeting",
    successMessage: "Meeting deleted successfully",
    errorMessage: "Error deleting meeting"
  },
  UPDATE_MEETING_DETAILS: {
    apiId: 69,
    withAuth: true,
    url: `${base_url_backend}/meetings`,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Updating meeting details",
    successMessage: "Meeting details updated successfully",
    errorMessage: "Error updating meeting details"
  },
ADD_NOTES_TO_MEETING: {
  apiId: 70, 
  withAuth: true,
  url: `${base_url_backend}/meetings/notes`,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  loadingMessage: "Adding meeting notes",
  successMessage: "Meeting notes added successfully",
  errorMessage: "Error adding meeting notes"
},
GET_MEETING_NOTES: {
  apiId: 71,
  withAuth: true,
  url: `${base_url_backend}/meetings/notes`,
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  loadingMessage: "Fetching meeting notes",
  successMessage: "",
  errorMessage: "Error fetching meeting notes"
},
UPDATE_MEETING_NOTES: {
  apiId: 71,
  withAuth: true,
  url: `${base_url_backend}/meetings/notes`,
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  loadingMessage: "Fetching meeting notes",
  successMessage: "",
  errorMessage: "Error fetching meeting notes",

},

 // ROLES & PERMISSIONS ENDPOINTS
  UPDATE_USER_ROLE: {
    apiId: 100,
    withAuth: true,
    url: `${base_url_backend}/admin/users/role`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    loadingMessage: "Updating user role",
    successMessage: "User role updated successfully",
    errorMessage: "Error updating user role",
  },
  ASSIGN_PERMISSIONS_TO_USER: {
    apiId: 101,
    withAuth: true,
    url: `${base_url_backend}/admin/users/permissions/assign`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    loadingMessage: "Assigning permissions",
    successMessage: "Permissions assigned successfully",
    errorMessage: "Error assigning permissions",
  },
  REVOKE_PERMISSIONS_FROM_USER: {
    apiId: 102,
    withAuth: true,
    url: `${base_url_backend}/admin/users/permissions/revoke`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    loadingMessage: "Revoking permissions",
    successMessage: "Permissions revoked successfully",
    errorMessage: "Error revoking permissions",
  },
  GET_PERMISSIONS_FOR_USER: (userId: string) => ({
    apiId: 103,
    withAuth: true,
    url: `${base_url_backend}/users/${userId}/permissions`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    loadingMessage: "Fetching user permissions",
    successMessage: "User permissions fetched successfully",
    errorMessage: "Error fetching user permissions",
  }),
  GET_ALL_ROLES: {
    apiId: 104,
    withAuth: true,
    url: `${base_url_backend}/admin/roles`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    loadingMessage: "Fetching all roles",
    successMessage: "All roles fetched successfully",
    errorMessage: "Error fetching all roles",
  },
  GET_ALL_PERMISSIONS: {
    apiId: 105,
    withAuth: true,
    url: `${base_url_backend}/admin/permissions`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    loadingMessage: "Fetching all permissions",
    successMessage: "All permissions fetched successfully",
    errorMessage: "Error fetching all permissions",
  },
fetchChainStats: { url: `${base_url_backend}/stats`, method: 'POST', headers: { 'Content-Type': 'application/json' } },
  
fetchBlocksInFrame: { url: `${base_url_backend}/blocksInFrame`, method: 'POST', headers: { 'Content-Type': 'application/json' } },

getBlockWithTrx: { url: `${base_url_backend}/getBlockWithTrx`, method: 'POST', headers: { 'Content-Type': 'application/json' } },

};

export enum AIModel {
  Deepseek = 'Deepseek',
  ChatGPT = 'ChatGPT',
  Gemini = 'Gemini'
}

export enum UserCategory {
  ADMIN = "DAANDIKAANTHI_ADMIN",
  USER = "SKAYA_USER"
}

export interface IRole {
  id: string;
  name: string;
  description?: string;
}

export interface IPermission {
  id: string;
  name: string;
  description?: string;
}

export enum Pages {
  Home=""
}

export enum PromptType {
  TEXT = "text",
  AUDIO = "audio",
  VIDEO = "video",
  LINKEDIN_PROFILE = "linkedin_profile",
  LINKEDIN_POST = "linkedin_post"
}


export enum Network {
  Polygon = "Polygon",
  Amoy = "Amoy",
  Bsc = "Bsc",
  BASE = "BASE",
  Localhost = "Localhost",
  SONEIUM = "SONEIUM",
  HOLESKY = "HOLESKY",
}

export type NetworkType = keyof typeof Network;

export const networks: Record<Network, NetworkConfig> = {
  Polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://polygon-mainnet.g.alchemy.com/v2/PXBhpQURgmwMghvNtc__XWxwc1NGmFHD"],
    blockExplorerUrls: ["https://polygonscan.com/"]
  },
  SONEIUM : {
    chainId: `0x${Number(1946).toString(16)}`,
    chainName: "Sonium Minato Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://rpc.minato.soneium.org"],
    blockExplorerUrls: []
  },
  HOLESKY : {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky Minato Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://1rpc.io/holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"]
  },
  BASE : {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://mainnet.base.org"],
    blockExplorerUrls: ["https://basescan.org"]
  },
  Amoy: {
    chainId: `0x${Number(0x13882).toString(16)}`,
    chainName: "Amoy Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://polygon-amoy.g.alchemy.com/v2/roMKSSyXWVrSgFgBLhXoRW_-Y1zIciII"],
    blockExplorerUrls: ["https://polygonscan.com/"]
  },
  Localhost: {
    chainId: `0x${Number(31337).toString(16)}`, // Hardhat's default local network chain ID
    chainName: "Hardhat Localhost",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["http://127.0.0.1:8545"], // Hardhat's default RPC URL
    blockExplorerUrls: ["http://localhost:8545"]
  },
  Bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org"
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  }
};