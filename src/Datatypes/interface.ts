import { UserCategory } from "./enums";

export interface RequestOptions {
  endpointId:string;
  slug?:string;
  data?:object;
  headers?:any;
  params?:any;
  isStream?:boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  access: string | null;
  refresh: string | null;
  userType: string | UserCategory | null;
  isLoading:boolean
  isContactVerified:boolean
  trxId?: string;
  phoneNumber: string | null;
}

export interface LoginData {
  email: string;
  password: string;
  OnFormSuccess:any
}

export interface ApiError {
  statusCode?: number;
  error: string;
}
export interface PaymentState {
  isPaid?: boolean;
  isLoading: boolean;
}

export interface ApiSuccess {
  statusCode?: number;
  message: string;
  data:object
}

export interface IloginUser {
  email: string;
  password?: string;
  accountStatus?: any;
}

export interface IUser extends IloginUser {
  id?: any;
  name: string;
  phoneNumber: string;
  address?: string | { latitude: number; longitude: number; }
  category?: UserCategory;
  subcategory?: string;
  permissions?: string[];
}


export interface SignUpData {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber: string;
  address?: string;
  accountStatus?: string;
  category?: string;
}

export interface OtpData {
  otp: string;
  trxId: string;
  deviceId: string;
  phoneNumber: string;
}


export interface LoginData {
  email: string;
  password: string;
  OnFormSuccess:any
  userType: UserCategory.ADMIN | UserCategory.USER
}


export interface Block {
  baseFeePerGas?: string;
  difficulty?: string;
  extraData?: string;
  gasLimit?: string;
  gasUsed?: string;
  hash?: string;
  logsBloom?: string;
  miner?: string;
  mixHash?: string;
  nonce?: string;
  number: string;
  parentHash?: string;
  receiptsRoot?: string;
  sha3Uncles?: string;
  size?: string;
  stateRoot?: string;
  timestamp?: string;
  totalDifficulty?: string;
  transactionsRoot?: string;
  uncles?: string[];
  transactions?: string[];
  transactionsCount?: number;
}

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface NetworkConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: NativeCurrency;
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export interface NetworkStats {
  totalBlocks: number;
  totalAddresses: number;
  totalTransactions: number;
  averageBlockTime: number;
  totalGasUsed: string;
  transactionsToday: number;
  gasUsedToday: string;
  gasPrices: {
    average: number;
    fast: number;
    slow: number;
  };
  staticGasPrice: string;
  networkUtilizationPercentage: number;
}